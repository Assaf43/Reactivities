import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./navbar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/homePage";
import activityForm from "../../features/activities/form/activityForm";
import ActivityDetails from "../../features/activities/details/activityDetalis";

function App() {

  return (
    <>
      <NavBar  />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/activities'} component={ActivityDashBoard} />
        <Route path={'/activities/:id'} component={ActivityDetails} />
        <Route path={'/createActivity'} component={activityForm} />
      </Container>
    </>
  );
}

export default observer(App);
