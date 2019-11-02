//Objects of all the gym leaders
const gymLeaders = [
    Roxanne = {
        name: "Roxanne",
        mainType: ajaxType("rock"),
        pokemon1: ajaxPokemon(74),
        pokemon2: ajaxPokemon(74),
        pokemon3: ajaxPokemon(299)
    },

    Brawly = {
        name: "Brawly",
        mainType: ajaxType("fighting"),
        pokemon1: ajaxPokemon(66),
        pokemon2: ajaxPokemon(307),
        pokemon3: ajaxPokemon(296)
    },

    Wattson = {
        name: "Wattson",
        mainType: ajaxType("electric"),
        pokemon1: ajaxPokemon(100),
        pokemon2: ajaxPokemon(82),
        pokemon3: ajaxPokemon(309),
        pokemon4: ajaxPokemon(310)
    },

    Flannery = {
        name: "Flannery",
        mainType: ajaxType("fire"),
        pokemon1: ajaxPokemon(322),
        pokemon2: ajaxPokemon(218),
        pokemon3: ajaxPokemon(323),
        pokemon4: ajaxPokemon(324)
    },
    Norman = {
        name: "Norman",
        mainType: ajaxType("normal"),
        pokemon1: ajaxPokemon(327),
        pokemon2: ajaxPokemon(288),
        pokemon3: ajaxPokemon(264),
        pokemon4: ajaxPokemon(289)
    },
    Winona = {
        name: "Winona",
        mainType: ajaxType("flying"),
        pokemon1: ajaxPokemon(333),
        pokemon2: ajaxPokemon(357),
        pokemon3: ajaxPokemon(279),
        pokemon4: ajaxPokemon(227),
        pokemon5: ajaxPokemon(334)
    },
    Tate_and_Liza = {
        name: "Tate & Liza",
        mainType: ajaxType("psychic"),
        pokemon1: ajaxPokemon(344),
        pokemon2: ajaxPokemon(178),
        pokemon3: ajaxPokemon(337),
        pokemon4: ajaxPokemon(338)
    },
    Juan = {
        name: "Juan",
        mainType: ajaxType("water"),
        pokemon1: ajaxPokemon(370),
        pokemon2: ajaxPokemon(340),
        pokemon3: ajaxPokemon(364),
        pokemon4: ajaxPokemon(342),
        pokemon5: ajaxPokemon(230)
    }
]

function ajaxPokemon(pokeId){
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + pokeId,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
    })
}

function ajaxType(typeName){
    $.ajax({
        url: "https://pokeapi.co/api/v2/type/"+ typeName,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
    })
}
