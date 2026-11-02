import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  setup,
  teardown,
} from '../../../app-template/example/files/src/__tests__/global-setup';
import { runOwnwardCLI } from '../../../app-template/example/files/src/__tests__/run-ownward';

vi.mock('../../../app-template/example/files/src/__tests__/run-ownward', () => ({
  runOwnwardCLI: vi.fn(),
}));

const notInstalled = {
  ok: false,
  error: { code: 'APP_NOT_INSTALLED', message: 'Not installed.' },
} as const;

const uninstallFailed = {
  ok: false,
  error: { code: 'PERMISSION_DENIED', message: 'Cannot uninstall.' },
} as const;

describe('app template integration setup', () => {
  beforeEach(() => {
    vi.mocked(runOwnwardCLI).mockReset();
    vi.stubEnv('OWNWARD_API_URL', 'http://localhost:2020');
    vi.stubEnv('OWNWARD_API_KEY', 'test-key');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('installs the app when there is no previous installation to clean up', async () => {
    vi.mocked(runOwnwardCLI)
      .mockResolvedValueOnce(notInstalled)
      .mockResolvedValueOnce({ ok: true, data: {} });

    await setup();

    expect(runOwnwardCLI).toHaveBeenNthCalledWith(1, ['app', 'uninstall', '--yes']);
    expect(runOwnwardCLI).toHaveBeenNthCalledWith(2, ['app', 'apply', '--create']);
  });

  it('reports an unreachable server before running app commands', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Connection refused'));

    await expect(setup()).rejects.toThrow(
      'Ownward Labs server is not reachable at http://localhost:2020.',
    );
    expect(runOwnwardCLI).not.toHaveBeenCalled();
  });

  it('preserves HTTP health-check failures before running app commands', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 503 }));

    await expect(setup()).rejects.toThrow(
      'Server at http://localhost:2020 returned 503',
    );
    expect(runOwnwardCLI).not.toHaveBeenCalled();
  });

  it('does not apply the app when cleanup fails', async () => {
    vi.mocked(runOwnwardCLI).mockResolvedValue(uninstallFailed);

    await expect(setup()).rejects.toThrow(
      'PERMISSION_DENIED Cannot uninstall.',
    );
    expect(runOwnwardCLI).toHaveBeenCalledExactlyOnceWith([
      'app',
      'uninstall',
      '--yes',
    ]);
  });

  it('surfaces uninstall failures during teardown', async () => {
    vi.mocked(runOwnwardCLI).mockResolvedValue(uninstallFailed);

    await expect(teardown()).rejects.toThrow(
      'PERMISSION_DENIED Cannot uninstall.',
    );
  });

  it('allows teardown after the app was already uninstalled', async () => {
    vi.mocked(runOwnwardCLI).mockResolvedValue(notInstalled);

    await expect(teardown()).resolves.toBeUndefined();
  });
});
