import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      play1Hand: [],
      play2Hand: [],
      cardArray: [],
      discardReferenceArray: [],
      discard: {},
      deckObj: {},
      beginP1Flipped: 0,
      beginP2Flipped: 0,
      playing: false,
      p1Turn: null,
      p2Turn: null,
      totalP1Flipped: 0,
      totalP2Flipped: 0,
      p1Total: 0,
      p2Total: 0,
      p1Wins: 0,
      p2Wins: 0,
      selectIndex: null,
      itemID: null,
      cardImgIndex: 0
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
    let p1Wins = localStorage.getItem('p1Wins')
    let p2Wins = localStorage.getItem('p2Wins')


    let deckIndexArr = this.genDeck();
    let p1hand = [];
    let p2hand = [];
    let cardImageArr = [];
    let discardObj;
    let randNum;
    let discardIndex;
    let discardReference = [];

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
    for (let i = 0; i < 52; i++) {
      discardReference[i] = deckImageArr[i];
    }

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
      discardReferenceArray: discardReference,
      discard: discardObj,
      p1Wins,
      p2Wins
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
    if(this.state.playing) {
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

      this.setState({
        p1Total: total1,
        p2Total: total2,
        playing: false
      })

     if (total2 > total1) {
      let curr = parseInt(this.state.p2Wins) + 1
      this.setState({p2Wins: curr}, () => {
        if(parseInt(this.state.p2Wins) > 8) {
          localStorage.setItem('p2Wins', 0);
          localStorage.setItem('p1Wins', 0);
          this.setState({p2Wins: 0})
          this.setState({p1Wins: 0})
        } else {
          localStorage.setItem('p2Wins', curr);
        }
      })
    }

      else if (total1 > total2) {
        let curr = parseInt(this.state.p1Wins) + 1
        this.setState({p1Wins: curr}, () => {
          localStorage.setItem('p1Wins', curr);
          if(parseInt(this.state.p1Wins) > 8) {
            localStorage.setItem('p1Wins', 0);
            localStorage.setItem('p2Wins', 0);
            this.setState({p1Wins: 0})
            this.setState({p2Wins: 0})
          }
        })
      }
    }
  }

  clearWins = () => {
    this.setState({p1Wins: 0})
    this.setState({p2Wins: 0})
    localStorage.setItem("p1Wins", 0)
    localStorage.setItem("p2Wins", 0)
}


      selectSwapDiscard1 = () => {
        let play1 = this.state.play1Hand
        play1.splice(this.state.selectIndex, 1, this.state.discard)
        console.log(play1)
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1
        })
      }

      selectSwapDiscard2 = () => {
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.discard)
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play2Hand: play2
        })
      }

      selectSwapDeck1 = () => {
        let play1 = this.state.play1Hand
        play1.splice(this.state.selectIndex, 1, this.state.deckObj)
        this.setState({
          deckObj: {id: 0},
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1
        })

      }
      selectSwapDeck2 = () => {
       let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.deckObj)
        this.setState({
          deckObj: {id: 0},
          play2Hand: play2,
          discard: this.state.discardReferenceArray[(this.state.itemID)-1]
        })
      }

  render() {

  const getCardFromDeck = (item) => {

    if(this.state.cardImgIndex !== 0) {
      item.target.src = `./images/0.jpg`
      this.setState({cardImgIndex: 0})
    }
    
    if(this.state.playing && this.state.cardArray.length > 0 && this.state.cardImgIndex === 0) {
      let temp = this.state.cardArray
      let card = temp.splice(this.randCardIndex(temp), 1)[0];
      let cardObj = card
      card = card.id % 13 === 0 ? 13 : card.id % 13
      item.target.src = `./images/${card}.jpg`
      this.setState({
        cardArray: temp,
        deckObj: cardObj,
        cardImgIndex: card
      })
    } else {
      item.target.src = `./images/0.jpg`
    }
  }

  const player1Click = (item) => {
    let cardsFlipped = this.state.beginP1Flipped
    console.log(item.target.id)
  
      cardsFlipped++;
      let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
      item.target.src=`./images/${targetImgPic}.jpg`
      this.setState({
        beginP1Flipped: cardsFlipped,
        totalP1Flipped: cardsFlipped
      })
    
    this.setState({
      selectIndex: item.target.className,
      itemID: item.target.id
    })
  }

  const player2Click = (item) => {
    let cardsFlipped = this.state.beginP2Flipped
   
      cardsFlipped++
      let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
      item.target.src=`./images/${targetImgPic}.jpg`
      this.setState({
        beginP2Flipped: cardsFlipped,
        totalP2Flipped: cardsFlipped
      })
    
    this.setState({
      selectIndex: item.target.className,
      itemID: item.target.id
    })
  }

  const discardPic = (item) => {
    let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
    item.target.src=`./images/${targetImgPic}.jpg`
  }

    let renderPlay1Hand = this.state.play1Hand.map((card1, index)=>{
      return <img draggable onClick={player1Click} src={"./images/0.jpg"} id={card1.id} className={index} key={index+10} alt="card" />
    })
    let play1HandTop = renderPlay1Hand.slice(0,3);
    let play1HandBot = renderPlay1Hand.slice(3);

    let renderPlay2Hand = this.state.play2Hand.map((card2, index)=>{
      return <img draggable="true" onClick={player2Click} src={"./images/0.jpg"} id={card2.id} className={index} key={index+100} alt="card"/>
    })

    let play2HandTop = renderPlay2Hand.slice(0,3);
    let play2HandBot = renderPlay2Hand.slice(3);

    let deck = <img onClick={getCardFromDeck} src={"./images/0.jpg"} id={this.state.deckCardID} alt="deck" />
    let discard = <img clickFunc={this.discardPic} src={this.state.discard.image} id={this.state.discard.id} alt="discard"/>
    let cardsOrEnd = this.state.cardArray.length !== 0 ? <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3> : <h3>No more cards.</h3>
    let player1Score = <h3>{"Player 1 Score: " + this.state.p1Total}</h3>
    let player2Score = <h3>{"Player 2 Score " + this.state.p2Total}</h3>
    let winner;
    let p1Wins = <h3>{"Player 1 Wins: " + this.state.p1Wins}</h3>
    let p2Wins = <h3>{"Player 2 Wins: " + this.state.p2Wins}</h3>

    if(this.state.p1Total > this.state.p2Total) {
      winner = <h3>{"The Winner is Player 1!"}</h3>
    } else if (this.state.p2Total > this.state.p1Total) {
      winner = <h3>{"The Winner is Player 2!"}</h3>
    } else if (this.state.p1Total !== 0 && this.state.p2Total === this.state.p1Total) {
      winner = <h3>{"This was a tie!"}</h3>
    } else {
      winner = <h3></h3>
    }

    return (
      <div>
        <div id="cards">
          <div>{play1HandTop}</div>
          <div>{play1HandBot}</div>
        
          <Button clickFunc={this.selectSwapDiscard1} buttonName="Swap Discard"/>
          <Button clickFunc={this.selectSwapDeck1} buttonName="Swap Deck"/>

          <div><span className="spanMove">{discard}</span><span className="spanMove">{deck}</span></div>
          
          <Button clickFunc={this.selectSwapDiscard2} buttonName="Swap Discard"/>
          <Button clickFunc={this.selectSwapDeck2} buttonName="Swap Deck"/>

          <div>{play2HandTop}</div>
          <div>{play2HandBot}</div>

        </div>

        <div id="info">
          
          <Button clickFunc={this.startGame} buttonName="Start Game"/>
          <Button clickFunc={this.calculateScore} buttonName="Calculate Score"/> 
          <Button clickFunc={this.clearWins} buttonName="Clear Wins"/>

          <div>{cardsOrEnd}</div>
          <div>{player1Score}</div>
          <div>{player2Score}</div>

          <div>{winner}</div> 
          <div id="wins"><span>{p1Wins}{p2Wins}</span></div>

        </div>
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
