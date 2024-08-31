import React from 'react';
import PropTypes from 'prop-types';
import DatePickerComponent from './DatePicker';


export class Grid extends React.Component {
    handleClick = (event, i) => {
        const checkbox = document.querySelector(".checkbox[data-key='"+i+"']");
        const imgChecked = document.querySelector(".checked[data-key='"+i+"']");
        const imgNotChecked = document.querySelector(".not-checked[data-key='"+i+"']");
    
    
        imgChecked.classList.toggle('visible');
        imgNotChecked.classList.toggle('visible');
        if (!checkbox.checked) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
      }


      handleClick1 = (event, i) => {
        const checkbox = document.querySelector(".checkbox1[data-key='"+i+"']");
        const imgChecked = document.querySelector(".checked1[data-key='"+i+"']");
        const imgNotChecked = document.querySelector(".not-checked1[data-key='"+i+"']");
    
    
        imgChecked.classList.toggle('visible');
        imgNotChecked.classList.toggle('visible');
        if (!checkbox.checked) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
      }
    render() {
        if(this.props.tasks != undefined){
            return (
                <div className="container">
                {this.props.tasks.map((task, i) => {  
                        let end = task.end?'checked':'';
                        let importance = task.importance?'checked':'';
                        return (<div class="row" >
                            <div class="col" onClick = {(event) => this.handleClick(event, i)}>
                            <input checked={end} class="checkbox" type="checkbox" data-key = {i}></input>
                            <svg data-key = {i} class="css-8s785g img checked visible" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                        <rect x="1" y="1" width="22" height="22" rx="3" stroke="#151418" stroke-width="2"></rect>
                                    </svg>
                            <svg data-key = {i} class="css-8s785g img not-checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                        <rect width="24" height="24" rx="4" fill="#151418"></rect>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.707 8.707L10 17.414l-4.707-4.707 1.414-1.414L10 14.586l7.293-7.293 1.414 1.414z" fill="#fff"></path>
                                    </svg></div>
                            <div class="col-4">
                            <input value = {task.name} size = '15'/>
                            </div>
                            <div class="col-2">
                            <div class="form-group">
                                <DatePickerComponent></DatePickerComponent>
                            </div>
                            </div>
                            <div class="col-2" onClick = {(event) => this.handleClick1(event, i)}>
                            <input checked={importance} class="checkbox checkbox1" type="checkbox" data-key = {i}></input>
            
                            <svg  data-key = {i} class="css-8s785g img checked checked1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z" fill="currentColor"></path>
                                    </svg>
                            <svg  data-key = {i} class="css-8s785g img not-checked not-checked1 visible" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                        <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z" fill="currentColor"></path>
                                    </svg></div>
                            </div>) 
                    })}
                </div>
            );
        }
        else{
            return;
        }
    }
}

export default DatePickerComponent;