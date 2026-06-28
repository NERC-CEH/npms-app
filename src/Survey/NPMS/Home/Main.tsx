import { observer } from 'mobx-react';
import {
  addOutline,
  bookOutline,
  listOutline,
  openOutline,
  shareSocialOutline,
} from 'ionicons/icons';
import { useRouteMatch } from 'react-router-dom';
import { Block, Button, Main } from '@flumens';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import flowerIcon from 'common/images/flower.svg';
import { byGrid } from 'common/models/occurrence';
import Sample from 'models/sample';
import MenuDateAttr from 'Survey/common/Components/MenuDateAttr';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';
import UploadedRecordInfoMessage from 'Survey/common/Components/UploadedRecordInfoMessage';
import { useTrainingAlert } from 'Survey/common/Components/hooks';
import { groupAttr, locationAttr } from 'Survey/common/config';
import {
  broadHabitatAttr as portalBroadHabitatAttr,
  fineHabitatAttr as portalFineHabitatAttr,
} from '../../NPMSPlus/config';
import {
  broadHabitatAttr as npmsBroadHabitatAttr,
  fineHabitatAttr as npmsFineHabitatAttr,
  firstSurveyAttr,
} from '../config';

type Props = {
  sample: Sample;
  onAddSecondSurvey: any;
  onShare: any;
};

const MainComponent = ({ sample, onAddSecondSurvey, onShare }: Props) => {
  useTrainingAlert(sample.data.training);

  const isNPMSPlus = sample.getSurvey().name === 'npmsPlus';

  const broadHabitatAttr = isNPMSPlus
    ? portalBroadHabitatAttr
    : npmsBroadHabitatAttr;

  const fineHabitatAttr = isNPMSPlus
    ? portalFineHabitatAttr
    : npmsFineHabitatAttr;

  const match = useRouteMatch();
  const isDisabled = sample.isUploaded;

  const hasBroadHabitat = !!sample.data[broadHabitatAttr.id];
  const hasGroup = !!sample.data[groupAttr().id];

  const occCount = sample.occurrences.filter(
    byGrid('main-species-grid')
  ).length;

  const recordAttrs = {
    record: sample.data,
    isDisabled,
  };

  const allowSecondSurvey =
    isDisabled && !isNPMSPlus && !sample.data[firstSurveyAttr.id];

  return (
    <Main className="[--padding-bottom:50px]">
      {isDisabled && (
        <UploadedRecordInfoMessage
          sampleId={sample.id}
          groupId={sample.data.groupId}
          level={sample.metadata.level}
        />
      )}

      {allowSecondSurvey && (
        <Button
          onPress={onAddSecondSurvey}
          prefix={<IonIcon icon={addOutline} className="size-6" />}
          color="secondary"
          className="mx-auto my-4 min-w-[200px]"
        >
          Add Survey 2
        </Button>
      )}

      {isDisabled && (
        <Button
          onPress={onShare}
          prefix={<IonIcon icon={shareSocialOutline} className="size-6" />}
          color="primary"
          className="mx-auto my-4 min-w-[200px]"
        >
          Share
        </Button>
      )}

      <div className="rounded-list m-2 flex justify-left bg-white! max-w-lg">
        <Button
          href="https://www.npms.org.uk/content/resources"
          prefix={<IonIcon icon={bookOutline} className="size-6" />}
          suffix={<IonIcon icon={openOutline} />}
          className="border-none! text-left shadow-none! w-full"
        >
          NPMS resources
        </Button>
      </div>

      <IonList lines="full">
        <div className="rounded-list">
          <MenuDateAttr model={sample} />

          {isNPMSPlus && (
            <Block block={groupAttr(sample.data)} {...recordAttrs} />
          )}

          <Block
            record={sample.data}
            block={locationAttr(sample.data)}
            isDisabled={isDisabled || (isNPMSPlus && !hasGroup)}
          />

          <Block block={broadHabitatAttr} {...recordAttrs} />
          {hasBroadHabitat && (
            <Block block={fineHabitatAttr(sample.data)} {...recordAttrs} />
          )}

          <IonItem routerLink={`${match.url}/main-species-grid/occurrences`}>
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Species</IonLabel>
            <IonLabel slot="end">{occCount}</IonLabel>
          </IonItem>

          <IonItem routerLink={`${match.url}/additional`}>
            <IonIcon src={listOutline} slot="start" />
            <IonLabel>Plot info</IonLabel>
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
