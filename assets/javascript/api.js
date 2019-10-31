$(document).ready(function() {
    function apiSearch(pokemonName) {
        var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName + "/";

        $.ajax({
            url: pokeURL,
            method: "GET"
        }).done(function(response) {
            results = response;

            let pokemonObj = {
                name : results.name,
                sprite : results.sprites.front_default,
                number : results.id,
                type : results.types[0].type.name,
                baseSPD : results.stats[0].base_stat,
                baseSPDEF : results.stats[1].base_stat,
                baseSPATK : results.stats[2].base_stat,
                baseDEF : results.stats[3].base_stat,
                baseATK : results.stats[4].base_stat,
                baseHP : results.stats[5].base_stat
            };

            console.log(pokemonObj)
            return pokemonObj
        });
    };

    function displaySearch(pokemon){
        $("#search-container").empty();
        let title =$("<h1>").text(`${pokemon.name}`)

    }

    $("#submit").on("click", function(e){
        e.preventDefault();
        let searchTerm = $("#input-box").val();
        let pokemon = apiSearch(searchTerm);
        displaySearch(pokemon);
    });
})