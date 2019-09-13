// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       play1Hand: [],
//       play2Hand: [],
//       card1: {},
//       card2: {},
//       card3: {},
//       card4: {},
//       card5: {},
//       card6: {},
//       card7: {},
//       card8: {},
//       card9: {},
//       card10: {},
//       card11: {},
//       card12: {},
//       cardArray: [],
//       discardReferenceArray: [],
//       discard: {},
//       deckObj: {},
//       beginP1Flipped: 0,
//       beginP2Flipped: 0,
//       playing: false,
//       p1Turn: null,
//       p2Turn: null,
//       totalP1Flipped: 0,
//       totalP2Flipped: 0,
//       p1Total: 0,
//       p2Total: 0,
//       p1Wins: 0,
//       p2Wins: 0,
//       selectIndex: null,
//       itemID: null,
//       cardImgIndex: 0,
//     }
//   }

//   genDeck=()=>{
//     let tempArray = [];
//     for(let i = 0; i < 52; i++) {
//       tempArray[i] = i+1;//deck of 52
//     }
//     return tempArray;
//   }

//   randCardIndex = (deckArr) => {
//     return Math.floor(Math.random()*deckArr.length)
//   }


//   componentDidMount = () => {
    
//     let p1Wins = localStorage.getItem('p1Wins')
//     let p2Wins = localStorage.getItem('p2Wins')


//     let deckIndexArr = this.genDeck();
//     let p1hand = [];
//     let p2hand = [];
//     let cardImageArr = [];
//     let discardObj;
//     let randNum;
//     let discardIndex;
//     let discardReference = [];

//     // for(let i=1;i<14;i++){
//     //   cardImageArr[i] = `./images/${i}.jpg`;
//     // }
//     let deckImageArr = deckIndexArr.map((idNum)=>{
//       let imgIndex = (idNum%13)===0 ? 13 : idNum%13;
//       return {
//         id:idNum,
//         image: `./images/${imgIndex}.jpg`,
//         flipped: true
//       }
//     })
//     for (let i = 0; i < 52; i++) {
//       discardReference[i] = deckImageArr[i];
//     }

//     discardIndex = this.randCardIndex(deckImageArr);
//     discardObj = deckImageArr.splice(discardIndex,1)[0];

//     for(let i=0;i<12;i++){
//       randNum = this.randCardIndex(deckImageArr);
      
//       let randCardObj = deckImageArr.splice(randNum,1)[0];
//       if(i < 6){
//         p1hand[i] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
//       } else {
//         p2hand[i-6] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
//       }
//     }
//     this.setState({
//       play1Hand: p1hand,
//       play2Hand: p2hand,
//       cardArray: deckImageArr,
//       discardReferenceArray: discardReference,
//       discard: discardObj,
//       p1Wins: p1Wins,
//       p2Wins: p2Wins,
//       card1: p1hand[0],
//       card2: p1hand[1],
//       card3: p1hand[2],
//       card4: p1hand[3],
//       card5: p1hand[4],
//       card6: p1hand[5],
//       card7: p2hand[0],
//       card8: p2hand[1],
//       card9: p2hand[2],
//       card10: p2hand[3],
//       card11: p2hand[4],
//       card12: p2hand[5]
//     }, ()=> {
//       if(this.state.p1Wins === null || this.state.p2Wins === null) {
//         this.setState({
//           p1Wins: 0,
//           p2Wins: 0
//         })
//       }
//     })
//   }

//   startGame = () => {
//     if (this.state.beginP1Flipped === 2 && this.state.beginP2Flipped === 2 && this.state.playing === false) {
//       let turn = (Math.floor(Math.random() * 2)) === 0 ? true : false
//       this.setState({
//         p1Turn: turn,
//         p2Turn: !turn,
//         playing: true
//       }, ()=>{
//         this.state.p1Turn ? console.log("Player 1 goes first.") : console.log("Player 2 goes first.")
//       })
//     }
//   }

//   calculateScore = (item) => {
//     if(this.state.playing) {
//       let state = this.state;
//       let total1 = 0;
//       let total2 = 0;

//       for(let i = 0; i < 3; i++) {
//         if(state.play1Hand[i].id % 13 === state.play1Hand[i+3].id % 13) {
//           total1 += 0;
//         } else {
//           total1 += (state.play1Hand[i].id % 13) + (state.play1Hand[i+3].id % 13)
//         }
//         if(state.play2Hand[i].id % 13 === state.play2Hand[i+3].id % 13) {
//           total2 += 0;
//         } else {
//           total2 += (state.play2Hand[i].id % 13) + (state.play2Hand[i+3].id % 13)
//         }
//       }

