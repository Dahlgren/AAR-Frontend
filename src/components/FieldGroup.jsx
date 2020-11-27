import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class FieldGroup extends Component {
  render () {
    const { id, label, help } = this.props

    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...this.props}>{this.props.children}</Form.Control>
        {help && <Form.Text>{help}</Form.Text>}
      </Form.Group>
    )
  }
}
