let firebaseConfig = {
apiKey: "AIzaSyBwmf0G1zMdu1O6NW-MdOUv4qh6p5l_P5M",
authDomain: "pokepedia-e0d75.firebaseapp.com",
databaseURL: "https://pokepedia-e0d75.firebaseio.com",
projectId: "pokepedia-e0d75",
storageBucket: "pokepedia-e0d75.appspot.com",
messagingSenderId: "550121451759",
appId: "1:550121451759:web:5df4350ec5b50f52616b1a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();

let pokemonList;

// All of our connections will be stored in this directory.
let ref = database.ref();

//All of the pokemon in our group
let partyRef = database.ref("/party-members");
let pokedexRef = database.ref("/pokedex");
let gymRef = database.ref("/gym-members");

// Attach an asynchronous callback to read the data at our posts reference
partyRef.on("value", function(snapshot) {
    //console.log(snapshot.val());
  }, function (errorObject) {
    //console.log("The read failed: " + errorObject.code);
});

//Initial function to seed data into firebase, only left in incase we need to reload database data. otherwise should not be ran again.
function LoadGymLeaders() {
    let name = "MILOTIC"
    let leader = "wallace"
    let number = 350
    let type = "WATER"
    let sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png"
    let attack = 60
    let defense = 79
    let speed = 81

    gymRef.push({
        leader: leader,
        name: name,
        number: number,
        type: type,
        sprite: sprite,
        attack: attack,
        defense: defense,
        speed: speed
    });
}

//Dont run this function, only used to bulk load gym member data into firebase
//LoadGymLeaders();

//Initial function to seed data into firebase, only left in incase we need to reload database data. otherwise should not be ran again.
function LoadPokedex() {
    var pokeURL = "https://pokeapi.co/api/v2/pokedex/4/";

    $.ajax({
        url: pokeURL,
        method: "GET"
    })
    .done(function(response) {
        let entries = response.pokemon_entries;
        for(i = 0 ; i < entries.length ; i++){
            pokeURL = `https://pokeapi.co/api/v2/pokemon/${entries[i].pokemon_species.name}`

            $.ajax({
                url: pokeURL,
                method: "GET"
            })
            .done(function(results) {
                pokeURL = results.species.url
                //console.log(pokeURL)

                $.ajax({
                    url: pokeURL,
                    method: "GET"
                })
                .done(function(species) {
                    pokemonList = {
                        name : results.name,
                        description : species.flavor_text_entries.filter(function(r){return r.version.name === "emerald"})[0].flavor_text.replace(/\n/g, " "),
                        sprite : results.sprites.front_default,
                        number : results.id,
                        type : results.types[0].type.name,
                        baseSPD : results.stats[0].base_stat,
                        baseSPCDEF : results.stats[1].base_stat,
                        baseSPCATK : results.stats[2].base_stat,
                        baseDEF : results.stats[3].base_stat,
                        baseATK : results.stats[4].base_stat,
                        baseHP : results.stats[5].base_stat
                    };

                    pokedexRef.push(pokemonList);
                });
            });
        }
    })
};

//Dont run this function, was a one time function to upload everything into firebase
//LoadPokedex();