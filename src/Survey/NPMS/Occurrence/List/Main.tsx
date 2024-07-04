import { observer } from 'mobx-react';
import { cameraOutline } from 'ionicons/icons';
import { useRouteMatch } from 'react-router';
import { Badge, Main, usePromptImageSource } from '@flumens';
import { Choice } from '@flumens/tailwind/dist/Survey';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonList,
  IonIcon,
} from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import Occurrence, { Grid, byGrid } from 'common/models/occurrence';
import Sample from 'models/sample';
import { coverAttr } from 'Survey/common/config';

type Props = {
  sample: Sample;
  onDelete: any;
  onAddPhoto: any;
  grid: Grid;
};

const OccurrenceListMain = ({ sample, onDelete, onAddPhoto, grid }: Props) => {
  const match = useRouteMatch();
  const promptImageSource = usePromptImageSource();

  const getItem = (occ: Occurrence) => {
    const onDeleteWrap = () => onDelete(occ);
    const onAddPhotoWrap = async (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (sample.isDisabled()) return;

      const shouldUseCamera = await promptImageSource();
      const cancelled = shouldUseCamera === null;
      if (cancelled) return;

      onAddPhoto(occ, shouldUseCamera);
    };

    const [image] = occ.media;

    const findLabel = (choices: Choice[], val: any) => {
      const byValue = (choice: Choice) => choice.data_name === val;
      return choices.find(byValue)?.title;
    };
    const cover = findLabel(coverAttr.choices, occ.attrs[coverAttr.id]);

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
                <IonIcon
                  src={cameraOutline}
                  className="size-6 opacity-70"
                  onClick={onAddPhotoWrap}
                />
              )}
            </div>

            <div className="flex w-full flex-col overflow-hidden p-1">
              <div className="font-semibold">{occ.attrs.defaultCommonName}</div>
              <div className="italic">{occ.attrs.preferredTaxon}</div>

              {!image && !sample.isDisabled() && (
                <Badge color="warning" className="mt-2">
                  Provide a photo to aid ID
                </Badge>
              )}
            </div>

            <div className="w-fit max-w-20 shrink-0 p-2 text-sm">
              {!cover ? (
                <Badge color="danger" className="whitespace-normal">
                  Cover missing
                </Badge>
              ) : (
                cover
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
