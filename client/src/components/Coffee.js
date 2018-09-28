import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEspressos } from '../actions/espressosActions';

class Coffee extends Component {
  // Get id from url
  originId = this.props.location.pathname.split('/')[2]
  
  componentDidMount() {
    this.props.fetchEspressos(this.originId)
  }

  render() {
    return (
      <div>
        <p>Coffee Show Page {this.originId}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    espressos: state.espressos.espressos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEspressos: originId => {
      dispatch(fetchEspressos(originId))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Coffee);
