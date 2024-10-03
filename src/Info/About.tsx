import { Page, Main, Header, Section } from '@flumens';

const { P, H } = Section;

const About = () => (
  <Page id="about">
    <Header title="About" />
    <Main className="ion-padding">
      <Section>
        <P>
          The National Plant Monitoring Scheme (NPMS) is a new habitat-based
          plant monitoring scheme designed by <a href="http://bsbi.org">BSBI</a>
          , <a href="http://www.ceh.ac.uk">UKCEH</a>,{' '}
          <a href="http://www.plantlife.org.uk">Plantlife </a>and{' '}
          <a href="http://jncc.defra.gov.uk/">JNCC</a>. The aim is to collect
          data to provide an annual indication of changes in plant abundance and
          diversity.
        </P>
      </Section>

      <Section>
        <H>Why is it needed?</H>
        <P>
          Thanks to volunteers, we have a very good understanding of changes in
          the populations of birds, butterflies and bats. Plants are the
          foundation of habitats and ecosystems, but currently we do not have a
          good measure of changes in plant populations across the country.
        </P>
      </Section>
      <Section>
        <H>How will it work?</H>
        <P>
          This is a scientific survey, so you will be randomly allocated a
          convenient 1km square to visit. The visit involves recording plant
          ‘indicator species’ in plots. Within your 1km square you will record
          around 5 plots in semi-natural habitats. Check out the squares{' '}
          <a href="http://www.npms.org.uk/square-near-me-public">
            available near you
          </a>{' '}
          now!
        </P>
      </Section>
      <Section>
        <H>Who can take part?</H>
        <P>
          Anyone interested in nature who can identify plants, or who is keen to
          learn. Different levels of participation ensure that all who are keen
          can participate: you do not have to be an experienced botanist. You
          will only need to identify between 25-30 'indicator species' per
          habitat. These are distinctive species specially selected to allow us
          to monitor changes in the countryside.
        </P>
      </Section>
      <Section>
        <H>More information</H>
        <P>
          Please first see the{' '}
          <a href="http://www.npms.org.uk/content/how-get-involved">
            'How to get involved'
          </a>{' '}
          page for more detailed information on participating in the NPMS; you
          can also email{' '}
          <a href="mailto:support@npms.org.uk?subject=NPMS%20question">
            support@npms.org.uk
          </a>{' '}
          if you have a query which is not answered in the documentation. The
          NPMS flow diagram also provides a{' '}
          <a href="https://www.npms.org.uk/sites/default/files/PDF/NPMS_survey_flow_diagram_April2015_1.pdf">
            brief overview of the process
          </a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
