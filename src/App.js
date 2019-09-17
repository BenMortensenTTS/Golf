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
      deckObj: {id: 0, image: `./images/00.jpg`},
      playing: false,
      p1Turn: null,
      p2Turn: null,
      p1Total: 0,
      p2Total: 0,
      p1Wins: 0,
      p2Wins: 0,
      selectIndex: null,
      itemID: null,
      p1Flipped: 0,
      p2Flipped: 0,
      isDeckBlank: true,
      cardType: null,
      didTakeDeck: false
    }
  }

  genDeck=()=>{
    let tempArray = [];
    for(let i = 0; i < 52; i++) {
      tempArray[i] = i+1;
    }
    return tempArray;
  }

  randCardIndex = (deckArr) => {
      return Math.floor(Math.random()*deckArr.length)
    }

    componentDidMount = () => {
      let p1Wins = localStorage.getItem('p1Wins')
      let p2Wins = localStorage.getItem('p2Wins')
      let deckIndexArr = this.genDeck();
      let p1hand = [];
      let p2hand = [];
      let discardObj;
      let randNum;
      let discardIndex;
      let discardReference = [];

      let deckImageArr = deckIndexArr.map((idNum)=>{
      let imgIndex = (idNum%13)===0 ? 13 : idNum%13;
        return {
          id:idNum,
          image: `./images/${imgIndex}.jpg`,
          flipped: true
        }
      })

      for(let i = 0; i < 52; i++) {
        discardReference[i] = deckImageArr[i];
      }
      
      discardIndex = this.randCardIndex(deckImageArr);
      discardObj = deckImageArr.splice(discardIndex,1)[0];

      for(let i=0;i<12;i++){
        randNum = this.randCardIndex(deckImageArr);
        let randCardObj = deckImageArr.splice(randNum,1)[0];
        if(i < 6){
          p1hand[i] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
          discardReference[randCardObj.id - 1] = {id: randCardObj.id, image: `./images/${randCardObj.id % 13 === 0 ? 13 : randCardObj.id % 13}.jpg`, flipped: false}
        } else if (i < 12){
          p2hand[i-6] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
          discardReference[randCardObj.id - 1] = {id: randCardObj.id, image: `./images/${randCardObj.id % 13 === 0 ? 13 : randCardObj.id % 13}.jpg`, flipped: false}
        } 
      }

      this.setState({
        play1Hand: p1hand,
        play2Hand: p2hand,
        cardArray: deckImageArr,
        discardReferenceArray: discardReference,
        discard: discardObj,
        p1Wins: p1Wins,
        p2Wins: p2Wins,
      }, () => {
        if(this.state.p1Wins === null || this.state.p2Wins === null) {
          this.setState({
            p1Wins: 0,
            p2Wins: 0
          })
          localStorage.setItem('p1Wins', 0);
          localStorage.setItem('p2Wins', 0);
        }
      })
    }

    startGame = () => {
      if (this.state.p1Flipped === 2 && this.state.p2Flipped === 2 && this.state.playing === false) {
        let turn = (Math.floor(Math.random() * 2)) === 0 ? true : false
        this.setState({
          playing: true,
          p1Turn: turn,
          p2Turn: !turn,
        }, ()=>{
          this.state.p1Turn ? console.log("Player 1 goes first.") : console.log("Player 2 goes first.")
        })
      }
    }

    calculateScore = () => {
      if(this.state.playing) {
        let total1 = 0;
        let total2 = 0;

        for(let i = 0; i < 3; i++) {
            if(this.state.play1Hand[i].id % 13 === this.state.play1Hand[i+3].id % 13) {
              total1 += 0;
            } else {
              total1 += (this.state.play1Hand[i].id % 13) + (this.state.play1Hand[i+3].id % 13)
            }
            if(this.state.play2Hand[i].id % 13 === this.state.play2Hand[i+3].id % 13) {
              total2 += 0;
            } else {
              total2 += (this.state.play2Hand[i].id % 13) + (this.state.play2Hand[i+3].id % 13)
            }
        }

        this.setState({
          p1Total: total1,
          p2Total: total2,
          playing: false
        })

        if (total2 < total1) {
         
          this.setState({p2Wins: (parseInt(this.state.p2Wins) + 1)}, () => {
            localStorage.setItem('p2Wins', this.state.p2Wins);
            if(parseInt(this.state.p2Wins) > 8) {
              localStorage.setItem('p2Wins', 0);
              localStorage.setItem('p1Wins', 0);
              this.setState({p2Wins: 0})
              this.setState({p1Wins: 0})
            } 
          })
        }

        else if (total1 < total2) {
          this.setState({p1Wins: (parseInt(this.state.p1Wins) + 1)}, () => {
            localStorage.setItem('p1Wins', this.state.p1Wins);
            if(parseInt(this.state.p1Wins) > 8) {
              localStorage.setItem('p1Wins', 0);
              localStorage.setItem('p2Wins', 0);
              this.setState({p1Wins: 0})
              this.setState({p2Wins: 0})
            } 
          })
        }

        if(this.state.cardArray.length === 0) {
          let play1 = this.state.play1Hand;
          let play2 = this.state.play2Hand;
          for(let i = 0; i < play1.length; i++) {
            play1[i] = {id: play1[i].id, image: `./images/${play1[i].id % 13 === 0 ? 13 : play1[i].id % 13}.jpg`, flipped: true}
          }
          for (let i = 0; i < play2.length; i++) {
            play2[i] = {id: play2[i].id, image: `./images/${play2[i].id % 13 === 0 ? 13 : play2[i].id % 13}.jpg`, flipped: true}
          }
          this.setState({
            play1Hand: play1,
            play2Hand: play2
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
      if(this.state.p1Turn && this.state.cardType === "card1" && !this.state.didTakeDeck && this.state.deckObj.id === 0 && this.state.playing && this.state.selectIndex !== null) {
        let play1 = this.state.play1Hand
        play1.splice(this.state.selectIndex, 1, this.state.discard)
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          selectIndex: null
        })
      }

      let checkIfHand1Flipped = this.state.play1Hand;
      let count = 0;

      for(let i = 0; i < checkIfHand1Flipped.length; i++) {
        if(checkIfHand1Flipped[i].flipped) {
          count++;
        }
      }
      if(count > this.state.p1Flipped) {
        this.setState({p1Flipped: count})
      }

      if(count === 6) {
        let play2 = this.state.play2Hand
        this.calculateScore();
        for(let i = 0; i < play2.length; i++) {
          play2[i] = {id: play2[i].id, image: `./images/${play2[i].id % 13 === 0 ? 13 : play2[i].id % 13}.jpg`, flipped: true}
        }
        this.setState({play2Hand: play2})
      }
    }

    selectSwapDiscard2 = () => {
      if(this.state.p2Turn && this.state.cardType === "card2" && this.state.deckObj.id === 0 && !this.state.didTakeDeck && this.state.playing && this.state.selectIndex !== null) {
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.discard)
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play2Hand: play2,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          selectIndex: null
        })
      }

      let checkIfHand2Flipped = this.state.play2Hand;
      let count = 0;

      for(let i = 0; i < checkIfHand2Flipped.length; i++) {
        if(checkIfHand2Flipped[i].flipped) {
          count++;
        }
      }

      if(count > this.state.p2Flipped) {
        this.setState({p2Flipped: count})
      }

      if(count === 6) {
        let play1 = this.state.play1Hand;
        this.calculateScore();
        for(let i = 0; i < play1.length; i++) {
          play1[i] = {id: play1[i].id, image: `./images/${play1[i].id % 13 === 0 ? 13 : play1[i].id % 13}.jpg`, flipped: true}
        }
        this.setState({play1Hand: play1})
      }
    }

    selectSwapDeck1 = () => {
      if(this.state.p1Turn && this.state.cardType === "card1" && this.state.deckObj.id !== 0 && this.state.playing && this.state.selectIndex !== null) {
        let play1 = this.state.play1Hand;
        play1.splice(this.state.selectIndex, 1, this.state.deckObj);
        this.setState({
          deckObj: {id: 0, image: `./images/00.jpg`},
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          didTakeDeck: false,
          selectIndex: null
        })
      }

      let checkIfHand1Flipped = this.state.play1Hand;
      let count = 0;
      
      for(let i = 0; i < checkIfHand1Flipped.length; i++) {
        if(checkIfHand1Flipped[i].flipped) {
          count++;
        }
      }

      if(count > this.state.p1Flipped) {
        this.setState({p1Flipped: count})
      }

      if(count === 6) {
        let play2 = this.state.play2Hand
        this.calculateScore();
        for(let i = 0; i < play2.length; i++) {
          play2[i] = {id: play2[i].id, image: `./images/${play2[i].id % 13 === 0 ? 13 : play2[i].id % 13}.jpg`, flipped: true}
        }
        this.setState({play2Hand: play2})
      }
    
    }

    selectSwapDeck2 = () => {
      if(this.state.p2Turn && this.state.cardType === "card2" && this.state.deckObj.id !== 0 && this.state.playing && this.state.selectIndex !== null) {
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.deckObj)
        this.setState({
          deckObj: {id: 0, image: `./images/00.jpg`},
          play2Hand: play2,
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          didTakeDeck: false,
          selectIndex: null
        })
      }

      let checkIfHand2Flipped = this.state.play2Hand;
      let count = 0;

     for(let i = 0; i < checkIfHand2Flipped.length; i++) {
        if(checkIfHand2Flipped[i].flipped) {
          count++;
        }
      }

      if(count > this.state.p2Flipped) {
        this.setState({p2Flipped: count})
      }
      
      if(count === 6) {
        let play1 = this.state.play1Hand;
        this.calculateScore();
        for(let i = 0; i < play1.length; i++) {
          play1[i] = {id: play1[i].id, image: `./images/${play1[i].id % 13 === 0 ? 13 : play1[i].id % 13}.jpg`, flipped: true}
        }
        this.setState({play1Hand: play1})
      }
    }

    refresh = () => {
      window.location.reload();
    }

  render() {

    const getCardFromDeck = (item) => {
      if(this.state.deckObj.id !== 0 && this.state.playing) {
          this.setState({discard: this.state.deckObj})
          item.target.src = `./images/0.jpg`
          this.setState({
            deckObj: {id: 0, image: `./images/00.jpg`},
            p1Turn: !this.state.p1Turn,
            p2Turn: !this.state.p2Turn,
            didTakeDeck: false
          })
        }
      

      if(this.state.playing && this.state.cardArray.length > 0 && this.state.deckObj.id === 0) {
        let temp = this.state.cardArray
        let card = temp.splice(this.randCardIndex(temp), 1)[0];
        item.target.src = card.image
        if (temp.length === 0) {
          this.setState({cardArray: card});
          this.calculateScore();
        }
        this.setState({
          cardArray: temp,
          deckObj: card,
          cardType: item.target.alt,
          didTakeDeck: true
        })
      }
    }

    const player1Click = (item) => {
      this.setState({
        selectIndex: parseInt(item.target.className),
        itemID: parseInt(item.target.id),
        cardType: item.target.alt
      })
      if (this.state.p1Turn === null && this.state.p1Flipped < 2) {
        let discardArray = this.state.discardReferenceArray
        let grabObj = discardArray.splice((parseInt(item.target.id) - 1), 1)[0]
        if(grabObj.flipped) {
          discardArray.splice((parseInt(item.target.id) - 1), 0, grabObj)
        } 
        else {
          let updateHand1 = this.state.play1Hand;
          let allow2 = {id: grabObj.id, image: `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`, flipped: true};
          updateHand1.splice(parseInt(item.target.className), 1, allow2);
          item.target.src = `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`
          discardArray.splice((parseInt(item.target.id) - 1), 0, allow2) 
          this.setState({
            p1Flipped: this.state.p1Flipped + 1,
            discardReferenceArray: discardArray,
            play1Hand: updateHand1
          })
        }
      }

      if (!this.state.discard.flipped) {
        let flipDiscard = this.state.discard;
        let newObj = {id: flipDiscard.id, image: `./images/${flipDiscard.id % 13 === 0 ? 13 : flipDiscard.id % 13}.jpg`, flipped: true}
        this.setState({discard: newObj});
      } 
    }

    const player2Click = (item) => {
      this.setState({
        selectIndex: parseInt(item.target.className),
        itemID: parseInt(item.target.id),
        cardType: item.target.alt
      })
      if (this.state.p2Turn === null && this.state.p2Flipped < 2) {
        let discardArray = this.state.discardReferenceArray
        let grabObj = discardArray.splice((parseInt(item.target.id) - 1), 1)[0]
        if(grabObj.flipped) {
          discardArray.splice((parseInt(item.target.id) - 1), 0, grabObj)
        }
        if(grabObj.flipped === false) {
          let updateHand2 = this.state.play2Hand;
          let allow2 = {id: grabObj.id, image: `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`, flipped: true};
          updateHand2.splice(parseInt(item.target.className), 1, allow2);
          item.target.src = `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`
          discardArray.splice((parseInt(item.target.id) - 1), 0, allow2)
          this.setState({
            p2Flipped: this.state.p2Flipped + 1,
            discardReferenceArray: discardArray,
            play2Hand: updateHand2
          })
        }
      }
      if (!this.state.discard.flipped) {
        let flipDiscard = this.state.discard;
        let newObj = {id: flipDiscard.id, image: `./images/${flipDiscard.id % 13 === 0 ? 13 : flipDiscard.id % 13}.jpg`, flipped: true}
        this.setState({discard: newObj});
      } 
    }

    let renderPlay1Hand = this.state.play1Hand.map((card1, index)=>{
        return <img onClick={player1Click} src={card1.image} id={card1.id} className={index} key={index+10} alt="card1" />
    })
    let play1HandTop = renderPlay1Hand.slice(0,3);
    let play1HandBot = renderPlay1Hand.slice(3);

    let renderPlay2Hand = this.state.play2Hand.map((card2, index)=>{
      return <img onClick={player2Click} src={card2.image} id={card2.id} className={index} key={index+100} alt="card2"/>
    })
    let play2HandTop = renderPlay2Hand.slice(0,3);
    let play2HandBot = renderPlay2Hand.slice(3);

    let deck = <img onClick={getCardFromDeck} src={this.state.deckObj.image} id={this.state.deckObj.id} alt="deck" />
    let discard = <img src={this.state.discard.image} id={this.state.discard.id} alt="discard"/>
    let cardsOrEnd = this.state.cardArray.length !== 0 ? <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3> : <h3>No more cards.</h3>
    let player1Score = <h3>{"Player 1 Score: " + this.state.p1Total}</h3>
    let player2Score = <h3>{"Player 2 Score " + this.state.p2Total}</h3>
    let p1Wins = <h3>{"Player 1 Wins: " + this.state.p1Wins}</h3>
    let p2Wins = <h3>{"Player 2 Wins: " + this.state.p2Wins}</h3>
    let turn, winner;
   
    if(this.state.p1Turn && this.state.playing) {
      turn = <h3>{"Turn: P1"}</h3>
    } else if (this.state.p2Turn && this.state.playing) {
      turn = <h3>{"Turn: P2"}</h3>
    } 

    if(this.state.p1Total < this.state.p2Total) {
      winner = <h3>{"The Winner is Player 1!"}</h3>
    } else if (this.state.p2Total < this.state.p1Total) {
      winner = <h3>{"The Winner is Player 2!"}</h3>
    } else if (this.state.p1Total !== 0 && this.state.p2Total === this.state.p1Total) {
      winner = <h3>{"This was a tie!"}</h3>
    } 

    return(
      <div>
        <div id="game">
          <div>{play1HandTop}</div>
          <div id="p1"><h3>P1</h3></div>
          <div>{play1HandBot}</div>

          <Button clickFunc={this.selectSwapDiscard1} buttonName="Swap Discard"/>
          <Button clickFunc={this.selectSwapDeck1} buttonName="Swap Deck"/>

          <div id="turn">{turn}</div>
          <div><span className="spanMove">{discard}</span><span className="spanMove">{deck}</span></div>

          <Button clickFunc={this.selectSwapDiscard2} buttonName="Swap Discard"/>
          <Button clickFunc={this.selectSwapDeck2} buttonName="Swap Deck"/>

          <div>{play2HandTop}</div>
          <div id="p2"><h3>P2</h3></div>
          <div>{play2HandBot}</div>
        </div>
        <div id="info">
          <Button clickFunc={this.startGame} buttonName="Start Game"/>
          <Button clickFunc={this.clearWins} buttonName="Clear Wins"/>
          <Button clickFunc={this.refresh} buttonName="New Game"/>

          <div>{cardsOrEnd}</div>
          <div>{player1Score}</div>
          <div>{player2Score}</div>

          <div>{winner}</div> 
          <div id="wins"><span>{p1Wins}{p2Wins}</span></div>
        </div>
      </div>
    )
  }
}

const Button = (props) => {
  
  return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
}

export default App;