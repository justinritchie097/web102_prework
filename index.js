/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from "./games.js";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data

  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");
    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `<img src="${games[i].img}" class="game-img" />
The name of the game is: ${games[i].name} <br>
The description of the game is: ${games[i].description} <br>`;
    gamesContainer.appendChild(gameCard);
    // append the game to the games-container
  }
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
  (acc, game) => acc + game.backers,
  0,
);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `Total Contributions: ${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `Total Amount Raised: $${totalRaised.toLocaleString()}`;
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `Number of Games: ${GAMES_JSON.length}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  // use the function we previously created to add funded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGameCount = GAMES_JSON.filter(
  (game) => game.pledged < game.goal,
).length;
// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = `A total of ${unfundedGameCount} games remain unfunded. We need your help to fund these amazing game${unfundedGameCount === 1 ? "" : "s"}! We have raised a total of $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. If you would like to help, please consider donating to one of these games!`;
// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = unfundedGamesString;
descriptionContainer.appendChild(descriptionElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let topGame,
  topSecondGame = [...sortedGames];

// create a new element to hold the name of the top pledge game, then append it to the correct element
document.createElement("p");
topGame = document.createElement("p");
topGame.innerHTML = `${sortedGames[0].name}`;
firstGameContainer.appendChild(topGame);
// do the same for the runner up item
topSecondGame = document.createElement("p");
topSecondGame.innerHTML = `${sortedGames[1].name}`;
secondGameContainer.appendChild(topSecondGame);

//CUSTOMIZATION: SHOW THE DIFFERENCE BETWEEN PLEDGED AND GOAL FOR EACH GAME
//This function calculates the difference between the pledged amount and the goal for each game and displays it in the games container.
function showDifference() {
  deleteChildElements(gamesContainer);

  GAMES_JSON.forEach((game) => {
    const difference = game.pledged - game.goal;
    const differenceElement = document.createElement("p");
    differenceElement.innerHTML = ` ${game.name}: $${difference.toLocaleString()}`;
    gamesContainer.appendChild(differenceElement);
  });
}

const differenceBtn = document.getElementById("difference-btn");
differenceBtn.addEventListener("click", showDifference);
