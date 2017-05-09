import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, ButtonGroup, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Row } from 'react-bootstrap';
import { render } from 'react-dom';
import FieldGroup from './FieldGroup';
import worlds from '../data/worldsList';

const FILTER_LENGTH = [
  {
    title: 'All',
    value: 0,
  },
  {
    title: '1 minute',
    value: 60,
  },
  {
    title: '1 hour',
    value: 3600,
  }
]

export default class MissionsFilter extends Component {
  setLength(length) {
    const { name, world } = this.props
    this.props.setFilter({
      length,
      name,
      world,
    })
  }

  setName(event) {
    const { length, world } = this.props
    const name = event.target.value
    this.props.setFilter({
      length,
      name,
      world,
    })
  }

  setWorld(event) {
    const { length, name } = this.props
    const world = event.target.value
    this.props.setFilter({
      length,
      name,
      world,
    })
  }

  render() {
    const { length, name, world } = this.props;

    const filterName = (
      <FieldGroup
        id="name"
        type="text"
        label="Name"
        onChange={this.setName.bind(this)}
        placeholder="Enter mission name to filter"
        value={name}
      />
    )

    const filterWorld = (
      <FieldGroup
        id="world"
        componentClass="select"
        label="World"
        onChange={this.setWorld.bind(this)}
        value={world}
      >
        <option value=''>Any</option>
        {worlds.map(world => <option key={world.id} value={world.id}>{world.name}</option>)}
      </FieldGroup>
    )

    const filterLength = (
      <FormGroup controlId='length'>
        <ControlLabel>Minimum Length</ControlLabel>
        <ButtonGroup justified className='form-control-static' style={{padding: 0}}>
          {FILTER_LENGTH.map(({title, value}) => {
            return (
              <ButtonGroup key={value}>
                <Button
                  active={value == length}
                  onClick={this.setLength.bind(this, value)}
                >{title}</Button>
              </ButtonGroup>
            );
          })}
        </ButtonGroup>
      </FormGroup>
    )

    return (
      <form>
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
      </form>
    );
  }
}

MissionsFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  world: PropTypes.string.isRequired,
}
