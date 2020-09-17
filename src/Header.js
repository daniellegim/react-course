import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(2)
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
      <div>
        <Box display="flex" justifyContent="center">
            <h1>Courses</h1>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <form className={classes.root} noValidate autoComplete="off">
              <TextField 
                id="standard-basic" 
                label="Course name"
                value={props.courseName}
                onChange={props.handleInputChange}
              />
          </form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={props.selectedDate}
                onChange={props.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
          </MuiPickersUtilsProvider>
          { props.courseName != "" && props.courses.length == 0 &&
          <Fab className={classes.button} onClick={props.handleAddClick} color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
          }
        </Box>
    </div>
  );
}

export default Header
