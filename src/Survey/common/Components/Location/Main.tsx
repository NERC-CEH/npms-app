import { Fragment } from 'react';
import clsx from 'clsx';
import { checkmarkOutline } from 'ionicons/icons';
import {
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import config from 'common/config';
import { Button, InfoBackgroundMessage, Main } from 'common/flumens';
import locations, { bySurvey } from 'common/models/collections/locations';
import LocationModel from 'common/models/location';
import { Survey, byGroup } from 'Survey/common/config';

const byPlotGroup = (plotGroup?: string) => (loc: LocationModel) =>
  plotGroup
    ? (loc.attrs.plotGroupIdsAndNamesForPlot as any)?.[plotGroup]
    : true;

type Props = {
  survey: Survey['name'];
  onRefresh: any;
  onSelect: any;
  value: string;
  group?: string;
  plotGroup?: string;
};

const SurveyLocationMain = ({
  survey,
  group,
  plotGroup,
  value,
  onSelect,
  onRefresh,
}: Props) => {
  const isNPMS = survey === 'npms';

  const surveyLocations = locations
    .filter(bySurvey(survey))
    .filter(byGroup(group))
    .filter(byPlotGroup(plotGroup));

  const refreshGroups = async (e: any) => {
    e?.detail?.complete(); // refresh pull update
    onRefresh();
  };

  const getLocationItems = () => {
    if (!surveyLocations.length)
      return (
        <InfoBackgroundMessage>
          There are currently no plots available to select.
          <br />
          <br />
          Pull the page down to refresh the list.
        </InfoBackgroundMessage>
      );

    const squareDividers = new Set();

    const getItem = ({
      id,
      attrs: { parentName, myPlotLabel, name, locationTypeTerm },
    }: LocationModel) => {
      let squareDivider;
      if (parentName && !squareDividers.has(parentName)) {
        squareDividers.add(parentName);
        squareDivider = (
          <IonItemDivider
            className="rounded-md border border-solid border-neutral-300 !bg-[#ececec]"
            sticky
          >
            <div className="flex w-full justify-between py-1 text-black">
              <span className="text-base">{parentName}</span>

              {isNPMS && (
                <Button
                  href={`${config.backend.npmsUrl}/sites/default/files/PDF/squares/${parentName}.pdf`}
                  className="px-2 py-1 text-sm"
                >
                  Map PDF
                </Button>
              )}
            </div>
          </IonItemDivider>
        );
      }

      const isSelected = value === id;

      return (
        <Fragment key={id}>
          {squareDivider}

          <IonItem
            detail={false}
            onClick={() => onSelect(id)}
            className={clsx(
              'relative flex h-16 rounded-md border border-solid bg-white [--border-style:none]',
              isSelected
                ? 'border-[var(--form-value-color)] text-[var(--form-value-color)]'
                : 'border-neutral-200'
            )}
          >
            <div className="flex w-full items-center justify-start gap-4">
              <div className="flex w-full flex-col gap-1 py-1">
                <h4 className="line-clamp-2 font-semibold">
                  {!!myPlotLabel && `${myPlotLabel}:`} {name}
                </h4>
                <span className="line-clamp-1 text-sm">{locationTypeTerm}</span>
              </div>

              {isSelected && (
                <div className="flex flex-col items-end justify-between gap-3">
                  <IonIcon src={checkmarkOutline} className="size-6" />
                </div>
              )}
            </div>
          </IonItem>
        </Fragment>
      );
    };

    return (
      <IonList className="mt-2 flex flex-col gap-2">
        {surveyLocations.map(getItem)}
      </IonList>
    );
  };

  return (
    <Main className="[--padding-top:0]">
      <IonRefresher slot="fixed" onIonRefresh={refreshGroups}>
        <IonRefresherContent />
      </IonRefresher>

      {getLocationItems()}
    </Main>
  );
};

export default SurveyLocationMain;
