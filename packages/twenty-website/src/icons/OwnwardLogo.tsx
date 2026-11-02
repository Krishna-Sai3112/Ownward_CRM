import { styled } from '@linaria/react';

const LogoSvg = styled.svg`
  flex-shrink: 0;
`;

export type OwnwardLogoProps = {
  sizePx?: number;
};

export function OwnwardLogo({ sizePx = 40 }: OwnwardLogoProps) {
  return (
    <LogoSvg
      aria-label="Ownward Labs"
      height={sizePx}
      role="img"
      viewBox="0 0 64 64"
      width={sizePx}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#171717" height={64} rx={15} width={64} />
      <path
        d="M39.8 22.3a14 14 0 1 0 2.1 17.6"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={5}
      />
      <path
        d="M31 15h18v18M49 15 32 32"
        fill="none"
        stroke="#e0a74f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      />
    </LogoSvg>
  );
}
