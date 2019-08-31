import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      play1Hand: [],
      play2Hand: [],
      cardArray: [],
      discard: {}
    }
  }

  genDeck=()=>{
    let tempArray = [];
    for(let i = 0; i < 52; i++) {
      tempArray[i] = i+1;//deck of 52
    }
    return tempArray;
  }

  randCardIndex=(deckArr)=>{
    return Math.floor(Math.random()*deckArr.length);
  }


  componentDidMount() {
    let deckIndexArr = this.genDeck();
    let randCardIndex;
    let p1hand = [];
    let p2hand = [];
    let cardImageArr = [];
    let discardObj;
    let randNum;
    let discardIndex;

    for(let i=1;i<14;i++){
      cardImageArr[i] = `./images/${i}.jpg`;
    }
    let deckImageArr = deckIndexArr.map((idNum)=>{
      let imgIndex = (idNum%13)===0 ? 13 : idNum%13;
      return {
        id:idNum,
        image: cardImageArr[imgIndex]
      }
    })

    for(let i=0;i<12;i++){
      randNum = this.randCardIndex(deckImageArr);
      discardIndex = this.randCardIndex(deckImageArr);
      discardObj = deckImageArr.splice(discardIndex,1)[0];

      let randCardObj = deckImageArr.splice(randNum,1)[0];
      if(i < 6){
        p1hand[i] = randCardObj;
      } else {
        p2hand[i-6] = randCardObj;
      }
    }
    this.setState({
      play1Hand: p1hand,
      play2Hand: p2hand,
      cardArray: deckImageArr,
      discard: discardObj
    })
  }

  render() {
    let renderPlay1Hand = this.state.play1Hand.map((card)=>{
      return <img src={card.image} id={card.id} />
    })
    return (
      <div>{renderPlay1Hand}</div>
    );
  }
}
      // <div id="mainDiv">
      //   <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3>
      //   <div> 
      //     {player1Hand}
      //     <h3>RandomText1</h3>
      //     <Button clickFunc={this.getRandNum} buttonName="Draw Deck"></Button>
      //     <Button clickFunc={this.swapCards} buttonName="Swap" />
      //     <Button clickFunc={this.startGame} buttonName="Start Game"/>
      //     <h3>RandomText2</h3>
      //     {player2Hand}
      //   </div>
      // </div>   

const Button = (props) => {
  
  return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
}

export default App;


