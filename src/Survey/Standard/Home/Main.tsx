import { observer } from 'mobx-react';
import clsx from 'clsx';
import { listOutline, shareSocialOutline } from 'ionicons/icons';
import { useRouteMatch } from 'react-router-dom';
import { Block, Button, Main } from '@flumens';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import flowerIcon from 'common/images/flower.svg';
import { byGrid } from 'common/models/occurrence';
import Sample from 'models/sample';
import MenuDateAttr from 'Survey/common/Components/MenuDateAttr';
import UploadedRecordInfoMessage from 'Survey/common/Components/UploadedRecordInfoMessage';
import { useTrainingAlert } from 'Survey/common/Components/hooks';
import { groupAttr, locationAttr } from 'Survey/common/config';
import { abundanceAttr, plotGroupAttr, speciesCommentsAttr } from '../config';

type Props = {
  sample: Sample;
  onShare: any;
};

const MainComponent = ({ sample, onShare }: Props) => {
  const match = useRouteMatch();
  const isDisabled = sample.isUploaded();
  useTrainingAlert(sample.attrs.training);

  const hasGroup = !!sample.attrs[groupAttr().id];

  const canopySpecies = sample.occurrences.filter(byGrid('canopy-grid'));
  const groundSpecies = sample.occurrences.filter(byGrid('ground-layer-grid'));
  const hasSpecies = !!canopySpecies.length || !!groundSpecies.length;
  const hasAbundanceType = !!sample.attrs[abundanceAttr.id];

  const recordAttrs = { record: sample.attrs, isDisabled };

  return (
    <Main>
      {isDisabled && (
        <UploadedRecordInfoMessage
          sampleId={sample.id}
          groupId={sample.attrs.groupId}
        />
      )}

      {isDisabled && (
        <Button
          onPress={onShare}
          prefix={<IonIcon icon={shareSocialOutline} className="size-6" />}
          color="primary"
          className="mx-auto my-4"
        >
          Share
        </Button>
      )}

      <IonList lines="full">
        <div className="rounded-list">
          <MenuDateAttr model={sample} />
          <Block block={groupAttr(sample.attrs)} {...recordAttrs} />
          <Block block={plotGroupAttr()} {...recordAttrs} />
          <Block
            record={sample.attrs}
            block={locationAttr(sample.attrs)}
            isDisabled={isDisabled || !hasGroup}
          />
        </div>

        <h3 className="list-title">Species</h3>
        <div className="rounded-list">
          <Block
            record={sample.attrs}
            block={abundanceAttr}
            isDisabled={isDisabled || hasSpecies}
          />
          <IonItem
            routerLink={
              hasAbundanceType
                ? `${match.url}/canopy-grid/occurrences`
                : undefined
            }
            className={clsx(!hasAbundanceType && 'opacity-60')}
          >
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Canopy species</IonLabel>
            <IonLabel slot="end">{canopySpecies.length}</IonLabel>
          </IonItem>
          <IonItem
            routerLink={
              hasAbundanceType
                ? `${match.url}/ground-layer-grid/occurrences`
                : undefined
            }
            className={clsx(!hasAbundanceType && 'opacity-60')}
          >
            <IonIcon src={flowerIcon} slot="start" />
            <IonLabel>Ground species</IonLabel>
            <IonLabel slot="end">{groundSpecies.length}</IonLabel>
          </IonItem>
          <Block block={speciesCommentsAttr} {...recordAttrs} />
        </div>

        <h3 className="list-title">Other</h3>
        <div className="rounded-list">
          <IonItem routerLink={`${match.url}/management`} detail>
            <IonIcon src={listOutline} slot="start" />
            <IonLabel>Management</IonLabel>
          </IonItem>
          <IonItem routerLink={`${match.url}/habitat`} detail>
            <IonIcon src={listOutline} slot="start" />
            <IonLabel>Habitat</IonLabel>
          </IonItem>
          <IonItem routerLink={`${match.url}/vegetation`} detail>
            <IonIcon src={listOutline} slot="start" />
            <IonLabel>Vegetation</IonLabel>
          </IonItem>
          <IonItem routerLink={`${match.url}/miscellaneous`} detail>
            <IonIcon src={listOutline} slot="start" />
            <IonLabel>Miscellaneous</IonLabel>
          </IonItem>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MainComponent);
