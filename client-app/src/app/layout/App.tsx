import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./navbar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import LoadingComponent from "./loadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const{activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Page" />;

  return (
    <>
      <NavBar  />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard />
      </Container>
    </>
  );
}

export default observer(App);
