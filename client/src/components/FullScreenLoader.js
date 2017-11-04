import React from 'react';
import { Link } from 'react-router';

const FullScreenLoader = (props) => {
const {loaderText} = props;
	return (
	<div className="fullscreen_loader_wrapper">
		<div className="loader_content">
		<h1 className="loader_message">{loaderText}</h1>
		<div className="loader_spinner_lg">
		<i className="fa fa-recycle fa-4x fa-spin" />
		</div>
		</div>
  </div>)
};

export default FullScreenLoader;