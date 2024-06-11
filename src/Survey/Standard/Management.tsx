/* eslint-disable no-return-assign, no-param-reassign */
import { observer } from 'mobx-react';
import { listOutline } from 'ionicons/icons';
import { IonIcon, IonList } from '@ionic/react';
import {
  Header,
  Main,
  MenuAttrItemFromModel,
  NumberInput,
  Page,
  TextInput,
} from 'common/flumens';
import Sample from 'common/models/sample';

type Props = { sample: Sample };

const Management = ({ sample }: Props) => {
  const hasManagementOther = !!sample.attrs.management?.includes('Other');
  const hasGrazing = !!sample.attrs.grazing;
  const isDisabled = sample.isDisabled();

  return (
    <Page id="standard-management">
      <Header title="Management" />
      <Main>
        <IonList lines="full">
          <h3 className="list-title">Cover</h3>
          <div className="rounded-list">
            <MenuAttrItemFromModel model={sample} attr="soil" />
            <MenuAttrItemFromModel model={sample} attr="rock" />
            <MenuAttrItemFromModel model={sample} attr="litter" />
            <MenuAttrItemFromModel model={sample} attr="lichens" />
          </div>

          <h3 className="list-title">Other</h3>
          <div className="rounded-list">
            <MenuAttrItemFromModel model={sample} attr="management" />
            {hasManagementOther && (
              <TextInput
                value={sample.attrs.managementOther}
                prefix={<IonIcon src={listOutline} className="size-6" />}
                label="Other management"
                onChange={(newVal: string) =>
                  (sample.attrs.managementOther = newVal)
                }
                platform="ios"
                isDisabled={isDisabled}
              />
            )}
            <MenuAttrItemFromModel model={sample} attr="grazing" />
            {hasGrazing && (
              <TextInput
                value={sample.attrs.grazingAnimals}
                prefix={<IonIcon src={listOutline} className="size-6" />}
                label="Grazing animals"
                onChange={(newVal: string) =>
                  (sample.attrs.grazingAnimals = newVal)
                }
                platform="ios"
                isDisabled={isDisabled}
              />
            )}
            {hasGrazing && (
              <NumberInput
                label="Grazing animal numbers"
                prefix={<IonIcon src={listOutline} className="size-6" />}
                onChange={(value: any) =>
                  (sample.attrs.grazingAnimalsCount = value)
                }
                minValue={1}
                value={Number.parseInt(sample.attrs.grazingAnimalsCount, 10)}
                isDisabled={isDisabled}
              />
            )}
          </div>
        </IonList>
      </Main>
    </Page>
  );
};

export default observer(Management);
