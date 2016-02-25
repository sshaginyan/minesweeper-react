import Row from 'Row';
import _ from 'lodash';
import React from 'react';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid : this.createGrid(props)
    };

  }
  componentWillReceiveProps(nextProps) {
    if(this.props.openCount > nextProps.openCount || this.props.dimensions.cols !== nextProps.dimensions.cols){
      this.setState({
        grid : this.createGrid(nextProps)
      });
    }
  }

  setMines(grid, props) {
    
    let mineCount = props.mines;

    while(mineCount > 0) {
      
      let [xCoord, yCoord] = [
        Math.floor(Math.random() * props.dimensions.cols),
        Math.floor(Math.random() * props.dimensions.rows)
      ];

      if(!grid[xCoord][yCoord].mine) {
        console.log(xCoord, yCoord);
        grid[xCoord][yCoord].mine = true;
        mineCount--;
      }

    }

  }

  createGrid(props) {

    let grid = [];

    for(let rows = 0; rows < props.dimensions.rows; rows++) {
      grid.push([]);
      for(let cols = 0; cols < props.dimensions.cols; cols++) {
        grid[rows].push({
          value: 0,
          flag: false,
          mine: false,
          open: false,
          xCoord: rows,
          yCoord: cols
        });
      }
    }

    this.setMines(grid, props);

    return grid;

  }

  withinSpace(currNode, newNodeX, newNodeY) {
    return newNodeX >= 0 && newNodeX <= this.props.dimensions.cols - 1 &&
    newNodeY >= 0 && newNodeY <= this.props.dimensions.rows - 1;
  }

  getMineCount(node) {

    let mineCount = 0;
    let grid = this.state.grid;

    _.forEach(_.range(-1, 2), (vertical) => {
      _.forEach(_.range(-1, 2), (horizontal) => {
        
        let [newNodeX, newNodeY] = [node.xCoord + horizontal, node.yCoord + vertical];

        if((vertical != 0 || horizontal != 0) &&  
          this.withinSpace(node, newNodeX, newNodeY) &&
          grid[newNodeX][newNodeY].mine) {
          mineCount++;
        }
      });
    });

    return mineCount;

  }

  traverse(node) {
     
     let grid = this.state.grid;

     _.forEach(_.range(-1, 2), (vertical) => {
      _.forEach(_.range(-1, 2), (horizontal) => {
        
        let [newNodeX, newNodeY] = [node.xCoord + horizontal, node.yCoord + vertical];

        if(this.withinSpace(node, newNodeX, newNodeY) &&
          !grid[newNodeX][newNodeY].mine && !grid[newNodeX][newNodeY].open) {
          this.revealNode(grid[newNodeX][newNodeY]);
        }
      });
    });
  }

  revealNode(node) {

    let grid = this.state.grid;
    let mineCount = this.getMineCount(node);

    if(!node.open) {
      this.props.incremOpenNode();
      node.open = true;
    }
    
    if(node.mine) {
      node.value = 'b';
    } else {
      node.value = mineCount;
    }
    
    this.setState({
      grid: grid
    });

    if(node.flag){
      node.flag = false;
      this.props.setFlag(-1);
    }

    if(!mineCount && !node.mine) {
      this.traverse(node);
    }

    if(node.mine) {
      this.props.hasLost();
    }

  }

  setflag(node) {

    node.flag = !node.flag;

    this.props.setFlag(node.flag ? 1 : -1);
    
    this.setState({
      grid: this.state.grid
    });
  }

  render() {
      
    let grid = this.state.grid, rows;

    rows = _.map(grid, (row, index) => (
      <Row key={ index } nodes={ row } revealNode={ _.bind(this.revealNode, this) } setflag={ _.bind(this.setflag, this) } />
    ));

    return(
      <table className="Table">
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}