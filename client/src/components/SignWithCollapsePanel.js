import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const CollapsePanel = props => (
  <Panel bsStyle="remove-default" className="login-button-signature sign-with-email">
    <Panel.Toggle className="collapse-panel-toggle">
      <Panel.Heading className="text-white">
        <Panel.Title className="sign-collpase-panel-title" toggle>
          {props.titleText}
          <i className="fa fa-envelope float-right" />
        </Panel.Title>
      </Panel.Heading>
    </Panel.Toggle>
    <Panel.Collapse>
      <Panel.Body>{props.body}</Panel.Body>
    </Panel.Collapse>
  </Panel>
);

CollapsePanel.propTypes = {
  titleText: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired
};

export default CollapsePanel;
