import { graphQLFetch } from "./graphql-fetch";

// eslint-disable-next-line import/prefer-default-export
const getTeacherCourseList = async (hostId, pageNumber, pageSize, order) => {
  const query = `
  query getTeacherCourseList($hostId: Int!, $pageNumber: Int = 0, $pageSize: Int = 5, $order: [[String!]!]) {
    courseList (hostId: $hostId, pageSize: $pageSize, pageNumber: $pageNumber, order: $order) {
      courseList {
        courseId
        host {
          userId
          username
          role
          firstName
          lastName
          phone
          address
          email
          birthday
          pictureUrl
        }
        name
        description
        shortDescription
        createAt
        updateAt
      }
      totalRecords
      pageNumber
      totalPages
    }
  }
`;
  const vars = {
    hostId,
    pageNumber,
    pageSize,
    order,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getTeacherCourseList;
