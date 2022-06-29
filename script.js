const typeColor = {
  bug: "#92bc2c",
  dragon: "#0c69c8",
  fighting: "#d3425f",
  fire: "#fba54c",
  flying: "#a1bbec",
  grass: "#5fbd58",
  ground: "#da7c4d",
  ghost: "#5f6dbc",
  ice: "#75d0c1",
  normal: "#a0a29f",
  poison: "#b763cf",
  psychic: "#fa8581",
  rock: "#c9bb8a",
  water: "#539ddf",
  fairy: "#ee90e6",
  electric: "#f2d94e",
  dark: "#595761",
  steel: "#5695a3",
};

//DOM OBJECTS
const pokehp = document.querySelector(".hp");
const pokeImg = document.querySelector(".poke-IMG");
const pokeID = document.querySelector(".pokemonID");
const pokeName = document.querySelector(".poke-name");
const types = document.querySelector(".types");
const stats = document.querySelector(".stats");
const generateBtn = document.querySelector(".btn");
const searchTerm = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const pokeType = document.querySelector(".poke-type");
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");
const statAttack = document.querySelector(".stat-attack");
const statDefend = document.querySelector(".stat-defend");
const statSpeech = document.querySelector(".stat-speech");

//function
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

//fetch pokemon data
const fetchPokeData = (name) => {
  fetch("https://pokeapi.co/api/v2/pokemon/" + name)
    .then((response) => response.json())
    .then((data) => {
      pokeInformation(data);
    });
};
let pokeInformation = (data) => {
  pokeID.textContent = "ID: " + data["id"];
  pokehp.textContent = "HP: " + data["stats"][0]["base_stat"];
  pokeName.textContent = capitalize(data.name);
  // get the img
  pokeImg.src = data["sprites"]["other"]["home"]["front_default"];
  //get the attack
  statAttack.innerText = data["stats"][1]["base_stat"];
  statDefend.innerText = data["stats"][2]["base_stat"];
  statSpeech.textContent = data["stats"][5]["base_stat"];

  pokeWeight.textContent = (data["weight"] * 0.1).toFixed(1) + " kg";
  pokeHeight.textContent = (data["height"] * 0.1).toFixed(1) + " m";

  //Get the types of pokemon
  const dataTypes = data["types"];
  const dataFirstType = dataTypes[0];
  const dataSecondType = dataTypes[1];
  /*pokeType.textContent = dataFirstType["type"]["name"];*/
  if (dataSecondType) {
    pokeType.innerText =
      capitalize(dataFirstType["type"]["name"]) +
      " / " +
      capitalize(dataSecondType["type"]["name"]);
  } else {
    pokeType.textContent = capitalize(dataFirstType["type"]["name"]);
  }

  //set them pokemon based on pokemon type
  const themeColor = typeColor[dataFirstType.type.name];
  styleCard(themeColor);

  pokeImg.addEventListener("mouseover", () => {
    fetchPokeData(
      (pokeImg.src = data["sprites"]["other"]["home"]["front_shiny"])
    );
  });
  pokeImg.addEventListener("mouseout", () => {
    fetchPokeData(
      (pokeImg.src = data["sprites"]["other"]["home"]["front_default"])
    );
  });
};
searchBtn.addEventListener("click", () => fetchPokeData(searchTerm.value));

fetchPokeData("bulbasaur");

//generate random pokemon
let getPokeData = () => {
  let idRandom = Math.floor(Math.random() * 905) + 1;
  fetch("https://pokeapi.co/api/v2/pokemon/" + idRandom)
    .then((res) => res.json())
    .then((data) => pokeInformation(data));
};
//search pokemon by ID
let getPokeID = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((response) => response.json())
    .then((data) => pokeInformation(data));
};
generateBtn.addEventListener("click", getPokeData);
searchBtn.addEventListener("click", () => getPokeID(searchTerm.value));

let styleCard = (themeColor) => {
  card.style.background = `radial-gradient(circle farthest-side, #fff,${themeColor})`;
  generateBtn.style.background = `${themeColor}`;
  searchBtn.style.background = `${themeColor}`;
};

//Execute a function when the user presses a key on the keyboard
searchTerm.addEventListener("keypress", function (event) {
  //if the user presses the "enter" key on the keyboard
  if (event.key === "Enter") {
    //cancel the default action, if needed
    event.preventDefault();
    //trigger the button element with a click
    document.querySelector(".search-btn").click();
  }
});
