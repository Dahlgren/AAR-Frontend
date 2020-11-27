import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap'
import FieldGroup from './FieldGroup'

const FILTER_LENGTH = [
  {
    title: 'All',
    value: 0
  },
  {
    title: '10 minutes',
    value: 600
  },
  {
    title: '1 hour',
    value: 3600
  }
]

export default class MissionsFilter extends Component {
  setLength (length) {
    const { name, world } = this.props
    this.props.setFilter({
      length,
      name,
      world
    })
  }

  setName (event) {
    const { length, world } = this.props
    const name = event.target.value
    this.props.setFilter({
      length,
      name,
      world
    })
  }

  setWorld (event) {
    const { length, name } = this.props
    const world = event.target.value
    this.props.setFilter({
      length,
      name,
      world
    })
  }

  render () {
    const { length, name, world, worlds } = this.props

    const filterName = (
      <FieldGroup
        id='name'
        type='text'
        label='Name'
        onChange={this.setName.bind(this)}
        placeholder='Enter mission name to filter'
        value={name}
      />
    )

    const filterWorld = (
      <FieldGroup
        id='world'
        as='select'
        label='World'
        onChange={this.setWorld.bind(this)}
        value={world}
      >
        <option value=''>Any</option>
        {worlds.map(world => <option key={world.name} value={world.name}>{world.title}</option>)}
      </FieldGroup>
    )

    const filterLength = (
      <Form.Group>
        <Form.Label>Minimum Length</Form.Label>
        <ButtonGroup justified className='form-control-static' style={{ padding: 0 }}>
          {FILTER_LENGTH.map(({ title, value }) => {
            return (
              <ButtonGroup key={value}>
                <Button
                  active={value === length}
                  onClick={this.setLength.bind(this, value)}
                >{title}
                </Button>
              </ButtonGroup>
            )
          })}
        </ButtonGroup>
      </Form.Group>
    )

    return (
      <Form>
        <Row>
          <Col sm={4}>
            {filterName}
          </Col>
          <Col sm={4}>
            {filterWorld}
          </Col>
          <Col sm={4}>
            {filterLength}
          </Col>
        </Row>
      </Form>
    )
  }
}

MissionsFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  world: PropTypes.string.isRequired
}
