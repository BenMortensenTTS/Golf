import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      play1Hand: [],
      play2Hand: [],
      cardArray: [],
      discard: {},
      beginP1Flipped: 0,
      beginP2Flipped: 0,
      playing: false,
      p1Turn: null,
      p2Turn: null,
      deckCardID: null,
      totalP1Flipped: 0,
      totalP2Flipped: 0,
      p1Total: 0,
      p2Total: 0
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
    return Math.floor(Math.random()*deckArr.length)
  }


  componentDidMount() {
    let deckIndexArr = this.genDeck();
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
        image: cardImageArr[imgIndex],
      }
    })

    discardIndex = this.randCardIndex(deckImageArr);
    discardObj = deckImageArr.splice(discardIndex,1)[0];

    for(let i=0;i<12;i++){
      randNum = this.randCardIndex(deckImageArr);
      
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
      discard: discardObj,
    })
  }

  startGame = () => {
    if (this.state.beginP1Flipped === 2 && this.state.beginP2Flipped === 2 && this.state.playing === false) {
      let turn = (Math.floor(Math.random() * 2)) === 0 ? true : false
      this.setState({
        p1Turn: turn,
        p2Turn: !turn,
        playing: true
      }, ()=>{
        this.state.p1Turn ? console.log("Player 1 goes first.") : console.log("Player 2 goes first.")
      })
    }
  }

  calculateScore = (item) => {
    let state = this.state;
    let total1 = 0;
    let total2 = 0;

    for(let i = 0; i < 3; i++) {
      if(state.play1Hand[i].id % 13 === state.play1Hand[i+3].id % 13) {
        total1 += 0;
      } else {
        total1 += (state.play1Hand[i].id % 13) + (state.play1Hand[i+3].id % 13)
      }
      if(state.play2Hand[i].id % 13 === state.play2Hand[i+3].id % 13) {
        total2 += 0;
      } else {
        total2 += (state.play2Hand[i].id % 13) + (state.play2Hand[i+3].id % 13)
      }
    }
    console.log("Player 1: " + total1)
    console.log("Player 2: " + total2)

    this.setState({
      p1Total: total1,
      p2Total: total2
    })
  }


  render() {
 
  const getCardFromDeck = (item) => {
    if(this.state.playing && this.state.cardArray.length > 0) {
      console.log(item.target)
      let temp = this.state.cardArray
      let card = temp.splice(this.randCardIndex(temp), 1)[0];
      card = card.id % 13 === 0 ? 13 : card.id % 13
      item.target.src = `./images/${card}.jpg`
      this.setState({
        cardArray: temp,
        deckCardID: card
      })
    } else {
      item.target.src = `./images/0.jpg`
    }
  }

  const player1Click = (item) => {
    let cardsFlipped = this.state.beginP1Flipped
    if ((cardsFlipped < 2 && this.state.playing === false) || this.state.p1Total !== 0) {
      cardsFlipped++;
      let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
      item.target.src=`./images/${targetImgPic}.jpg`
      this.setState({
        beginP1Flipped: cardsFlipped,
        totalP1Flipped: cardsFlipped
      })

    }
  }

  const player2Click = (item) => {
    let cardsFlipped = this.state.beginP2Flipped
    if ((cardsFlipped < 2 && this.state.playing === false) || this.state.p2Total !== 0) {
      cardsFlipped++
      let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
      item.target.src=`./images/${targetImgPic}.jpg`
      this.setState({
        beginP2Flipped: cardsFlipped,
        totalP2Flipped: cardsFlipped
      })
    }
  }

    let renderPlay1Hand = this.state.play1Hand.map((card1, index)=>{
      return <img onClick={player1Click} src={"./images/0.jpg"} id={card1.id} className={index} key={index+10} alt="card" />
    })
    let renderPlay2Hand = this.state.play2Hand.map((card2, index)=>{
      return <img onClick={player2Click} src={"./images/0.jpg"} id={card2.id} className={index} key={index+100} alt="card"/>
    })
    let deck = <img onClick={getCardFromDeck} src={"./images/0.jpg"} id={this.state.deckCardID} alt="deck" />
    let discard = <img src={this.state.discard.image} id={this.state.discard.id} alt="discard"/>
    let cardsOrEnd = this.state.cardArray.length !== 0 ? <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3> : <h3>No more cards.</h3>
    let player1Score = <h3>{"Player 1 Score: " + this.state.p1Total}</h3>
    let player2Score = <h3>{"Player 2 Score " + this.state.p2Total}</h3>
    

    return (
      <div>
        <div>{renderPlay1Hand}</div>
        <div>{renderPlay2Hand}</div>

        <span>Discard</span><span>Deck</span><div></div>
        <span>{discard}</span><span>{deck}</span>
        <div>{cardsOrEnd}</div>
        <div>{player1Score}</div>
        <div>{player2Score}</div>
        <Button clickFunc={this.startGame} buttonName="Start Game"/>
        <Button clickFunc={this.calculateScore} buttonName="Calculate Score"/>
      </div>
    );
  }
}


const Button = (props) => {
  
  return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
}

export default App;


// <div id="mainDiv">
//         <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3>
//          <div> 
          // <div>{renderPlay1Hand}</div>
//            <h3>RandomText1</h3>
//            <Button clickFunc={this.getRandNum} buttonName="Draw Deck"></Button>
//            <Button clickFunc={this.swapCards} buttonName="Swap" />
//            <Button clickFunc={this.startGame} buttonName="Start Game"/>
//            <h3>RandomText2</h3>
//            <div>{renderPlay2Hand}</div>
//          </div>
//        </div>
