import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
} from '@material-ui/core';
const PopularProducts = () => {
  const header = ['Id','Poster', 'Name', 'Author Name', 'Release Date'];
  return (
    <TableContainer className='bg-white'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={6}>
              All Mangas
            </TableCell>
          </TableRow>
          <TableRow>
            {header.map((data) => (
              <TableCell key={data}>{data}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <img src={require('../../images/nofound.png')} style={{width:100,height:150}} />
            </TableCell>
            <TableCell>Tokyo Revenger</TableCell>
            <TableCell>U Hla</TableCell>
            <TableCell>2022</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PopularProducts;
