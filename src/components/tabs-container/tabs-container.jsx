import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Search from '../search';

const { TabPane } = Tabs;

class TabsContainer extends Component {
  state = {
    tabs: [
      {
        name: 'Search',
        id: 1,
        content: <Search changeInput={this.props.changeInput} />,
      },
      {
        name: 'Rated',
        id: 2,
        content: 'rated',
      },
    ],
  };

  render() {
    const renderTabs = this.state.tabs.map(({ id, name, content }) => {
      return (
        <TabPane tab={name} key={id}>
          {content}
        </TabPane>
      );
    });

    return (
      <Tabs defaultActiveKey="1" centered>
        {renderTabs}
      </Tabs>
    );
  }
}

TabsContainer.propTypes = {
  changeInput: PropTypes.func.isRequired,
};

export default TabsContainer;
