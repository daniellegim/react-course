import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog';
import {useCart} from './CartContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
  },
  pos: {
    marginLeft: theme.spacing(5)
  },
  formControl: {
    minWidth: 80,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    marginRight: theme.spacing(4)
  }
}))

function OutlinedCard(props) {
  const classes = useStyles();

  const [checked, setChecked] = useState(false)
  const [checkboxColor, setCheckboxColor] = useState()
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const cart = useCart()

  useEffect(() => {
    setChecked(false)
    setCheckboxColor({color: ''})
    setSelectedDate('')
  }, [cart])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked

    if (checked && selectedDate === '') {
      setOpen(true)
    } else if (checked) {
      setCheckboxColor({color: '#14f507'})
      props.handleCourseSelected({name: props.course.name,
                                  _id: props.course._id,
                                  dates: [selectedDate],
                                  description: props.course.description})
    } else if (checked === false) {
      setSelectedDate('')
      setCheckboxColor({color: ''})
      props.handleCourseRemoved({name: props.course.name,
                                 _id: props.course._id,
                                 dates: [selectedDate],
                                 description: props.course.description})
    }

    setChecked(checked)
  }

  const handleClose = (value) => {
    setChecked(false)
    setOpen(false)
  };

  const handleListItemClick = (value) => {
    setSelectedDate(value)
    setCheckboxColor({color: '#14f507'})
    props.handleCourseSelected({name: props.course.name,
                                _id: props.course._id,
                                dates: [value],
                                description: props.course.description})
    setOpen(false)
  };

  return (
      <Box display="flex" justifyContent="center">
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Box display="flex">
            <Box>
              <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.title}>
                  Choose course date
                </DialogTitle>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <List>
                    {props.course.dates.map(date => (
                      <ListItem button onClick={() => handleListItemClick(date)} key={date}>
                        <ListItemText primary={date} />
                      </ListItem>
                    ))}
                  </List>
                </DialogContent>
              </Dialog>
            </Box>
            <Box flexGrow={1}>
              <Typography variant="h5" component="h2" style={checkboxColor}>
                  {props.course.name}
              </Typography>
            </Box>
            <Box>
              <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">When?</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedDate}
                      onChange={handleDateChange}
                  >
                  {props.course.dates.map(date => (
                      <MenuItem key={date} value={date}>
                          {date}
                      </MenuItem>
                  ))}
                  </Select>
              </FormControl>
            </Box>
            <Box>
              <Tooltip title={props.course.description}>
                <IconButton>
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
            <Typography className={classes.pos} color="textSecondary">
                Gmush: {props.course.gmush}
            </Typography>
        </CardContent>
        </Card>
    </Box>
  );
}

export default OutlinedCard