import "./App.css";
import Navbar from "./Components/Navbar";
import React, { Component } from "react";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  r = "radha";
  //line no 10,19 and 24 are for adding search functionality
  constructor() {
    super();
    this.state = {
      searchQuery: ''
    };
  }
  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  } 

  state={
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  apiKey= process.env.REACT_APP_API

  render() {
    return (
      <div>
        <Router>
        <Navbar onSearch={this.handleSearch} />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
          {/* countryCode, apiKey, pageSize sbkuchhh hm props k help se bhej skte.X */}
          <Switch>
            <Route exact path="/science">
              <News  setProgress = {this.setProgress} apiKey={this.apiKey}  key="science" pageSize={25} country="in" category="science" />
            </Route>
            <Route exact path="/entertainment">
              <News  setProgress = {this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize={25} country="in" category="entertainment" />
            </Route>
            <Route exact  path="/sports">
              <News  setProgress = {this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={25} country="in" category="sports" />
            </Route>
            <Route exact path="/business">
              <News  setProgress = {this.setProgress} apiKey={this.apiKey}  key="business" pageSize={25} country="in" category="business" />
            </Route>
            <Route exact path="/technology">
              <News  setProgress = {this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={25} country="in" category="technology" />
            </Route>
            <Route exact path="/">
              <News  setProgress = {this.setProgress} apiKey={this.apiKey}  key="general" pageSize={25} country="in" category="general" />
            </Route>
            <Route exact path="/health">
              <News setProgress = {this.setProgress} apiKey={this.apiKey}  key="health" pageSize={25} country="in" category="health" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
