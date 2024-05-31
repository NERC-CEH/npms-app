import { useContext } from 'react';
import { Page, Main } from '@flumens';
import { IonActionSheet, NavContext } from '@ionic/react';
import userModel from 'common/models/user';
import backgroundImage from '../../User/Portal/mike-erskine-6LJqVhPtjEU-unsplash.jpg';
import FancyButton from './FancyButton';
import npmsLogo from './npmsLogo.png';
import ppLogo from './ppLogo.png';
import npmsSurveyIcon from './strandingIcon.svg';
import './styles.scss';
import standardSurveyIcon from './transectIcon.svg';

const LandingPage = () => {
  const isPlantPortal = userModel.isPlantPortal();
  const logo = isPlantPortal ? ppLogo : npmsLogo;

  const { navigate } = useContext(NavContext);

  return (
    <Page id="home-landing">
      <Main className="[--padding-top:0]">
        <img
          src={backgroundImage}
          alt=""
          className="absolute -z-10 h-full w-full object-cover"
        />
        <div className="bg-white">
          <img
            src={logo}
            alt="app logo"
            className="z-10 mx-auto my-0 block p-6 text-black"
          />
        </div>

        <div className="absolute bottom-[10vh] flex w-full flex-col items-center gap-2.5">
          {isPlantPortal && (
            <>
              <FancyButton
                onClick={() => navigate('/survey/standard')}
                label="Standard Survey"
                description="For custom monitoring projects"
                icon={standardSurveyIcon}
              />

              <>
                <FancyButton
                  id="open-action-sheet"
                  label="NPMS+ Survey"
                  description="For long-term monitoring"
                  icon={npmsSurveyIcon}
                />
                <IonActionSheet
                  trigger="open-action-sheet"
                  header="Survey level"
                  buttons={[
                    {
                      text: 'Wildflower',
                      handler: () =>
                        navigate('/survey/npmsPlus?level=wildflower'),
                    },
                    {
                      text: 'Indicator',
                      handler: () =>
                        navigate('/survey/npmsPlus?level=indicator'),
                    },
                    {
                      text: 'Inventory',
                      handler: () =>
                        navigate('/survey/npmsPlus?level=inventory'),
                    },
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      data: {
                        action: 'cancel',
                      },
                    },
                  ]}
                />
              </>
            </>
          )}

          {!isPlantPortal && (
            <>
              <FancyButton
                id="open-action-sheet"
                label="NPMS Survey"
                description="Record plant populations"
                icon={npmsSurveyIcon}
              />
              <IonActionSheet
                trigger="open-action-sheet"
                header="Survey level"
                buttons={[
                  {
                    text: 'Wildflower',
                    handler: () => navigate('/survey/npms?level=wildflower'),
                  },
                  {
                    text: 'Indicator',
                    handler: () => navigate('/survey/npms?level=indicator'),
                  },
                  {
                    text: 'Inventory',
                    handler: () => navigate('/survey/npms?level=inventory'),
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                      action: 'cancel',
                    },
                  },
                ]}
              />
            </>
          )}
        </div>
      </Main>
    </Page>
  );
};

export default LandingPage;
