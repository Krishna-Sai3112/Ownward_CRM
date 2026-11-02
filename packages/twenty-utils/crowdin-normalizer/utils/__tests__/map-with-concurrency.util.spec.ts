import { mapWithConcurrency } from '../map-with-concurrency.util';

describe('mapWithConcurrency', () => {
  it('keeps results in input order regardless of completion order', async () => {
    const results = await mapWithConcurrency({
      items: [30, 10, 20],
      limit: 3,
      handler: (delay) =>
        new Promise<number>((resolve) =>
          setTimeout(() => resolve(delay), delay),
        ),
    });

    expect(results).toEqual([30, 10, 20]);
  });

  it('never runs more than `limit` handlers at once', async () => {
    let running = 0;
    let peak = 0;

    await mapWithConcurrency({
      items: Array.from({ length: 20 }, (_, index) => index),
      limit: 3,
      handler: async (item) => {
        running++;
        peak = Math.max(peak, running);
        await new Promise((resolve) => setTimeout(resolve, 1));
        running--;

        return item;
      },
    });

    expect(peak).toBe(3);
  });

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid concurrency limit %s',
    async (limit) => {
      await expect(
        mapWithConcurrency({ items: [1], limit, handler: jest.fn() }),
      ).rejects.toThrow('positive integer');
    },
  );

  it('rejects the limit before running any handlers', async () => {
    const handler = jest.fn();

    await expect(
      mapWithConcurrency({ items: [1], limit: Number.NaN, handler }),
    ).rejects.toThrow('positive integer');
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns an empty array without spawning workers', async () => {
    const handler = jest.fn();

    expect(await mapWithConcurrency({ items: [], limit: 5, handler })).toEqual(
      [],
    );
    expect(handler).not.toHaveBeenCalled();
  });
});
