import { Button } from '@flumens';
import { IonIcon } from '@ionic/react';
import './styles.scss';

type Props = {
  onClick?: any;
  label: string;
  description?: string;
  icon: string;
  id?: string;
};

const FancyButton = ({ label, description, icon, ...otherProps }: Props) => (
  <Button
    className="mx-auto my-2.5 block h-fit w-full max-w-[calc(min(90vw,500px))] content-center overflow-hidden rounded-xl pl-6 pr-5 shadow-md"
    {...otherProps}
  >
    <div className="flex w-full items-center justify-between px-0 py-2 text-primary-900">
      <div className="flex flex-col text-left font-normal normal-case">
        <h4 className="m-0 font-bold">{label}</h4>
        {description && <span>{description}</span>}
      </div>

      <IonIcon
        src={icon}
        className="ml-2.5 size-12 rounded-md bg-[#FFF4D7] p-1.5"
      />
    </div>
  </Button>
);

export default FancyButton;
