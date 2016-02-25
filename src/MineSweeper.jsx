import _ from 'lodash';
import Grid from 'Grid';
import React from 'react';
import config from 'config';

export default class MineSweeper extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = config.beginner;
  }
  
  componentWillUpdate() {
    if(this.state.status === "playing"){
      this.hasWon();
    }
  }
  tick() {
    if(this.state.openCount > 0 && this.state.status === 'playing'){
      this.setState({
        time: this.state.time + 1
      });
    }
  }
  hasWon() {
    if(this.state.mines + this.state.openCount >= this.state.dimensions.rows * this.state.dimensions.cols){
      this.setState({
        status: 'clear'
      });
    }
  }
  
  hasLost() {
    this.setState({
      status: 'gameover'
    });
  }
    
  setFlag(flagNum) {
    this.setState({
      flagCount: this.state.flagCount + flagNum
    });
  }
    
  incremOpenNode() {
      
    if(!this.state.openCount){
      this.timeoutID = setInterval(_.bind(this.tick, this), 1000);
    }

    this.state.openCount++;

    this.setState({
      openCount : this.state.openCount
    });
  }
    
  restart() {
      this.setState({
        openCount: 0,
        flagCount: 0,
        time: 0,
        status: 'playing'
      });

      clearInterval(this.timeoutID);
  }

  setDifficulty(e) {
    if(e.target.value === 'beginner') {
      this.setState(config.beginner);
    } else if(e.target.value === 'intermediate') {
      this.setState(config.intermediate);
    } else if(e.target.value === 'expert') {
      this.setState(config.expert);
    }

    
  }

  render() {
    return (
      <div>
        <select onChange={ _.bind(this.setDifficulty, this) }>
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='expert'>Expert</option>
        </select>
        <div className={"MineSweeper " + this.state.level}>
          <span className="MineSweeper__flagNum"> {this.state.mines - this.state.flagCount}</span>
          <span className="MineSweeper__face" onClick={ _.bind(this.restart, this) }>
            <span className={"button " + this.state.status}></span>
          </span>
          <span className="MineSweeper__time"> {this.state.time}</span>
          <Grid dimensions={ this.state.dimensions } mines={ this.state.mines } openCount={this.state.openCount} hasLost={ _.bind(this.hasLost, this) } incremOpenNode={ _.bind(this.incremOpenNode, this) } setFlag={ _.bind(this.setFlag, this) }/>
        </div>
      </div>
    );
  }
}