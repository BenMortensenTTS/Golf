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
<<<<<<< HEAD
      deckObj: {id: 0, image: `./images/0.jpg`},
=======
      deckObj: {},
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
      playing: false,
      p1Turn: null,
      p2Turn: null,
      p1Total: 0,
      p2Total: 0,
      p1Wins: 0,
      p2Wins: 0,
      selectIndex: null,
      itemID: null,
<<<<<<< HEAD
      beginP1Flipped: 0,
      beginP2Flipped: 0,
      isDeckBlank: true,
      cardType: null,
      didTakeDeck: false
=======
      didSwapDeck: false,
      beginP1Flipped: 0,
      beginP2Flipped: 0,
      isDeckBlank: true
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
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
<<<<<<< HEAD
=======
      let deckCard;
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e

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

<<<<<<< HEAD
      for(let i=0;i<12;i++){
=======
      for(let i=0;i<13;i++){
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        randNum = this.randCardIndex(deckImageArr);
        let randCardObj = deckImageArr.splice(randNum,1)[0];
        if(i < 6){
          p1hand[i] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
          discardReference[randCardObj.id - 1] = {id: randCardObj.id, image: `./images/${randCardObj.id % 13 === 0 ? 13 : randCardObj.id % 13}.jpg`, flipped: false}
        } else if (i < 12){
          p2hand[i-6] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
          discardReference[randCardObj.id - 1] = {id: randCardObj.id, image: `./images/${randCardObj.id % 13 === 0 ? 13 : randCardObj.id % 13}.jpg`, flipped: false}
<<<<<<< HEAD
        } 
=======
        } else {
          deckCard = {id: randCardObj.id, image: `./images/0.jpg`};
        }
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
      }

      this.setState({
        play1Hand: p1hand,
        play2Hand: p2hand,
        cardArray: deckImageArr,
        discardReferenceArray: discardReference,
        discard: discardObj,
        p1Wins: p1Wins,
        p2Wins: p2Wins,
<<<<<<< HEAD
=======
        deckObj: deckCard
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
      })
    }

    startGame = () => {
      if (this.state.beginP1Flipped === 2 && this.state.beginP2Flipped === 2 && this.state.playing === false) {
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
<<<<<<< HEAD

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

=======

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

>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        else if (total1 < total2) {
          let curr = parseInt(this.state.p1Wins) + 1
          this.setState({p1Wins: curr}, () => {
            localStorage.setItem('p1Wins', curr);
            if(parseInt(this.state.p1Wins) > 8) {
              localStorage.setItem('p1Wins', 0);
              localStorage.setItem('p2Wins', 0);
              this.setState({p1Wins: 0})
              this.setState({p2Wins: 0})
            } else {
              localStorage.setItem('p1Wins', curr);
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
<<<<<<< HEAD
      if(!this.state.didTakeDeck && this.state.deckObj.id === 0 && this.state.p1Turn) {
        let play1 = this.state.play1Hand
        play1.splice(this.state.selectIndex, 1, this.state.discard)
=======
      if(this.state.p1Turn) {
        let play1 = this.state.play1Hand
        play1.splice(this.state.selectIndex, 1, this.state.discard)
        console.log(this.state.discardReferenceArray[(this.state.itemID)-1])
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }

      let checkIfHand1Flipped = this.state.play1Hand;
      let count = 0;
<<<<<<< HEAD

      for(let i = 0; i < checkIfHand1Flipped.length; i++) {
        if(checkIfHand1Flipped[i].flipped) {
          count++;
          console.log(count);
        }
      }

      if(count === 6) {
        console.log("Trigger");
=======
      for (let i = 0; i < checkIfHand1Flipped.length; i++) {
        if (checkIfHand1Flipped[i].flipped) {
          count++
        }
      }
      if(count === 6) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        this.calculateScore();
      }
    }

    selectSwapDiscard2 = () => {
<<<<<<< HEAD
      if(this.state.p2Turn && this.state.deckObj.id === 0 && !this.state.didTakeDeck) {
=======
      if(this.state.p2Turn) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.discard)
        console.log(this.state.discardReferenceArray[(this.state.itemID)-1])
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play2Hand: play2,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }

      let checkIfHand2Flipped = this.state.play2Hand;
      let count = 0;
<<<<<<< HEAD

      for(let i = 0; i < checkIfHand2Flipped.length; i++) {
        if(checkIfHand2Flipped[i].flipped) {
          count++;
          console.log(count);
        }
      }

      if(count === 6) {
        console.log("Trigger");
=======
      for (let i = 0; i < checkIfHand2Flipped.length; i++) {
        if (checkIfHand2Flipped[i].flipped) {
          count++
        }
      }
      if(count === 6) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        this.calculateScore();
      }
    }

    selectSwapDeck1 = () => {
<<<<<<< HEAD
      if(this.state.p1Turn && this.state.deckObj.id !== 0 && this.state.cardType !== "deck") {
=======
      if(this.state.p1Turn && this.state.deckObj.id !== 0) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        let play1 = this.state.play1Hand;
        play1.splice(this.state.selectIndex, 1, this.state.deckObj);
        this.setState({
          deckObj: {id: 0, image: `./images/0.jpg`},
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1,
<<<<<<< HEAD
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          didTakeDeck: false
        })
      }

      let checkIfHand1Flipped = this.state.play1Hand;
      let count = 0;
      
      for(let i = 0; i < checkIfHand1Flipped.length; i++) {
        if(checkIfHand1Flipped[i].flipped) {
          count++;
          console.log(count);
        }
      }

      if(count === 6) {
        this.calculateScore();
        console.log("Trigger");
        console.log(this.state.total1)
        console.log(this.state.total2)
=======
          didSwapDeck: true,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e

      let checkIfHand1Flipped = this.state.play1Hand;
      let count = 0;
      for (let i = 0; i < checkIfHand1Flipped.length; i++) {
        if (checkIfHand1Flipped[i].flipped) {
          count++
          console.log(count);
        }
      }
<<<<<<< HEAD
=======
      if(count === 6) {
        this.calculateScore();
        console.log(this.state.total1)
        console.log(this.state.total2)

      }
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
    
    }

    selectSwapDeck2 = () => {
<<<<<<< HEAD
      if(this.state.p2Turn && this.state.deckObj.id !== 0 && this.state.cardType !== "deck") {
=======
      if(this.state.p2Turn && this.state.deckObj.id !== 0) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.deckObj)
        this.setState({
          deckObj: {id: 0, image: `./images/0.jpg`},
          play2Hand: play2,
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
<<<<<<< HEAD
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          didTakeDeck: false
=======
          didSwapDeck: true,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        })
      }

      let checkIfHand2Flipped = this.state.play2Hand;
      let count = 0;
<<<<<<< HEAD

     for(let i = 0; i < checkIfHand2Flipped.length; i++) {
        if(checkIfHand2Flipped[i].flipped) {
          count++;
          console.log(count);
        }
      }
      
      if(count === 6) {
        console.log("Trigger");
=======
      for (let i = 0; i < checkIfHand2Flipped.length; i++) {
        if (checkIfHand2Flipped[i].flipped) {
          count++
        }
      }
      if(count === 6) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        this.calculateScore();
      }
    }

  render() {

    const getCardFromDeck = (item) => {
      if(this.state.deckObj.id !== 0 && this.state.playing) {
<<<<<<< HEAD
=======
        let temp = this.state.deckObj.id;
        if(this.state.cardArray.length === 38 && this.state.isDeckBlank) {
          
          this.setState({
            isDeckBlank: false,
            deckObj: {id: temp, image: `./images/${temp % 13 === 0 ? 13 : temp % 13}.jpg`}
          });
          item.target.src = `./images/${ temp % 13 === 0 ? 13 : temp % 13}.jpg`
        } 
        else {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
          this.setState({discard: this.state.deckObj})
          item.target.src = `./images/0.jpg`
          this.setState({
            deckObj: {id: 0, image: `./images/0.jpg`},
            p1Turn: !this.state.p1Turn,
            p2Turn: !this.state.p2Turn,
<<<<<<< HEAD
            didTakeDeck: false
          })
        }
      

      if(this.state.playing && this.state.cardArray.length > 0 && this.state.deckObj.id === 0) {
=======
            didSwapDeck: false,
          })
        }
      } 

      else if(this.state.playing && this.state.cardArray.length > 0 && this.state.deckObj.id === 0) {
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        let temp = this.state.cardArray
        let card = temp.splice(this.randCardIndex(temp), 1)[0];
        item.target.src = card.image
        this.setState({
          cardArray: temp,
<<<<<<< HEAD
          deckObj: card,
          cardType: item.target.alt,
          didTakeDeck: true
=======
          deckObj: card
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
        })
      } 
    }

    const player1Click = (item) => {
      this.setState({
        selectIndex: parseInt(item.target.className),
<<<<<<< HEAD
        itemID: parseInt(item.target.id),
        cardType: item.target.alt
=======
        itemID: parseInt(item.target.id)
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
      })
      if (this.state.p1Turn === null && this.state.beginP1Flipped < 2) {
        let discardArray = this.state.discardReferenceArray
        let grabObj = discardArray.splice((parseInt(item.target.id) - 1), 1)[0]
        if(grabObj.flipped) {
          discardArray.splice((parseInt(item.target.id) - 1), 0, grabObj)
<<<<<<< HEAD
        } 
        else {
          let updateHand1 = this.state.play1Hand;
          let allow2 = {id: grabObj.id, image: `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`, flipped: true};
          updateHand1.splice(parseInt(item.target.className), 1, allow2);
=======
        }
        if(grabObj.flipped === false) {
          let allow2 = {id: grabObj.id, image: `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`, flipped: true};
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
          item.target.src = `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`
          discardArray.splice((parseInt(item.target.id) - 1), 0, allow2) 
          this.setState({
            beginP1Flipped: this.state.beginP1Flipped + 1,
<<<<<<< HEAD
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
=======
            discardReferenceArray: discardArray
          })
        }
      } 
    }

    const player2Click = (item) => {
      this.setState({
        selectIndex: parseInt(item.target.className),
        itemID: parseInt(item.target.id)
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
      })
      if (this.state.p2Turn === null && this.state.beginP2Flipped < 2) {
        let discardArray = this.state.discardReferenceArray
        let grabObj = discardArray.splice((parseInt(item.target.id) - 1), 1)[0]
        if(grabObj.flipped) {
          discardArray.splice((parseInt(item.target.id) - 1), 0, grabObj)
        }
        if(grabObj.flipped === false) {
<<<<<<< HEAD
          let updateHand2 = this.state.play2Hand;
          let allow2 = {id: grabObj.id, image: `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`, flipped: true};
          updateHand2.splice(parseInt(item.target.className), 1, allow2);
=======
          let allow2 = {id: grabObj.id, image: `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`, flipped: true};
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
          item.target.src = `./images/${item.target.id % 13 === 0 ? 13 : item.target.id % 13}.jpg`
          discardArray.splice((parseInt(item.target.id) - 1), 0, allow2)
          this.setState({
            beginP2Flipped: this.state.beginP2Flipped + 1,
<<<<<<< HEAD
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
=======
            discardReferenceArray: discardArray
          })
        }
      }
>>>>>>> 201c2611134bb350b463bedb33398be037031c8e
    }

    let renderPlay1Hand = this.state.play1Hand.map((card1, index)=>{
        return <img onClick={player1Click} src={card1.image} id={card1.id} className={index} key={index+10} alt="card" />
    })
    let play1HandTop = renderPlay1Hand.slice(0,3);
    let play1HandBot = renderPlay1Hand.slice(3);

    let renderPlay2Hand = this.state.play2Hand.map((card2, index)=>{
      return <img onClick={player2Click} src={card2.image} id={card2.id} className={index} key={index+100} alt="card"/>
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
   
    if(this.state.p1Turn) {
      turn = <h3>{"Turn: P1"}</h3>
    } else if (this.state.p2Turn) {
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