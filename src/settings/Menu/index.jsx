import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { toast } from '@apps';
import Main from './Main';

const { success } = toast;

function onToggle(appModel, setting, checked) {
  appModel.attributes[setting] = checked; // eslint-disable-line
  appModel.save();
}

const MenuController = props => {
  const { savedSamples, appModel } = props;

  const { sendAnalytics, useTraining } = appModel.attributes;

  const onToggleWrap = (...args) => onToggle(appModel, ...args);

  const uploadAll = async () => {
    await savedSamples.setAllToSend();
    success('Done!');
  };

  return (
    <Main
      sendAnalytics={sendAnalytics}
      uploadAll={uploadAll}
      useTraining={useTraining}
      onToggle={onToggleWrap}
    />
  );
};

MenuController.propTypes = exact({
  appModel: PropTypes.object.isRequired,
  savedSamples: PropTypes.object.isRequired,
});

export default observer(MenuController);
