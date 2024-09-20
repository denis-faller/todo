import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/theme.css';

const DatePickerComponent = (props) => {
    const datepickerRef = useRef(null);
    const [dateTask, setDateTask] = useState(props.task ? props.task.date : '');

    const changeDateTask = (event, id) => {
        const newDate = event.target.value;
        setDateTask(newDate); // Обновляем состояние
        let tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.filter(function (el, index, ar) {
        if(ar[index].id == id){
            ar[index].date = event.target.value;
        }
        return ar[index];
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    let task = props.task;

    useEffect(() => {
        $(datepickerRef.current).datepicker({
            onSelect: (dateText) => changeDateTask({ target: { value: dateText } }, task.id)
        });
    }, []);

    return (
        <input 
        type="text" 
        ref={datepickerRef} 
        className="datetime-task" 
        value={dateTask} // Привязываем к состоянию dateTask
        readOnly // Делаем поле только для чтения, чтобы использовать только datepicker
    />
    );
};

export default DatePickerComponent;