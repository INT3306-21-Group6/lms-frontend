import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import UserButton from './user-button/user-button';
import MenuBar from './MenuBar/menu-bar';

const useStyle = makeStyles((theme) => ({
  title: {
    flexGrow: 0,
  },

  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },

  endPoint: {
    flexGrow: 1,
  },

  navigationButton: {
    margin: '10px 10px',
  },

}));

export default function NavBar() {
  const classes = useStyle();

  const [isLoggedIn, setLoginStatus] = useState(false);

  return (
    <div>
      <div className={classes.root}>
        <AppBar color="primary" position="sticky">
          <Toolbar>
            <MenuBar isLoggedIn={isLoggedIn} />
            <Typography className={classes.title} variant="h6">Learning System</Typography>
            <div className={classes.endPoint} />
            <UserButton isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus} />
          </Toolbar>
        </AppBar>
      </div>
      <br />
    </div>
  );
}
