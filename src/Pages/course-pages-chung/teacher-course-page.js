import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { TeacherCourseCard } from './TeacherCourseCard';
import { toast } from 'react-toastify';
import getTeacherCourseList from '../../api/graphql/get-teacher-course-list.js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import { Recommend } from './Recommend';
import Pagination from '@material-ui/lab/Pagination';
import { NewCourseBox } from './NewCourseBox';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function abcSort(arr) {
  arr.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

function oldestSort(arr) {
  arr.sort(function (a, b) {
    return a.updateAt > b.updateAt;
  });
}

export default function CoursePage() {
  const [isLoading, setLoading] = useState(false);
  const hostId = parseInt(localStorage.getItem('userId'), 10);
  const [courses, setCourses] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  const pageSize = 5;
  const handlePagination = (event, pageNum) => {
    setPageNumber(pageNum);
    const fetchContent = async () => {
      // setLoading(true);
      if (value == 0) {
        await fetchTeacherCourse(pageNum - 1, pageSize);
        window.scrollTo(0, 900);
      } else if (value == 1 || value == 2) {
        await fetchTeacherCourse(pageNum - 1, pageSize);
        window.scrollTo(0, 100);
      }
      // setLoading(false);
    };
    fetchContent();
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const fetchTeacherCourse = async () => {
    try {
      const result = await getTeacherCourseList(hostId);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.courseList.courseList.length !== 0) {
          setCourses(parsedResult.data.courseList.courseList);
          setTotalPage(parsedResult.data.courseList.totalPages);
        } else {
          toast.error('You have no active courses.');
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };
  const handleSwitchCourseType = (event, newValue) => {
    if (newValue == 0) {
      // setTotalPage(totalPageAllCourses);
    } else if (newValue == 1) {
      // setTotalPage(totalPageIPCourses);
      // oldestSort(courses);
    } else if (newValue == 2) {
      // setTotalPage(totalPagePeCourses);
      abcSort(courses);
    }
    setValue(newValue);
    setPageNumber(1);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchTeacherCourse();
      setLoading(false);
    };
    fetchContent();
  }, []);
  console.log({ courses });
  console.log('Before sort', courses);
  oldestSort(courses);
  console.log('After sort', courses);
  const RenderComponent = (
    <>
      <Box className={classes.root}>
        {/* HEADER */}
        <Box className={classes.header}>
          <Container maxWidth="md">
            <Typography
              variant="h3"
              color="primary"
              gutterBottom
              className={classes.welcome}
            >
              Welcome back!
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* MIDDLE NAV */}
      <Container maxWidth="xl" className={classes.middleNav}>
        <Grid container justify="flex-start">
          <Grid item>
            <Box position="static" color="default">
              <Tabs
                value={value}
                onChange={handleSwitchCourseType}
                indicatorColor="primary"
                variant="fullWidth"
                className={classes.tabs}
              >
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="Oldest" {...a11yProps(1)} />
                <Tab label="ABC" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* COURSE CARD */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* HOME */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* RECOMMEND FOR 3RD YEAR STUDENTS */}
          <Box className={classes.root} py={2}>
            <Container maxWidth="lg">
              <Recommend
                recommendArr={courses}
                title="Might be you want to access"
              />
            </Container>
          </Box>
          <Box className={classes.whiteBack} pt={4}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Container maxWidth="md">
                    <Box mb={-6}>
                      <Grid container justify="center">
                        <Grid item xs={4}>
                          <Box pl={3}>
                            <Typography variant="h5" className={classes.fw700}>
                              All Courses:
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8} container justify="flex-end">
                          <Box pr={3}>
                            <Pagination
                              count={totalPage}
                              page={pageNumber}
                              color="primary"
                              onChange={handlePagination}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                  {courses.map((course) => (
                    <TeacherCourseCard course={course} />
                  ))}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box mt={9}>
                    <NewCourseBox />
                  </Box>
                  {/* <NewPostBox /> */}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </TabPanel>
        {/* IN PROGRESS */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box className={classes.whiteBack}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        Oldest courses first:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8} container justify="flex-end">
                    <Box pr={3}>
                      <Pagination
                        count={totalPage}
                        page={pageNumber}
                        color="primary"
                        onChange={handlePagination}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="lg">
              {courses.map((course) => (
                <TeacherCourseCard course={course} />
              ))}
            </Container>
          </Box>
        </TabPanel>
        {/* PENDING */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box className={classes.whiteBack}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        Sort by alphabet:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8} container justify="flex-end">
                    <Box pr={3}>
                      <Pagination
                        count={totalPage}
                        page={pageNumber}
                        color="primary"
                        onChange={handlePagination}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="lg">
              {courses.map((course) => (
                <TeacherCourseCard course={course} />
              ))}
            </Container>
          </Box>
        </TabPanel>
      </SwipeableViews>

      {/* PAGINATE */}
      <Grid container justify="center">
        <Pagination
          count={totalPage}
          page={pageNumber}
          color="primary"
          onChange={handlePagination}
        />
      </Grid>
    </>
  );

  return <>{isLoading ? <LinearProgress /> : RenderComponent}</>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fa',
  },
  whiteBack: {
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundImage: `url("//s3.amazonaws.com/coursera_assets/logged-in-home/header-bg-alt_optim.png")`,
    backgroundColor: '#d7eef7',
    width: '100%',
    backgroundPosition: 'right 120px center',
    backgroundPositionX: 'right 120px',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundRepeatX: 'no-repeat',
    backgroundRepeatY: 'no-repeat',
    backgroundSize: 'contain',
    height: 150,
  },
  bodyCourse: {
    height: 170,
  },
  fw700: {
    fontWeight: 700,
  },
  welcome: {
    color: '#271066',
    fontSize: '3rem',
    lineHeight: '3.75rem',
    fontWeight: 700,
    paddingTop: 90,
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
    marginTop: '28px',
  },
  middleNav: {
    backgroundColor: '#ffffff',
    width: 950,
  },
  tabs: {
    backgroundColor: '#ffffff',
    fontSize: 14,
    fontWeight: 700,
  },
  newCourse: {
    backgroundColor: '#f5f7fa',
  },
}));
