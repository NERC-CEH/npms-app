import { Header, Page, Main, Section } from '@flumens';
import flumensLogo from 'common/images/flumens.svg';
import sponsorLogo from './sponsor_logo.png';

const { P, H } = Section;

const Credits = () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main className="ion-padding">
      <Section>
        <img src={sponsorLogo} className="mx-auto block w-full max-w-xl" />
      </Section>
      <Section>
        <H>
          We are very grateful for all the people that helped to create this
          app:
        </H>
        <P skipTranslation>
          <b>Oliver Pescott</b> (UKCEH)
        </P>
        <P skipTranslation>
          <b>David Roy</b> (UKCEH)
        </P>
        <P skipTranslation>
          <b>Karolis Kazlauskis</b> (Flumens)
        </P>
        <P skipTranslation>
          <b>Andrew van Breda</b> (AVB IT)
        </P>
        <P skipTranslation>
          <b>Hayley New</b> (Plantlife)
        </P>
        <P skipTranslation>
          <b>Felicity Harris</b> (Plantlife)
        </P>
        <P skipTranslation>
          <b>Kevin Walker</b> (BSBI)
        </P>
        <P skipTranslation>
          <b>Louise Marsh</b> (BSBI)
        </P>
        <P skipTranslation>
          <b>Niki Newton</b> (JNCC)
        </P>
      </Section>

      <Section>
        <a href="https://flumens.io" aria-label="Flumens link">
          <img
            src={flumensLogo}
            alt="flumens"
            className="mx-auto mb-0 mt-[30px] block w-2/5 max-w-[200px]"
          />
        </a>
        <P>
          <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
            Flumens
          </a>
          , a technical consultancy specializing in creating customized
          environmental science and community-focused solutions, created this
          app with love.
        </P>
      </Section>
      <Section>
        <P>
          If you have any feedback or suggestions, please don't hesitate to{' '}
          <a href="mailto:support%40npms.org.uk?subject=App%20Feedback">
            contact us
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Credits;
