import React from "react";

// import PropTypes from "prop-types";
import { Link } from "@reach/router"

const Logged = ({ authedUser }) => (
  <div>
    Hello {authedUser}
    <Link to="/signin">Sign out</Link>
  </div>
);

// Logged.PropTypes = {
  
// };


export default Logged;

