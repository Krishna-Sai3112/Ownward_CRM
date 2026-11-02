import { useLingui } from '@lingui/react/macro';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { Section } from 'twenty-ui/components/layout';

import { DpaNotice } from '@/settings/legal/components/DpaNotice';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';

export const SettingsLegalDpaNew = () => {
  const { t } = useLingui();

  return (
    <SettingsPageLayout
      title={t`Data Processing Agreement`}
      links={[
        { children: t`Workspace`, href: getSettingsPath(SettingsPath.General) },
        {
          children: t`Legal`,
          href: getSettingsPath(SettingsPath.LegalDpa),
        },
        { children: t`Data Processing Agreement` },
      ]}
    >
      <SettingsPageContainer>
        <Section.Root>
          <DpaNotice
            text={t`Ownward Labs has not published a Data Processing Agreement for this service. Generating or signing the legacy template is disabled.`}
          />
        </Section.Root>
      </SettingsPageContainer>
    </SettingsPageLayout>
  );
};
