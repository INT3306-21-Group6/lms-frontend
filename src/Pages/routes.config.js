import CoursePage from "./CoursePage";
import HomePage from "./HomePage";
import CourseDetailPage from "./course-detail-page";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const routes = [
  { path: "/home", component: HomePage },
  { path: "/signin", component: SignIn },
  { path: "/courses", component: CoursePage },
  { path: "/course/:id", component: CourseDetailPage },
  { path: "/signup", component: SignUp },
];

export default routes;