//       this.setState({
//         p1Total: total1,
//         p2Total: total2,
//         playing: false
//       })

//       if (total2 < total1) {
//         let curr = parseInt(this.state.p2Wins) + 1
//         this.setState({p2Wins: curr}, () => {
//         if(parseInt(this.state.p2Wins) > 8) {
//           localStorage.setItem('p2Wins', 0);
//           localStorage.setItem('p1Wins', 0);
//           this.setState({p2Wins: 0})
//           this.setState({p1Wins: 0})
//         } else {
//           localStorage.setItem('p2Wins', curr);
//         }
//       })
//     }

//       else if (total1 < total2) {
//         let curr = parseInt(this.state.p1Wins) + 1
//         this.setState({p1Wins: curr}, () => {
//           localStorage.setItem('p1Wins', curr);
//           if(parseInt(this.state.p1Wins) > 8) {
//             localStorage.setItem('p1Wins', 0);
//             localStorage.setItem('p2Wins', 0);
//             this.setState({p1Wins: 0})
//             this.setState({p2Wins: 0})
//           }
//         })
//       }
//     }
//   }

//   clearWins = () => {
//     this.setState({p1Wins: 0})
//     this.setState({p2Wins: 0})
//     localStorage.setItem("p1Wins", 0)
//     localStorage.setItem("p2Wins", 0)
// }


//       selectSwapDiscard1 = () => {
//         console.log(this.state.selectIndex);
//         if(this.state.p1Turn) {
//           let play1 = this.state.play1Hand
//           play1.splice(this.state.selectIndex, 1, this.state.discard)
//           switch(this.state.selectIndex) {
//             case "0": this.setState({card1: this.state.discard})
//             break;
//             case "1": this.setState({card2: this.state.discard})
//             break;
//             case "2": this.setState({card3: this.state.discard})
//             break;
//             case "3": this.setState({card4: this.state.discard})
//             break;
//             case "4": this.setState({card5: this.state.discard})
//             break;
//             case "5": this.setState({card6: this.state.discard})
//             break;
//           }
//           this.setState({
//             discard: this.state.discardReferenceArray[(this.state.itemID)-1],
//             play1Hand: play1,
//             p1Turn: !this.state.p1Turn,
//             p2Turn: !this.state.p2Turn
//           })
//         }
//       }

//       selectSwapDiscard2 = () => {
//         console.log(this.state.selectIndex);
//         if(this.state.p2Turn) {
//           let play2 = this.state.play2Hand
//           play2.splice(this.state.selectIndex, 1, this.state.discard)

//           switch(this.state.selectIndex) {
//             case "0": this.setState({card7: this.state.discard})
//             break;
//             case "1": this.setState({card8: this.state.discard})
//             break;
//             case "2": this.setState({card9: this.state.discard})
//             break;
//             case "3": this.setState({card10: this.state.discard})
//             break;
//             case "4": this.setState({card11: this.state.discard})
//             break;
//             case "5": this.setState({card12: this.state.discard})
//             break;
//           }
//           this.setState({
//             discard: this.state.discardReferenceArray[(this.state.itemID)-1],
//             play2Hand: play2,
//             p1Turn: !this.state.p1Turn,
//             p2Turn: !this.state.p2Turn
//           })
//         }
//       }

//       selectSwapDeck1 = () => {
//         if(this.state.p1Turn) {
//           let play1 = this.state.play1Hand;
//           play1.splice(this.state.selectIndex, 1, this.state.deckObj);
//           switch(this.state.selectIndex) {
//             case "0": this.setState({card1: this.state.deckObj})
//             break;
//             case "1": this.setState({card2: this.state.deckObj})
//             break;
//             case "2": this.setState({card3: this.state.deckObj})
//             break;
//             case "3": this.setState({card4: this.state.deckObj})
//             break;
//             case "4": this.setState({card5: this.state.deckObj})
//             break;
//             case "5": this.setState({card6: this.state.deckObj})
//             break;
//           }
//           this.setState({
//             deckObj: {id: 0},
//             discard: this.state.discardReferenceArray[(this.state.itemID)-1],
//             play1Hand: play1
//           })
//         }
//       }
//       selectSwapDeck2 = () => {
//         if(this.state.p2Turn) {
//           let play2 = this.state.play2Hand
//           play2.splice(this.state.selectIndex, 1, this.state.deckObj)
//           switch(this.state.selectIndex) {
//             case "0": this.setState({card7: this.state.deckObj})
//             break;
//             case "1": this.setState({card8: this.state.deckObj})
//             break;
//             case "2": this.setState({card9: this.state.deckObj})
//             break;
//             case "3": this.setState({card10: this.state.deckObj})
//             break;
//             case "4": this.setState({card11: this.state.deckObj})
//             break;
//             case "5": this.setState({card12: this.state.deckObj})
//             break;
//           }
//           this.setState({
//             deckObj: {id: 0},
//             play2Hand: play2,
//             discard: this.state.discardReferenceArray[(this.state.itemID)-1]
//           })
//         }
//       }

