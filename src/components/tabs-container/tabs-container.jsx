import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import sectionTabs from '../../shared/section-tabs';

const { TabPane } = Tabs;

function TabsContainer({ changeTabSection }) {
  const renderTabs = Object.keys(sectionTabs).map((tabName) => {
    return <TabPane tab={sectionTabs[tabName].name} key={sectionTabs[tabName].id} />;
  });

  return (
    <Tabs defaultActiveKey="1" centered onChange={changeTabSection}>
      {renderTabs}
    </Tabs>
  );
}

TabsContainer.propTypes = {
  changeTabSection: PropTypes.func.isRequired,
};

export default TabsContainer;
