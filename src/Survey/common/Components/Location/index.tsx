import { useContext } from 'react';
import { observer } from 'mobx-react';
import { NavContext } from '@ionic/react';
import {
  Button,
  Header,
  Page,
  useLoader,
  useToast,
  device,
} from 'common/flumens';
import locations from 'common/models/collections/locations';
import LocationModel from 'common/models/location';
import Sample from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import Main from './Main';

type Props = {
  sample: Sample;
};

const SurveyLocation = ({ sample }: Props) => {
  const toast = useToast();
  const loader = useLoader();
  const checkUserStatus = useUserStatusCheck();
  const navigation = useContext(NavContext);

  // eslint-disable-next-line
  locations.length; // to force refresh when locations list is updated

  const setLocation = (newLocationId: any) => {
    const byId = (location: LocationModel) => location.id === newLocationId;
    const location = locations.find(byId);
    if (!location) return;

    sample.attrs.locationId = location.id; // eslint-disable-line
    sample.attrs.enteredSref = location.attrs.centroidSref; // eslint-disable-line
    sample.attrs.enteredSrefSystem = location.attrs.centroidSrefSystem; // eslint-disable-line
    navigation.goBack();
  };

  const refreshGroups = async () => {
    console.log('Locations refreshing');

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    try {
      await loader.show('Please wait...');
      await locations.fetchRemote();
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  const refreshButton = (
    <Button
      onPress={refreshGroups}
      className="max-w-28 whitespace-nowrap px-4 py-1 text-base"
      fill="outline"
    >
      Refresh
    </Button>
  );

  return (
    <Page id="survey-location">
      <Header title="Plots" rightSlot={refreshButton} />
      <Main
        survey={sample.getSurvey().name}
        group={sample.attrs.groupId}
        plotGroup={sample.attrs.plotGroupId}
        onSelect={setLocation}
        onRefresh={refreshGroups}
        value={sample.attrs.locationId}
      />
    </Page>
  );
};

export default observer(SurveyLocation);
