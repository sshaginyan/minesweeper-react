import _ from 'lodash';
import React from 'react';

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: 0,
      mine: props.node.mine,
      flag: props.node.flag,
      open: props.node.open,
    };

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.node.value,
      mine: nextProps.node.mine,
      flag: nextProps.node.flag,
      open: nextProps.node.open
    });
  }
    
  revealNode() {
    this.props.revealNode(this.props.node);
  }
  
  setflag(e) {
    e.preventDefault();
    if(!this.state.open){
        this.props.setflag(this.props.node);
    }
  }
  
  render() {
      
    let node;

    if(this.state.open) {
      if(this.state.mine) {
        node = (
          <div className="Cell__cover Cell__cover--opened">
            <span className="Cell__bomb">b</span>
          </div>
        );
      } else {
        node = (
          <div className="Cell__cover Cell__cover--opened">
            <span className={"Cell__number"+this.state.value}>{ this.state.value }</span>
          </div>
        );
      }
    } else if(this.state.flag) {
      node = (
        <div className="Cell__cover Cell__cover--opened">
          <span className="Cell__flag">f</span>
        </div>
      );
    } else {
      node = (
        <div className="Cell__cover"></div>
      );
    }

    return (
      <td className="Cell" onContextMenu={ _.bind(this.setflag, this) } onClick={ _.bind(this.revealNode, this) } >
        { node }
      </td>
    );
  }
}