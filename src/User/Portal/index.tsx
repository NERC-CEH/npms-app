import { ReactNode } from 'react';
import { chevronForward } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { Main, Page } from '@flumens';
import { IonIcon } from '@ionic/react';
import npmsIcon from 'common/images/npmsIcon.png';
import ppIcon from 'common/images/ppIcon.png';
import userModel from 'models/user';
import backgroundImage from './mike-erskine-6LJqVhPtjEU-unsplash.jpg';

type Props = { children: ReactNode };

const Portal = ({ children }: Props) => {
  const isLoggedIn = userModel.isLoggedIn();
  if (isLoggedIn) return children;

  return (
    <Page id="user-portal">
      <Main className="[--padding-bottom:0] [--padding-top:0]">
        <div className="relative h-full w-full bg-black/20">
          <img
            src={backgroundImage}
            className="absolute bottom-0 left-0 -z-10 h-full w-full object-cover"
          />
          <div className="z-10 flex h-full flex-col justify-between">
            <h1 className="m-0 mx-auto flex h-full w-full items-center justify-center pb-40 text-3xl text-white shadow-sm">
              Choose your portal
            </h1>

            <div className="bg-white">
              <div className="mx-auto flex w-full max-w-xl flex-col gap-4 p-4  py-10 font-bold">
                <Link
                  to="/user/login/npms"
                  className="flex items-center justify-between gap-3 rounded-xl border border-solid border-[#1D224C]/20 bg-[#BFC3E6]/30 p-1 !text-[#1D224C]"
                >
                  <div className="items flex w-full items-center justify-start gap-3">
                    <div className="list-avatar border border-solid border-white">
                      <img src={npmsIcon} />
                    </div>
                    NPMS
                  </div>
                  <IonIcon src={chevronForward} className="size-6" />
                </Link>

                <Link
                  to="/user/login/pp"
                  className="90 flex items-center justify-between gap-3 rounded-xl border border-solid
            border-[#002A1F]/20 bg-[#89FF5D]/20 p-1 !text-[#002A1F]"
                >
                  <div className="items flex w-full items-center justify-start gap-3">
                    <div className="list-avatar">
                      <img src={ppIcon} />
                    </div>
                    Plant Portal
                  </div>
                  <IonIcon src={chevronForward} className="size-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </Page>
  );
};

export default Portal;
