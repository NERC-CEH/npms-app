import { useState } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { arrowForward } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Main, Page } from '@flumens';
import { IonButtons, IonFooter, IonIcon, IonToolbar } from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import appModel from 'models/app';
import './styles.scss';
import slide1 from './welcome1.jpg';
import slide2 from './welcome2.jpg';
import slide3 from './welcome3.jpg';
import slide4 from './welcome4.jpg';

const Onboarding = ({ children }: any) => {
  const [moreSlidesExist, setMoreSlidesExist] = useState(true);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>();

  const handleSlideChangeStart = async () => {
    const isEnd = controlledSwiper && controlledSwiper.isEnd;
    setMoreSlidesExist(!isEnd);
  };

  function exit() {
    console.log('Info:Welcome:Controller: exit.');
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }

  const slideNextOrClose = () => {
    if (moreSlidesExist) {
      controlledSwiper && controlledSwiper.slideNext();
      return;
    }

    exit();
  };

  const { showedWelcome } = appModel.attrs;
  if (showedWelcome) return children;

  return (
    <Page
      id="welcome"
      className="bg-[linear-gradient(210deg,#e0f9da_49.37%,#f8fff3_86.34%)]"
    >
      <Main
        scrollY={false}
        className="[--background:transparent] [--padding-top:0]"
      >
        <Swiper
          onSwiper={setControlledSwiper}
          modules={[Pagination]}
          pagination={{
            el: '.pagination-container',
          }}
          onSlideChange={handleSlideChangeStart}
        >
          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide1} alt="" />
              <img src={slide1} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5 mt-0">
                <T>
                  Welcome to the <b>NPMS/Plant Portal</b> app!
                </T>
              </h1>
              <p>
                <T>
                  We look forward to supporting you on your plant surveying
                  journey...
                </T>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide2} alt="" />
              <img src={slide2} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5 mt-0">
                <T>National or local monitoring?</T>
              </h1>
              <p>
                <T>
                  This app supports both registered NPMS volunteers and local
                  uses of the Plant Portal website.
                </T>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide3} alt="" />
              <img src={slide3} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5 mt-0">
                <T>Don’t forget to sign-up!</T>
              </h1>
              <p>
                <T>
                  You’ll either need an{' '}
                  <a href="https://www.npms.org.uk" className="underline">
                    NPMS
                  </a>{' '}
                  website account and allocated squares to use this app…
                </T>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide4} alt="" />
              <img src={slide4} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5 mt-0">
                <T>Don’t forget to sign-up!</T>
              </h1>
              <p>
                <T>
                  …or an account and project(s) registered with the{' '}
                  <a href="https://plantportal.ceh.ac.uk" className="underline">
                    Plant Portal
                  </a>{' '}
                  website.
                </T>
              </p>
              <p className="mt-4" />
            </div>
          </SwiperSlide>
        </Swiper>
      </Main>

      <IonFooter className="ion-no-border">
        <IonToolbar className="[--background:transparent]">
          <div className="pagination-container mx-5" />
          <IonButtons slot="end">
            <button
              onClick={slideNextOrClose}
              className={clsx(
                '!m-3 flex h-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary-800/30',
                moreSlidesExist && 'w-12'
              )}
            >
              {!moreSlidesExist ? (
                <span className="px-5 font-bold">
                  <T>Get started</T>
                </span>
              ) : (
                <IonIcon slot="icon-only" icon={arrowForward} />
              )}
            </button>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </Page>
  );
};

export default observer(Onboarding);
