import { Page, Main, Header, Section } from '@flumens';

const { H, P } = Section;

export default () => (
  <Page id="resources">
    <Header title="Resources" />
    <Main className="ion-padding">
      <Section>
        <H>NPMS Resources</H>
        <P>
          <p>
            <a href="https://www.npms.org.uk/content/resources">
              Survey resources
            </a>
          </p>
          <p>
            <a href="https://www.npms.org.uk/content/online-training">
              Online training
            </a>
          </p>
        </P>
      </Section>
      <Section>
        <H>
          You may find the below apps useful for plant ID and field navigation.
        </H>
        <P>
          <span className="mb-2 block font-semibold">Plant ID:</span>
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
        </P>

        <P>
          <span className="mb-2 block font-semibold">
            {' '}
            Navigation and others:
          </span>
          <p>
            <a href="https://play.google.com/store/apps/details?id=net.blerg">
              Grid Ref app
            </a>
          </p>{' '}
          <p>
            <a href="https://irecord.org.uk/app">iRecord App</a>
          </p>{' '}
        </P>
      </Section>
    </Main>
  </Page>
);
