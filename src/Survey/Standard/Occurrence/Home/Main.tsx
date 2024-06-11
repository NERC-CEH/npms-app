import { observer } from 'mobx-react';
import { Main, NumberInput, RadioInput } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import { dominCoverValues } from 'Survey/NPMS/config';
import {
  AbundanceType,
  bbCoverValues,
  presenceCoverValues,
} from 'Survey/Standard/config';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';

type Props = {
  abundanceType: AbundanceType;
  occurrence: Occurrence;
  onCoverChange: any;
};

const OccurrenceHomeMain = ({
  abundanceType,
  occurrence,
  onCoverChange,
}: Props) => {
  const isDomin = abundanceType === 'Domin';
  const isPresence = abundanceType === 'Present/Absent';
  const isBB = abundanceType === 'Braun-Blanquet';
  const isPercentage = abundanceType === 'Percentage';
  const isFrequency = abundanceType === 'Cell frequency';
  const isCount = abundanceType === 'Individual plant count';

  return (
    <Main>
      <IonList>
        <h3 className="list-title">Photos</h3>
        <div className="rounded-list">
          <PhotoPicker model={occurrence} />
        </div>

        <h3 className="list-title">Species cover</h3>
        {isDomin && (
          <RadioInput
            options={dominCoverValues}
            onChange={onCoverChange('coverDomin')}
            value={occurrence.attrs.coverDomin}
          />
        )}

        {isBB && (
          <RadioInput
            options={bbCoverValues}
            onChange={onCoverChange('coverBB')}
            value={occurrence.attrs.coverBB}
          />
        )}

        {isPresence && (
          <RadioInput
            options={presenceCoverValues}
            onChange={onCoverChange('coverPresence')}
            value={occurrence.attrs.coverPresence}
          />
        )}

        {isPercentage && (
          <NumberInput
            label="Percentage"
            className="rounded-md"
            onChange={onCoverChange('coverPercentage')}
            minValue={1}
            maxValue={100}
            value={Number.parseInt(occurrence.attrs.coverPercentage, 10)}
          />
        )}

        {isFrequency && (
          <NumberInput
            label="Cell frequency"
            className="rounded-md"
            onChange={onCoverChange('coverFrequency')}
            minValue={0}
            maxValue={1}
            value={Number.parseInt(occurrence.attrs.coverFrequency, 10)}
          />
        )}

        {isCount && (
          <NumberInput
            label="Count"
            className="rounded-md"
            onChange={onCoverChange('coverCount')}
            minValue={1}
            maxValue={1000}
            value={Number.parseInt(occurrence.attrs.coverCount, 10)}
          />
        )}
      </IonList>
    </Main>
  );
};

export default observer(OccurrenceHomeMain);
