import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({ title, isShowAddTask, onAdd, onClickUndo, tasksLeft }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      {!isShowAddTask ? (
        <Button color="green" text="Add" onClick={onAdd} />
      ) : (
        <Button color="red" text="Close" onClick={onAdd} />
      )}
      {tasksLeft > 1 ? (
        <Button color="blue" text="Undo" onClick={onClickUndo} />
      ) : (
        <Button color="grey" text="Undo" onClick={null} />
      )}
    </header>
  );
};
// prop types are a built in property for types, which helps with some things.
Header.defaultProps = { title: "Task Tracker" };
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// can use css in js
// const headingStyle = {
//     color: 'red', backgroundColor: 'black'
// }
export default Header;
