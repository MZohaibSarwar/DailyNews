import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API;
  pagesize=6;

  state = {progress:0}
  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        />
        <Navbar/>
        
        <Switch>
          <Route exact path="/">< News setProgress={this.setProgress} apikey={this.apikey}   key="general" pageSize={this.pagesize} category="general" country="gb"/></Route>
          <Route exact path="/business">< News setProgress={this.setProgress} apikey={this.apikey}   key="business" pageSize={this.pagesize} category="business" country="gb"/></Route>
          <Route exact path="/entertainment">< News setProgress={this.setProgress} apikey={this.apikey}   key="entertainment" pageSize={this.pagesize} category="entertainment" country="gb"/></Route>
          <Route exact path="/health">< News setProgress={this.setProgress} apikey={this.apikey}   key="health" pageSize={this.pagesize} category="health" country="gb"/></Route>
          <Route exact path="/science">< News setProgress={this.setProgress} apikey={this.apikey}   key="science" pageSize={this.pagesize} category="science" country="gb"/></Route>
          <Route exact path="/sports">< News setProgress={this.setProgress} apikey={this.apikey}   key="sports" pageSize={this.pagesize} category="sports" country="gb"/></Route>
          <Route exact path="/technology">< News setProgress={this.setProgress} apikey={this.apikey}   key="technology" pageSize={this.pagesize} category="technology" country="gb"/></Route>
          <Route exact path="/general">< News setProgress={this.setProgress} apikey={this.apikey}   key="general" pageSize={this.pagesize} category="general" country="gb"/></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
