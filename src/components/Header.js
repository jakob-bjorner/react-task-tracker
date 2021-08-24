import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({ title, onClickUndo, tasksLeft }) => {
  const onClick = () => console.log("heyyy");
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Add" onClick={onClick} />
      {tasksLeft > 1 ? (
        <Button color="blue" text="Undo" onClick={onClickUndo} />
      ) : (
        <h2>Nothing to Undo</h2>
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
