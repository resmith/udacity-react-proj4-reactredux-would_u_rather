import React from "react";
import PropTypes from "prop-types";

const TitleBar = ({ title }) => {
  return <div className="TitleBar">{title}</div>;
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleBar;
