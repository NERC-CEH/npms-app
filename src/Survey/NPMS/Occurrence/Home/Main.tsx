import { Main, RadioInput } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';
import { dominCoverValues } from 'Survey/common/config';

type Props = {
  occurrence: Occurrence;
  onCoverChange: any;
};

const OccurrenceHomeMain = ({ occurrence, onCoverChange }: Props) => {
  return (
    <Main>
      <IonList>
        <h3 className="list-title">Photos</h3>
        <div className="rounded-list">
          <PhotoPicker model={occurrence} />
        </div>

        <h3 className="list-title">Species cover</h3>
        <RadioInput
          options={dominCoverValues}
          onChange={onCoverChange}
          value={occurrence.attrs.cover}
        />
      </IonList>
    </Main>
  );
};

export default OccurrenceHomeMain;
