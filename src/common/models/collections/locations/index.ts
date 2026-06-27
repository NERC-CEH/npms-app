import { reaction, observable } from 'mobx';
import {
  device,
  LocationCollection as LocationCollectionBase,
  LocationCollectionOptions,
} from '@flumens';
import config from 'common/config';
import userModel from 'models/user';
import { Survey } from 'Survey/common/config';
import Location from '../../location';
import { locationsStore as store } from '../../store';
import fetch from './service';

export class LocationsCollection extends LocationCollectionBase<Location> {
  declare Model: typeof Location;

  _fetchedFirstTime = false;

  fetching = observable({
    isFetching: false,
  });

  constructor(options: LocationCollectionOptions<Location>) {
    super(options);

    const fetchFirstTime = () => {
      if (
        !this.data.length &&
        device.isOnline &&
        userModel.isLoggedIn() &&
        !this.isSynchronising
      ) {
        this.fetchRemote().catch();
      }
    };

    this.ready?.then(fetchFirstTime);

    const onLoginChange = async (newEmail: any) => {
      if (!newEmail) return;

      await this.ready;

      console.log(`📚 Collection: ${this.id} collection email has changed`);
      fetchFirstTime();
    };
    const getEmail = () => userModel.data.email && userModel.data.verified;
    reaction(getEmail, onLoginChange);

    const superReset = this.reset; // super.reset() doesn't exist, not in the prototype
    this.reset = async () => {
      this._fetchedFirstTime = false;
      return superReset.call(this);
    };
  }

  fetchRemote = async () => {
    const remoteDocs = await this._fetchDocs();

    await this.data.clear();
    await this.store?.deleteAll();

    const initModel = (doc: any) => new this.Model(doc);
    const newModelsFromRemote = remoteDocs.map(initModel);

    const jsonModels = newModelsFromRemote.map(m => {
      const json = m.toJSON();
      return { ...json, data: json.data };
    });

    await this.store!.save(jsonModels as any);

    this.push(...newModelsFromRemote);
  };

  private _fetchDocs = async () => {
    console.log(`📚 Collection: ${this.id} collection fetching`);
    this.fetching.isFetching = true;

    const docs = [];
    if (userModel.isPlantPortal()) {
      const npmsPlus = await fetch('npmsPlus');
      const standard = await fetch('standard');

      docs.push(...npmsPlus, ...standard);
    } else {
      const npms = await fetch('npms');

      docs.push(...npms);
    }

    this.fetching.isFetching = false;

    console.log(
      `📚 Collection: ${this.id} collection fetching done ${docs.length} documents`
    );

    return docs.map(this.Model.parseRemoteJSON);
  };
}

export const bySurvey = (surveyName: Survey['name']) => (l: Location) =>
  l.data.surveyName === surveyName;

const locations = new LocationsCollection({
  store,
  Model: Location,
  url: config.backend.indicia.url,
  getAccessToken: () => userModel.getAccessToken(),
});

export default locations;
