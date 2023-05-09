import "../styles/Modal.css";
import { AiFillCloseCircle } from "react-icons/ai";

function Modal( { text, isOpen, handleDeleteActivity, handleCancelDelete } ) {
  return (
    <article className={`article ${isOpen && "is-open"}`}>
      <div className="modal">
        <button className="btn-close" onClick={handleCancelDelete}><AiFillCloseCircle className="icon-close"/></button>
        <div className="text-container">
          <span>{text}</span>
        </div>
        <div className="btn-container">
          <button onClick={handleDeleteActivity}>SI</button>
          <button onClick={handleCancelDelete}>NO</button>
        </div>
      </div>
    </article>
  );
}

export default Modal;
