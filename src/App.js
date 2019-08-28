import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
    26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]
    }
  }

  getRandNum = () => {
    let currArray = this.state.cardArray;
    let randNum = (currArray.splice(Math.floor(Math.random()* currArray.length), 1) % 13) + 1
    this.setState({cardArray: currArray})
    console.log("randNum = " + randNum + " and cardArray = " + this.state.cardArray.length);
    return randNum;
  }



  render() {
    return (
      <button onClick={this.getRandNum}>Click Me</button>
  );
  }
}

export default App;
