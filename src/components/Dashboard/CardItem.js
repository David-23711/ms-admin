import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from '@material-ui/core';
import React from 'react';

import useStyles from './Styles';
const CardItem = ({ title, icon, value, background }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar style={{ backgroundColor: `${background}` }}>{icon}</Avatar>
        }
        title={<Typography variant='h6'>{title}</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h5'>{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
