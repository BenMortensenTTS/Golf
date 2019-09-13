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
  		}, () => {
  		if(this.state.p1Wins === null || this.state.p2Wins === null) {
	        this.setState({
		        p1Wins: 0,
		        p2Wins: 0
	        })
  		}
  	}

  	startGame = () => {
	    if (this.state.beginP1Flipped === 2 && this.state.beginP2Flipped === 2 && this.state.playing === false) {
	     	let turn = (Math.floor(Math.random() * 2)) === 0 ? true : false
	     	this.setState({
		    	playing: true
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
        console.log(this.state.selectIndex);
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
		      this.setState({beginP2Flipped: cardsFlipped})
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
		        	<div>{playCard1}{playCard2}{playCard3}</div>
		        	<div id="p1"><h3>P1</h3></div>
		        	<div>{playCard4}{playCard5}{playCard6}</div>

		        	<Button clickFunc={this.selectSwapDiscard1} buttonName="Swap Discard"/>
        			<Button clickFunc={this.selectSwapDeck1} buttonName="Swap Deck"/>

        			<div id="turn">{turn}</div>
        			<div><span className="spanMove">{discard}</span><span className="spanMove">{deck}</span></div>

        			<Button clickFunc={this.selectSwapDiscard2} buttonName="Swap Discard"/>
        			<Button clickFunc={this.selectSwapDeck2} buttonName="Swap Deck"/>

        			<div>{playCard7}{playCard8}{playCard9}</div>
        			<div id="p2"><h3>P2</h3></div>
        			<div>{playCard10}{playCard11}{playCard12}</div>
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