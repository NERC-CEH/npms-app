import { Main, Block } from '@flumens';
import { IonList } from '@ionic/react';
import Occurrence from 'models/occurrence';
import PhotoPicker from 'Survey/common/Components/PhotoPicker';
import { coverAttr } from 'Survey/common/config';

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
        <div className="-mx-3">
          <Block
            block={coverAttr}
            record={occurrence.attrs}
            isDisabled={occurrence.isDisabled()}
            onChange={onCoverChange}
          />
        </div>
      </IonList>
    </Main>
  );
};

export default OccurrenceHomeMain;
