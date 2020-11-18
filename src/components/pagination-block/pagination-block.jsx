import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import './pagination-block.scss';

class PaginationBlock extends Component {
  state = {
    current: this.props.data.currentPage,
  };

  onChange = (page) => {
    this.setState(
      {
        current: page,
      },
      () => this.props.changePage(this.state.current)
    );
  };

  render() {
    const { totalMovies } = this.props.data;

    if (this.props.loading) return null;

    return (
      <div className="pagination-block">
        <Pagination
          current={this.state.current}
          total={totalMovies}
          defaultPageSize={20}
          showSizeChanger={false}
          onChange={this.onChange}
          hideOnSinglePage
        />
      </div>
    );
  }
}

PaginationBlock.propTypes = {
  data: PropTypes.shape({ currentPage: PropTypes.number, totalMovies: PropTypes.number }).isRequired,
  changePage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PaginationBlock;
