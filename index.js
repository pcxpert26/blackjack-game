let player = {
    name: "Player",
    chips: 200
}

let cards = []
let sum = 0
//initialize array and sum for dealer
let dealerCards = []
let dealerSum = 0
//
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}
//call dealer function from within startGame
//hasBlackJack value must reset to false with new game
function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    getDealerHand()
    renderGame()
}

function getDealerHand() {
    //assign dealer card values
    let firstDealerCard = getRandomCard()
    let secondDealerCard = getRandomCard()
    //assign array and sum for dealer
    dealerCards = [firstDealerCard, secondDealerCard]
    dealerSum = firstDealerCard + secondDealerCard
    //check for blackjack
    if (dealerSum === 21) {
        message = "House wins!"
        messageEl.textContent = message
        isAlive = false
    }
    //wait for player turn to end then run logic
    //player selects hold which calls analyzeHand()
    //analyzeHand() uses rules to determine hit or hold for dealer
    //16 or less gets hit and 17+ gets hold
}

function analyzeHand() {
    //if player has no cards then game has not started and code should not run
    //if player has blackjack then game should not continue and this code should not run
    //either game not started OR already won should break out
    if (isAlive === false || hasBlackJack === true) {
        return
    }
    else if (dealerSum === 21) {
        message = "House wins!"
        messageEl.textContent = message
        isAlive = false}
    else if (dealerSum < 17) {
        //call newDealerCard() which puts new card into dealerCards array
        newDealerCard()
    } else {
        //dealerSum is 17+ but not 21 so dealer holds
        //call function to compare dealerSum to player sum
        determineGame()
    }
}

function determineGame() {
    //add dealer sum into message to cross check game result
    //account for 21+ technically being greater than by using &&
    if (dealerSum > sum && dealerSum <= 21){
        message = "House wins!" + " Dealer Sum: " + dealerSum
        messageEl.textContent = message
        isAlive = false
    } else if (dealerSum === sum) {
        message = "The game has ended in a draw!" + " Dealer Sum: " + dealerSum
        messageEl.textContent = message
        isAlive = false
    } else {
        message = "You win!" + " Dealer Sum: " + dealerSum
        messageEl.textContent = message
        isAlive = false
    }
}

function newDealerCard() {
    let dealerCard = getRandomCard()
        dealerSum += dealerCard
        dealerCards.push(dealerCard)
        analyzeHand()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
