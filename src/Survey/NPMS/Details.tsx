/* eslint-disable no-param-reassign */

/* eslint-disable no-return-assign */
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { Block, Header, Main, Page } from 'common/flumens';
import flowerIcon from 'common/images/flower.svg';
import { byGrid } from 'common/models/occurrence';
import Sample from 'common/models/sample';
import {
  MANAGEMENT_OTHER_VALUE,
  commentAttr,
  grazingAnimalsAttr,
  grazingAttr,
  lichensAttr,
  litterAttr,
  managementAttr,
  managementOtherAttr,
  recorderAttr,
  rockCoverAttr,
  soilAttr,
  woodCoverAttr,
} from 'Survey/common/config';
import {
  vegetation100Attr,
  vegetation10Attr,
  vegetation300Attr,
  vegetation300PlusAttr,
  vegetation30Attr,
} from './config';

type Props = { sample: Sample };

const Details = ({ sample }: Props) => {
  const match = useRouteMatch();

  const isInventory = sample.metadata.level === 'inventory';
  const isNPMSPlus = sample.getSurvey().name === 'npmsPlus';

  const additionalOccCount = sample.occurrences.filter(
    byGrid('additional-species-grid')
  ).length;

  const hasManagementOther = !!sample.attrs?.[managementAttr.id]?.includes(
    MANAGEMENT_OTHER_VALUE
  );
  const hasGrazing = !!sample.attrs[grazingAttr.id];

  const recordAttrs = { record: sample.attrs, isDisabled: sample.isDisabled() };

  return (
    <Page id="npms-details">
      <Header title="Plot info" />
      <Main>
        <IonList lines="full">
          <h3 className="list-title">Vegetation</h3>
          <div className="rounded-list">
            <Block block={vegetation10Attr} {...recordAttrs} />
            <Block block={vegetation30Attr} {...recordAttrs} />
            <Block block={vegetation100Attr} {...recordAttrs} />
            <Block block={vegetation300Attr} {...recordAttrs} />
            <Block block={vegetation300PlusAttr} {...recordAttrs} />
          </div>

          <h3 className="list-title">Cover</h3>
          <div className="rounded-list">
            <Block block={woodCoverAttr} {...recordAttrs} />
            <Block block={soilAttr} {...recordAttrs} />
            <Block block={rockCoverAttr} {...recordAttrs} />
            <Block block={litterAttr} {...recordAttrs} />
            <Block block={lichensAttr} {...recordAttrs} />
          </div>

          <h3 className="list-title">Other</h3>
          <div className="rounded-list">
            {isNPMSPlus && !isInventory && (
              <IonItem
                routerLink={`${match.url}/additional-species-grid/occurrences`}
              >
                <IonIcon src={flowerIcon} slot="start" />
                <IonLabel>Additional species</IonLabel>
                <IonLabel slot="end">{additionalOccCount}</IonLabel>
              </IonItem>
            )}

            <Block block={managementAttr} {...recordAttrs} />
            {hasManagementOther && (
              <Block block={managementOtherAttr} {...recordAttrs} />
            )}
            <Block block={grazingAttr} {...recordAttrs} />
            {hasGrazing && (
              <Block block={grazingAnimalsAttr} {...recordAttrs} />
            )}

            <Block block={commentAttr} {...recordAttrs} />
            <Block block={recorderAttr} {...recordAttrs} />
          </div>
        </IonList>
      </Main>
    </Page>
  );
};

export default observer(Details);
