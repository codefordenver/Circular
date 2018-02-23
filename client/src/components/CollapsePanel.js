import React from 'react';
import { Panel } from 'react-bootstrap';

const CollapsePanel = props => (
  <Panel bsStyle="remove-default">
    <Panel.Toggle className="collapse-panel-toggle">
      <Panel.Heading className="bg-green-color">
        <Panel.Title className="collpase-panel-title" toggle>
          {props.titleText}
          <i className="fa fa-chevron-down float-right" />
        </Panel.Title>
      </Panel.Heading>
    </Panel.Toggle>
    <Panel.Collapse>
      <Panel.Body>{props.body}</Panel.Body>
    </Panel.Collapse>
  </Panel>
);

export default CollapsePanel;
