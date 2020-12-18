//! DO.NOT.READ.THIS.CODE!!!
//! IT.IT.VERY.UNOPTIMIZED.AND.REQUIRES.REFACTOR...
//! (but it still runs fast tho...)
//! "PROUDLY".WRITTEN.BY.NHAT.LE.QUANG...
import React, { useEffect, useState } from 'react';
import {
  Menu,
  MenuItem,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  LinearProgress,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import MemberStatusButton from './member-status-button/member-status-button';
import updateCourseMember from '../../../api/graphql/update-course-member';
import getCourseMemberList from '../../../api/graphql/get-course-member-list';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CourseMembersComponent = ({ courseId }) => {
  const classes = useStyles();

  const [enrolledMembers, setEnrolledMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [rejectedMembers, setRejectedMembers] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  //* Current member id for menu (different scope and is required for status update)
  const [currentMemberId, setCurrentMemberId] = useState();

  const fetchMembers = async (status) => {
    try {
      const result = await getCourseMemberList(parseInt(courseId, 10), status);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data.courseMemberList) {
        switch (status) {
          case 'Accepted':
            setEnrolledMembers(parsedResult.data.courseMemberList.memberList);
            break;
          case 'Pending':
            setPendingMembers(parsedResult.data.courseMemberList.memberList);
            break;
          case 'Rejected':
            setRejectedMembers(parsedResult.data.courseMemberList.memberList);
            break;
          default:
            break;
        }
      } else {
        const { errors } = parsedResult;
        errors.forEach((error) => {
          toast(error.message, {
            type: 'error',
            autoClose: 5000,
          });
        });
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchAllMembers = async () => {
    await fetchMembers('Accepted');
    await fetchMembers('Pending');
    await fetchMembers('Rejected');
  };

  const handleStatusButtonClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentMemberId(parseInt(id, 10));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (event) => {
    const { status } = event.currentTarget.dataset;
    setLoading(true);
    const result = await updateCourseMember(currentMemberId, status);
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      if (parsedResult.data.updateCourseMember.success) {
        fetchAllMembers();
      } else {
        toast(`Cannot update status for course member with id ${currentMemberId}.`, {
          type: 'error',
          autoClose: 3000,
        });
      }
      setLoading(false);
    }
    handleClose();
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchAllMembers();
      setLoading(false);
    };
    fetch();
  }, []);

  // TODO: Show member's profile pic instead of icons.
  const MemberRows = (members, status) => {
    return members.map((member) => (
      <TableRow hover>
        <TableCell>{member.courseMemberId}</TableCell>
        <TableCell>{member.user.firstName || 'No Firstname'}</TableCell>
        <TableCell>{member.user.lastName || 'No Lastname'}</TableCell>
        <TableCell>{member.user.username}</TableCell>
        <TableCell>
          <MemberStatusButton
            status={status}
            onClick={(event) => handleStatusButtonClick(event, member.courseMemberId)}
          />
        </TableCell>
      </TableRow>
    ));
  };

  const RenderComponent = (
    <>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        // Render Menu under current button
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-status="Accepted" onClick={(event) => handleStatusChange(event)}>Accepted</MenuItem>
        <MenuItem data-status="Pending" onClick={(event) => handleStatusChange(event)}>Pending</MenuItem>
        <MenuItem data-status="Rejected" onClick={(event) => handleStatusChange(event)}>Rejected</MenuItem>
      </Menu>
      <div className="members-table">
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Enroll Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MemberRows(enrolledMembers, 'Accepted')}
              {MemberRows(pendingMembers, 'Pending')}
              {MemberRows(rejectedMembers, 'Rejected')}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h3">Members</Typography>
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

export default CourseMembersComponent;
