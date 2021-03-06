import $ from 'jquery';
import PhotoSwipe from 'photoswipe-lib'; // eslint-disable-line
import PhotoSwipeUIDefault from 'photoswipe-ui-default'; // eslint-disable-line
import JST from 'JST';

// initialize PhotoSwipe
const photoSwipeContainer = JST['common/gallery']();
$('body').append(photoSwipeContainer);

function Gallery(items, options = {}) {
  const pswpElement = document.querySelectorAll('.pswp')[0];
  return new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options);
}

export { Gallery as default };
