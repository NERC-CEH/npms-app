/* eslint-disable no-return-assign, no-param-reassign */
import { observer } from 'mobx-react';
import { IonList } from '@ionic/react';
import {
  Header,
  Main,
  MenuAttrItemFromModel,
  Page,
  TextInput,
} from 'common/flumens';
import Sample from 'common/models/sample';

type Props = { sample: Sample };

const Habitat = ({ sample }: Props) => {
  const isDisabled = sample.isDisabled();

  return (
    <Page id="standard-habitat">
      <Header title="Habitat" />
      <Main>
        <IonList lines="full">
          <div className="rounded-list">
            <MenuAttrItemFromModel model={sample} attr="community" />
            <MenuAttrItemFromModel model={sample} attr="woodCover" />
            <TextInput
              value={sample.attrs.habitatDescription}
              label="Habitat description"
              labelPlacement="floating"
              onChange={(newVal: string) =>
                (sample.attrs.habitatDescription = newVal)
              }
              platform="ios"
              isMultiline
              isDisabled={isDisabled}
            />
          </div>
        </IonList>
      </Main>
    </Page>
  );
};

export default observer(Habitat);
