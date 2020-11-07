import React from 'react';
import 'antd/dist/antd.css';
import '../../font.css';
import MoviesList from '../movies-list';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <div className="app__container">
        <MoviesList />
      </div>
    </div>
  );
}
