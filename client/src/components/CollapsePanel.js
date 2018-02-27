import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const CollapsePanel = props => (
  <Panel bsStyle="remove-default" className="collapse-panel">
    <Panel.Toggle className="collapse-panel-toggle">
      <Panel.Heading className="bg-green-color">
        <Panel.Title className="collpase-panel-title" toggle>
          {props.titleText}
          <i className="fa fa-chevron-down float-right" />
        </Panel.Title>
      </Panel.Heading>
    </Panel.Toggle>
    <Panel.Collapse>
      <Panel.Body className="text-black ">{props.body}</Panel.Body>
    </Panel.Collapse>
  </Panel>
);

CollapsePanel.propTypes = {
  titleText: PropTypes.string.isRequired,
  body: React.PropTypes.element.isRequired
};

export default CollapsePanel;
