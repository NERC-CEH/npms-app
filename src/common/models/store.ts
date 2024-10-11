import SQLiteDatabase from '@flumens/models/dist/Stores/SQLiteDatabase';
import Store from '@flumens/models/dist/Stores/SQLiteStore';
import { isPlatform } from '@ionic/react';

const web = !isPlatform('hybrid');

export const db = new SQLiteDatabase({ web, debug: web });

export const mainStore = new Store({ name: 'main', db });
export const samplesStore = new Store({ name: 'samples', db });
export const locationsStore = new Store({ name: 'locations', db });

if (web) Object.assign(window, { mainStore, samplesStore, locationsStore, db });
