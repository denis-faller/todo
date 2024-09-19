import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePickerComponent from './DatePicker';
import { changeEndTask, changeImportanceTask } from '../actions/TaskActions';
import { connect } from 'react-redux';
import {Button, Collapse} from 'react-bootstrap'


export class Grid extends React.Component {

    constructor(props) {
        super(props);

        if(this.props.tasks != undefined){
            let nameTasks = [];
            this.props.tasks.map((task, index) => {
                nameTasks[task.id] = task.name;
            });

            this.state = {
                nameTasks: nameTasks,
                open: false
            };
        }
        else{
            this.state = {
                open: false
            };
        }
        this.changeNameTask = this.changeNameTask.bind(this);
      }

    handleClick = (event, i) => {

        let { changeEndTask } = this.props;

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

        changeEndTask(i);
      }


      handleClick1 = (event, i) => {

        let { changeImportanceTask } = this.props;

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

        changeImportanceTask(i);
      }

      changeNameTask = (event, id) => {
        this.setState(prevState => ({
            nameTasks: {
              ...prevState.nameTask,
              [id]: event.target.value
            }
          }));
          this.props.tasks.filter(function (el, index, ar) {
            if(ar[index].id == id){
                ar[index].name = event.target.value;
            }
            return ar[index];
          });
          localStorage.setItem('tasks', JSON.stringify( this.props.tasks));
        };


    render() {
        if(this.props.tasks != undefined){
            let nameTasks = [];
            this.props.tasks.map((task, index) => {
                nameTasks[task.id] = task.name;
            });
    
            this.state = {
                nameTasks: nameTasks,
                open: this.state.open,
            };
            const isNotCollapsed = !this.props.collapse;
            return (
                <div class = "container">
                {isNotCollapsed ? (
                        this.props.tasks.map((task) => {  
                            let end = task.end ? 'checked' : '';
                            let visible1 = task.end ? 'css-8s785g img checked' : 'css-8s785g img checked visible';
                            let visible2 = task.end ? 'css-8s785g img not-checked visible' : 'css-8s785g img not-checked';

                            let importance = task.importance ? 'checked' : '';
                            let visible3 = task.importance ? 'css-8s785g img checked checked1 visible' : 'css-8s785g img checked checked1';
                            let visible4 = task.importance ? 'css-8s785g img not-checked not-checked1' : 'css-8s785g img not-checked not-checked1 visible';

                            return (
                                    <div className="row" key={task.id}>
                                        <div className="col" onClick={(event) => this.handleClick(event, task.id)}>
                                            <input checked={end} className="checkbox" type="checkbox" data-key={task.id}></input>
                                            <svg data-key={task.id} className={visible1} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <rect x="1" y="1" width="22" height="22" rx="3" stroke="#151418" strokeWidth="2"></rect>
                                            </svg>
                                            <svg data-key={task.id} className={visible2} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <rect width="24" height="24" rx="4" fill="#151418"></rect>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M18.707 8.707L10 17.414l-4.707-4.707 1.414-1.414L10 14.586l7.293-7.293 1.414 1.414z" fill="#fff"></path>
                                            </svg>
                                        </div>
                                        <div className="col-4">
                                            <input onChange={(event) => this.changeNameTask(event, task.id)} className="name-task" value={this.state.nameTasks[task.id]} size='15'/>
                                        </div>
                                        <div className="col-2">
                                            <div className="form-group">
                                                <DatePickerComponent
                                                    task={task}
                                                    end={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-2" onClick={(event) => this.handleClick1(event, task.id)}>
                                            <input checked={importance} className="checkbox checkbox1" type="checkbox" data-key={task.id}></input>
                                            <svg data-key={task.id} className={visible3} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z" fill="currentColor"></path>
                                            </svg>
                                            <svg data-key={task.id} className={visible4} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                    </div>
                            );
                        })
                ) :            
                
                (
                    <div><Button className="btn" onClick={() => this.setState({ open: !this.state.open })}>Завершенные</Button>
                    <Collapse in={this.state.open}>
                    <div>
                        {this.props.tasks.map((task) => {  
                            let end = task.end ? 'checked' : '';
                            let visible1 = task.end ? 'css-8s785g img checked' : 'css-8s785g img checked visible';
                            let visible2 = task.end ? 'css-8s785g img not-checked visible' : 'css-8s785g img not-checked';

                            let importance = task.importance ? 'checked' : '';
                            let visible3 = task.importance ? 'css-8s785g img checked checked1 visible' : 'css-8s785g img checked checked1';
                            let visible4 = task.importance ? 'css-8s785g img not-checked not-checked1' : 'css-8s785g img not-checked not-checked1 visible';
                            
                            return (
                                <div>
                                    <div className="row" key={task.id}>
                                        <div className="col" onClick={(event) => this.handleClick(event, task.id)}>
                                            <input checked={end} className="checkbox" type="checkbox" data-key={task.id}></input>
                                            <svg data-key={task.id} className={visible1} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <rect x="1" y="1" width="22" height="22" rx="3" stroke="#151418" strokeWidth="2"></rect>
                                            </svg>
                                            <svg data-key={task.id} className={visible2} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <rect width="24" height="24" rx="4" fill="#151418"></rect>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M18.707 8.707L10 17.414l-4.707-4.707 1.414-1.414L10 14.586l7.293-7.293 1.414 1.414z" fill="#fff"></path>
                                            </svg>
                                        </div>
                                        <div className="col-4">
                                            <input onChange={(event) => this.changeNameTask(event, task.id)} className="name-task" value={this.state.nameTasks[task.id]} size='15'/>
                                        </div>
                                        <div className="col-2">
                                            <div className="form-group">
                                                <DatePickerComponent
                                                    task={task}
                                                    end={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-2" onClick={(event) => this.handleClick1(event, task.id)}>
                                            <input checked={importance} className="checkbox checkbox1" type="checkbox" data-key={task.id}></input>
                                            <svg data-key={task.id} className={visible3} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z" fill="currentColor"></path>
                                            </svg>
                                            <svg data-key={task.id} className={visible4} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="checkbox-icon">
                                                <path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                </Collapse>
                </div>
                )}
                </div>
            );
        }
        else{
            return;
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      changeEndTaskAction: (id) => dispatch(changeEndTask(id)),
      changeImportanceTaskAction: (id) => dispatch(changeImportanceTask(id)),
    };
  };
  
  export default connect(
    mapDispatchToProps
  )(Grid);