import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyInputText from "../../../app/common/form/myInputText";
import MyTextArea from "../../../app/common/form/myTextArea";
import MySelectText from "../../../app/common/form/MySelectText";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

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
    date: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  /*function handleSubmit() {
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

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }*/

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(value) => console.log(value)}
      >
        {({ values: activity, handleSubmit }) => (
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
            <MyInputText placeholder="Date" name={"date"} />
            <MyInputText placeholder="City" name={"city"} />
            <MyInputText placeholder="Venue" name={"venue"} />
            <Button
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
