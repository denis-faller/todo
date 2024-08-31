import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {Button, Collapse} from 'react-bootstrap'
import CurrentDate from './components/CurrentDate';
import {AddTaskButton} from './components/AddTaskButton';
import {Grid} from './components/Grid';
import { addTask } from './actions/TaskActions';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = (e) => {
    e.currentTarget.classList.add("active");
  }
  
  render() {
    let { tasks, addTaskAction } = this.props;

    if(tasks.length == undefined){
      if(localStorage.getItem('tasks') != null){
        tasks.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    }

    return (
      <div class="container-fluid">
      <h1>TODO-лист</h1>
      <div class="row">
        <div class="col listItem-1">
          <ul>
            <li class = "listItem-inner-1">
              Мой день  
            </li>
            <li class = "listItem-inner-2">
              Важно  
            </li>
          </ul>
        </div>
        <div class="col listItem-2">
          Мой день
          <CurrentDate></CurrentDate>
          <div>
          <AddTaskButton
            addTask={addTaskAction}
          />
          </div>
          <div>
            <div class="dropdown" onClick = {this.handleClick}>
              <button class="dropbtn"><svg class="fluentIcon dateButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z" fill="currentColor"></path></svg></button>
              <div class="dropdown-content">
                <a href="#">Сегодня</a>
                <a href="#">Завтра</a>
                <a href="#">Следующая неделя</a>
              </div>
            </div>
            <div class="dropdown" onClick = {this.handleClick}>
                <button><svg class="fluentIcon reminderButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a5.92 5.92 0 015.98 5.36l.02.22V11.4l.92 2.22a1 1 0 01.06.17l.01.08.01.13a1 1 0 01-.75.97l-.11.02L16 15h-3.5v.17a2.5 2.5 0 01-5 0V15H4a1 1 0 01-.26-.03l-.13-.04a1 1 0 01-.6-1.05l.02-.13.05-.13L4 11.4V7.57A5.9 5.9 0 0110 2zm1.5 13h-3v.15a1.5 1.5 0 001.36 1.34l.14.01c.78 0 1.42-.6 1.5-1.36V15zM10 3a4.9 4.9 0 00-4.98 4.38L5 7.6V11.5l-.04.2L4 14h12l-.96-2.3-.04-.2V7.61A4.9 4.9 0 0010 3z" fill="currentColor"></path></svg></button>
                <div class="dropdown-content">
                  <a href="#">Позднее сегодня 16:00</a>
                  <a href="#">Завтра, вс 19:00</a>
                  <a href="#">Следующая неделя, пн 19:00</a>
                </div>
            </div>
            <div class="dropdown" onClick = {this.handleClick}>
              <button><svg class="fluentIcon recurringButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 6.67a.5.5 0 01.3.1l.08.07.01.02A5 5 0 0113.22 15L13 15H6.7l1.65 1.65c.18.17.2.44.06.63l-.06.07a.5.5 0 01-.63.06l-.07-.06-2.5-2.5a.5.5 0 01-.06-.63l.06-.07 2.5-2.5a.5.5 0 01.76.63l-.06.07L6.72 14h.14L7 14h6a4 4 0 003.11-6.52.5.5 0 01.39-.81zm-4.85-4.02a.5.5 0 01.63-.06l.07.06 2.5 2.5.06.07a.5.5 0 010 .56l-.06.07-2.5 2.5-.07.06a.5.5 0 01-.56 0l-.07-.06-.06-.07a.5.5 0 010-.56l.06-.07L13.28 6h-.14L13 6H7a4 4 0 00-3.1 6.52c.06.09.1.2.1.31a.5.5 0 01-.9.3A4.99 4.99 0 016.77 5h6.52l-1.65-1.65-.06-.07a.5.5 0 01.06-.63z" fill="currentColor"></path></svg></button>
              <div class="dropdown-content">
                  <a href="#">Ежедневно</a>
                  <a href="#">Рабочие дни</a>
                  <a href="#">Еженедельно</a>
                </div>
            </div>  
          </div>
          <div class="container">
            <div class="row">
              <div class="col">
              </div>
              <div class="col-4">
                Название
              </div>
              <div class="col-2">
                Дата выполнения
              </div>
              <div class="col-2">
                Важность
              </div>
            </div>
            <Grid
              tasks={tasks.tasks}
            />
            <Button className="btn" onClick={() => this.setState({ open: !this.state.open })}>
               Завершенные
           </Button>
          </div>
        </div>
        <div class="col  listItem-3">
          <div class="dropdown" onClick = {this.handleClick}>
            <button class="dropbtn">Сортировка</button>
            <div class="dropdown-content">
              <a href="#">Важность</a>
              <a href="#">Дата выполнения</a>
              <a href="#">По алфавиту</a>
              <a href="#">По дате создания</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    tasks: store.tasks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTaskAction: (task) => dispatch(addTask(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);