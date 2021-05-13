import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';
import radio from 'radio';
import { observer } from 'mobx-react';
import Gallery from 'common/gallery';
import PhotoPicker from 'common/photo_picker';

function photoDelete(photo, refreshState) {
  radio.trigger('app:dialog', {
    title: 'Delete',
    body:
      'Are you sure you want to remove this photo from the sample?' +
      '</br><i><b>Note:</b> it will remain in the gallery.</i>',
    buttons: [
      {
        title: 'Cancel',
        fill: 'clear',
        onClick() {
          radio.trigger('app:dialog:hide');
        },
      },
      {
        title: 'Delete',
        color: 'danger',
        onClick() {
          // show loader
          const a = photo.destroy().then(refreshState);
          console.log(a);
          radio.trigger('app:dialog:hide');
        },
      },
    ],
  });
}

function showGallery(media, index) {
  Log('Samples:Edit:Footer: photo view.');

  const items = [];
  const options = { index };

  media.forEach(image => {
    items.push({
      src: image.getURL(),
      w: image.get('width') || 800,
      h: image.get('height') || 800,
    });
  });

  // Initializes and opens PhotoSwipe
  const gallery = new Gallery(items, options);
  gallery.init();
}

@observer
class ImagePicker extends Component {
  state = { hardRefresh: 0 }; // TODO: remove when observables work

  photoUpload = async e => {
    const photo = e.target.files[0];

    const { model } = this.props;
    await PhotoPicker.addPhoto(model, photo);
    this.refreshState();
  };

  photoSelect = async () => {
    const { model } = this.props;
    await PhotoPicker.photoSelect(model);
    this.refreshState();
  };

  refreshState = () => {
    // TODO: remove when observables work
    // eslint-disable-next-line
    this.setState({ hardRefresh: this.state.hardRefresh + 1 });
  };

  getMedia = () => {
    const { model } = this.props;

    const { models } = model.media;
    if (!models || !models.length) {
      return <span className="empty">No photo has been added</span>;
    }

    return models.map((img, index) => {
      const thumbnail = img.get('thumbnail');
      const id = img.cid;
      return (
        <div key={id} className="img">
          <span
            className="delete icon icon-cancel"
            onClick={() => photoDelete(img, this.refreshState)}
          />
          <img
            src={thumbnail}
            alt=""
            onClick={() => showGallery(models, index)}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div id="img-picker-array">
        <div
          className="img-picker icon icon-camera"
          onClick={window.cordova && this.photoSelect}
        >
          {!window.cordova && (
            <input type="file" accept="image/*" onChange={this.photoUpload} />
          )}
        </div>
        <div id="img-array">{this.getMedia()}</div>
      </div>
    );
  }
}

ImagePicker.propTypes = {
  model: PropTypes.object.isRequired,
};

export default ImagePicker;
