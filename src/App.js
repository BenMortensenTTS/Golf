import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
    26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
    discard: null,
    grabCardID: null,
    randomNumberState: null, //might not need this
    pickedCard: null,
    playing: true

    }
  }


  getRandNum = () => {
    let currArray = this.state.cardArray;
    let randNum = (currArray.splice(Math.floor(Math.random()* currArray.length), 1) % 13) + 1
    this.setState({cardArray: currArray})
    this.setState({randomNumberState: randNum}) //might remove later
    this.setState({discard: randNum})
    // if ((randNum > 1) && (randNum < 11)) {
    //   randNum = randNum.toString();
    // } else if (randNum === 11) {
    //   randNum = "J";
    // } else if (randNum === 12) {
    //   randNum = "Q";                   Probably don't need this
    // } else if (randNum === 13) {
    //   randNum = "K";
    // } else if (randNum === 1) {
    //   randNum = "A";
    // }                            

    console.log("randNum = " + randNum + " and cardArray = " + this.state.cardArray.length
      + "discardCard = " + this.state.discard);
    if(currArray.length === 0) {
      this.setState({playing: false})
      console.log("Game has ended.")
    }
    return randNum;
  }

  startGame = () => {
    if(this.state.cardArray.length === 52) {
      this.getRandNum();
      this.setState({randomNumberState: null}, () => {
        console.log("cardArray = " + this.state.cardArray.length + " and discardCard = " + this.state.discard);
      });
    }
  }

  swapCards = () => {
     
  }


  render() {
    return (
      <div>
        <Button clickFunc={this.getRandNum} buttonName="Draw Deck"></Button>
        <Button clickFunc={this.swapCards} buttonName="Swap" />
        <Button clickFunc={this.startGame} buttonName="Start Game"/>
        <h1>{"Amount of cards left in deck: " + this.state.cardArray.length}</h1>
      </div>
  );
  }
}

const Button = (props) => {
  return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
}

export default App;
