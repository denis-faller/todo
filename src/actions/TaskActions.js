import { useDispatch } from "react-redux";

export const TASK_ADD_SUCCESS = 'TASK_ADD_SUCCESS';
export const TASK_ADD_FAIL = 'TASK_ADD_FAIL';
export const TASK_CHANGE_END_SUCCESS = 'TASK_CHANGE_END_SUCCESS';
export const TASK_CHANGE_END_FAIL = 'TASK_CHANGE_END_FAIL';

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

export function changeEndTask(id) {
    return (dispatch) => {
        if(id != null){
            dispatch({
                type: TASK_CHANGE_END_SUCCESS,
                payload: id,
            });
        }
        else{
            dispatch({
                type: TASK_CHANGE_END_FAIL
            });
        }
    }
}