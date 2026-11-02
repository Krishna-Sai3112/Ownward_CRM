import { i18n } from '../../shared/i18n';

export class OwnwardRequestError extends Error {
  constructor(
    readonly status: number,
    url: string,
  ) {
    const path = new URL(url).pathname;
    super(
      status === 401
        ? i18n._(
            'Ownward Labs returned {status} for {path}. Reconnect your workspace.',
            { status, path },
          )
        : i18n._('Ownward Labs returned {status} for {path}. Please try again.', {
            status,
            path,
          }),
    );
    this.name = 'OwnwardRequestError';
  }
}
