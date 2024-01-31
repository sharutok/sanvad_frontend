import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AppContext } from '../App';
import { getCookies, setIndividualCookie } from './CustomCookies';
export default function CPagination() {
  const { count, setCount, page, setPage } = useContext(AppContext)

  const handleChange = (event, value) => {
    setPage(value);
    // setIndividualCookie('_page', value)
  };

  return (
    <Stack spacing={2} direction={'row'} className='mt-10 flex justify-center'>
      <Pagination count={count} page={page} shape='rounded' variant="outlined" onChange={handleChange} />
    </Stack>
  );
}