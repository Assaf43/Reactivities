import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

function ActivityDashBoard() {
  const { activityStore } = useStore();
  const { loadActivities, loadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry, loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashBoard);
