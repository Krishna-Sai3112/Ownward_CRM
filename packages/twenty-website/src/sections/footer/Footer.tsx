import { styled } from '@linaria/react';

import { OwnwardLogo } from '@/icons';
import { getSiteUrl } from '@/platform/seo/get-site-url';
import { color, fontSize, mediaUp, spacing } from '@/tokens';
import { Container, ExternalLink } from '@/ui';

const FooterRoot = styled.footer`
  border-top: 1px solid ${color('black')};
`;

const FooterInner = styled(Container)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing(4)};
  justify-content: space-between;
  padding-block: ${spacing(5)};
`;

const Brand = styled.div`
  align-items: center;
  display: flex;
  font-size: ${fontSize(3)};
  font-weight: 600;
  gap: ${spacing(3)};
`;

const Copyright = styled.span`
  color: ${color('black')};
  font-size: ${fontSize(3)};
  opacity: 0.7;
`;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <FooterInner>
        <Brand>
          <OwnwardLogo sizePx={32} />
          Ownward Labs
        </Brand>
        <Copyright>© {year} Ownward Labs</Copyright>
        <ExternalLink href={getSiteUrl()}>{getSiteUrl()}</ExternalLink>
      </FooterInner>
    </FooterRoot>
  );
}
