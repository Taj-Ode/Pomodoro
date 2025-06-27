interface TaskProps {
  title: string;
  area: string;
  timeAlloted: number; // in minutes
}

const Task = (props: TaskProps) => {
  return (
    <div className="task">
      <h2>{props.title}</h2>
      <h3>{props.area}</h3>
      <p>Time alloted: {props.timeAlloted} minutes</p>
    </div>
  );
};

export default Task;
