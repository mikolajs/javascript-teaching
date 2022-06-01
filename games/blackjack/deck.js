 
 class Deck {
   constructor(deckSize){
     this.deckSize = deckSize; // 6 or 13
     this.colors = ['♥', '♦', '♣', '♠'];
     this.colorsNames = ['heart (kier)', 'diamond (karo)', 'club (trefl)', 'spade (pik)'];
     this.figures = {'A', 'K', 'Q', 'J'};
     this.values = [11, 10, 10, 10];
     this.deck = [];
    }
    
    _mkDeck(){
    	for(let i = 0; i < 6; i++)
    	  for(let j = 0; j < 4; j++){
    	    if(i < 4) this.deck.push(new Card(this.figures[i], this.colors[j], this.values[i]));
    	    else this.deck.push((14 - i), this.colors[j], 14 - i);
    	  }
    	this.deck.sort(() => Math.random())
    }
    
 }
