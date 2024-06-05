import { Main, RadioInput } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import { dominCoverValues } from 'Survey/NPMS/config';
import { AbundanceType } from 'Survey/Standard/config';
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
            onChange={onCoverChange}
            value={occurrence.attrs.cover}
          />
        )}
      </IonList>
    </Main>
  );
};

export default OccurrenceHomeMain;
