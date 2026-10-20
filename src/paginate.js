export function paginate(items, page, perPage) {
  if (!Number.isInteger(page) || page < 1) {
    throw new RangeError('page must be a positive integer');
  }
  if (!Number.isInteger(perPage) || perPage < 1) {
    throw new RangeError('perPage must be a positive integer');
  }

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const start = page * perPage;

  return {
    items: items.slice(start, start + perPage),
    page,
    perPage,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
