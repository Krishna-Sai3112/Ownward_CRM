import { type I18n } from '@lingui/core';
import { Img } from 'react-email';

const logoStyle = {
  marginBottom: '40px',
};

type LogoProps = {
  i18n: I18n;
};

export const Logo = ({ i18n }: LogoProps) => {
  return (
    <Img
      src="https://www.ownward.agency/images/ownward-labs-icon-192.png"
      alt={i18n._('Ownward Labs logo')}
      width="40"
      height="40"
      style={logoStyle}
    />
  );
};
