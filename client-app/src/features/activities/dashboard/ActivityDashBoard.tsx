import { observer } from "mobx-react-lite";
import * as React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/activityDetalis";
import ActivityForm from "../form/activityForm";
import ActivityList from "./ActivityList";



function ActivityDashBoard() {

  const {activityStore} = useStore();
  const {selectedActivity, editMode} = activityStore;

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