//   render() {

//   const getCardFromDeck = (item) => {

//     if(this.state.cardImgIndex !== 0) {
//       item.target.src = `./images/0.jpg`
//       this.setState({
//         cardImgIndex: 0,
//         p1Turn: !this.state.p1Turn,
//         p2Turn: !this.state.p2Turn
//       })
//     }
    
//     if(this.state.playing && this.state.cardArray.length > 0 && this.state.cardImgIndex === 0) {
//       let temp = this.state.cardArray
//       let card = temp.splice(this.randCardIndex(temp), 1)[0];
//       let cardObj = card
//       card = card.id % 13 === 0 ? 13 : card.id % 13
//       item.target.src = `./images/${card}.jpg`
//       this.setState({
//         cardArray: temp,
//         deckObj: cardObj,
//         cardImgIndex: card
//       })
//     } 
//     // else {
//     //   item.target.src = `./images/0.jpg`
//     // }
//   }

//   const player1Click = (item) => {
//     if ((this.state.p1Turn === null && this.state.beginP1Flipped !== 2) || this.state.p1Turn) {
//       console.log(item.target);
//       let cardsFlipped = this.state.beginP1Flipped  
//       cardsFlipped++;
//       let targetImgId = parseInt(item.target.id) % 13 === 0 ? 13 : parseInt(item.target.id) % 13
//       let targetImgCard = item.target.src=`./images/${targetImgId}.jpg`
//       let targetObj = {
//         id: item.target.id,
//         image: targetImgCard
//       }
//       this.setState({

//         beginP1Flipped: cardsFlipped,
//         totalP1Flipped: cardsFlipped,
//         selectIndex: item.target.className,
//         itemID: item.target.id
//       })
//     }
//   }

//   const player2Click = (item) => {

//     if ((this.state.p2Turn === null && this.state.beginP2Flipped !== 2) || this.state.p2Turn) {
//       let cardsFlipped = this.state.beginP2Flipped
//         cardsFlipped++
//       let targetImgId = item.target.id % 13 === 0 ? 13 : item.target.id % 13
//       let targetImgCard = item.target.src=`./images/${targetImgId}.jpg`
//       let targetObj = {
//         id: item.target.id,
//         image: targetImgCard
//       }
//       this.setState({
//         beginP2Flipped: cardsFlipped,
//         totalP2Flipped: cardsFlipped,
//         selectIndex: item.target.className,
//         itemID: item.target.id
//       })
//     }
//   }

//   // const discardPic = (item) => {
//   //   let targetImgPic = item.target.id % 13 === 0 ? 13 : item.target.id % 13
//   //   item.target.src=`./images/${targetImgPic}.jpg`
//   // }
//     // t arrayHand2 = [this.state.card7, this.state.card8, this.state.card9, this.state.card10, this.state.card11, this.state.card12];
    
