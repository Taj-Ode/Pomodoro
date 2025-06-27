import { useState } from "react";
import styles from "./create-task.module.css";

interface CreateTaskProps {
  onCreate: (task: { title: string; area: string; minutes: number }) => void;
}

const CreateTask = ({ onCreate }: CreateTaskProps) => {
  const [details, setDetails] = useState({
    title: "",
    area: "",
    minutes: 25, //default to 25 minutes
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "minutes" ? Number(value) : value.trim(),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!details.title.trim()) return; // Prevent submission if title is empty
    onCreate(details);
    setDetails({ title: "", area: "", minutes: 25 }); // Reset form after submission
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Task Name:
          <input
            type="text"
            name="title"
            value={details.title}
            onChange={handleChange}
            placeholder="Task name"
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={details.area}
            onChange={handleChange}
            placeholder="e.g. Deep work, Admin, Health"
          />
        </label>
        <label>
          Duration (minutes):
          <input
            type="number"
            name="minutes"
            value={details.minutes}
            onChange={handleChange}
            min={1}
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
