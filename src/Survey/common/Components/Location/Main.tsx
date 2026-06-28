import { Fragment } from 'react';
import clsx from 'clsx';
import { checkmarkOutline } from 'ionicons/icons';
import { IonIcon, IonRefresher, IonRefresherContent } from '@ionic/react';
import config from 'common/config';
import { InfoBackgroundMessage, Main } from 'common/flumens';
import locations, { bySurvey } from 'common/models/collections/locations';
import LocationModel from 'common/models/location';
import { Survey, byGroup } from 'Survey/common/config';

const byPlotGroup = (plotGroup?: string) => (loc: LocationModel) =>
  plotGroup ? (loc.data.plotGroupIdsAndNamesForPlot as any)?.[plotGroup] : true;

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
      data: { parentName, myPlotLabel, name, locationTypeTerm },
    }: LocationModel) => {
      let squareDivider;
      if (parentName && !squareDividers.has(parentName)) {
        squareDividers.add(parentName);
        squareDivider = (
          <div className="bg-white sticky top-2 z-10 rounded-md! border border-neutral-300 overflow-hidden">
            <div className="list-divider flex w-full justify-between">
              <div className="text-base">{parentName}</div>

              {isNPMS && (
                <a
                  href={`${config.backend.npmsUrl}/sites/default/files/PDF/squares/${parentName}.pdf`}
                  className="rounded-md border border-solid border-neutral-300 bg-white! px-2 py-1 text-center font-medium!"
                >
                  Map PDF
                </a>
              )}
            </div>
          </div>
        );
      }

      const isSelected = value === id;

      return (
        <Fragment key={id}>
          {squareDivider}

          <div
            onClick={() => onSelect(id)}
            className={clsx(
              'relative h-16 rounded-md border border-solid bg-white [--border-style:none] flex w-full items-center justify-start gap-4 p-3',
              isSelected
                ? 'border-(--form-value-color) text-(--form-value-color)'
                : 'border-neutral-200'
            )}
          >
            <div className="flex w-full flex-col gap-1 py-1">
              <div className="line-clamp-2 font-semibold">
                {!!myPlotLabel && `${myPlotLabel}:`} {name}
              </div>
              <span className="line-clamp-1 text-sm">{locationTypeTerm}</span>
            </div>

            {isSelected && (
              <div className="flex flex-col items-end justify-between gap-3">
                <IonIcon src={checkmarkOutline} className="size-6" />
              </div>
            )}
          </div>
        </Fragment>
      );
    };

    return (
      <div className="m-2 flex flex-col gap-2">
        {surveyLocations.map(getItem)}
      </div>
    );
  };

  return (
    <Main className="[--padding-top:0] [--padding-bottom:50px]">
      <IonRefresher slot="fixed" onIonRefresh={refreshGroups}>
        <IonRefresherContent />
      </IonRefresher>

      {getLocationItems()}
    </Main>
  );
};

export default SurveyLocationMain;
