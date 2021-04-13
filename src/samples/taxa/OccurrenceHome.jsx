import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import radio from 'radio';

function Cover({ sample, occurrence }) {
  const obj = { [occurrence.attributes.abundance]: true };

  const onSelect = e => {
    const existingSample =
      typeof occurrence.attributes.abundance !== 'undefined';
    occurrence.set('abundance', e.target.value);

    occurrence.save();

    if (existingSample) {
      window.history.back();
      return;
    }

    // todo: skipping habitat makes two back clicks
    radio.trigger('samples:taxa:search', sample.cid, { replace: true });
  };

  return (
    <div onChange={onSelect}>
      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="< 1% (1-2 indivs)"
          defaultChecked={obj['< 1% (1-2 indivs)']}
          // onChange={onSelect}
        />
        <div className="radio-content">
          <div className="item-content">{'<'} 1% (1-2 indivs)</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="< 1% (several indivs)"
          defaultChecked={obj['< 1% (several indivs)']}
        />
        <div className="radio-content">
          <div className="item-content">{'<'} 1% (several indivs)</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="1-4%"
          defaultChecked={obj['1-4%']}
        />
        <div className="radio-content">
          <div className="item-content">1-4%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="5-10%"
          defaultChecked={obj['5-10%']}
        />
        <div className="radio-content">
          <div className="item-content">5-10%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="11-25%"
          defaultChecked={obj['11-25%']}
        />
        <div className="radio-content">
          <div className="item-content">11-25%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="26-33%"
          defaultChecked={obj['26-33%']}
        />
        <div className="radio-content">
          <div className="item-content">26-33%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="34-50%"
          defaultChecked={obj['34-50%']}
        />
        <div className="radio-content">
          <div className="item-content">34-50%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="51-75%"
          defaultChecked={obj['51-75%']}
        />
        <div className="radio-content">
          <div className="item-content">51-75%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="76-90%"
          defaultChecked={obj['76-90%']}
        />
        <div className="radio-content">
          <div className="item-content">76-90%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>

      <label className="item item-radio">
        <input
          type="radio"
          name="group"
          value="91-100%"
          defaultChecked={obj['91-100%']}
        />
        <div className="radio-content">
          <div className="item-content">91-100%</div>
          <i className="radio-icon icon-check" />
        </div>
      </label>
    </div>
  );
}

Cover.propTypes = exact({
  occurrence: PropTypes.object.isRequired,
  sample: PropTypes.object.isRequired,
});

export default Cover;
