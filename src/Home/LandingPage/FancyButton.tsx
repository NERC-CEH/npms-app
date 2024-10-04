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
  <button
    className="items-center justify-center gap-4 px-6 py-3 text-base text-center transition bg-white data-[hovered=true]:bg-neutral-100 data-[pressed=true]:bg-neutral-200 ring-0 outline-none data-[focus-visible]:z-10 data-[focus-visible]:transition-[outline] data-[focus-visible]:duration-150 data-[focus-visible]:outline-offset-0 data-[focus-visible]:outline-neutral-500 data-[focus-visible]:shadow-md border-solid border hover:border-neutral-400 border-neutral-300 mx-auto my-2.5 block h-fit w-full max-w-[calc(min(90vw,500px))] content-center overflow-hidden rounded-xl pl-6 pr-5 shadow-md"
    {...otherProps}
  >
    <div className="flex w-full items-center justify-between px-0 py-2 text-primary-900">
      <div className="flex flex-col text-left font-normal normal-case">
        <h4 className="m-0 font-bold">{label}</h4>
        {description && <span>{description}</span>}
      </div>

      <IonIcon
        src={icon}
        className="sh ml-2.5 size-12 shrink-0 rounded-md bg-[#FFF4D7] p-1.5"
      />
    </div>
  </button>
);

export default FancyButton;
