import { useDispatch } from "react-redux";

export const TASK_ADD_SUCCESS = 'TASK_ADD_SUCCESS';
export const TASK_ADD_FAIL = 'TASK_ADD_FAIL';

export function addTask(task) {
    return (dispatch) => {
        if(task != null){
            if(task.trim() == ""){
                dispatch({
                type: TASK_ADD_FAIL
                });
            }
            else{
                dispatch({
                type: TASK_ADD_SUCCESS,
                payload: task.trim(),
                });
            }
        }
            else{
                dispatch({
                    type: TASK_ADD_FAIL
                });
        }
    }
}