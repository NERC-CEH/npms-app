import { observer } from 'mobx-react';
import { Block, ChoiceValues, Main } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import {
  abundanceAttr,
  bbCoverAttr,
  countCoverAttr,
  dominCoverAttr,
  frequencyCoverAttr,
  percentageCoverAttr,
  presenceCoverAttr,
} from 'Survey/Standard/config';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';

type Props = {
  abundanceType: ChoiceValues<typeof abundanceAttr.choices>;
  occurrence: Occurrence;
  onCoverChange: any;
};

const OccurrenceHomeMain = ({
  abundanceType,
  occurrence,
  onCoverChange,
}: Props) => {
  const isDomin = abundanceType === '18881';
  const isBB = abundanceType === '18882';
  const isPercentage = abundanceType === '18883';
  const isCount = abundanceType === '18884';
  const isFrequency = abundanceType === '18885';
  const isPresence = abundanceType === '18892';

  const recordAttrs = {
    record: occurrence.attrs,
    isDisabled: occurrence.isDisabled(),
  };

  return (
    <Main>
      <IonList>
        <h3 className="list-title">Photos</h3>
        <div className="rounded-list">
          <PhotoPicker model={occurrence} />
        </div>
        <h3 className="list-title">Species cover</h3>
        {isDomin && (
          <div className="-mx-2">
            <Block
              onChange={onCoverChange(dominCoverAttr.id)}
              block={dominCoverAttr}
              {...recordAttrs}
            />
          </div>
        )}
        {isBB && (
          <div className="-mx-2">
            <Block
              onChange={onCoverChange(bbCoverAttr.id)}
              block={bbCoverAttr}
              {...recordAttrs}
            />
          </div>
        )}
        {isPresence && (
          <div className="-mx-2">
            <Block
              onChange={onCoverChange(presenceCoverAttr.id)}
              block={presenceCoverAttr}
              {...recordAttrs}
            />
          </div>
        )}
        {isPercentage && (
          <div className="rounded-list">
            <Block
              onChange={onCoverChange(percentageCoverAttr.id)}
              block={percentageCoverAttr}
              {...recordAttrs}
            />
          </div>
        )}
        {isFrequency && (
          <div className="rounded-list">
            <Block
              onChange={onCoverChange(frequencyCoverAttr.id)}
              block={frequencyCoverAttr}
              {...recordAttrs}
            />
          </div>
        )}
        {isCount && (
          <div className="rounded-list">
            <Block
              onChange={onCoverChange(countCoverAttr.id)}
              block={countCoverAttr}
              {...recordAttrs}
            />
          </div>
        )}
      </IonList>
    </Main>
  );
};

export default observer(OccurrenceHomeMain);
