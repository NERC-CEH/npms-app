import { observable } from 'mobx';
import { z, object } from 'zod';
import { Model, ModelAttrs, Collection, UUID } from '@flumens';
import { locationsStore } from './store';

export type RemoteAttributes = z.infer<typeof LocationModel.remoteSchema>;

export type Attrs = RemoteAttributes & ModelAttrs;

class LocationModel extends Model {
  static remoteSchema = object({
    /**
     * Entity ID.
     */
    id: z.string(),
    createdOn: z.string(),
    updatedOn: z.string(),
    lat: z.string(),
    lon: z.string(),
    /**
     * Location name.
     */
    name: z.string(),
    /**
     * Location type e.g. transect = 777, transect section = 778 etc.
     */
    locationTypeId: z.string(),
    centroidSref: z.string(),
    centroidSrefSystem: z.string(),
    parentId: z.string().nullable().optional(),
    boundaryGeom: z.string().nullable().optional(),
    code: z.string().nullable().optional(),
    createdById: z.string().nullable().optional(),
    updatedById: z.string().nullable().optional(),
    externalKey: z.string().nullable().optional(),
    centroidGeom: z.string().nullable().optional(),
    public: z.string().nullable().optional(),
    comment: z.string().nullable().optional(),

    /**
     * Custom ones added for this project.
     */
    surveyName: z.string(),
    parentName: z.string().nullable().optional(),
    projectId: z.string().nullable().optional(),
    projectName: z.string().nullable().optional(),
    // npms
    myPlotLabel: z.string().nullable().optional(),
    locationTypeTerm: z.string().nullable().optional(),
    // standard
    plotGroupIdsAndNamesForPlot: z.object({}).nullable().optional(),
    plotGroupIdsAndNamesForUser: z.object({}).nullable().optional(),
  });

  static parseRemoteJSON = ({
    id,
    externalKey,
    createdOn,
    updatedOn,
    ...attrs
  }: RemoteAttributes) => ({
    cid: externalKey || UUID(),
    id,
    createdAt: new Date(createdOn).getTime(),
    updatedAt: new Date(updatedOn).getTime(),
    attrs,
  });

  store = locationsStore;

  collection?: Collection<LocationModel>;

  remote = observable({ synchronising: false });

  // eslint-disable-next-line
  // @ts-ignore
  attrs: Attrs = Model.extendAttrs(this.attrs, {});

  destroy() {
    if (this.collection) {
      this.collection.remove(this);
    }

    return super.destroy();
  }
}

export default LocationModel;
