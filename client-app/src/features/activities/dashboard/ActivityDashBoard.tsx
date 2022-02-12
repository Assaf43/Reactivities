import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/activityDetalis";
import ActivityForm from "../form/activityForm";
import ActivityList from "./ActivityList";



function ActivityDashBoard() {

  const {activityStore} = useStore();
  const {selectedActivity, editMode , loadingInitial} = activityStore;
  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (loadingInitial) return <LoadingComponent content="Loading Page" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashBoard);
