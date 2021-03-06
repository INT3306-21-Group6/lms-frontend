import {
  Divider,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import PersonPinRoundedIcon from "@material-ui/icons/PersonPinRounded";
import { toast } from "react-toastify";

import CourseCardLarge from "../../../../Components/common-components/course-card/course-card-large";
import OverviewComponent from "../../../../Components/common-components/course-detail-components/overview-component/overview-component";
import AssignmentsComponent from "../../../../Components/common-components/course-detail-components/assignments-component/assignments-component";
import DocumentComponent from "../../../../Components/common-components/course-detail-components/document-component/document-component";
import ContactComponent from "../../../../Components/common-components/course-detail-components/contact-component/contact-component";
import getAssignmentsList from "../../../../api/graphql/get-assignments-list";
import getCourseHost from "../../../../api/graphql/get-course-host";
import getCourseDetails from "../../../../api/graphql/get-course-details";
import toastFetchErrors from "../../../../Components/tools/toast-fetch-errors";

const StudentCourseDetailPage = () => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState(id);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseHostId, setCourseHostId] = useState(0);
  const [host, setHost] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthday: "",
    address: "",
  });
  const [tabPosition, setTabPosition] = useState(0);

  const [assignments, setAssignments] = useState([]);

  const fetchCourseHost = async () => {
    try {
      const result = await getCourseHost(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setHost({
          firstName: parsedResult.data.course.host.firstName,
          lastName: parsedResult.data.course.host.lastName,
          phone: parsedResult.data.course.host.phone,
          email: parsedResult.data.course.host.email,
          birthday: parsedResult.data.course.host.birthday,
          address: parsedResult.data.course.host.address,
        });
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchCourseDetails = async () => {
    try {
      let result = await getCourseDetails(parseInt(courseId, 10));
      result = JSON.parse(result);
      if (result.data) {
        setCourseName(result.data.course.name);
        setCourseDescription(result.data.course.description || "");
        setCourseHostId(result.data.course.host.userId);
      } else {
        toastFetchErrors(result);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchAssignments = async () => {
    try {
      const result = await getAssignmentsList(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setAssignments(parsedResult.data.assignmentList.assignmentList);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchCourseDetails();
      await fetchCourseHost();
      await fetchAssignments();
      setLoading(false);
    };
    fetchContent();
  }, []);

  const RenderComponent = (
    <>
      <CourseCardLarge
        courseName={courseName}
        courseId={courseId}
        courseLecturer={
          host.firstName && host.lastName
            ? `${`${host.lastName} ${host.firstName}`}`
            : "Lecturer has...no name?"
        }
      />
      <br />
      <Tabs
        variant="scrollable"
        value={tabPosition}
        onChange={(event, newPos) => setTabPosition(newPos)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <SubjectRoundedIcon />
              &nbsp; Overview
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <DescriptionRoundedIcon />
              &nbsp; Documents
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <BorderColorRoundedIcon />
              &nbsp; Assignments
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ForumRoundedIcon />
              &nbsp; Forum
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", flexDirection: "row" }}>
              <PersonPinRoundedIcon />
              &nbsp; Contact
            </div>
          }
        />
      </Tabs>
      <br />
      {(() => {
        switch (tabPosition) {
          case 0:
            return <OverviewComponent currentDescription={courseDescription} />;
          case 1:
            return <DocumentComponent />;
          case 2:
            return (
              <AssignmentsComponent assignments={assignments} courseId={id} />
            );
          case 3:
            history.push(`/course/${courseId}/forum`);
            break;
          case 4:
            return <ContactComponent user={host} />;
          default:
            return null;
        }
      })()}
    </>
  );

  return <>{isLoading ? <LinearProgress /> : RenderComponent}</>;
};

export default StudentCourseDetailPage;
