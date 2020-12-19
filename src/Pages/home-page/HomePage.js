import React, {useEffect, useState} from 'react';
import { IconButton, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import PersonIcon from '@material-ui/icons/Person';
import CloudIcon from '@material-ui/icons/Cloud';
import FaceIcon from '@material-ui/icons/Face';
import { getSignedInUser } from './../../api/graphql/get-signedin-user';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  font18: {
    fontSize: 18,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [button, setButton] = useState([]);
  let isMounted = true;

  const fetchUser = async () => {
    try{
      const result = await getSignedInUser();
      const parsedResult = JSON.parse(result);
      console.log({parsedResult});
      if(parsedResult.data){
        setState(parsedResult.data.currentUser.signedIn);
        // console.log(typeof(state), {state});
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
    console.log({state});
    if(state == true) {
      // `console.log`({state});
      setButton(<Button href="/courses" variant="outlined" color="primary">Go to Courses</Button>);
    } else if (state == false) {
      // console.log({state});
      setButton(<Button href="/login" variant="outlined" color="primary">Login</Button>)
    }
  }

  useEffect(() => {
    if(isMounted) fetchUser();
    return () => { isMounted = false; };
  }, [state]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} xs={12} style={{ marginTop: '40px' }}>
        <Grid
          item
          xs={12}
          lg={6}
          container
          alignItems="center"
          justify="center"
          direction="row"
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography item style={{ fontSize: '30px', fontWeight: 'bolder', color: '#4e99e3' }}>LMS</Typography>
            <Typography item style={{ fontSize: '24px', fontWeight: 'bolder', color: '#1c205f' }}>Learning Management System</Typography>
            <Typography item style={{ fontSize: '18px', color: '#000000' }}>Lorem ipsum dolor sit amet.</Typography>
            <div className={classes.root}>
              {/* <Button href="/login" variant="outlined" color="primary">Sign In</Button> */}
              {button}
              <Button href="/signup" variant="outlined" color="primary">Sign Up</Button>
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          container
          alignItems="center"
        >
          <img item src="https://www.hifivework.com/images/bgDiscover.png" style={{ width: '100%' }} />
        </Grid>
        <Grid container style={{ marginTop: '40px' }}>
          <Grid
            item
            xs={12}
            lg={4}
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <IconButton item aria-label="delete">
              <PersonIcon item className={classes.large} />
            </IconButton>
            <Typography item>Group 06 - INT3306 21</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <IconButton item aria-label="delete">
              <CloudIcon item className={classes.large} />
            </IconButton>
            <Typography item>MySQL - Express - ReactJs - NodeJs</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <IconButton item aria-label="delete">
              <FaceIcon item className={classes.large} />
            </IconButton>
            <Typography item>Lecturer: Hoang Xuan Tung</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>

  );
}
