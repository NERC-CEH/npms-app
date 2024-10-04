import { observer } from 'mobx-react';
import { Capacitor } from '@capacitor/core';
import { Gallery, PhotoPicker, captureImage, useAlert } from '@flumens';
import { isPlatform } from '@ionic/react';
import config from 'common/config';
import Media from 'models/image';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import './styles.scss';

type Props = {
  model: Sample | Occurrence;
};

type GalleryProps = {
  items: Media[];
  showGallery: number;
  onClose: () => void;
};

const GalleryDefaultWrap = observer(
  ({ items: itemsProp, showGallery, ...props }: GalleryProps) => {
    const alert = useAlert();
    const getItem = (image: Media) => {
      const { caption } = image.attrs;

      const onCaptionChange = () => {
        if (image.isDisabled()) return;
        alert({
          header: 'Edit',
          skipTranslation: true,
          message: '',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Save',
              handler(values) {
                const newValue = values[0] || '';
                // eslint-disable-next-line no-param-reassign
                image.attrs.caption = newValue;
              },
            },
          ],
          inputs: [
            {
              type: 'textarea',
              placeholder: 'Enter your caption here...',
              value: caption,
            },
          ],
        });
      };

      return {
        src: 'getURL' in image ? image.getURL() : (image as any).data!,
        footer: (
          <div
            onClick={onCaptionChange}
            className="w-full rounded-md bg-white/10 p-1 text-white"
          >
            {caption || 'Photo caption...'}
          </div>
        ),
      };
    };

    return (
      <Gallery
        isOpen={Number.isFinite(showGallery)}
        items={itemsProp.map(getItem)}
        initialSlide={showGallery}
        {...props}
      />
    );
  }
);

const AppPhotoPicker = ({ model }: Props) => {
  const isUploaded = model.isUploaded();

  async function onAdd(shouldUseCamera: boolean) {
    const images = await captureImage(
      shouldUseCamera ? { camera: true } : { multiple: true }
    );
    if (!images.length) return;

    const getImageModel = async (image: any) => {
      const imageModel: any = await Media.getImageModel(
        isPlatform('hybrid') ? Capacitor.convertFileSrc(image) : image,
        config.dataPath,
        true
      );

      return imageModel;
    };

    const imageModels: Media[] = await Promise.all<any>(
      images.map(getImageModel)
    );

    model.media.push(...imageModels);
    model.save();
  }

  const onRemove = (m: any) => m.destroy();

  return (
    <PhotoPicker
      onAdd={onAdd}
      onRemove={onRemove}
      value={model.media}
      isDisabled={isUploaded}
      Gallery={GalleryDefaultWrap}
    />
  );
};

export default observer(AppPhotoPicker);
