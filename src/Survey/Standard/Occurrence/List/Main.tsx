import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router';
import { Badge, Main } from '@flumens';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonList,
  IonIcon,
} from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import flower from 'common/images/flower.svg';
import Occurrence, { Grid, byGrid } from 'common/models/occurrence';
import Sample from 'models/sample';
import { getCover } from 'Survey/Standard/config';

type Props = {
  sample: Sample;
  onDelete: any;

  grid: Grid;
};

const OccurrenceListMain = ({ sample, onDelete, grid }: Props) => {
  const match = useRouteMatch();

  const getItem = (occ: Occurrence) => {
    const onDeleteWrap = () => onDelete(occ);

    const [image] = occ.media;

    const isCoverPresent = Number.isFinite(getCover(occ)) || !!getCover(occ);

    const taxonDifficulty = occ.attrs.taxonDifficulty || 0;

    return (
      <IonItemSliding disabled={occ.isDisabled()} key={occ.cid}>
        <IonItem
          detail={false}
          routerLink={`${match.url}/${occ.cid}`}
          className="[--inner-padding-end:0px] [--padding-start:0px]"
        >
          <div className="flex w-full items-center gap-2 px-1">
            <div className="list-avatar my-1">
              {image ? (
                <img
                  src={image.getURL()}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <IonIcon src={flower} className="size-6 opacity-70" />
              )}
            </div>

            <div className="flex w-full flex-col overflow-hidden p-1">
              <div className="font-semibold">{occ.attrs.defaultCommonName}</div>
              <div className="italic">{occ.attrs.preferredTaxon}</div>

              {!image && taxonDifficulty > 1 && !sample.isDisabled() && (
                <Badge color="warning" className="mt-2">
                  Provide a photo to aid ID
                </Badge>
              )}
            </div>

            <div className="w-fit max-w-20 shrink-0 p-2 text-sm">
              {!isCoverPresent ? (
                <Badge color="danger" className="whitespace-normal">
                  Cover missing
                </Badge>
              ) : (
                getCover(occ)
              )}
            </div>
          </div>
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption color="danger" onClick={onDeleteWrap}>
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    );
  };

  const gridSpecies = sample.occurrences.filter(byGrid(grid));
  const hasSpecies = !!gridSpecies.length;

  return (
    <Main>
      {hasSpecies && (
        <IonList>
          <div className="rounded-list">{gridSpecies.map(getItem)}</div>
        </IonList>
      )}

      {!hasSpecies && (
        <InfoBackgroundMessage>
          Your species list is empty. <br /> tap the orange Add button to add
          one.
        </InfoBackgroundMessage>
      )}
    </Main>
  );
};

export default observer(OccurrenceListMain);
