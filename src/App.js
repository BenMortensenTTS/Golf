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
      discard: discardObj
    })
  }

  render() {
    console.log(this.state.play1Hand);
    console.log(this.state.play2Hand);
    console.log('cardArray',this.state.cardArray);

    let renderPlay1Hand = this.state.play1Hand.map((card1)=>{
      return <img src={"./images/0.jpg"} id={card1.id} />
    })

    let renderPlay2Hand = this.state.play2Hand.map((card2)=>{
      return <img src={"./images/0.jpg"} id={card2.id} />
    })
    return (
      <div>
        <div>{renderPlay1Hand}</div>
        <div>{renderPlay2Hand}</div>
        <div>Discard</div>
        <div><img src={this.state.discard.image} id={this.state.discard.id}/></div>
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
