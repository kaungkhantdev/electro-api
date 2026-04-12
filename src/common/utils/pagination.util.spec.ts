import { paginate } from './pagination.util';

describe('pagination.util', () => {
  it('paginate', () => {
    const rows = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
      { id: '5', name: 'Item 5' },
    ];
    const limit = 3;
    const result = paginate(rows, limit);
    expect(result.items).toHaveLength(limit);
    expect(result.hasNextPage).toBe(true);
    expect(result.nextCursor).toBe('3');
  });

  it('paginate with less rows than limit', () => {
    const rows = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const limit = 3;
    const result = paginate(rows, limit);
    expect(result.items).toHaveLength(rows.length);
    expect(result.hasNextPage).toBe(false);
    expect(result.nextCursor).toBe(null);
  });
});
