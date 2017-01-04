import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { render } from 'react-dom';
import Worlds from '../components/Worlds';
import worlds from '../data/worlds';

class WorldsList extends Component {
  constructor(props) {
    super(props)

    this.worlds = Object.keys(worlds).map((id) => {
      return Object.assign({}, worlds[id], {id: id});
    });

    this.worlds.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  render() {
    const worldsList = (
      <div>
        <Worlds worlds={this.worlds} />
      </div>
    );

    return (
      <Grid>
        {worldsList}
      </Grid>
    );
  }
};

export default WorldsList
