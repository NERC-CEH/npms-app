/* eslint-disable no-return-assign, no-param-reassign */
import { observer } from 'mobx-react';
import { Header, Main, Page, Block } from 'common/flumens';
import Sample from 'common/models/sample';
import { recorderAttr } from 'Survey/common/config';
import {
  algaeRecordedAttr,
  bryophytesRecordedAttr,
  fungiRecordedAttr,
  lichensRecordedAttr,
  partialSampleAttr,
} from './config';

type Props = { sample: Sample };

const Miscellaneous = ({ sample }: Props) => {
  const recordAttrs = { record: sample.attrs, isDisabled: sample.isDisabled() };

  return (
    <Page id="standard-management">
      <Header title="Miscellaneous" />
      <Main>
        <div className="rounded-list m-2">
          <Block block={partialSampleAttr} {...recordAttrs} />
          <Block block={bryophytesRecordedAttr} {...recordAttrs} />
          <Block block={lichensRecordedAttr} {...recordAttrs} />
          <Block block={fungiRecordedAttr} {...recordAttrs} />
          <Block block={algaeRecordedAttr} {...recordAttrs} />
          <Block block={recorderAttr} {...recordAttrs} />
        </div>
      </Main>
    </Page>
  );
};

export default observer(Miscellaneous);
