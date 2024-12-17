import { useState } from 'react';
import { PaginationParams, SortParams } from '@/lib/types/common';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSort?: SortParams;
}

export function usePagination({
  initialPage = 1,
  initialLimit = 10,
  initialSort,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sort, setSort] = useState<SortParams | undefined>(initialSort);

  const pagination: PaginationParams = {
    page,
    limit,
  };

  const resetPagination = () => {
    setPage(initialPage);
    setLimit(initialLimit);
  };

  return {
    pagination,
    sort,
    setPage,
    setLimit,
    setSort,
    resetPagination,
  };
}