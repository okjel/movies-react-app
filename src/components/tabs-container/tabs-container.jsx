import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import SectionTabs from '../../shared/section-tabs';

const { TabPane } = Tabs;

class TabsContainer extends Component {
  state = {};

  render() {
    const renderTabs = Object.keys(SectionTabs).map((tabName) => {
      return <TabPane tab={SectionTabs[tabName].name} key={SectionTabs[tabName].id} />;
    });

    return (
      <Tabs defaultActiveKey="1" centered onChange={this.props.changeTabSection}>
        {renderTabs}
      </Tabs>
    );
  }
}

TabsContainer.propTypes = {
  changeTabSection: PropTypes.func.isRequired,
};

export default TabsContainer;
