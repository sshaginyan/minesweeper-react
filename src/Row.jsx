import _ from 'lodash';
import Node from 'Node';
import React from 'react';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        nodes : props.nodes
    };

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        nodes : nextProps.nodes
    });
  }
  render(){
    
    let nodes;

    nodes = _.map(this.state.nodes, (node, index) => (
      <Node key={ index } node={ node } setflag={ this.props.setflag } revealNode={ this.props.revealNode }  />
    ));

    return (
      <tr>
        { nodes }
      </tr>
    );
  }
}