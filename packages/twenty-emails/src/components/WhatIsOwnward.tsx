import { type I18n } from '@lingui/core';
import { MainText } from 'src/components/MainText';
import { SubTitle } from 'src/components/SubTitle';

type WhatIsOwnwardProps = {
  i18n: I18n;
};

export const WhatIsOwnward = ({ i18n }: WhatIsOwnwardProps) => {
  return (
    <>
      <SubTitle value={i18n._('What is Ownward Labs?')} />
      <MainText>
        {i18n._(
          "It's a CRM, a software to help businesses manage their customer data and relationships efficiently.",
        )}
      </MainText>
    </>
  );
};
