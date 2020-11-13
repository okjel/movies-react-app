import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabsContainer from '../tabs-container';

class Header extends Component {
  state = {};

  render() {
    const { changeInput } = this.props;
    return <TabsContainer changeInput={changeInput} />;
  }
}

Header.propTypes = {
  changeInput: PropTypes.func.isRequired,
};

export default Header;
