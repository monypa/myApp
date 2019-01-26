import React, { Component } from 'react';
export const Context = React.createContext();

export default class Provider extends Component {
  state = {
    name: 'John Doe',
    color: 'white',
    onPress: () => {
      this.setState(prevState => {
        return {
          color: prevState.color === 'lightgray' ? 'white' : 'lightgray',
          name: prevState.name === 'Jane Doe' ? 'John Doe' : 'Jane Doe'
        }
      });
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
};
