import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { render } from 'react-dom';
import Worlds from '../components/Worlds';
import worlds from '../data/worldsList';

class WorldsList extends Component {
  render() {
    const worldsList = (
      <div>
        <Worlds worlds={worlds} />
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
