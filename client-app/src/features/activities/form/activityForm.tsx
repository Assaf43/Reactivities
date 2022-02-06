import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
}

export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
}: Props) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    console.log(activity);
  }

  function handleOnChangeInput(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete={"off"}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name={"title"}
          onChange={handleOnChangeInput}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name={"description"}
          onChange={handleOnChangeInput}
        />
        <Form.Input
          placeholder="Catgory"
          value={activity.category}
          name={"category"}
          onChange={handleOnChangeInput}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name={"date"}
          onChange={handleOnChangeInput}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name={"city"}
          onChange={handleOnChangeInput}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name={"venue"}
          onChange={handleOnChangeInput}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
