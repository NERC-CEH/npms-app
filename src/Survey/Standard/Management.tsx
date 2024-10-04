/* eslint-disable no-return-assign, no-param-reassign */
import { observer } from 'mobx-react';
import { Header, Main, Page, Block, InfoMessage } from 'common/flumens';
import Sample from 'common/models/sample';
import {
  MANAGEMENT_OTHER_VALUE,
  grazingAnimalsAttr,
  grazingAttr,
  lichensAttr,
  litterAttr,
  managementAttr,
  managementOtherAttr,
  rockCoverAttr,
  soilAttr,
} from 'Survey/common/config';
import { grazingAnimalNumberAttr } from './config';

type Props = { sample: Sample };

const Management = ({ sample }: Props) => {
  const hasManagementOther = !!sample.attrs?.[managementAttr.id]?.includes(
    MANAGEMENT_OTHER_VALUE
  );
  const hasGrazing = !!sample.attrs[grazingAttr.id];

  const recordAttrs = { record: sample.attrs, isDisabled: sample.isDisabled() };

  return (
    <Page id="standard-management">
      <Header title="Management" />
      <Main>
        <div className="rounded-list m-2">
          <Block block={soilAttr} {...recordAttrs} />
          <Block block={rockCoverAttr} {...recordAttrs} />
          <Block block={lichensAttr} {...recordAttrs} />
          <Block block={litterAttr} {...recordAttrs} />
          <InfoMessage inline>Dead stems, leaves, twigs and wood</InfoMessage>
          <Block block={managementAttr} {...recordAttrs} />
          {hasManagementOther && (
            <Block block={managementOtherAttr} {...recordAttrs} />
          )}
          <Block block={grazingAttr} {...recordAttrs} />
          {hasGrazing && (
            <Block block={grazingAnimalNumberAttr} {...recordAttrs} />
          )}
          {hasGrazing && <Block block={grazingAnimalsAttr} {...recordAttrs} />}
        </div>
      </Main>
    </Page>
  );
};

export default observer(Management);
