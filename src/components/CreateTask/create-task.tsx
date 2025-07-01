import { useState, useRef } from "react";
import styles from "./create-task.module.css";

interface CreateTaskProps {
  onCreate: (task: { title: string; area: string; minutes: number }) => void;
}

const CreateTask = ({ onCreate }: CreateTaskProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = titleRef.current?.value.trim();
    const area = areaRef.current?.value.trim() || "";
    const minutes = Number(minutesRef.current?.value || 25); //default to 25 minutes

    if (!title) return; // Prevent submission if title is empty

    onCreate({ title, area, minutes });

    if (titleRef.current) titleRef.current.value = "";
    if (areaRef.current) areaRef.current.value = "";
    if (minutesRef.current) minutesRef.current.value = "25";
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">
          Task Name:
          <input
            ref={titleRef}
            type="text"
            name="title"
            placeholder="Task name"
          />
        </label>
        <label htmlFor="area">
          Area:
          <input
            ref={areaRef}
            type="text"
            name="area"
            placeholder="e.g. Deep work, Admin, Health"
          />
        </label>
        <label htmlFor="minutes">
          Duration (minutes):
          <input
            ref={minutesRef}
            type="number"
            name="minutes"
            defaultValue={25}
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
