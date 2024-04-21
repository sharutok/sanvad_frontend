import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useContext } from 'react';
import { AppContext } from '../App';
export default function CPagination() {
  const { count, page, setPage } = useContext(AppContext)
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} direction={'row'} className='mt-10 flex justify-center'>
      <Pagination count={Number(count || 1)} page={Number(page || 1)} shape='rounded' variant="outlined" onChange={handleChange} />
    </Stack>
  );
}