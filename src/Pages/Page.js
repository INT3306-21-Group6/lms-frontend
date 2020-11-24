import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import { NavBar } from "../Components";
import Footer from "../Components/Footer/Footer";
import routes from "./routes.config";
import "./style.css";

// export default function Page() {
//   return (
//     <>
//       <NavBar />
//       <br />
//       <Container maxWidth="lg">
//         <Switch>
//           <Redirect exact from="/" to="home" />
//           {routes.map((route) => (
//             // eslint-disable-next-line react/jsx-props-no-spreading
//             <Route {...route} key={route.path} />
//           ))}
//         </Switch>
//       </Container>
//       <Footer />
//     </>
//   );
// }

const withContainer = (component) => (
  <Container maxWidth="lg">{component()}</Container>
);

function route(route) {
  const { hasContainer, component, path } = route;
  const content = hasContainer ? () => withContainer(component) : component;
  return <Route key={path} component={content} path={path} />;
}

export default function Page() {
  return (
    <>
      <NavBar />
      <br />
      <Switch>
        <Redirect exact from="/" to="/home" />
        {routes.map(route)}
      </Switch>
      <Footer />
    </>
  );
}