//     let playCard1 = <img onClick={player1Click} src={this.state.card1.image} id={this.state.card1.id} className={0}  alt="card"/>
//     let playCard2 = <img onClick={player1Click} src={this.state.card2.image} id={this.state.card2.id} className={1}  alt="card"/>
//     let playCard3 = <img onClick={player1Click} src={this.state.card3.image} id={this.state.card3.id} className={2}  alt="card"/>
//     let playCard4 = <img onClick={player1Click} src={this.state.card4.image} id={this.state.card4.id} className={3}  alt="card"/>
//     let playCard5 = <img onClick={player1Click} src={this.state.card5.image} id={this.state.card5.id} className={4}  alt="card"/>
//     let playCard6 = <img onClick={player1Click} src={this.state.card6.image} id={this.state.card6.id} className={5}  alt="card"/>
//     let playCard7 = <img onClick={player2Click} src={this.state.card7.image} id={this.state.card7.id} className={0}  alt="card"/>
//     let playCard8 = <img onClick={player2Click} src={this.state.card8.image} id={this.state.card8.id} className={1}  alt="card"/>
//     let playCard9 = <img onClick={player2Click} src={this.state.card9.image} id={this.state.card9.id} className={2}  alt="card"/>
//     let playCard10 = <img onClick={player2Click} src={this.state.card10.image} id={this.state.card10.id} className={3}  alt="card"/>
//     let playCard11 = <img onClick={player2Click} src={this.state.card11.image} id={this.state.card11.id} className={4}  alt="card"/>
//     let playCard12 = <img onClick={player2Click} src={this.state.card12.image} id={this.state.card12.id} className={5}  alt="card"/>

//     // let renderPlay1Hand = arrayHand1.map((card1, index)=>{
//     //   return <img onClick={player1Click} src={"./images/0.jpg"} id={card1.id} className={index} key={index+10} alt="card" />
//     // })
//     // let play1HandTop = renderPlay1Hand.slice(0,3);
//     // let play1HandBot = renderPlay1Hand.slice(3);

//     // let renderPlay2Hand = arrayHand2.map((card2, index)=>{
//     //   return <img onClick={player2Click} src={"./images/0.jpg"} id={card2.id} className={index} key={index+100} alt="card"/>
//     // })

//     // let play2HandTop = renderPlay2Hand.slice(0,3);
//     // let play2HandBot = renderPlay2Hand.slice(3);

//     let deck = <img onClick={getCardFromDeck} src={"./images/0.jpg"} id={this.state.deckCardID} alt="deck" />
//     let discard = <img src={this.state.discard.image} id={this.state.discard.id} alt="discard"/>
//     let cardsOrEnd = this.state.cardArray.length !== 0 ? <h3>{"Amount of cards left in deck: " + this.state.cardArray.length}</h3> : <h3>No more cards.</h3>
//     let player1Score = <h3>{"Player 1 Score: " + this.state.p1Total}</h3>
//     let player2Score = <h3>{"Player 2 Score " + this.state.p2Total}</h3>
//     let winner;
//     let p1Wins = <h3>{"Player 1 Wins: " + this.state.p1Wins}</h3>
//     let p2Wins = <h3>{"Player 2 Wins: " + this.state.p2Wins}</h3>

//     let turn;
//     if(this.state.p1Turn) {
//       turn = <h3>{"Turn: P1"}</h3>
//     } else if (this.state.p2Turn) {
//       turn = <h3>{"Turn: P2"}</h3>
//     }

//     if(this.state.p1Total < this.state.p2Total) {
//       winner = <h3>{"The Winner is Player 1!"}</h3>
//     } else if (this.state.p2Total < this.state.p1Total) {
//       winner = <h3>{"The Winner is Player 2!"}</h3>
//     } else if (this.state.p1Total !== 0 && this.state.p2Total === this.state.p1Total) {
//       winner = <h3>{"This was a tie!"}</h3>
//     } else {
//       winner = <h3></h3>
//     }

//     return (
//       <div>
        
//         <div id="cards">
//           <div>{playCard1}{playCard2}{playCard3}</div>
//           <div id="p1"><h3>P1</h3></div>
//           <div>{playCard4}{playCard5}{playCard6}</div>
        
//           <Button clickFunc={this.selectSwapDiscard1} buttonName="Swap Discard"/>
//           <Button clickFunc={this.selectSwapDeck1} buttonName="Swap Deck"/>
//           <div id="turn">{turn}</div>
//           <div><span className="spanMove">{discard}</span><span className="spanMove">{deck}</span></div>
          
//           <Button clickFunc={this.selectSwapDiscard2} buttonName="Swap Discard"/>
//           <Button clickFunc={this.selectSwapDeck2} buttonName="Swap Deck"/>

//           <div>{playCard7}{playCard8}{playCard9}</div>
//           <div id="p2"><h3>P2</h3></div>
//           <div>{playCard10}{playCard11}{playCard12}</div>

//         </div>

//         <div id="info">
          
//           <Button clickFunc={this.startGame} buttonName="Start Game"/>
//           <Button clickFunc={this.calculateScore} buttonName="Calculate Score"/> 
//           <Button clickFunc={this.clearWins} buttonName="Clear Wins"/>

