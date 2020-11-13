import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './search.scss';

class Search extends Component {
  state = {
    inputValue: '',
  };

  onChange = (evt) => {
    this.setState(
      {
        inputValue: evt.target.value,
      },
      () => {
        this.props.changeInput(this.state.inputValue);
      }
    );
  };

  render() {
    return (
      <div className="search">
        <Input placeholder="Type to search..." value={this.state.inputValue} onChange={this.onChange} />
      </div>
    );
  }
}

Search.propTypes = {
  changeInput: PropTypes.func.isRequired,
};

export default Search;
