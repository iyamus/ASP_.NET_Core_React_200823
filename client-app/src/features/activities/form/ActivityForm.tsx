import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { TextArea } from "../../../app/common/form/TextArea";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import { DateInput } from "../../../app/common/form/DateInput";

interface DetailsParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: selectedActivity,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => selectedActivity && setActivity(selectedActivity)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    match.params.id,
    clearActivity,
    selectedActivity,
    activity.id.length,
  ]);

  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;

  //   setActivity({ ...activity, [name]: value });
  // };

  const handleSubmit = () => {
    // console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  placeholder="Title"
                  value={activity.title}
                  name="title"
                  component={TextInput}
                />
                <Field
                  rows={2}
                  placeholder="Description"
                  value={activity.description}
                  name="description"
                  component={TextArea}
                />
                <Field
                  placeholder="Category"
                  value={activity.category}
                  name="category"
                  options={category}
                  component={SelectInput}
                />
                <Field
                  type="datetime-local"
                  placeholder="Date"
                  value={activity.date!}
                  name="date"
                  component={DateInput}
                />
                <Field
                  placeholder="City"
                  value={activity.city}
                  name="city"
                  component={TextInput}
                />
                <Field
                  placeholder="Venue"
                  value={activity.venue}
                  name="venue"
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  floated="right"
                  type="button"
                  content="Cancel"
                  onClick={() => history.push("/activities")}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
