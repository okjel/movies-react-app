import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabsContainer from '../tabs-container';
import Search from '../search';
import SectionTabs from '../../shared/section-tabs';

class Header extends Component {
  state = {};

  render() {
    const { changeInput, changeTabSection, activeTab } = this.props;
    return (
      <>
        <TabsContainer changeTabSection={changeTabSection} />
        {activeTab === SectionTabs.Search.id ? <Search changeInput={changeInput} /> : null}
      </>
    );
  }
}

Header.propTypes = {
  changeInput: PropTypes.func.isRequired,
  changeTabSection: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default Header;
