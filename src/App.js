import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CurrentDate from './components/CurrentDate';
import {AddTaskButton} from './components/AddTaskButton';
import {Grid} from './components/Grid';
import { addTask, changeEndTask, changeImportanceTask } from './actions/TaskActions';
import { ImportanceFilters } from './actions/ImportanceActions';
import FilterLink from './containers/FilterLink';


function getWeekDay(date) {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  return days[date.getDay()];
}

function getVisibleTodos(tasks, filter) {
  if(tasks.tasks != null){
    switch (filter) {
      case ImportanceFilters.SHOW_ALL:
        return { ...tasks, tasks: [...tasks.tasks] };
      case ImportanceFilters.SHOW_IMPORTANCE:
        return { ...tasks, tasks: tasks.tasks.filter((t) => t.importance) };
    }
  }
  else{
    return tasks;
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    let currentDate = new Date();
    let notificationDate = new Date();
    notificationDate.setHours(16);
    notificationDate.setMinutes(0);
    notificationDate.setSeconds(0);
    let repeatDate = new Date();
    repeatDate.setHours(16);
    notificationDate.setMinutes(0);
    repeatDate.setSeconds(0);
    this.state = {
      sort: '',
      resort: '',
      date: currentDate,
      notificationDate: notificationDate,
      repeatDate: repeatDate,
      repeat: 'everyday',
    };
  }

  alertTaskName = (taskName) => {
    alert( taskName);
  }


  handleClick = (e) => {
    e.currentTarget.classList.add("active");
  }


  setDate = (event) => {
    let currentDate = new Date();
    if( event.target.text == "Сегодня"){
      this.setState({ date: currentDate });
    }
    if( event.target.text == "Завтра"){
      currentDate.setDate((new Date()).getDate() + 1 );
      this.setState({ date: currentDate});
    }
    if( event.target.text == "Следующая неделя"){
      currentDate.setDate((new Date()).getDate() + 7 );
      this.setState({ date: currentDate});
    }
  }


  setNotificationDate = (event) => {
    let notificationDate = new Date();
    if( event.target.text == "Позднее сегодня 16:00"){
      notificationDate.setHours(16);
      notificationDate.setMinutes(0);
      notificationDate.setSeconds(0);
      this.setState({ notificationDate: notificationDate });
    }
    if( event.target.text == "Завтра, вс 19:00"){
      notificationDate.setDate((new Date()).getDate() + 1 );
      notificationDate.setHours(19);
      notificationDate.setMinutes(0);
      notificationDate.setSeconds(0);
      this.setState({ notificationDate: notificationDate});
    }
    if( event.target.text == "Следующая неделя, пн 19:00"){
      notificationDate.setDate((new Date()).getDate() + 7 );
      notificationDate.setHours(19);
      notificationDate.setMinutes(0);
      notificationDate.setSeconds(0);
      this.setState({ notificationDate: notificationDate});
    }
  }

  setRepeatDate = (event, hour) => {
    let repeatDate = new Date();
    if( event.target.text == "Ежедневно"){
      repeatDate.setDate((new Date()).getDate() + 1 );
      this.setState({ repeat: 'everyday'});
    }
    if( event.target.text == "Рабочие дни"){
      if(getWeekDay(new Date()) == "ПТ"){
        repeatDate.setDate((new Date()).getDate() + 3 );
      }
      else if(getWeekDay(new Date()) == "СБ"){
        repeatDate.setDate((new Date()).getDate() + 2 );
      }
      else{
        repeatDate.setDate((new Date()).getDate() + 1 );
      }
      this.setState({ repeat: 'workday'});
    }
    if( event.target.text == "Еженедельно"){

      repeatDate.setDate((new Date()).getDate() + 7 );

      this.setState({ repeat: 'everyweek'});
    }
    
    repeatDate.setHours(hour);
    repeatDate.setMinutes(0);
    repeatDate.setSeconds(0);
    this.setState({ repeatDate: repeatDate});
  }
  
  
  render() {

    
    // localStorage.clear();
    let { tasks, addTaskAction, changeEndTaskAction, changeImportanceTaskAction } = this.props;

    if(this.props.tasks != undefined){
      if(this.props.tasks.tasks == null){
        tasks = this.state.tasks;
      }
      tasks.endTasks = tasks.tasks.filter(function(el, index, arr){
        if(el.end == 1)
          return arr[index];
      });
      tasks.tasks = tasks.tasks.filter(function(el, index, arr){
        if(el.end == 0)
          return arr[index];
      });
    }

    if(this.state.sort == 'importance'){
      if(this.state.resort == 'importance'){
        tasks.tasks.sort((a, b) => b.importance - a.importance);
        this.state.resort = '';
      }
      else{
        tasks.tasks.sort((a, b) => a.importance - b.importance);
        this.state.resort = 'importance';
      }
    }


    if(this.state.sort == 'date'){
      if(this.state.resort == 'date'){
        tasks.tasks.sort((a, b) =>  new Date(b.date) - new Date(a.date));
        this.state.resort = '';
      }
      else{
        tasks.tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.state.resort = 'date';
        }
    }

    if(this.state.sort == 'name'){
      if(this.state.resort == 'name'){
        tasks.tasks.sort((a, b) => 
        {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        this.state.resort = '';
      }
      else{
        tasks.tasks.sort((a, b) => 
          {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          
        this.state.resort = 'name';
        }
    }

    if(this.state.sort == 'date-create'){
      if(this.state.resort == 'date-create'){
        tasks.tasks.sort((a, b) =>  new Date(b.dateCreate) - new Date(a.dateCreate));
        this.state.resort = '';
      }
      else{
        tasks.tasks.sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
        this.state.resort = 'date-create';
        }
    }

    for(var i = 1; i < 1000; i++) {
      clearTimeout(i);
    }

    if(tasks.length != 0){
      tasks.tasks.map((el, index, arr) => {
        if (el.dateNotification !== undefined) {
          if(el.dateNotification - new Date().getTime() > 0){
            setTimeout(() => {
              this.alertTaskName(el.name);
            }, el.dateNotification - new Date().getTime());
          }
        }

        let dateRepeat = el.repeatDate;
        dateRepeat = new Date(dateRepeat);
        el.repeatDate = dateRepeat;
        let dateNotification = new Date(el.dateNotification);
        let hour = dateNotification.getHours();

        if(el.repeat == 'everyday'){
          if(el.repeatDate.getTime() - new Date().getTime() > 0){
            setTimeout(() => {
              this.alertTaskName(el.name);
              tasks.tasks[index].repeatDate.setDate((new Date()).getDate() + 1 );
              localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
            }, el.repeatDate.getTime() - new Date().getTime());
          }
        }
        if(el.repeat == 'workday'){
          if(el.repeatDate.getTime() - new Date().getTime() > 0){
            setTimeout(() => {
              this.alertTaskName(el.name);
              if(getWeekDay(new Date()) == "ПТ"){
                tasks.tasks[index].repeatDate.setDate((new Date()).getDate() + 3 );
                localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
              }
              else if(getWeekDay(new Date()) == "СБ"){
                tasks.tasks[index].repeatDate.setDate((new Date()).getDate() + 2 );
                localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
              }
              else{
                tasks.tasks[index].repeatDate.setDate((new Date()).getDate() + 1 );
                localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
              }
            }, el.repeatDate.getTime() - new Date().getTime());
          }
        }
        if(el.repeat == 'everyweek'){
          if(el.repeatDate.getTime() - new Date().getTime() > 0){
            setTimeout(() => {
              this.alertTaskName(el.name);
              tasks.tasks[index].repeatDate.setDate((new Date()).getDate() + 7 );
              localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
            }, el.repeatDate.getTime() - new Date().getTime());
          }
        }
        
        tasks.tasks[index].repeatDate.setHours(hour);
        return el;
      });
    }
    
    return (
      <div class="container-fluid">
      <h1>TODO-лист</h1>
      <div class="row">
        <div class="col listItem-1">
          <ul>
            <li>
            <FilterLink filter={ImportanceFilters.SHOW_ALL}>
              Мой день
            </FilterLink>
            </li>
            <li class = "listItem-inner-2 importance">
            <FilterLink filter={ImportanceFilters.SHOW_IMPORTANCE}>
              Важно
            </FilterLink>
            </li>
          </ul>
        </div>
        <div class="col listItem-2">
          Мой день
          <CurrentDate></CurrentDate>
          <div>
          <AddTaskButton
            repeat={this.state.repeat}
            repeatDate={this.state.repeatDate}
            notificationDate={this.state.notificationDate}
            date={this.state.date}
            addTask={addTaskAction}
          />
          </div>
          <div>
            <div class="dropdown" onClick = {this.handleClick}>
              <button class="dropbtn"><svg class="fluentIcon dateButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z" fill="currentColor"></path></svg></button>
              <div class="dropdown-content">
                <a onClick={(event) => this.setDate(event)}>Сегодня</a>
                <a onClick={(event) => this.setDate(event)}>Завтра</a>
                <a onClick={(event) => this.setDate(event)}>Следующая неделя</a>
              </div>
            </div>
            <div class="dropdown" onClick = {this.handleClick}>
                <button><svg class="fluentIcon reminderButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a5.92 5.92 0 015.98 5.36l.02.22V11.4l.92 2.22a1 1 0 01.06.17l.01.08.01.13a1 1 0 01-.75.97l-.11.02L16 15h-3.5v.17a2.5 2.5 0 01-5 0V15H4a1 1 0 01-.26-.03l-.13-.04a1 1 0 01-.6-1.05l.02-.13.05-.13L4 11.4V7.57A5.9 5.9 0 0110 2zm1.5 13h-3v.15a1.5 1.5 0 001.36 1.34l.14.01c.78 0 1.42-.6 1.5-1.36V15zM10 3a4.9 4.9 0 00-4.98 4.38L5 7.6V11.5l-.04.2L4 14h12l-.96-2.3-.04-.2V7.61A4.9 4.9 0 0010 3z" fill="currentColor"></path></svg></button>
                <div class="dropdown-content">
                  <a onClick={(event) => this.setNotificationDate(event)}>Позднее сегодня 16:00</a>
                  <a onClick={(event) => this.setNotificationDate(event)}>Завтра, вс 19:00</a>
                  <a onClick={(event) => this.setNotificationDate(event)}>Следующая неделя, пн 19:00</a>
                </div>
            </div>
            <div class="dropdown" onClick = {this.handleClick}>
              <button><svg class="fluentIcon recurringButton-icon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 6.67a.5.5 0 01.3.1l.08.07.01.02A5 5 0 0113.22 15L13 15H6.7l1.65 1.65c.18.17.2.44.06.63l-.06.07a.5.5 0 01-.63.06l-.07-.06-2.5-2.5a.5.5 0 01-.06-.63l.06-.07 2.5-2.5a.5.5 0 01.76.63l-.06.07L6.72 14h.14L7 14h6a4 4 0 003.11-6.52.5.5 0 01.39-.81zm-4.85-4.02a.5.5 0 01.63-.06l.07.06 2.5 2.5.06.07a.5.5 0 010 .56l-.06.07-2.5 2.5-.07.06a.5.5 0 01-.56 0l-.07-.06-.06-.07a.5.5 0 010-.56l.06-.07L13.28 6h-.14L13 6H7a4 4 0 00-3.1 6.52c.06.09.1.2.1.31a.5.5 0 01-.9.3A4.99 4.99 0 016.77 5h6.52l-1.65-1.65-.06-.07a.5.5 0 01.06-.63z" fill="currentColor"></path></svg></button>
              <div class="dropdown-content">
                  <a onClick={(event) => this.setRepeatDate(event, 16)}>Ежедневно</a>
                  <a onClick={(event) => this.setRepeatDate(event, 19)}>Рабочие дни</a>
                  <a onClick={(event) => this.setRepeatDate(event, 19)}>Еженедельно</a>
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
              collapse={false}
              tasks={tasks.tasks}
              changeEndTask={changeEndTaskAction}
              changeImportanceTask={changeImportanceTaskAction}
            />
           <Grid
              collapse={true}
              tasks={tasks.endTasks}
              changeEndTask={changeEndTaskAction}
              changeImportanceTask={changeImportanceTaskAction}
            />
          </div>
        </div>
        <div class="col  listItem-3">
          <div class="dropdown" onClick = {this.handleClick}>
            <button class="dropbtn">Сортировка</button>
            <div class="dropdown-content">
              <a href="#" onClick={(event) => this.setState({ sort: 'importance' })}>Важность</a>
              <a href="#" onClick={(event) => this.setState({ sort: 'date' })}>Дата выполнения</a>
              <a href="#" onClick={(event) => this.setState({ sort: 'name' })}>По алфавиту</a>
              <a href="#" onClick={(event) => this.setState({ sort: 'date-create' })}>По дате создания</a>
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
    tasks: getVisibleTodos(
      store.tasks,
      store.importanceFilter
    ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTaskAction: (task, date, dateNotification, repeatDate, repeat) => dispatch(addTask(task, date, dateNotification, repeatDate, repeat)),
    changeEndTaskAction: (id) => dispatch(changeEndTask(id)),
    changeImportanceTaskAction: (id) => dispatch(changeImportanceTask(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);