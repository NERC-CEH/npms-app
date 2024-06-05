import { observer } from 'mobx-react';
import { locationOutline } from 'ionicons/icons';
import { useRouteMatch } from 'react-router-dom';
import { Main, MenuAttrItem, MenuAttrItemFromModel } from '@flumens';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import flowerIcon from 'common/images/flower.svg';
import { byGrid } from 'common/models/occurrence';
import Sample from 'models/sample';
import MenuDateAttr from 'Survey/common/Components/MenuDateAttr';
import UploadedRecordInfoMessage from 'Survey/common/Components/UploadedRecordInfoMessage';
import { getPlotGroups } from '../config';

type Props = {
  sample: Sample;
};

const MainComponent = ({ sample }: Props) => {
  const match = useRouteMatch();
  const isDisabled = sample.isUploaded();

  const locationName = sample.attrs.location?.name;
  const locationValue = locationName ? (
    <div className="line-clamp-2">{locationName}</div>
  ) : null;

  const hasGroup = !!sample.attrs.group?.id;

  const style =
    'bg-white p-2 pl-6 text-base text-green-700  border-solid border-b-[0.5px]';

  const hasPlotGroups =
    hasGroup &&
    Object.values(
      getPlotGroups(sample.getSurvey().name, sample.attrs.group?.id)
    ).length;

  const canopySpecies = sample.occurrences.filter(byGrid('canopy-grid'));
  const groundSpecies = sample.occurrences.filter(byGrid('ground-layer-grid'));
  const hasSpecies = !!canopySpecies.length || !!groundSpecies.length;

  return (
    <Main>
      {isDisabled && <UploadedRecordInfoMessage />}

      <IonList lines="full">
        <div className="rounded-list">
          <MenuDateAttr model={sample} />
          <MenuAttrItemFromModel
            model={sample}
            attr="group"
            value={sample.attrs.group?.name}
            required
          />
          {hasPlotGroups && (
            <MenuAttrItemFromModel
              model={sample}
              attr="plotGroup"
              value={sample.attrs.plotGroup?.name}
              disabled={isDisabled || !hasGroup}
            />
          )}
          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={locationValue}
            icon={locationOutline}
            label="Location"
            skipValueTranslation
            disabled={isDisabled || !hasGroup}
            required
          />
        </div>

        <h3 className="list-title">Species</h3>
        <div className="rounded-list">
          <MenuAttrItemFromModel
            model={sample}
            attr="abundanceType"
            required
            disabled={isDisabled || hasSpecies}
          />
          <IonItem routerLink={`${match.url}/canopy-grid/occurrences`}>
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Canopy species</IonLabel>
            <IonLabel slot="end">{canopySpecies.length}</IonLabel>
          </IonItem>
          <IonItem routerLink={`${match.url}/ground-layer-grid/occurrences`}>
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Ground species</IonLabel>
            <IonLabel slot="end">{groundSpecies.length}</IonLabel>
          </IonItem>
          <MenuAttrItemFromModel
            model={sample}
            attr="speciesComments"
            disabled={isDisabled}
          />
        </div>

        <h3 className="list-title">Other</h3>
        <div className="rounded-list">
          <div className={style}>Management</div>
          <div className={style}>Habitat details</div>
          <div className={style}>Vegetation height</div>
          <div className={style}>Miscellaneous</div>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MainComponent);
