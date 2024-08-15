import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
    handleClick = e => {
        e.currentTarget.classList.add("active");
      };
  render() {
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
              <h4>четверг, 15 августа</h4>
            </div>
            <div class="col  listItem-3">
              <div class="dropdown" onClick = {this.handleClick}>
                <button class="dropbtn">Сортировка</button>
                <div class="dropdown-content">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default App;