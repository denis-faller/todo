import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export class AddTaskButton extends React.Component {
  onBtnClick = (e) => {
    this.props.addTask($(".task").val());
  };
  render() {
    return (
        <div>
            <button onClick={this.onBtnClick} class="baseAdd-icon addTask" type="button" aria-label="Добавить задачу" tabindex="0">Добавить</button>
            <input class = "task" />
        </div>
    );
  }
}

AddTaskButton.propTypes = {
  task: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
};