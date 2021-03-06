/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  LinearProgress,
  List,
  Typography,
} from '@material-ui/core';

import { toast } from 'react-toastify';
import getTeacherCourseList from '../../api/graphql/get-teacher-course-list.js';
import CourseListView from './course-page-components/course-list-view/course-list-view';
import CourseCardView from './course-page-components/course-card-view/course-card-view';
import SwitchViewButton from './course-page-components/switch-view-button/switch-view-button.js';
import NewCourseButton from './course-page-components/new-course-button/new-course-button.js';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors.js';

export default function CoursePage() {
  const [isLoading, setLoading] = useState(true);
  const [courseView, setCourseView] = useState('list');
  const hostId = parseInt(localStorage.getItem('userId'), 10);
  const [courses, setCourses] = useState([]);

  const fetchTeacherCourse = async () => {
    try {
      const result = await getTeacherCourseList(
        hostId,
      );
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.courseList.courseList.length !== 0) {
          setCourses(parsedResult.data.courseList.courseList);
        } else {
          toast.error('You have no active courses.');
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      await fetchTeacherCourse();
      setLoading(false);
    };
    fetchContent();
  }, []);

  const RenderComponent = (
    <div className="course-list">
      <SwitchViewButton
        courseView={courseView}
        setCourseView={setCourseView}
      />
      <Typography variant="h4">My Courses</Typography>
      <br />
      <NewCourseButton
        fetchTeacherCourse={fetchTeacherCourse}
      />
      <br />
      {
        courseView === 'list'
          ? (
            <List>
              {CourseListView(courses)}
            </List>
          )
          : (
            <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
            >
              {CourseCardView(courses)}
            </Grid>
          )
      }
    </div>
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      {RenderComponent}
    </>
  );
}
