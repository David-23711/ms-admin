import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
const AddPagination = ({ count, setPage, page }) => {
  return (
    <div>
      <Pagination
        variant='outlined'
        shape='rounded'
        color='secondary'
        count={count}
        page={Number(page)}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
};

export default AddPagination;
