import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const Component = props => (
  <ul className="table-view">
    <li>
      <p>
        The National Plant Monitoring Scheme (NPMS) is a new habitat-based plant
        monitoring scheme designed by <a href="http://bsbi.org">BSBI</a>,{' '}
        <a href="http://www.ceh.ac.uk">UKCEH</a>,{' '}
        <a href="http://www.plantlife.org.uk">Plantlife </a>and{' '}
        <a href="http://jncc.defra.gov.uk/">JNCC</a>. The aim is to collect data
        to provide an annual indication of changes in plant abundance and
        diversity.
      </p>
    </li>
    <li>
      <p>
        <strong>Why is it needed?</strong>
      </p>
      <p>
        Thanks to volunteers, we have a very good understanding of changes in
        the populations of birds, butterflies and bats. Plants are the
        foundation of habitats and ecosystems, but currently we do not have a
        good measure of changes in plant populations across the country.
      </p>
    </li>
    <li>
      <p>
        <strong>How will it work?</strong>
      </p>
      <p>
        This is a scientific survey, so you will be randomly allocated a
        convenient 1km square to visit. The visit involves recording plant
        ‘indicator species’ in plots. Within your 1km square you will record
        around 5 plots in semi-natural habitats. Check out the squares{' '}
        <a href="http://www.npms.org.uk/square-near-me-public">
          available near you
        </a>{' '}
        now! Or, if you are signed in to your NPMS account, visit the{' '}
        <a href="http://www.npms.org.uk/content/request-square">
          'Request a square'
        </a>{' '}
        page.
      </p>
    </li>
    <li>
      <p>
        <strong>Who can take part?</strong>
      </p>
      <p>
        Anyone interested in nature who can identify plants, or who is keen to
        learn. Different levels of participation ensure that all who are keen
        can participate: you do not have to be an experienced botanist. You will
        only need to identify between 25-30 'indicator species' per habitat.
        These are distinctive species specially selected to allow us to monitor
        changes in the countryside.
      </p>
    </li>
    <li>
      <p>
        <strong>Who can take part?</strong>
      </p>
      <p>
        Please first see the{' '}
        <a href="http://www.npms.org.uk/content/how-get-involved">
          'How to get involved'
        </a>{' '}
        page for more detailed information on participating in the NPMS; you can
        also email{' '}
        <a href="mailto:support@npms.org.uk?subject=NPMS%20question">
          support@npms.org.uk
        </a>{' '}
        if you have a query which is not answered in the documentation. The NPMS
        flow diagram also provides a{' '}
        <a href="https://www.npms.org.uk/sites/default/files/PDF/NPMS_survey_flow_diagram_April2015_1.pdf">
          brief overview of the process
        </a>
        .
      </p>
    </li>
    <li>
      <p>
        <strong>App Development</strong>
      </p>
      <p>
        This app was hand crafted with love by{' '}
        <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
          Flumens
        </a>
        . For suggestions and feedback please do not hesitate to{' '}
        <a href="mailto:apps%40ceh.ac.uk?subject=NPMS%20App%20Support%26Feedback&body=%0A%0A%0AVersion%3A%20<%- obj.version %>%0ABrowser%3A <%- window.navigator.appVersion %>%0A">
          contact us
        </a>
        .
      </p>
    </li>
    <li>
      <p className="app-version">
        v{props.version} ({props.build})
      </p>
    </li>
  </ul>
);

Component.propTypes = exact({
  version: PropTypes.string,
  build: PropTypes.string,
});

export default Component;
