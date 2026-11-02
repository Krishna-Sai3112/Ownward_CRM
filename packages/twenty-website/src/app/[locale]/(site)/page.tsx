import { msg } from '@lingui/core/macro';
import { styled } from '@linaria/react';

import { OwnwardLogo } from '@/icons';
import {
  getRouteI18n,
  type LocaleRouteParams,
} from '@/platform/i18n/get-route-i18n';
import { buildRouteMetadata } from '@/platform/seo';

export const generateMetadata = buildRouteMetadata('home');

const Page = styled.main`
  background: #faf9f6;
  color: #171717;
  min-height: 100vh;
`;

const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid #e9e6df;
  display: flex;
  justify-content: space-between;
  margin-inline: auto;
  max-width: 1200px;
  padding: 20px 28px;
`;

const Brand = styled.a`
  align-items: center;
  color: inherit;
  display: inline-flex;
  font-size: 15px;
  font-weight: 650;
  gap: 12px;
  text-decoration: none;
`;

const Navigation = styled.nav`
  align-items: center;
  display: flex;
  gap: 28px;

  @media (max-width: 560px) {
    gap: 14px;
  }
`;

const NavigationLink = styled.a`
  color: #45433f;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #171717;
  }
`;

const Hero = styled.section`
  margin-inline: auto;
  max-width: 1200px;
  padding: 116px 28px 104px;

  @media (max-width: 700px) {
    padding-block: 80px;
  }
`;

const Eyebrow = styled.p`
  color: #9b6c27;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  margin: 0 0 20px;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  font-size: clamp(44px, 7vw, 82px);
  font-weight: 500;
  letter-spacing: -0.065em;
  line-height: 0.99;
  margin: 0;
  max-width: 850px;
`;

const HeroCopy = styled.p`
  color: #68655f;
  font-size: clamp(17px, 2vw, 20px);
  line-height: 1.6;
  margin: 28px 0 0;
  max-width: 620px;
`;

const HeroLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
`;

const LinkButton = styled.a`
  background: #171717;
  border: 1px solid #171717;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 18px;
  text-decoration: none;

  &[data-variant='secondary'] {
    background: transparent;
    color: #171717;
  }
`;

const Capabilities = styled.section`
  background: #f0eee8;
  padding: 88px 28px 100px;
`;

const SectionInner = styled.div`
  margin-inline: auto;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 500;
  letter-spacing: -0.045em;
  margin: 0;
  max-width: 640px;
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 44px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.article`
  background: #faf9f6;
  border: 1px solid #e3e0d8;
  border-radius: 5px;
  min-height: 220px;
  padding: 24px;
`;

const FeatureNumber = styled.p`
  color: #a77532;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  margin: 0 0 42px;
`;

const FeatureTitle = styled.h3`
  font-size: 17px;
  font-weight: 650;
  margin: 0;
`;

const FeatureCopy = styled.p`
  color: #68655f;
  font-size: 14px;
  line-height: 1.55;
  margin: 10px 0 0;
`;

const Closing = styled.section`
  margin-inline: auto;
  max-width: 1200px;
  padding: 78px 28px;
`;

const ClosingCopy = styled.p`
  color: #68655f;
  font-size: 17px;
  line-height: 1.6;
  margin: 16px 0 0;
  max-width: 600px;
`;

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleRouteParams>;
}) {
  const i18n = await getRouteI18n(params);
  const features = [
    {
      number: '01',
      title: msg`Shape your data model`,
      description: msg`Create the records, fields, relationships, and views that fit the way your team works.`,
    },
    {
      number: '02',
      title: msg`Automate repeatable work`,
      description: msg`Build workflows that connect triggers, conditions, and actions across your CRM.`,
    },
    {
      number: '03',
      title: msg`Connect your tools`,
      description: msg`Extend your workspace with APIs, webhooks, and custom applications.`,
    },
    {
      number: '04',
      title: msg`Choose how you run it`,
      description: msg`Use a self-hosted deployment when you want to operate the CRM on your own infrastructure.`,
    },
  ];

  return (
    <Page>
      <Header>
        <Brand href="/" aria-label={i18n._(msg`Ownward Labs home`)}>
          <OwnwardLogo sizePx={36} />
          <span>{i18n._(msg`Ownward Labs`)}</span>
        </Brand>
        <Navigation aria-label={i18n._(msg`Main navigation`)}>
          <NavigationLink href="#capabilities">
            {i18n._(msg`Capabilities`)}
          </NavigationLink>
          <NavigationLink href="https://www.ownward.agency/">
            {i18n._(msg`Ownward website`)}
          </NavigationLink>
        </Navigation>
      </Header>
      <Hero>
        <Eyebrow>
          {i18n._(msg`Ownward Labs · Customer relationship management`)}
        </Eyebrow>
        <HeroTitle>{i18n._(msg`A CRM that fits the way you work.`)}</HeroTitle>
        <HeroCopy>
          {i18n._(
            msg`Bring customer records, team workflows, and the tools you rely on into a workspace you can shape around your business.`,
          )}
        </HeroCopy>
        <HeroLinks>
          <LinkButton href="#capabilities">
            {i18n._(msg`Explore capabilities`)}
          </LinkButton>
          <LinkButton
            data-variant="secondary"
            href="https://www.ownward.agency/"
          >
            {i18n._(msg`Visit Ownward Labs`)}
          </LinkButton>
        </HeroLinks>
      </Hero>
      <Capabilities id="capabilities">
        <SectionInner>
          <Eyebrow>{i18n._(msg`Built to adapt`)}</Eyebrow>
          <SectionTitle>
            {i18n._(msg`Keep your customer operations connected and adaptable.`)}
          </SectionTitle>
          <FeatureGrid>
            {features.map((feature) => (
              <Feature key={feature.number}>
                <FeatureNumber>{feature.number}</FeatureNumber>
                <FeatureTitle>{i18n._(feature.title)}</FeatureTitle>
                <FeatureCopy>{i18n._(feature.description)}</FeatureCopy>
              </Feature>
            ))}
          </FeatureGrid>
        </SectionInner>
      </Capabilities>
      <Closing>
        <Eyebrow>{i18n._(msg`Ownward Labs`)}</Eyebrow>
        <SectionTitle>{i18n._(msg`Make your CRM your own.`)}</SectionTitle>
        <ClosingCopy>
          {i18n._(
            msg`Start with the customer data you need today, then adapt the workspace as your processes change.`,
          )}
        </ClosingCopy>
      </Closing>
    </Page>
  );
}
