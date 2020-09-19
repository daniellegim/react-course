import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
  },
  pos: {
    marginLeft: theme.spacing(5)
  },
  formControl: {
    minWidth: 100,
    marginLeft: theme.spacing(5)
  },
}));

function OutlinedCard(props) {
  const classes = useStyles();

  const handleCheckboxChange = () => {
    console.log("hi")
  }

  return (
      <Box display="flex" justifyContent="center">
        <Card className={classes.root} variant="outlined">
        <CardContent>
            <Box display="flex" flexDirection="row">
                <Checkbox
                    // checked={checked}
                    onChange={handleCheckboxChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography variant="h5" component="h2">
                    {props.course.name}
                </Typography>
            </Box>
            <Typography className={classes.pos} color="textSecondary">
                {props.course.description}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                Gmush: {props.course.gmush}
            </Typography>
            <Typography variant="body2" component="p">
              <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">When?</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                  // onChange={handleChange}
                  >
                  {props.course.dates.map(date => (
                      <MenuItem key={date} value={date}>
                          {date}
                      </MenuItem>
                  ))}
                  </Select>
              </FormControl>
            </Typography>
        </CardContent>
        </Card>
    </Box>
  );
}

export default OutlinedCard