import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { render } from 'react-dom';

export default class FieldGroup extends Component {
  render() {
    const { id, label, help } = this.props

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...this.props}>{this.props.children}</FormControl>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}
