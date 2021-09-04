// to make the website not reload everytime we click a link:
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default About;
