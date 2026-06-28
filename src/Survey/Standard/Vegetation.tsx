import { observer } from 'mobx-react';
import { Block, Header, Main, Page } from 'common/flumens';
import Sample from 'common/models/sample';
import {
  vegetationHeight1Attr,
  vegetationHeight2Attr,
  vegetationHeight3Attr,
  vegetationHeight4Attr,
  vegetationHeight5Attr,
  vegetationHeightAverageAttr,
  vegetationHeightComment,
} from './config';

type Props = { sample: Sample };

const Vegetation = ({ sample }: Props) => {
  const recordAttrs = { record: sample.data, isDisabled: sample.isDisabled };

  return (
    <Page id="standard-habitat">
      <Header title="Vegetation" />
      <Main className="[--padding-bottom:50px]">
        <div className="rounded-list m-2">
          <Block block={vegetationHeight1Attr} {...recordAttrs} />
          <Block block={vegetationHeight2Attr} {...recordAttrs} />
          <Block block={vegetationHeight3Attr} {...recordAttrs} />
          <Block block={vegetationHeight4Attr} {...recordAttrs} />
          <Block block={vegetationHeight5Attr} {...recordAttrs} />
          <Block block={vegetationHeightAverageAttr} {...recordAttrs} />
          <Block block={vegetationHeightComment} {...recordAttrs} />
        </div>
      </Main>
    </Page>
  );
};

export default observer(Vegetation);
