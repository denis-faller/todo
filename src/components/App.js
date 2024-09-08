import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="app">
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    tasks: store.tasks,
    endTasks: store.endTasks,
  };
};
export default connect(mapStateToProps)(App);