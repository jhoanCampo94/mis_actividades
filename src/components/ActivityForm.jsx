import { useState } from "react";
import "../styles/ActivityForm.css";
import { v4 as uuidv4 } from "uuid";

function ActivityForm(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: uuidv4(),
      text: input,
      completed: false,
    };

    props.onSubmit(newActivity);
    setInput("");
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <input
        className="activity-input"
        type="text"
        placeholder="Ingresa tu actividad"
        value={input}
        onChange={handleChange}
      />
      <button className="activity-btn">Agregar</button>
    </form>
  );
}

export default ActivityForm;
