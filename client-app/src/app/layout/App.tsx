import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./navbar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/homePage";
import activityForm from "../../features/activities/form/activityForm";
import ActivityDetails from "../../features/activities/details/activityDetalis";
import TestErrors from "../../features/errors/testError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/notFound";
import ServerError from "../../features/errors/serverError";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path={"/"} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path={"/activities"}
                  component={ActivityDashBoard}
                />
                <Route path={"/activities/:id"} component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={activityForm}
                />
                <Route path={"/errors"} component={TestErrors} />
                <Route path={"/server-error"} component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