//           <div>{cardsOrEnd}</div>
//           <div>{player1Score}</div>
//           <div>{player2Score}</div>

//           <div>{winner}</div> 
//           <div id="wins"><span>{p1Wins}{p2Wins}</span></div>

//         </div>
//       </div>
//     );
//   }
// }


// const Button = (props) => {
  
//   return <button onClick={()=>{props.clickFunc()}}>{props.buttonName}</button>
// }

// export default App;



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
      playing: false,
      p1Turn: null,
      p2Turn: null,
      p1Total: 0,
      p2Total: 0,
      p1Wins: 0,
      p2Wins: 0,
      selectIndex: null,
      itemID: null,
      isImg0: false,
      didSwapDeck: false
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
      let cardImageArr = [];
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

      discardReference = deckImageArr;
      discardIndex = this.randCardIndex(deckImageArr);
      discardObj = deckImageArr.splice(discardIndex,1)[0];

      for(let i=0;i<12;i++){
        randNum = this.randCardIndex(deckImageArr);
        let randCardObj = deckImageArr.splice(randNum,1)[0];
        if(i < 6){
          p1hand[i] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
        } else {
          p2hand[i-6] = {id: randCardObj.id, image: `./images/0.jpg`, flipped: false};
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
      if(this.state.p1Turn) {
        let play1 = this.state.play1Hand
        play1.splice(this.state.selectIndex, 1, this.state.discard)
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }
    }

    selectSwapDiscard2 = () => {
      if(this.state.p2Turn) {
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.discard)
        this.setState({
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play2Hand: play2,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }
    }

    selectSwapDeck1 = () => {
      if(this.state.p1Turn && this.state.deckObj.id !== 0) {
        let play1 = this.state.play1Hand;
        play1.splice(this.state.selectIndex, 1, this.state.deckObj);
        console.log("Replaced card = " + play1[this.state.selectIndex])
        console.log("Discard that was supposed to be replaced = " + this.state.deckObj);
        this.setState({
          deckObj: {id: 0, image: `./images/0.jpg`},
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          play1Hand: play1,
          didSwapDeck: true,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }
    }

    selectSwapDeck2 = () => {
      if(this.state.p2Turn && this.state.deckObj.id !== 0) {
        let play2 = this.state.play2Hand
        play2.splice(this.state.selectIndex, 1, this.state.deckObj)
        this.setState({
          deckObj: {id: 0, image: `./images/0.jpg`},
          play2Hand: play2,
          discard: this.state.discardReferenceArray[(this.state.itemID)-1],
          didSwapDeck: true,
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn
        })
      }
    }

  render() {

    const getCardFromDeck = (item) => {
      if(this.state.deckObj.id !== 0) {
        this.setState({discard: this.state.deckObj})
        item.target.src = `./images/0.jpg`
        this.setState({
          deckObj: {id: 0, image: `./images/0.jpg`},
          p1Turn: !this.state.p1Turn,
          p2Turn: !this.state.p2Turn,
          didSwapDeck: false
        })
      }
        
      if(this.state.playing && this.state.cardArray.length > 0 && this.state.deckObj.id === 0) {
        let temp = this.state.cardArray
        let card = temp.splice(this.randCardIndex(temp), 1)[0];
        item.target.src = card.image
        this.setState({
          cardArray: temp,
          deckObj: card
        })
      } 
    }

    const player1Click = (item) => {
      this.setState({
        selectIndex: parseInt(item.target.className),
        itemID: parseInt(item.target.id)
      })
        
      if (this.state.p1Turn === null && this.state.beginP1Flipped < 3) {
        item.target.src = this.state.discardReferenceArray[parseInt(item.target.id) - 1].image; 
        this.setState({beginP1Flipped: this.state.beginP1Flipped + 1})
      } 
    }

    const player2Click = (item) => {
      this.setState({
        selectIndex: parseInt(item.target.className),
        itemID: parseInt(item.target.id)
      })

      if (this.state.p2Turn === null && this.state.beginP2Flipped !== 2) {
        item.target.src = this.state.discardReferenceArray[parseInt(item.target.id) - 1].image; 
        this.setState({beginP2Flipped: this.state.beginP2Flipped + 1})
      }
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

    let deck = <img onClick={getCardFromDeck} src={`./images/0.jpg`} id={this.state.deckObj.id} alt="deck" />
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
          <Button clickFunc={this.calculateScore} buttonName="Calculate Score"/> 
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