import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Header() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
      <div>
        <Box display="flex" justifyContent="center">
            <h1>Courses</h1>
        </Box>
        <Box display="flex" justifyContent="center">
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Course name" />
        </form>
        </Box>
    </div>
  );
}

export default Header
