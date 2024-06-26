import { observer } from 'mobx-react';
import { bookOutline, listOutline, openOutline } from 'ionicons/icons';
import { useRouteMatch } from 'react-router-dom';
import { Block, Button, Main } from '@flumens';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import flowerIcon from 'common/images/flower.svg';
import { byGrid } from 'common/models/occurrence';
import Sample from 'models/sample';
import MenuDateAttr from 'Survey/common/Components/MenuDateAttr';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';
import UploadedRecordInfoMessage from 'Survey/common/Components/UploadedRecordInfoMessage';
import { groupAttr, locationAttr } from 'Survey/common/config';
import { broadHabitatAttr, fineHabitatAttr } from '../config';

type Props = {
  sample: Sample;
};

const MainComponent = ({ sample }: Props) => {
  const isNPMSPlus = sample.getSurvey().name === 'npmsPlus';

  const match = useRouteMatch();
  const isDisabled = sample.isUploaded();

  const hasBroadHabitat = !!sample.attrs[broadHabitatAttr.id];
  const hasGroup = !!sample.attrs[groupAttr().id];

  const occCount = sample.occurrences.filter(
    byGrid('main-species-grid')
  ).length;

  const recordAttrs = {
    record: sample.attrs,
    isDisabled: sample.isDisabled(),
  };

  return (
    <Main>
      {isDisabled && <UploadedRecordInfoMessage />}

      <div className="rounded-list mx-auto mb-2 mt-2 max-w-[600px]">
        <Button
          href="https://www.npms.org.uk/content/resources"
          prefix={<IonIcon icon={bookOutline} className="size-6" />}
          suffix={<IonIcon icon={openOutline} />}
          className="mx-2 border-none text-left"
        >
          NPMS resources
        </Button>
      </div>
      <IonList lines="full">
        <div className="rounded-list">
          <MenuDateAttr model={sample} />

          {isNPMSPlus && (
            <Block block={groupAttr(sample.attrs)} {...recordAttrs} />
          )}

          <Block
            record={sample.attrs}
            block={locationAttr(sample.attrs)}
            isDisabled={isDisabled || (isNPMSPlus && !hasGroup)}
          />

          <Block block={broadHabitatAttr} {...recordAttrs} />
          {hasBroadHabitat && (
            <Block block={fineHabitatAttr(sample.attrs)} {...recordAttrs} />
          )}

          <IonItem routerLink={`${match.url}/main-species-grid/occurrences`}>
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Species</IonLabel>
            <IonLabel slot="end">{occCount}</IonLabel>
          </IonItem>

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
