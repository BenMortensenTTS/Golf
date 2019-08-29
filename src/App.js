import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardArrayObj: [{id:0, img:"./images/00.jpg"}, {id:1, img:"./images/01.jpg"}, {id:2, img:"./images/02jpg"}, 
      {id:3, img:"./images/03.jpg"}, {id:4,img:"./images/04.jpg"}, {id:5,img:"./images/05.jpg"}, {id:6, img:"./images/07.jpg"}, 
      {id:8, img:"./images/08jpg"}, {id:9,img:"./images/09.jpg"}, {id:10,img:"./images/10.jpg"}, {id:11,img:"./images/11.jpg"}, 
      {id:12,img:"./images/12.jpg"}, {id:13,img:"./images/13.jpg"}],
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
    let playingCard=(
      <div id={this.state.cardArray[0].id}><img src={this.state.cardArray[0].img}/></div>
    )
    return (
      <div>
        <h1>{"Amount of cards left in deck: " + this.state.cardArray.length}</h1>
        {playingCard}
      </div>
  );
  }
}
        // <Button clickFunc={this.getRandNum} buttonName="Draw Deck"></Button>
        // <Button clickFunc={this.swapCards} buttonName="Swap" />
        // <Button clickFunc={this.startGame} buttonName="Start Game"/>

const Button = (props) => {

// let cardImgArray = [];
  // for(let i = 0; i < 12; i++) {
  //   if(i % 3 === 0 ) {
  //     for(let i = 0; i < 2; i++) {
  //       cardImgArray[i] = (
  //         <div id="wrapper">
  //         </div>)
  //     }
  //   }
  //   cardImgArray[i] = (
  //     <div class="item">
  //     <div class="item-content">
  //       <img src="./images/00.jpg"/>
  //     </div>
  //   </div>)


  
  // return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
}

export default App;


