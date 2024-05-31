import { observer } from 'mobx-react';
import { listOutline, locationOutline } from 'ionicons/icons';
import { useRouteMatch } from 'react-router-dom';
import { Main, MenuAttrItem, MenuAttrItemFromModel } from '@flumens';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import flowerIcon from 'common/images/flower.svg';
import Sample from 'models/sample';
import MenuDateAttr from 'Survey/common/Components/MenuDateAttr';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';
import UploadedRecordInfoMessage from 'Survey/common/Components/UploadedRecordInfoMessage';

type Props = {
  sample: Sample;
};

const MainComponent = ({ sample }: Props) => {
  const isNPMSPlus = sample.getSurvey().name === 'npmsPlus';

  const match = useRouteMatch();
  const isDisabled = sample.isUploaded();

  const locationName = sample.attrs.location?.name;
  const locationValue = locationName ? (
    <div className="line-clamp-2">{locationName}</div>
  ) : null;

  const hasBroadHabitat = !!sample.attrs.broadHabitat;
  const hasGroup = !!sample.attrs.group?.id;

  return (
    <Main>
      {isDisabled && <UploadedRecordInfoMessage />}

      <IonList lines="full">
        <div className="rounded-list">
          <MenuDateAttr model={sample} />
          {isNPMSPlus && (
            <MenuAttrItemFromModel
              model={sample}
              attr="group"
              value={sample.attrs.group?.name}
              required
            />
          )}

          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={locationValue}
            icon={locationOutline}
            label="Location"
            skipValueTranslation
            disabled={isDisabled || (isNPMSPlus && !hasGroup)}
            required
          />
          <MenuAttrItemFromModel model={sample} attr="broadHabitat" required />
          {hasBroadHabitat && (
            <MenuAttrItemFromModel model={sample} attr="fineHabitat" />
          )}

          <IonItem routerLink={`${match.url}/occurrences`}>
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Species</IonLabel>
            <IonLabel slot="end">{sample.occurrences.length}</IonLabel>
          </IonItem>
          <MenuAttrItemFromModel model={sample} attr="recorder" />
          <IonItem routerLink={`${match.url}/additional`}>
            <IonIcon src={listOutline} slot="start" />
            <IonLabel>Additional info</IonLabel>
          </IonItem>
        </div>

        <h3 className="list-title">Plot photos</h3>
        <div className="rounded-list">
          <PhotoPicker model={sample} />
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MainComponent);
