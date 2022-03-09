import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyInputText from "../../../app/common/form/myInputText";
import MyTextArea from "../../../app/common/form/myTextArea";
import MySelectText from "../../../app/common/form/MySelectText";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/myDateInput";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    loadingInitial,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is reqired").nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: null,
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(value) => handleFormSubmit(value)}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete={"off"}
          >
            <MyInputText placeholder="Title" name={"title"} />
            <MyTextArea
              placeholder="Description"
              name={"description"}
              rows={3}
            />
            <MySelectText
              option={categoryOptions}
              placeholder="Catgory"
              name={"category"}
            />
            <MyDateInput
              placeholderText="Date"
              name={"date"}
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d, yyyy hh:m aa"}
            />
            <Header content="Location Details" sub color="teal" />
            <MyInputText placeholder="City" name={"city"} />
            <MyInputText placeholder="Venue" name={"venue"} />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={"/activities"}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
