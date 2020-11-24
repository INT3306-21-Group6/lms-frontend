import CoursePage from "./CoursePage";
import HomePage from "./HomePage";
import CourseDetailPage from "./course-detail-page";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForumPage from "./ForumPage";

const routes = [
  { path: "/home", component: HomePage, hasContainer: true },
  { path: "/signin", component: SignIn, hasContainer: true },
  { path: "/courses", component: CoursePage, hasContainer: true },
  { path: "/course/:id", component: CourseDetailPage, hasContainer: true },
  { path: "/signup", component: SignUp, hasContainer: true },
  { path: "/forum", component: ForumPage, hasContainer: false },
];

export default routes;
