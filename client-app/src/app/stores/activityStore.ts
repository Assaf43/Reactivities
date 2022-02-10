import { makeAutoObservable } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    constructor(){
        makeAutoObservable(this)
    }

    setLoadingAction = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadActivities = async () => {
        this.setLoadingAction(true);
        try {
            const activities = await agent.Activities.list();            
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            });
            this.setLoadingAction(false);

        } catch (error) {
            console.log(error);
            this.setLoadingAction(false);
        }
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }
  
}