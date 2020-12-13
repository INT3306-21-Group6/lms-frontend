import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import deleteCourseById from '../../api/graphql/deleteCourseById';

export function TeacherCourseCard({ course }) {
  const classes = useStyles();

  const backGroundArr = [
    classes.greenBack,
    classes.blueBack,
    classes.yellowBack,
  ];
  const backGround = backGroundArr[Math.floor(Math.random() * 3)];
  console.log({ backGround });
  const linkToForum = `/course/${course.courseId}/forum`;
  const deleteCourse = async () => {
    try {
      const courseName = course.name;
      const result = await deleteCourseById(course.courseId);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success(`Delete Course: ${courseName} Successfully`, {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };
  return (
    <Box mt={10}>
      <Container className={backGround} maxWidth="md">
        <Box className={classes.courseCard}>
          <Box pt={3} pb={1}>
            <Typography variant="button">Course</Typography>
          </Box>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} lg={6} className={classes.bodyCourse}>
              <Link>
                <Typography
                  variant="h5"
                  color="primary"
                  className={`${classes.fw700} ${classes.blackText}`}
                >
                  {course.name}
                </Typography>
              </Link>
              <Typography variant="body2">
                {course.description.substring(0, 200) + '...'}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} container justify="flex-end">
              <Grid item xs={0} lg={6}>
                <Box className={classes.whiteBack}></Box>
              </Grid>
              <Grid item xs={12} lg={6} container justify="center">
                <Button variant="contained" fullWidth={Boolean(true)}>
                  Go to Course
                </Button>
                <br />
                <Grid item>
                  <Box py={3}>
                    <Link to={linkToForum}>
                      <Typography
                        classname={classes.center}
                        variant="body1"
                        className={classes.blackText}
                      >
                        Go to forum
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth"></Divider>
            </Grid>
            <Grid
              container
              style={{ marginBlock: 10 }}
              className={classes.dFlex}
              justify="flex-end"
            >
              <Box mr={2}>
                <Button size="small" color="primary" variant="contained">
                  Edit
                </Button>
              </Box>
              <Box mr={0}>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={deleteCourse}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  whiteBack: {
    backgroundColor: '#ffffff',
  },
  blueBack: {
    backgroundColor: '#1e94eb',
  },
  yellowBack: {
    backgroundColor: '#f3c800',
  },
  greenBack: {
    backgroundColor: '#00d2a1',
  },
  bodyCourse: {
    height: 170,
  },
  fw700: {
    fontWeight: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  center: {
    margin: 'auto',
  },
  courseCard: {
    marginBottom: '28px',
    color: '#1f1f1f',
  },
  dFlex: {
    display: 'flex',
    marginBlock: 'auto',
  },
  blackText: {
    color: '#1f1f1f',
  },
  fw700: {
    fontWeight: 700,
  },
}));
