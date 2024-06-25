/* eslint-disable no-return-assign, no-param-reassign */
import { observer } from 'mobx-react';
import { Block, Header, Main, Page } from 'common/flumens';
import Sample from 'common/models/sample';
import { woodCoverAttr } from 'Survey/common/config';
import { communityAttr, habitatDescriptionAttr } from './config';

type Props = { sample: Sample };

const Habitat = ({ sample }: Props) => {
  const recordAttrs = { record: sample.attrs, isDisabled: sample.isDisabled() };

  return (
    <Page id="standard-habitat">
      <Header title="Habitat" />
      <Main>
        <div className="rounded-list m-2">
          <Block block={communityAttr} {...recordAttrs} />
          <Block block={woodCoverAttr} {...recordAttrs} />
          <Block block={habitatDescriptionAttr} {...recordAttrs} />
        </div>
      </Main>
    </Page>
  );
};

export default observer(Habitat);
