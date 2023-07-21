import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AppContext } from '../App';
export default function CPagination() {
  const { count, setCount, page, setPage } = useContext(AppContext)
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} direction={'row'} className='ml-4 mt-4'>
      <Pagination count={count} page={page} shape='rounded' variant="outlined" onChange={handleChange} />
      {/* <Typography>Page: {page}</Typography> */}
    </Stack>
  );
}