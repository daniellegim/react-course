import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

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
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#d500f9", borderRadius: 35 }}>
        <Grid container>
          <Grid item>
            <Toolbar variant="dense">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <HomeIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.menuTitle}>
                  Hello
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={9}>
            {/* <Tabs
              //value={value}
              //onChange={handleChange}
              // indicatorColor="primary"
              // textColor="primary"
              centered
            >
              {/* <Route path="/profile" component={Profile}>profile</Route> */}
              {/* <Tab label="Item One" />
              <Tab label="My profile" />
              <Tab label="Item Three" />
            </Tabs> */}
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default Navbar
