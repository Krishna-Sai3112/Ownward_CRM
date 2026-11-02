import { useQuery } from '@apollo/client/react';
import { useLingui } from '@lingui/react/macro';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { Section } from 'twenty-ui/components/layout';

import { useApolloCoreClient } from '@/object-metadata/hooks/useApolloCoreClient';
import { DpaNotice } from '@/settings/legal/components/DpaNotice';
import { SettingsDpaAgreementsTable } from '@/settings/legal/components/SettingsDpaAgreementsTable';
import { GET_DPA_AGREEMENTS } from '@/settings/legal/graphql/queries/getDpaAgreements';
import { type DpaAgreement } from '@/settings/legal/types/Dpa';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';
import { SettingsSkeletonLoader } from '@/settings/components/SettingsSkeletonLoader';

export const SettingsLegalDpa = () => {
  const { t } = useLingui();
  // DPA queries are served by the core (/graphql) schema, not the default /metadata client.
  const apolloCoreClient = useApolloCoreClient();

  const { data: agreementsData, loading } = useQuery<{
    dpaAgreements: DpaAgreement[];
  }>(GET_DPA_AGREEMENTS, { client: apolloCoreClient });

  const agreements = agreementsData?.dpaAgreements ?? [];
  const hasAgreements = agreements.length > 0;

  return (
    <SettingsPageLayout
      title={t`Data Processing Agreement`}
      links={[
        { children: t`Workspace`, href: getSettingsPath(SettingsPath.General) },
        { children: t`Legal` },
      ]}
    >
      <SettingsPageContainer>
        <Section.Root>
          <DpaNotice
            text={t`Ownward Labs has not published a Data Processing Agreement for this service. Do not use or sign the legacy template.`}
          />
        </Section.Root>
        {loading ? (
          <SettingsSkeletonLoader />
        ) : hasAgreements ? (
          <Section.Root>
            <Section.Header
              title={t`Executed copies`}
              description={t`Accepted and signed DPAs for this workspace, with their template version and date.`}
            />
            <SettingsDpaAgreementsTable agreements={agreements} />
          </Section.Root>
        )}
      </SettingsPageContainer>
    </SettingsPageLayout>
  );
};
