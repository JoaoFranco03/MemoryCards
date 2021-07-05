//DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting 
//for stylesheets, images, and subframes to finish loading.

document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
          name: "react",
          img: "img/RN_Card.png",
        },
        {
          name: "react",
          img: "img/RN_Card.png",
        },
        {
          name: "css",
          img: "img/CSS_Card.png",
        },
        {
          name: "css",
          img: "img/CSS_Card.png",
        },
        {
          name: "js",
          img: "img/JS_Card.png",
        },
        {
          name: "js",
          img: "img/JS_Card.png",
        },
        {
          name: "html",
          img: "img/HTML_Card.png",
        },
        {
          name: "html",
          img: "img/HTML_Card.png",
        },
      ];
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    // Score Text
    const resultDisplay = document.querySelector('#result')
    //Cards
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    //Sounds
    var CorrectAudio = new Audio('sfx/Correct.wav')
    var WrongAudio = new Audio('sfx/Wrong.wav')
    var AllRightAudio = new Audio('sfx/AllRight.wav')

    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'img/Blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'img/Blank.png')
        cards[optionTwoId].setAttribute('src', 'img/Blank.png')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        CorrectAudio.play()
        cards[optionOneId].setAttribute('src', 'img/Transparent.png')
        cards[optionTwoId].setAttribute('src', 'img/Transparent.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'img/Blank.png')
        cards[optionTwoId].setAttribute('src', 'img/Blank.png')
        resultDisplay.textContent = this - 2
        WrongAudio.play()
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length * 10
      if  (cardsWon.length === cardArray.length/2) {
        AllRightAudio.play()
        setTimeout(function(){ location.reload(); }, 1000);
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 300)
      }
    }
  
    createBoard()
  })