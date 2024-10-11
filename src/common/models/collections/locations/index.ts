import { reaction, observable, observe } from 'mobx';
import { device, Collection, CollectionOptions } from '@flumens';
import userModel from 'models/user';
import { Survey } from 'Survey/common/config';
import Location from '../../location';
import { locationsStore as store } from '../../store';
import fetch from './service';

export class Locations extends Collection<Location> {
  Model = Location;

  store = store;

  _fetchedFirstTime = false;

  fetching = observable({
    isFetching: false,
  });

  constructor(options: CollectionOptions<Location>) {
    super(options);

    const attachCollectionToModels = (change: any) => {
      if (change.addedCount)
        change.added.forEach((model: Location) => (model.collection = this)); // eslint-disable-line no-return-assign, no-param-reassign

      if (change.removedCount)
        change.removed.forEach((model: Location) => delete model.collection); // eslint-disable-line no-param-reassign
    };
    observe(this, attachCollectionToModels);

    this.ready.then(this.fetchRemoteFirstTime);

    const onLoginChange = async (newEmail: any) => {
      if (!newEmail) return;

      await this.ready;

      console.log(`📚 Collection: ${this.id} collection email has changed`);
      const firstTimeFetch = !this.length && !this._fetchedFirstTime;
      if (firstTimeFetch) this.fetchRemoteFirstTime();
      else this.fetchRemote();
    };
    const getEmail = () => userModel.attrs.email;
    reaction(getEmail, onLoginChange);

    const superReset = this.reset; // super.reset() doesn't exist, not in the prototype
    this.reset = async () => {
      this._fetchedFirstTime = false;
      return superReset.call(this);
    };
  }

  fetch = async () => {
    if (!this.store || !this.Model) {
      this.ready.resolve(false);
      return;
    }

    const modelsJSON = await this.store.findAll();

    const getModel = (json: any) =>
      new this.Model({ ...json, attrs: json.data });
    const models = modelsJSON.map(getModel);
    this.push(...(models as any));

    this.ready.resolve(true);
  };

  fetchRemote = async () => {
    const remoteDocs = await this._fetchDocs();

    await this.clear();
    await this.store?.deleteAll();

    const initModel = (doc: any) => new this.Model(doc);
    const newModelsFromRemote = remoteDocs.map(initModel);

    const jsonModels = newModelsFromRemote.map(m => {
      const json = m.toJSON();
      return { ...json, data: json.attrs };
    });

    await this.store.save(jsonModels as any);

    this.push(...newModelsFromRemote);
  };

  private fetchRemoteFirstTime = async () => {
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
      await this.fetchRemote();

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
}

const collection = new Locations({});

export const bySurvey = (surveyName: Survey['name']) => (l: Location) =>
  l.attrs.surveyName === surveyName;

export default collection;
