import { observer } from 'mobx-react';
import { cameraOutline } from 'ionicons/icons';
import { useRouteMatch } from 'react-router';
import { Badge, Main, usePromptImageSource } from '@flumens';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonList,
  IonIcon,
} from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import Occurrence from 'common/models/occurrence';
import Sample from 'models/sample';

type Props = {
  sample: Sample;
  onDelete: any;
  onAddPhoto: any;
};

const OccurrenceListMain = ({ sample, onDelete, onAddPhoto }: Props) => {
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

    return (
      <IonItemSliding disabled={occ.isDisabled()} key={occ.cid}>
        <IonItem
          detail={false}
          routerLink={`${match.url}/${occ.cid}`}
          className="[--inner-padding-end:0px] [--padding-start:0px]"
        >
          <div className="flex w-full items-center gap-2 px-1">
            <div className="list-avatar">
              {image ? (
                <img src={image.getURL()} alt="" />
              ) : (
                <IonIcon
                  src={cameraOutline}
                  className="size-6 opacity-70"
                  onClick={onAddPhotoWrap}
                />
              )}
            </div>

            <div className="flex w-full flex-col overflow-hidden p-1">
              <div className="font-semibold">
                {occ.attrs.taxon.commonNames[0]}
              </div>
              <div className="italic">{occ.attrs.taxon.scientificName}</div>

              {!image && (
                <Badge color="warning" className="mt-2">
                  Provide a photo to aid ID
                </Badge>
              )}
            </div>

            <div className="w-fit max-w-20 shrink-0 p-2 text-sm">
              {!occ.attrs.cover ? (
                <Badge color="danger" className="whitespace-normal">
                  Cover missing
                </Badge>
              ) : (
                occ.attrs.cover
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

  const hasSpecies = !!sample.occurrences.length;

  return (
    <Main>
      {hasSpecies && (
        <IonList>
          <div className="rounded-list">{sample.occurrences.map(getItem)}</div>
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
