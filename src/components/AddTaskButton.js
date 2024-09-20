import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export class AddTaskButton extends React.Component {
  onBtnClick = (e) => {
    this.props.addTask($(".task").val(), this.props.date.toISOString().slice(0, 10), this.props.notificationDate, this.props.repeatDate, this.props.repeat);
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