import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    cardArrayObj: [{id:0, img:"./images/0.jpg"}, {id:1, img:"./images/1.jpg"}, {id:2, img:"./images/2jpg"}, 
      {id:3, img:"./images/3.jpg"}, {id:4,img:"./images/4.jpg"}, {id:5,img:"./images/5.jpg"}, {id:6, img:"./images/6.jpg"}, 
      {id:7, img:"./images/7jpg"}, {id:8, img:"./images/8jpg"}, {id:9,img:"./images/9.jpg"}, {id:10,img:"./images/10.jpg"}, 
      {id:11,img:"./images/11.jpg"}, {id:12,img:"./images/12.jpg"}, {id:13,img:"./images/13.jpg"}],
    cardArray: [],
    discard: null,
    grabCardID: null,
    randomNumberState: null, //might not need this
    pickedCard: null,
    playing: false,
    currSelected: null,
    play1Turn: false,
    play2Turn: false
    }
  }

  componentDidMount() {
    let tempArray = [];
    for(let i = 0; i < 52; i++) {
      tempArray[i] = i+1;
    }
    this.setState({cardArray: tempArray})
    // tempArray = [];
    // for(let i = 0; i <= 13; i++) {
      // tempArray[i] = "{id:" + {i} + ", img:\"./images/" + {i} + ".jpg\"}"    
      // this.setState({cardArrayObj: tempArray[i]})       
    // }
  }



  getRandNum = () => {
    if(this.state.playing === true) {
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
      return this.state.cardArrayObj[randNum].id;
    }
    
  }

  startGame = () => {
    if(this.state.cardArray.length === 52) {
      this.getRandNum();
      this.setState({playing: true})
      this.setState({randomNumberState: null}, () => {
        console.log("cardArray = " + this.state.cardArray.length + " and discardCard = " + this.state.discard);
      });
    }
  }

  swapCards = () => {
     
  }


  render() {
    let playingCardArray = [];
    let counter = 0;
    for(let i = 0; i < 12; i++) {
      playingCardArray[i] = <span className="spanCard" id={this.state.cardArrayObj[i+1].id}><img src={this.state.cardArrayObj[0].img}/></span>
    }
      playingCardArray.splice(3, 0, <div></div>)
      playingCardArray.splice(10, 0, <div></div>)

      let player1Hand = playingCardArray.slice(0,7);
      let player2Hand = playingCardArray.slice(7);


    return (
      <div id="mainDiv">
        <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3>
        <div> 
          {player1Hand}
          <h3>RandomText1</h3>
          <Button clickFunc={this.getRandNum} buttonName="Draw Deck"></Button>
          <Button clickFunc={this.swapCards} buttonName="Swap" />
          <Button clickFunc={this.startGame} buttonName="Start Game"/>
          <h3>RandomText2</h3>
          {player2Hand}
        </div>
      </div>
  );
  }
}
        

const Button = (props) => {
  
  return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
}

export default App;


