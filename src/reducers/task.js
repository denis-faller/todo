  import {
    TASK_ADD_SUCCESS,
    TASK_ADD_FAIL,
  } from '../actions/TaskActions';
  
  export const initialState = {
    tasks: [],
  };
  
  export function taskReducer(state = initialState, action) {
    let tasks = state.tasks;
    if(action.payload != undefined){
      tasks.push({end: false, name: action.payload, date: '', importance: false});
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    switch (action.type) {
      case TASK_ADD_SUCCESS:
        return {
          ...state,
          tasks: tasks,
        };
  
      case TASK_ADD_FAIL:
        alert('Ошибка при добавлении задачи');
        return {
        };
  
      default:
        return state;
    }
  }