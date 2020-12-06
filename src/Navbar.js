import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid'
import { Link } from "react-router-dom"
import { useUser } from './UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  menuTitle: {
    margin: theme.spacing(1)
  }
}));

function Navbar() {
  const classes = useStyles()

  const user = useUser()

  const [value, setValue] = useState()
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#d500f9", borderRadius: 35 }}>
        <Grid container>
          <Grid item>
            <Toolbar variant="dense">
              <IconButton onClick={e => handleChange(e, "")} component={Link} to="/coursePage" edge="start" className={classes.menuButton} color="inherit">
                  <HomeIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.menuTitle}>
                  { "Hello " + user.name.split(' ')[0]}
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={7}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              centered
            >
              <Tab label="Courses I've done" component={Link} to="/pastCourses"/>
              <Tab label="My profile"  component={Link} to="/profile"/>
              <Tab label="Future courses" component={Link} to="/futureCourses"/>
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default Navbar
