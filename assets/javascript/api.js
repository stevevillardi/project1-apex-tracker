$(document).ready(function() {
    function apiSearch() {
        var pokemonName = "treecko"
        var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName + "/";

        $.ajax({
            url: pokeURL,
            method: "GET"
        }).done(function(response) {
            results = response;
            name = results.name;
            sprite = results.sprites.front_default;
            number = results.id;
            type = results.types[0].type.name;
            baseSPD = "Base Speed: " + results.stats[0].base_stat + " ";
            baseSPDEF = "Base Special-Defense: " + results.stats[1].base_stat + " ";
            baseSPATK = "Base Special-Attack: " + results.stats[2].base_stat + " ";
            baseDEF = "Base Defense: " + results.stats[3].base_stat + " ";
            baseATK = "Base Attack: " + results.stats[4].base_stat + " ";
            baseHP = "Base Health Points: " + results.stats[5].base_stat + " ";
            baseStats = baseSPD + baseSPDEF + baseSPATK + baseDEF + baseATK + baseHP;

            console.log(name);
            console.log(sprite);
            console.log(number);
            console.log(type);
            console.log(baseStats);
        });
    };
    apiSearch();
})