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

const RecentWithdraws = () => {
  const header = ['Shop Name', 'Amount', 'Status', 'Created', 'Actions'];
  return (
    <Card>
      <TableContainer className='bg-gray-200'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={6}>
                Recent WithDraws
              </TableCell>
            </TableRow>
            <TableRow>
              {header.map((data) => (
                <TableCell key={data} colSpan={data === 'Shop Name' ? 2 : 0}>
                  {data}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>123445566</TableCell>
              <TableCell>$123.00</TableCell>
              <TableCell>4 months ago</TableCell>
              <TableCell>Order Received</TableCell>
              <TableCell>Order Received</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
export default RecentWithdraws;
