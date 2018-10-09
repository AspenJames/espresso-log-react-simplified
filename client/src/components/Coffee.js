import React, { Component } from 'react';
import { connect } from 'react-redux';

import EspressoForm from './EspressoForm';
import EspressoChart from './EspressoChart';
import { fetchEspressos } from '../actions/espressosActions';
import Espressos from './Espressos';

class Coffee extends Component {

  state = {
    limit: 10,
    display: 'list'
  };

  // Get id from url
  originId = this.props.location.pathname.split('/')[2];
  origin = this.props.origins.find(o => o.id === parseInt(this.originId, 10));
  
  componentDidMount() {
    this.props.fetchEspressos(this.originId)
  }

  handleOnChange = event => {
    this.setState({
      limit: event.target.value
    });
  }

  handleOnClick = event => {
    event.preventDefault();
    this.props.history.push(event.target.attributes.href.value);
  }

  toggleVisibility = () => {
    const chart = document.getElementById('espressoChart');
    const list = document.getElementById('espressosList');
    chart.style.display = (chart.style.display === 'block' ? 'none' : 'block');
    list.style.display = (list.style.display === 'block' ? 'none' : 'block');
    const display = (this.state.display === 'list' ? 'chart' : 'list')
    this.setState({
      display: display
    });
  }

  render() {
    if (this.props.coffeeShop.id === undefined || this.props.origins.length ===0){
      // Redirect to root if not logged in
      this.props.history.push('/');
      return null;
    } else {
      return (
        <div>
          <h1>{this.origin.name}</h1>
          <EspressoForm originId={this.originId}/><br />
          <span>Show me the last </span>
          <input type='number' className='short' onChange={this.handleOnChange} value={this.state.limit} />
          <span> espresso recipes.</span>
          <br /><br />
          <EspressoChart limit={this.state.limit} espressos={this.props.espressos} originId={this.originId}/><br />
          <div id='espressosList' style={{display: "none"}} ><Espressos espressos={this.props.espressos} handleOnClick={this.handleOnClick} originId={this.originId} /><br /></div>
          <button id='show' onClick={this.toggleVisibility}>Show espressos as {this.state.display}</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop,
    origins: state.origins.origins,
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
