export function paginate<T extends { id: string }>(rows: T[], limit: number) {
  const hasNextPage = rows.length > limit;
  const items = hasNextPage ? rows.slice(0, limit) : rows;
  const nextCursor = hasNextPage ? items[items.length - 1].id : null;
  return { items, hasNextPage, nextCursor };
}
