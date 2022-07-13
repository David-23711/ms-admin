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

const RecentOrders = () => {
  const header = ['Tracking Id', 'Total', 'Order Date', 'Status'];
  return (
    <Card>
      <TableContainer className='bg-gray-200'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={4}>
                Recent Orders
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
              <TableCell>123445566</TableCell>
              <TableCell>$123.00</TableCell>
              <TableCell>4 months ago</TableCell>
              <TableCell>Order Received</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
export default RecentOrders;
