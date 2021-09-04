import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";
const Header = ({ title, isShowAddTask, onAdd, onClickUndo, tasksLeft }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>

      {location.pathname === "/" && (
        <container className="header-buttons">
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
        </container>
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
