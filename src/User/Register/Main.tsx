import { useState } from 'react';
import clsx from 'clsx';
import {
  keyOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
  mailOutline,
  homeOutline,
  businessOutline,
  flagOutline,
  shirtOutline,
} from 'ionicons/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans as T } from 'react-i18next';
import { TypeOf } from 'zod';
import { Main, Button } from '@flumens';
import { zodResolver } from '@hookform/resolvers/zod';
import { IonIcon, IonRouterLink } from '@ionic/react';
import config from 'common/config';
import { UserModel } from 'models/user';
import ControlledInput from '../common/Components/ControlledInput';
import ControlledSelect from '../common/Components/ControlledSelect';

type DetailsNPMS = TypeOf<typeof UserModel.registerSchemaNPMS>;
type DetailsPP = TypeOf<typeof UserModel.registerSchemaPP>;

type Props = {
  onSubmit: SubmitHandler<DetailsNPMS | DetailsPP>;
  isPlantPortal: boolean;
};

const RegisterMain = ({ onSubmit, isPlantPortal }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const { formState, handleSubmit, control } = useForm<DetailsNPMS | DetailsPP>(
    {
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',

        // npms
        indiciaAddress: '',
        indiciaTown: '',
        indiciaPostCode: '',
        indiciaCounty: '',
        indiciaCountry: '',
        indiciaOver18: '',
      },
      resolver: zodResolver(
        isPlantPortal
          ? UserModel.registerSchemaPP
          : UserModel.registerSchemaNPMS
      ),
    }
  );

  const url = isPlantPortal ? config.backend.ppUrl : config.backend.npmsUrl;
  const isNPMS = !isPlantPortal;

  return (
    <Main>
      <div className="mx-auto max-w-md px-3">
        <form className="mt-8">
          <div className="rounded-list">
            <ControlledInput
              control={control}
              name="firstName"
              prefix={<IonIcon icon={personOutline} className="size-5" />}
              placeholder="First Name"
            />
            <ControlledInput
              control={control}
              name="lastName"
              prefix={<IonIcon icon={personOutline} className="size-5" />}
              placeholder="Surname"
            />
            <ControlledInput
              control={control}
              name="email"
              prefix={<IonIcon icon={mailOutline} className="size-5" />}
              type="email"
              placeholder="Email"
            />
            <ControlledInput
              control={control}
              name="password"
              prefix={<IonIcon icon={keyOutline} className="size-5" />}
              suffix={
                <IonIcon
                  icon={showPassword ? eyeOutline : eyeOffOutline}
                  className="size-5 opacity-50"
                  onClick={togglePassword}
                />
              }
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />

            {isNPMS && (
              <ControlledInput
                control={control}
                name="indiciaAddress"
                prefix={<IonIcon icon={homeOutline} className="size-5" />}
                placeholder="Address"
              />
            )}
            {isNPMS && (
              <ControlledInput
                control={control}
                name="indiciaTown"
                prefix={<IonIcon icon={businessOutline} className="size-5" />}
                placeholder="Town"
              />
            )}
            {isNPMS && (
              <ControlledInput
                control={control}
                name="indiciaPostCode"
                prefix={<IonIcon icon={mailOutline} className="size-5" />}
                placeholder="Postcode"
              />
            )}
            {isNPMS && (
              <ControlledSelect
                control={control}
                name="indiciaCounty"
                prefix={<IonIcon icon={flagOutline} className="size-5" />}
                label="County"
                options={[
                  { value: 'Avon' },
                  { value: 'Bedfordshire' },
                  { value: 'Berkshire' },
                  { value: 'Buckinghamshire' },
                  { value: 'Cambridgeshire' },
                  { value: 'Cheshire' },
                  { value: 'Cleveland' },
                  { value: 'Cornwall' },
                  { value: 'Co. Durham' },
                  { value: 'Cumbria' },
                  { value: 'Derbyshire' },
                  { value: 'Devon' },
                  { value: 'Dorset' },
                  { value: 'Essex' },
                  { value: 'Gloucestershire' },
                  { value: 'Greater London' },
                  { value: 'Guernsey' },
                  { value: 'Hampshire' },
                  { value: 'Herefordshire' },
                  { value: 'Hertfordshire' },
                  { value: 'Isle of Man' },
                  { value: 'Isle of Wight' },
                  { value: 'Jersey' },
                  { value: 'Kent' },
                  { value: 'Lancashire' },
                  { value: 'Leicestershire' },
                  { value: 'Lincolnshire' },
                  { value: 'Merseyside' },
                  { value: 'Middlesex' },
                  { value: 'Norfolk' },
                  { value: 'North Humberside' },
                  { value: 'Northamptonshire' },
                  { value: 'Northumberland' },
                  { value: 'Nottinghamshire' },
                  { value: 'Oxfordshire' },
                  { value: 'Shropshire' },
                  { value: 'Somerset' },
                  { value: 'South Humberside' },
                  { value: 'Staffordshire' },
                  { value: 'Suffolk' },
                  { value: 'Surrey' },
                  { value: 'Sussex' },
                  { value: 'Tyne and Wear' },
                  { value: 'Warwickshire' },
                  { value: 'West Midlands' },
                  { value: 'Wiltshire' },
                  { value: 'Worcestershire' },
                  { value: 'Yorkshire' },
                  { value: 'Aberdeenshire' },
                  { value: 'Angus' },
                  { value: 'Argyll' },
                  { value: 'Ayrshire' },
                  { value: 'Banffshire' },
                  { value: 'Berwickshire' },
                  { value: 'Caithness' },
                  { value: 'Clackmannanshire' },
                  { value: 'Dumfriesshire' },
                  { value: 'Dunbartonshire' },
                  { value: 'Fife' },
                  { value: 'Inverness-shire' },
                  { value: 'Isle of Arran' },
                  { value: 'Isle of Barra' },
                  { value: 'Isle of Benbecula' },
                  { value: 'Isle of Bute' },
                  { value: 'Isle of Canna' },
                  { value: 'Isle of Coll' },
                  { value: 'Isle of Colonsay' },
                  { value: 'Isle of Cumbrae' },
                  { value: 'Isle of Eigg' },
                  { value: 'Isle of Gigha' },
                  { value: 'Isle of Harris' },
                  { value: 'Isle of Iona' },
                  { value: 'Isle of Islay' },
                  { value: 'Isle of Jura' },
                  { value: 'Isle of Lewis' },
                  { value: 'Isle of Mull' },
                  { value: 'Isle of North Uist' },
                  { value: 'Isle of Rum' },
                  { value: 'Isle of Scalpay' },
                  { value: 'Isle of Skye' },
                  { value: 'Isle of South Uist' },
                  { value: 'Isle of Tiree' },
                  { value: 'Kincardineshire' },
                  { value: 'Kinross-shire' },
                  { value: 'Kirkcudbrightshire' },
                  { value: 'Lanarkshire' },
                  { value: 'Lothian' },
                  { value: 'Morayshire' },
                  { value: 'Nairnshire' },
                  { value: 'Orkney' },
                  { value: 'Peeblesshire' },
                  { value: 'Perthshire' },
                  { value: 'Renfrewshire' },
                  { value: 'Ross-shire' },
                  { value: 'Roxburghshire' },
                  { value: 'Rutland' },
                  { value: 'Selkirkshire' },
                  { value: 'Shetland' },
                  { value: 'Stirlingshire' },
                  { value: 'Sutherland' },
                  { value: 'Western Isles' },
                  { value: 'Wigtownshire' },
                  { value: 'Blaenau Gwent' },
                  { value: 'Bridgend' },
                  { value: 'Caerphilly' },
                  { value: 'Cardiff' },
                  { value: 'Carmarthenshire' },
                  { value: 'Ceredigion' },
                  { value: 'Clwyd' },
                  { value: 'Conwy' },
                  { value: 'Denbighshire' },
                  { value: 'Dyfed' },
                  { value: 'Flintshire' },
                  { value: 'Glamorgan' },
                  { value: 'Gwent' },
                  { value: 'Gwynedd' },
                  { value: 'Isle of Anglesey' },
                  { value: 'Merthyr Tydfil' },
                  { value: 'Monmouthshire' },
                  { value: 'Neath Port Talbot' },
                  { value: 'Newport' },
                  { value: 'Pembrokeshire' },
                  { value: 'Powys' },
                  { value: 'Rhondda Cynon Taf' },
                  { value: 'Swansea' },
                  { value: 'Torfaen' },
                  { value: 'Vale of Glamorgan' },
                  { value: 'Wrexham' },
                  { value: 'Co. Antrim' },
                  { value: 'Co. Armagh' },
                  { value: 'Co. Down' },
                  { value: 'Co. Fermanagh' },
                  { value: 'Co. Londonderry' },
                  { value: 'Co. Tyrone' },
                ]}
              />
            )}
            {isNPMS && (
              <ControlledSelect
                control={control}
                name="indiciaCountry"
                prefix={<IonIcon icon={flagOutline} className="size-5" />}
                label="Country"
                options={[
                  { value: 'England' },
                  { value: 'Scotland' },
                  { value: 'Wales' },
                  { value: 'N. Ireland' },
                ]}
              />
            )}
            {isNPMS && (
              <ControlledSelect
                control={control}
                name="indiciaOver18"
                prefix={<IonIcon icon={shirtOutline} className="size-5" />}
                label="I am you over 18"
                options={[
                  { value: '1', label: 'Yes' },
                  { value: '0', label: 'No' },
                ]}
              />
            )}
          </div>

          <div className="mt-4 px-5 text-sm">
            <T>I agree to</T>{' '}
            <IonRouterLink href={`${url}/privacy-policy`}>
              <T>Privacy Policy</T>
            </IonRouterLink>{' '}
            <T>and</T>{' '}
            <IonRouterLink href={`${url}/terms-and-conditions`}>
              <T>Terms and Conditions</T>
            </IonRouterLink>
          </div>

          <Button
            className={clsx('mx-auto mt-8', !formState.isValid && 'opacity-50')}
            color="primary"
            onPress={() => handleSubmit(onSubmit)()}
          >
            Register
          </Button>
        </form>
      </div>
    </Main>
  );
};

export default RegisterMain;
