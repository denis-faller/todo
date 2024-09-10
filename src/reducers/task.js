  import {
    TASK_ADD_SUCCESS,
    TASK_ADD_FAIL,
    TASK_CHANGE_END_SUCCESS,
    TASK_CHANGE_END_FAIL,
    TASK_CHANGE_IMPORTANCE_SUCCESS,
    TASK_CHANGE_IMPORTANCE_FAIL,
  } from '../actions/TaskActions';
  
  export const initialState = {
    tasks: [],
    endTasks: [],
    id: Number(localStorage.getItem('taskId')) || 0,
  };
  
  export function taskReducer(state = initialState, action) {

    let tasks = state.tasks;
    let endTasks = state.endTasks;
    state.id += 1;
    localStorage.setItem('taskId', state.id);

    switch (action.type) {
      case TASK_ADD_SUCCESS:
        if(action.payload != undefined){
          tasks.push({id: state.id, end: false, name: action.payload, date: '', importance: false, dateCreate: new Date()});
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        return {
          ...state,
          tasks: tasks,
        };
  
      case TASK_ADD_FAIL:
        alert('Ошибка при добавлении задачи');
        return {
        };

        case TASK_CHANGE_END_SUCCESS:
          tasks = tasks.map(function(element, index, array) {
            if(array[index].id === action.payload){
              if(array[index].end){
                array[index].end = false;
              }
              else{
                array[index].end = true;
              }
            }
            return array[index];
          });


          let tempTasks = [];

          if(localStorage.getItem('endTasks') != null){
            endTasks = JSON.parse(localStorage.getItem('endTasks'));
            if(endTasks != undefined){
                endTasks = endTasks.map(function(element, index, array) {
                if(array[index].id === action.payload){
                  if(array[index].end){
                    array[index].end = false;
                  }
                  else{
                    array[index].end = true;
                  }
                }
                return array[index];
              });
  
            tempTasks = endTasks.filter(function(element, index, array) {
              if(!array[index].end){
                return array[index];
              }
              
          });

          let endTasksTemp = tasks.filter(function(element, index, array) {
            if(array[index].end){
              return array[index];
            }
          });

          endTasks = endTasks.concat(endTasksTemp);

          }
        }
        else{
          endTasks = tasks.filter(function(element, index, array) {
            if(array[index].end){
              return array[index];
            }
          });
        }


          tasks = tasks.filter(function(element, index, array) {
            if(!array[index].end){
              return array[index];
            }
        });


            endTasks = endTasks.filter(function(element, index, array) {
              if(array[index].end){
                return array[index];
              }
          });

          if(endTasks.length != 0){
            tasks.endTasks = endTasks;
            localStorage.setItem('endTasks', JSON.stringify(endTasks));
          }
          else{
            tasks.endTasks = null;
            localStorage.removeItem('endTasks');
          }

          tasks = tasks.concat(tempTasks);
        
          localStorage.setItem('tasks', JSON.stringify(tasks));

          return {
            ...state,
            tasks: tasks,
          };
    
        case TASK_CHANGE_END_FAIL:
          alert('Ошибка при редактировании задачи');
          return {
          };
      
          case TASK_CHANGE_IMPORTANCE_SUCCESS:
            tasks = tasks.map(function(element, index, array) {
              if(array[index].id === action.payload){
                if(array[index].importance){
                  array[index].importance = false;
                }
                else{
                  array[index].importance = true;
                }
              }
              return array[index];
            });
          
            localStorage.setItem('tasks', JSON.stringify(tasks));


            if(localStorage.getItem('endTasks') != undefined){
              endTasks = JSON.parse(localStorage.getItem('endTasks'));
              endTasks = endTasks.map(function(element, index, array) {
                if(array[index].id === action.payload){
                  if(array[index].importance){
                    array[index].importance = false;
                  }
                  else{
                    array[index].importance = true;
                  }
                }
                return array[index];
              });
            
              localStorage.setItem('endTasks', JSON.stringify(endTasks));
          }

  
            return {
              ...state,
              tasks: tasks,
            };
      
          case TASK_CHANGE_IMPORTANCE_FAIL:
            alert('Ошибка при редактировании задачи');
            return {
            };
  
      default:
        return state;
    }
  }