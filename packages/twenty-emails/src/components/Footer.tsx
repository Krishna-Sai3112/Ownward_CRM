import { type I18n } from '@lingui/core';
import { Column, Container, Row } from 'react-email';
import { Link } from 'src/components/Link';
import { ShadowText } from 'src/components/ShadowText';

const footerContainerStyle = {
  marginTop: '12px',
};

type FooterProps = {
  i18n: I18n;
};

export const Footer = ({ i18n }: FooterProps) => {
  return (
    <Container style={footerContainerStyle}>
      <Row>
        <Column>
          <ShadowText>
            <Link
              href="https://www.ownward.agency/"
              value={i18n._('Ownward Labs')}
              aria-label={i18n._("Visit Ownward Labs' website")}
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://github.com/Krishna-Sai3112/Ownward_CRM"
              value={i18n._('Upstream source')}
              aria-label={i18n._("View the upstream Twenty source repository")}
            />
          </ShadowText>
        </Column>
      </Row>
    </Container>
  );
};
