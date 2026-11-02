import { type CoreApiClient } from 'twenty-client-sdk/core';
import { describe, expect, it, vi } from 'vitest';

import { findWorkspaceMemberIdsByEmails } from 'src/logic-functions/data/find-workspace-member-ids-by-emails';

const buildClient = (
  pages: {
    edges: { node: { id: string; userEmail: string } }[];
    endCursor?: string;
  }[],
) => {
  const queryMock = vi.fn();

  for (const page of pages) {
    queryMock.mockResolvedValueOnce({
      workspaceMembers: {
        edges: page.edges,
        pageInfo: {
          hasNextPage: page.endCursor !== undefined,
          endCursor: page.endCursor ?? null,
        },
      },
    });
  }

  return {
    client: { query: queryMock } as unknown as CoreApiClient,
    queryMock,
  };
};

describe('findWorkspaceMemberIdsByEmails', () => {
  it('should map lowercased emails to member ids', async () => {
    const { client } = buildClient([
      {
        edges: [
          { node: { id: 'member-ada', userEmail: 'Ada@example.com' } },
          { node: { id: 'member-bob', userEmail: 'bob@ownward.agency' } },
        ],
      },
    ]);

    const { workspaceMemberIdByEmail, ambiguousEmailCount } =
      await findWorkspaceMemberIdsByEmails(client, {
        emails: ['Ada@example.com', 'bob@ownward.agency'],
      });

    expect(workspaceMemberIdByEmail.get('ada@ownward.agency')).toBe('member-ada');
    expect(workspaceMemberIdByEmail.get('bob@ownward.agency')).toBe('member-bob');
    expect(ambiguousEmailCount).toBe(0);
  });

  it('should ask only for the roster emails through case-insensitive matches', async () => {
    const { client, queryMock } = buildClient([{ edges: [] }]);

    await findWorkspaceMemberIdsByEmails(client, {
      emails: ['Ada@example.com', 'bob@ownward.agency'],
    });

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0].workspaceMembers.__args.filter).toEqual({
      or: [
        { userEmail: { ilike: 'ada@ownward.agency' } },
        { userEmail: { ilike: 'bob@ownward.agency' } },
      ],
    });
  });

  it('should escape like wildcards inside the looked up emails', async () => {
    const { client, queryMock } = buildClient([{ edges: [] }]);

    await findWorkspaceMemberIdsByEmails(client, {
      emails: ['john_doe@ownward.agency'],
    });

    expect(queryMock.mock.calls[0][0].workspaceMembers.__args.filter).toEqual({
      or: [{ userEmail: { ilike: 'john\\_doe@ownward.agency' } }],
    });
  });

  it('should not query at all when the roster has no vouched email', async () => {
    const { client, queryMock } = buildClient([]);

    const { workspaceMemberIdByEmail, ambiguousEmailCount } =
      await findWorkspaceMemberIdsByEmails(client, { emails: [] });

    expect(queryMock).not.toHaveBeenCalled();
    expect(workspaceMemberIdByEmail.size).toBe(0);
    expect(ambiguousEmailCount).toBe(0);
  });

  it('should drop an email shared by two members and report it', async () => {
    const { client } = buildClient([
      {
        edges: [
          { node: { id: 'member-ada', userEmail: 'shared@ownward.agency' } },
          { node: { id: 'member-bob', userEmail: 'Shared@example.com' } },
          { node: { id: 'member-carol', userEmail: 'carol@ownward.agency' } },
        ],
      },
    ]);

    const { workspaceMemberIdByEmail, ambiguousEmailCount } =
      await findWorkspaceMemberIdsByEmails(client, {
        emails: ['shared@ownward.agency', 'carol@ownward.agency'],
      });

    expect(workspaceMemberIdByEmail.has('shared@ownward.agency')).toBe(false);
    expect(workspaceMemberIdByEmail.get('carol@ownward.agency')).toBe(
      'member-carol',
    );
    expect(ambiguousEmailCount).toBe(1);
  });

  it('should follow pagination within one batch of emails', async () => {
    const { client, queryMock } = buildClient([
      {
        edges: [{ node: { id: 'member-ada', userEmail: 'ada@ownward.agency' } }],
        endCursor: 'cursor-2',
      },
      { edges: [{ node: { id: 'member-bob', userEmail: 'bob@ownward.agency' } }] },
    ]);

    const { workspaceMemberIdByEmail } = await findWorkspaceMemberIdsByEmails(
      client,
      { emails: ['ada@ownward.agency', 'bob@ownward.agency'] },
    );

    expect(workspaceMemberIdByEmail.size).toBe(2);
    expect(queryMock.mock.calls[1][0].workspaceMembers.__args.after).toBe(
      'cursor-2',
    );
  });
});
