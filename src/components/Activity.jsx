import "../styles/Activity.css";
import { AiFillDelete } from "react-icons/ai";

function Activity({ id, text, completed, activityCompleted, handleShowModal }) {

  return (
    <div
      className={
        completed ? "container-activity completed" : "container-activity"
      }
    >
      <div className="activity-text" onClick={() => activityCompleted(id)}>{text}</div>
      <div className="activity-icon" onClick={() => handleShowModal(id)}>
        <AiFillDelete className="delete-icon"/>
      </div>
    </div>
  );
}

export default Activity;
