import React from 'react';

const Component = () => (
  <ul className="table-view">
    <li>
      <p>
        You may find the below apps useful for plant ID and field navigation.
      </p>
    </li>
    <li>
      <p>
        <strong>Plant ID</strong>
      </p>
      <p>
        <a href="https://apps.apple.com/gb/app/plantnet/id600547573">
          PlantNet
        </a>
      </p>{' '}
      <p>
        <a href="https://play.google.com/store/apps/details?id=com.floraincognita.app.floraincognita">
          Flora Incognita
        </a>
      </p>{' '}
      <p>
        <a href="https://www.inaturalist.org/pages/seek_app">Seek</a>
      </p>
    </li>
    <li>
      <p>
        <strong>Navigation and others</strong>
      </p>
      <p>
        <a href="https://play.google.com/store/apps/details?id=net.blerg">
          Grid Ref app
        </a>
      </p>{' '}
      <p>
        <a href="https://irecord.org.uk/app">iRecord App</a>
      </p>{' '}
    </li>
  </ul>
);

export default Component;
