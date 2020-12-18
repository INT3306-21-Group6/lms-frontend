import {
  LinearProgress,
  makeStyles, Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import AddAssignmentComponent from './add-assignment-component/add-assignment-component';
import EditAssignmentComponent from './edit-assignment-component';
import AssignmentItem from './assignment-item/assignment-item';
import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import toastFetchErrors from '../../../tools/toast-fetch-errors';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  assignmentItem: {
    width: '100%',
  },
}));

const AssignmentsComponent = ({ courseId }) => {
  const classes = useStyles();
  const role = localStorage.getItem('role');

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchAssignments = async () => {
    try {
      const result = await getAssignmentsList(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setAssignments(parsedResult.data.assignmentList.assignmentList);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (err) {
      toast.error(err.toString());
    }
  };

  const fetch = async () => {
    setLoading(true);
    await fetchAssignments();
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const RenderComponent = (
    <div className="assignments">
      {role === 'Teacher' ? <AddAssignmentComponent courseId={courseId} fetchAssignments={fetch} /> : null}
      {
        role === 'Student'
          ? (
            <div className={classes.assignmentItem}>
              {assignments.map((assignment) => (
                <AssignmentItem assignment={assignment} key={assignment.assignmentId} />
              ))}
            </div>
          )
          : (
            <div className={classes.editAssignmentItem}>
              {assignments.map((assignment) => (
                <>
                  <EditAssignmentComponent assignment={assignment} key={assignment.assignmentId} />
                  <br />
                </>
              ))}
            </div>
          )
      }

    </div>
  );

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h3">Assignments</Typography>
      </div>
      <hr />
      {
        isLoading
          ? <LinearProgress />
          : RenderComponent
      }
    </>
  );
};

export default AssignmentsComponent;
