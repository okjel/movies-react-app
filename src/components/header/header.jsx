import React from 'react';
import PropTypes from 'prop-types';
import TabsContainer from '../tabs-container';
import Search from '../search';
import sectionTabs from '../../shared/section-tabs';

function Header({ changeInput, changeTabSection, activeTab }) {
  return (
    <>
      <TabsContainer changeTabSection={changeTabSection} />
      {activeTab === sectionTabs.Search.id ? <Search changeInput={changeInput} /> : null}
    </>
  );
}

Header.propTypes = {
  changeInput: PropTypes.func.isRequired,
  changeTabSection: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default Header;
