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
      p2Turn: null
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
        index: null
      }
    })

    console.log(deckImageArr);

    discardIndex = this.randCardIndex(deckImageArr);
    discardObj = deckImageArr.splice(discardIndex,1)[0];

    for(let i=0;i<12;i++){
      randNum = this.randCardIndex(deckImageArr);
      console.log("randNum = " + randNum);
      
      let randCardObj = deckImageArr.splice(randNum,1)[0];
      if(i < 6){
        p1hand[i] = randCardObj;
        console.log(p1hand[i])        
      } else {
        p2hand[i-6] = randCardObj;
        console.log(p2hand[i-6])                
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


  render() {
 
  const getCardFromDeck = (item) => {
    let temp = this.state.cardArray
    let card = temp.splice(this.randCardIndex(temp), 1)[0];
    if(temp.length !== 0) { 
      card = card.id % 13 === 0 ? 13 : card.id % 13
      item.target.src = `./images/${card}.jpg`
    }
    this.setState({
      cardArray: temp,

    })
  }

  const player1Click = (item) => {
    let cardsFlipped = this.state.beginP1Flipped
    if (cardsFlipped < 2 && this.state.playing === false) {
      cardsFlipped++;
      let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
      item.target.src=`./images/${targetImgPic}.jpg`
      this.setState({beginP1Flipped: cardsFlipped})
    }
  }

  const player2Click = (item) => {
    let cardsFlipped = this.state.beginP2Flipped
    if (cardsFlipped < 2 && this.state.playing === false) {
      cardsFlipped++
      let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
      item.target.src=`./images/${targetImgPic}.jpg`
      this.setState({beginP2Flipped: cardsFlipped})
    }
  }

    let renderPlay1Hand = this.state.play1Hand.map((card1, index)=>{
      return <img onClick={player1Click} src={"./images/0.jpg"} id={card1.id} className={index} />
    })

    let renderPlay2Hand = this.state.play2Hand.map((card2, index)=>{
      return <img onClick={player2Click} src={"./images/0.jpg"} id={card2.id} className={index} />
    })

    let deck = <img onClick={getCardFromDeck} src={"./images/0.jpg"} id={null} />
    

    return (
      <div>
        <div>{renderPlay1Hand}</div>
        <div>{renderPlay2Hand}</div>

        <span>Discard</span><span>Deck</span><div></div>
        <span><img src={this.state.discard.image} id={this.state.discard.id}/></span><span>{deck}</span>
        <Button clickFunc={this.startGame} buttonName="Start Game"/>
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
