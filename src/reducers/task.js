import {
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_CHANGE_END_SUCCESS,
  TASK_CHANGE_END_FAIL,
  TASK_CHANGE_IMPORTANCE_SUCCESS,
  TASK_CHANGE_IMPORTANCE_FAIL,
} from '../actions/TaskActions';

export const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  id: Number(localStorage.getItem('taskId')) || 0,
};

export function taskReducer(state = initialState, action) {

  let tasks = state.tasks;
  let endTasks = [];
  state.id += 1;
  localStorage.setItem('taskId', state.id);

  switch (action.type) {
    case TASK_ADD_SUCCESS:
      if(action.payload != undefined){
        tasks.push({id: state.id, 
          end: false, 
          name: action.payload.task, 
          date: action.payload.date, 
          importance: false, 
          dateCreate: new Date(),
          dateNotification: Date.parse(action.payload.notificationDate),
          repeatDate: Date.parse(action.payload.repeatDate), 
          repeat: action.payload.repeat
      });
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



        if(localStorage.getItem('tasks') != null){
          endTasks = tasks.filter(function(el, index, arr){
            if(el.end == 1)
              return arr[index];
          });
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
        }
      }
      else{
        endTasks = tasks.filter(function(element, index, array) {
          if(array[index].end){
            return array[index];
          }
        });
      }


      endTasks = endTasks.filter(function(element, index, array) {
            if(!array[index].end){
              array[index].end = !array[index].end;
              return !array[index];
            }
            else{
              return array[index];
            }
        });
      
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