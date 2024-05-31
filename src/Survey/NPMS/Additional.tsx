/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { listOutline } from 'ionicons/icons';
import { IonIcon, IonList } from '@ionic/react';
import {
  Header,
  Main,
  MenuAttrItemFromModel,
  Page,
  Select,
  TextInput,
} from 'common/flumens';
import Sample from 'common/models/sample';
import { vegetationValues } from './config';

type Props = { sample: Sample };

const Additional = ({ sample }: Props) => {
  const hasManagementOther = !!sample.attrs.management?.includes('Other');
  const hasGrazing = !!sample.attrs.grazing;
  const isDisabled = sample.isDisabled();

  return (
    <Page id="npms-additional">
      <Header title="Additional" />
      <Main>
        <IonList lines="full">
          <h3 className="list-title">Vegetation</h3>
          <div className="rounded-list">
            <Select
              options={vegetationValues}
              onChange={(vegetation: any) =>
                (sample.attrs.vegetation10 = vegetation)
              }
              value={sample.attrs.vegetation10}
              label="Under 10cm"
              prefix={<IonIcon src={listOutline} className="size-6" />}
              isDisabled={isDisabled}
            />
            <Select
              options={vegetationValues}
              onChange={(vegetation: any) =>
                (sample.attrs.vegetation30 = vegetation)
              }
              value={sample.attrs.vegetation30}
              label="11-30cm"
              prefix={<IonIcon src={listOutline} className="size-6" />}
              isDisabled={isDisabled}
            />
            <Select
              options={vegetationValues}
              onChange={(vegetation: any) =>
                (sample.attrs.vegetation100 = vegetation)
              }
              value={sample.attrs.vegetation100}
              label="31-100cm"
              prefix={<IonIcon src={listOutline} className="size-6" />}
              isDisabled={isDisabled}
            />
            <Select
              options={vegetationValues}
              onChange={(vegetation: any) =>
                (sample.attrs.vegetation300 = vegetation)
              }
              value={sample.attrs.vegetation300}
              label="101-300cm"
              prefix={<IonIcon src={listOutline} className="size-6" />}
              isDisabled={isDisabled}
            />
            <Select
              options={vegetationValues}
              onChange={(vegetation: any) =>
                (sample.attrs.vegetation300Plus = vegetation)
              }
              value={sample.attrs.vegetation300Plus}
              label="Over 300cm"
              prefix={<IonIcon src={listOutline} className="size-6" />}
              isDisabled={isDisabled}
            />
          </div>

          <h3 className="list-title">Cover</h3>
          <div className="rounded-list">
            <MenuAttrItemFromModel model={sample} attr="woodCover" />
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
              />
            )}

            <TextInput
              value={sample.attrs.comment}
              label="Comments"
              onChange={(newVal: string) => (sample.attrs.comment = newVal)}
              platform="ios"
              labelPlacement="floating"
              isMultiline
            />
          </div>
        </IonList>
      </Main>
    </Page>
  );
};

export default Additional;
