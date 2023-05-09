import ActivityForm from "./ActivityForm";
import Activity from "./Activity";
import "../styles/ActivityList.css";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [countCompleted, setCountCompleted] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [totalTasks, setTotalTasks] = useState(activities.length);
  
  useEffect(() => {
    let data = localStorage.getItem("activities");
    if(data){
      setActivities(JSON.parse(data));
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);


  const handleDeleteActivity = () => {
    const updateActivities = activities.filter(activity => activity.id !== activityToDelete);
    setActivities(updateActivities);
    setShowModal(false);
    setActivityToDelete(null);
    const isCompleted = updateActivities.find(x => x.completed === true);
    if(isCompleted){
      setCountCompleted(countCompleted - 1);
    }

    setTotalTasks(Math.max(totalTasks - 1, 0));
  };
  
  const handleShowModal = (id) => {
    setShowModal(true);
    setActivityToDelete(id);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };
  
  const addActivity = (activity) => {
    if (activity.text.trim()) {
      activity.text = activity.text.trim();
      const updateActivities = [activity, ...activities];
      setActivities(updateActivities);
    }
  };

  const activityCompleted = (id) => {
    const updateActivities = activities.map((activity) => {
      if (activity.id === id) {
        activity.completed = !activity.completed;
        activity.completed
          ? setCountCompleted(countCompleted + 1)
          : setCountCompleted(countCompleted - 1);
      }
      return activity;
    });
    setActivities(updateActivities);
  };

  return (
    <>
      <div className="container-activities">
        <ActivityForm onSubmit={addActivity} />
      </div>
      {activities.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Aún no hay actividades
        </h2>
      ) : (
        activities.map((activity) => (
          <Activity
            key={activity.id}
            id={activity.id}
            text={activity.text}
            completed={activity.completed}
            activityCompleted={activityCompleted}
            handleShowModal={handleShowModal}
          />
        ))
      )}

      <div className="container-activities-count">
        <span>
          {countCompleted}/{activities.length}
        </span>
      </div>

      {
        showModal &&
        <Modal 
          text="¿Deseas eliminar la tarea?"
          isOpen={showModal}
          handleDeleteActivity={handleDeleteActivity}
          handleCancelDelete={handleCancelDelete}
        />
      }
    </>
  );
}

export default ActivityList;
