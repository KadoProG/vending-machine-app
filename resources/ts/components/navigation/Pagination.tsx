import { Button } from '@/components/button/Button';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  count: number; // 総ページ数
  siblingCount?: number; // 現在のページの前後に表示するページ番号の数
};

export const Pagination = <T extends FieldValues>({
  count,
  control,
  name,
  rules,
  siblingCount = 1,
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= count) {
      onChange(page); // react-hook-form の値を更新
    }
  };

  const createPagination = () => {
    const pagination: (number | string)[] = [];
    const startPage = Math.max(1, value - siblingCount);
    const endPage = Math.min(count, value + siblingCount);

    if (startPage > 1) {
      pagination.push(1);
      if (startPage > 2) pagination.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    if (endPage < count) {
      if (endPage < count - 1) pagination.push('...');
      pagination.push(count);
    }

    return pagination;
  };

  const pagination = createPagination();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
      {/* 前のページボタン */}
      <Button
        onClick={() => handlePageChange(value - 1)}
        disabled={value <= 1}
        style={{ paddingLeft: 4, paddingRight: 4 }}
      >
        Previous
      </Button>

      {/* ページ番号表示 */}
      {pagination.map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            highlight={value === page}
            onClick={() => handlePageChange(page)}
            style={{ paddingLeft: 0, paddingRight: 0, width: 32 }}
          >
            {page}
          </Button>
        ) : (
          <span key={index} style={{ padding: '0 0.5rem' }}>
            {page}
          </span>
        )
      )}

      {/* 次のページボタン */}
      <Button
        onClick={() => handlePageChange(value + 1)}
        disabled={value >= count}
        style={{ paddingLeft: 4, paddingRight: 4 }}
      >
        Next
      </Button>
    </div>
  );
};
