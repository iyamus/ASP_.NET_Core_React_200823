import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string;
  submitting: boolean;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          submitting={submitting}
          deleteActivity={deleteActivity}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {/*  selectedActivity={selectedActivity!} 
        TypeScript error in C:/Users/iyamu/Documents/DEV/ASP_React/200823/ReactActivity/client-app/src/features/activities/dashboard/ActivityDashboard.tsx(38,62):
Type 'IActivity | null' is not assignable to type 'IActivity'.
  Type 'null' is not assignable to type 'IActivity'.  TS2322
        */}
        {editMode && (
          <ActivityForm
            setEditMode={setEditMode}
            selectedActivity={selectedActivity!}
            createActivity={createActivity}
            editActivity={editActivity}
            key={selectedActivity && (selectedActivity.id || 0)}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
