import { reaction, observable, observe } from 'mobx';
import { device, Store, Collection } from '@flumens';
import userModel from 'models/user';
import { Survey } from 'Survey/common/config';
import Location from '../../location';
import { locationsStore as store } from '../../store';
import fetch from './service';

type constructorOptions = {
  id: string;
  store: Store;
  Model: typeof Location;
};

export class Locations extends Collection<Location> {
  Model: typeof Location;

  _fetchedFirstTime = false;

  fetching = observable({
    isFetching: false,
  });

  constructor(options: constructorOptions) {
    super(options);

    this.Model = options.Model;

    // eslint-disable-next-line @getify/proper-arrows/name
    observe(this, (change: any) => {
      if (change.addedCount) {
        const attachCollection = (model: Location) => {
          model.collection = this; // eslint-disable-line no-param-reassign
        };
        change.added.forEach(attachCollection);
      }
    });

    this.ready && this.ready.then(this._fetchFirstTime);

    const onLoginChange = async (newEmail: any) => {
      if (!newEmail) return;

      await this.ready;

      console.log(`📚 Collection: ${this.id} collection email has changed`);
      const firstTimeFetch = !this.length && !this._fetchedFirstTime;
      if (firstTimeFetch) this._fetchFirstTime();
      else this.fetch();
    };
    const getEmail = () => userModel.attrs.email;
    reaction(getEmail, onLoginChange);

    const superReset = this.reset;
    // eslint-disable-next-line @getify/proper-arrows/name
    this.reset = async () => {
      // super.reset() doesn't exist, not in the prototype
      superReset.call(this);
      this._fetchedFirstTime = false;
    };
  }

  fetch = async () => {
    const remoteDocs = await this._fetchDocs();

    const drafts: Location[] = [];

    while (this.length) {
      const model = this.pop();
      if (!model) continue; // eslint-disable-line no-continue
      model.destroy();
    }

    const initModel = (doc: any) => new this.Model(doc) as Location;
    const newModelsFromRemote = remoteDocs.map(initModel);

    this.push(...newModelsFromRemote, ...drafts);
  };

  private _fetchFirstTime = async () => {
    if (!this.id) throw new Error('Collection fetching without id');

    const requiresSync = !this.length && !this._fetchedFirstTime;
    if (
      !requiresSync ||
      !device.isOnline ||
      !userModel.isLoggedIn() ||
      this.fetching.isFetching
    )
      return null;

    console.log(`📚 Collection: ${this.id} collection fetching first time`);

    try {
      const docs = await this._fetchDocs();
      const initModel = (doc: any) => new this.Model(doc) as Location;
      const models = docs.map(initModel);

      this.push(...models);

      this._fetchedFirstTime = true;
    } catch (error: any) {
      if (error.isHandled) return this;
      throw error;
    }

    return this;
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

  resetDefaults = () => {
    const destroyLocation = (location: Location) => location.destroy();
    const destroyAllLocations = this.map(destroyLocation);
    return Promise.all(destroyAllLocations);
  };
}

const collection = new Locations({
  id: 'locations',
  store,
  Model: Location,
});

export const bySurvey = (surveyName: Survey['name']) => (l: Location) =>
  l.attrs.surveyName === surveyName;

export default collection;
