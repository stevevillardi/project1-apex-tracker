$(document).ready(function() {
    let email;
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let textBuild;
    let battleType = [];
    let battleGym;
    let gymType;
    let gymCount;

    //check is gym page is active so we can change the h5 text for our header page
    if(page === "gym.html"){
        textBuild =`YOUR SELECTED YOUR BATTLE PARTY`
    }
    else{
        textBuild = `BUILD YOUR BATTLE PARTY`
    }

    //performs api search to return a pokemon to the party search jumbotron
    function apiSearch(pokemonName) {
        pokemonName = pokemonName.trim().toLowerCase()
        var pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

        $.ajax({
            url: pokeURL,
            method: "GET"
        })
        .done(function(results) {
            pokeURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`;

            $.ajax({
                url: pokeURL,
                method: "GET"
            })
            .done(function(species) {
                let pokemon = {
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
                displaySearch(pokemon);
            });
        })
        .fail(function() {
            displaySearchError();
        });
    };

    //displays alert panel for search errors
    function displaySearchError(){
        $("#search-error").show();
        setTimeout(function(){$("#search-error").hide()},5000);
    }

    //trigger alert panel for adding party member errors
    function displayAddPartyMemberError(text){
        $("#add-error").html(text).show();
        setTimeout(function(){$("#add-error").hide()},5000);
    }

    //displays search results to jumbotron after being passed a pokemon
    function displaySearch(pokemon){
        $("#search-container").empty();
        let title = `<h1 class="display-4" id="pokemon-name" data-name="${pokemon.name}" data-number="${pokemon.number}" data-type="${pokemon.type}" data-sprite="${pokemon.sprite}" data-attack="${pokemon.baseATK}" data-speed="${pokemon.baseSPD}" data-defense="${pokemon.baseDEF}">${pokemon.name}  (#${pokemon.number}) <img src="${pokemon.sprite}" alt="${pokemon.name}"></h1>`
        let description = `<p class="lead" id="pokemon-description">${pokemon.description}</p>`
        let cardBorder = $("<div>").addClass("card border-secondary mb-3")
        let cardBody = $("<div>").addClass("card-body")
        let pokedexNumber = `<h5 class="card-title" id="pokemon-number">Pokédex Number: ${pokemon.number}</h5>`
        let pokedexType = `<h5 class="card-title" id="pokemon-type">Pokémon Type: ${pokemon.type}</h5>`
        let pokedexHP = `<h5 class="card-title" id="pokemon-hp">Base HP: ${pokemon.baseHP}</h5>`
        let pokedexATK = `<h5 class="card-title" id="pokemon-attack">Base Attack: ${pokemon.baseATK}</h5>`
        let pokedexDEF = `<h5 class="card-title" id="pokemon-defense">Base Defense: ${pokemon.baseDEF}</h5>`
        let pokedexSPD = `<h5 class="card-title" id="pokemon-speed">Base Speed: ${pokemon.baseSPD}</h5>`
        let pokedexSPCATK = `<h5 class="card-title" id="pokemon-spc-attack">Base Special Attack: ${pokemon.baseSPCATK}</h5>`
        let pokedexSPCDEF = `<h5 class="card-title" id="pokemon-spc-defense">Base Special Defense: ${pokemon.baseSPCDEF}</h5>`
        cardBody.append(pokedexNumber,pokedexType,pokedexHP,pokedexATK,pokedexDEF,pokedexSPD,pokedexSPCATK,pokedexSPCDEF);
        cardBorder.append(cardBody);
        $("#search-container").append(title,description,cardBorder);
    }

    //removes a party member based on slot number, triggers when remove button is clicked
    function resetPartyMember(slot,slotNumber){
        $(slot).empty();
        let cardHeader = `<div class="card-header">Available Slot <img src="./assets/images/pokeball.png" alt="pokeball"></div>`
        let cardBody = $("<div>").addClass("card-body")
        let cardText = `<p class="card-text">Search for a Pokémon using the search bar and click the plus sign to add them to your party.</p>`
        let cardTitle = `<h5 class="card-title text-center">Add to party <i class="far fa-plus-square add-to-party" data-slot="${slotNumber}"></i></h5>`
        $(cardBody).append(cardText,cardTitle)
        $(slot).append(cardHeader,cardBody)

        partyRef.orderByChild('email').equalTo(email).once("value", function(snapshot) {
            const updates = {};
            snapshot.forEach(function(child){
                if(child.val().slot === slotNumber){
                    updates[child.key] = null
                }
            });
            partyRef.update(updates);
        });
    }

    //adds a party member based on slot number, triggers when add button is clicked
    function addPartyMember(slot,slotNumber,pokemon){
        if(email){
            let name = $(pokemon).data("name");
            let number = $(pokemon).data("number");
            let type = $(pokemon).data("type");
            let sprite = $(pokemon).data("sprite");
            let attack = $(pokemon).data("attack");
            let defense = $(pokemon).data("defense");
            let speed = $(pokemon).data("speed");
    
            partyRef.push({
                email: email,
                slot: slotNumber,
                name: name,
                number: number,
                type: type,
                sprite: sprite,
                attack: attack,
                defense: defense,
                speed: speed
            });
    
            $(slot).empty();
            let cardHeader = `<div class="card-header" id="member-${slotNumber -1}" data-type="${type.toUpperCase()}">${name.toUpperCase()} (#${number}) <img src="${sprite}" alt="${name}"></div>`
            let cardBody = $("<div>").addClass("card-body")
            let cardText = `<p class="card-text">Pokémon Type: ${type.toUpperCase()}</p>`
            $(cardBody).append(cardText)
            cardText = `<p class="card-text">Attack: ${attack}</p>`
            $(cardBody).append(cardText)
            cardText = `<p class="card-text">Defense: ${defense}</p>`
            $(cardBody).append(cardText)
            cardText = `<p class="card-text">Speed: ${speed}</p>`
            $(cardBody).append(cardText)
            let cardTitle = `<h5 class="card-title text-center">Remove from party <i class="far fa-minus-square remove-from-party" data-slot="${slotNumber}"></i></h5>`
            $(cardBody).append(cardTitle)
            $(slot).append(cardHeader,cardBody)
        }
        else{
            displayAddPartyMemberError("<strong>ERROR!</strong> You must first be logged in to start adding Pokemon to your party list.")
        }
    }

    //loads an individual member based on slot number
    function LoadPartyMember(slot,slotNumber,pokemon){
            let name = pokemon.name;
            let number = pokemon.number;
            let type = pokemon.type;
            let sprite = pokemon.sprite;
            let attack = pokemon.attack;
            let defense = pokemon.defense;
            let speed = pokemon.speed;
    
            $(slot).empty();
            let cardHeader = `<div class="card-header" id="member-${slotNumber -1}" data-type="${type.toUpperCase()}">${name.toUpperCase()} (#${number}) <img src="${sprite}" alt="${name}"></div>`
            let cardBody = $("<div>").addClass("card-body")
            let cardText = `<p class="card-text">Pokémon Type: ${type.toUpperCase()}</p>`
            $(cardBody).append(cardText)
            cardText = `<p class="card-text">Attack: ${attack}</p>`
            $(cardBody).append(cardText)
            cardText = `<p class="card-text">Defense: ${defense}</p>`
            $(cardBody).append(cardText)
            cardText = `<p class="card-text">Speed: ${speed}</p>`
            $(cardBody).append(cardText)
            if(page != "gym.html"){
                let cardTitle = `<h5 class="card-title text-center">Remove from party <i class="far fa-minus-square remove-from-party" data-slot="${slotNumber}"></i></h5>`
                $(cardBody).append(cardTitle)
            }
            $(slot).append(cardHeader,cardBody)
    }

    function LoadGymPartyMember(div,pokemon){
        let card = $("<div>").addClass("card border-secondary mb-3 gym-card party-card shadow").attr("data-type",pokemon.type)
        let cardHeader = `<div class="card-header">${pokemon.name} (#${pokemon.number}) <img src="${pokemon.sprite}" alt="${pokemon.name}"></div>`
        let cardBody = $("<div>").addClass("card-body")

        let cardText = `<p class="card-text">Pokémon Type: ${pokemon.type}</p>`
        $(cardBody).append(cardText)
        cardText = `<p class="card-text">Attack: ${pokemon.attack}</p>`
        $(cardBody).append(cardText)
        cardText = `<p class="card-text">Defense: ${pokemon.defense}</p>`
        $(cardBody).append(cardText)
        cardText = `<p class="card-text">Speed: ${pokemon.speed}</p>`
        $(cardBody).append(cardText)

        $(card).append(cardHeader,cardBody)
        div.append(card)

    }

    function loadGymParty(leader){
        gymRef.once("value", function(data) {
            let obj = data.val()
            let party = new Object();
            let partyArray = new Array();
            Object.values(obj).forEach(value=>{
                if(value.leader === leader){
                    party = {
                        leader: value.leader,
                        name: value.name,
                        number: value.number,
                        type: value.type,
                        attack: value.attack,
                        defense: value.defense,
                        speed: value.speed,
                        sprite: value.sprite
                    }
                    partyArray.push(party);
                }
            });

            //swap battle image
            $("#battle-img").attr("src",`./assets/images/${leader}.png`)
            $("#gymleader-display").text(`${leader}'s`)

            let gymPartyDiv = $("#gym-party")
            gymPartyDiv.empty();

            gymCount = partyArray.length

            if(partyArray.length > 0) {
                for (let i = 0; i < partyArray.length ; i++){
                    LoadGymPartyMember(gymPartyDiv,partyArray[i])
                }
            }                        
            else{
                console.log("nothing to load in firebase")
            }
        });
    }

    //loads a given party based on email from firebase
    function loadParty(email){
        partyRef.once("value", function(data) {
            let obj = data.val()
            let party = new Object();
            let partyArray = new Array();
            Object.values(obj).forEach(value=>{
                if(value.email === email){
                    party = {
                        slot: value.slot,
                        name: value.name,
                        number: value.number,
                        type: value.type,
                        attack: value.attack,
                        defense: value.defense,
                        speed: value.speed,
                        sprite: value.sprite
                    }
                    partyArray.push(party);
                }
            });
            if(partyArray.length > 0) {
                for (let i = 0; i < partyArray.length ; i++){
                    let slotCard = $(`[data-slot="${partyArray[i].slot}"]`).parents().eq(2)
                    LoadPartyMember(slotCard,partyArray[i].slot,partyArray[i])
                }
                //Grabs pokemon type for array for battle function
                for(i=0;i<=5;i++){
                    battleType.push($(`#member-${i}`).data("type"))
                }
            }                        
            else{
                console.log("nothing to load in firebase")
            }
        });
    }

    //checks if users has localstorage if so we load thier party from firebase otherwise leave blank and set some varibles used for gym battle
    function checkForSession(){
        let session = localStorage.getItem("email");
        if (session){
            email = session;
            $("#user-display").text(`${textBuild} (${email}):`);
            $("#login").text("Logout");
            loadParty(email);
        }
        else{
            battleType.push("NONE","NONE","NONE","NONE","NONE","NONE");
        }
    }

    function resetCards(){
        for(i=0; i<6;i++){
            $(`#member-${i}`).parent().removeClass("bg-dark bg-danger bg-info bg-success text-white")
        }
        $("#overall-results-display").text(`Choose a gym leader from the dropdown and click on the battle button to see how your party stack up against the competition!`)
    }

    function updateCards(scores){
        for(i=0; i<scores.length;i++){
            switch(scores[i]){
                case 0:
                    $(`#member-${i}`).parent().removeClass("bg-dark bg-danger bg-info bg-success text-white")
                    $(`#member-${i}`).parent().addClass("bg-dark text-white")
                    break;
                case 1:
                    $(`#member-${i}`).parent().removeClass("bg-dark bg-danger bg-info bg-success text-white")
                    $(`#member-${i}`).parent().addClass("bg-danger text-white")
                    break;
                case 2:
                    $(`#member-${i}`).parent().removeClass("bg-dark bg-danger bg-info bg-success text-white")
                    $(`#member-${i}`).parent().addClass("bg-info  text-white")
                    break;
                case 3:
                    $(`#member-${i}`).parent().removeClass("bg-dark bg-danger bg-info bg-success text-white")
                    $(`#member-${i}`).parent().addClass("bg-success text-white")
                    break;
            }
        }
    }

    function gymBattle(playerTypes,gymType,gymCount){
        //logic to figure out battle stats
        // 0 = no effect
        // 1 = 1/2
        // 2 = normal
        // 3 = double
        let playerScore =[];
        let overallScore = 0;

        let playerCount =0;
        for(i=0;i< playerTypes.length;i++){
            //get number of pokemon the player has selected and start logic for determining score
            if(playerTypes[i] != "NONE"){
                playerCount++

                switch(gymType) {
                    case "ROCK":
                        if(playerTypes[i] === "NORMAL" || playerTypes[i] === "FIRE" || playerTypes[i] === "POISON" || playerTypes[i] === "FLYING"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "WATER" || playerTypes[i] === "GRASS" || playerTypes[i] === "FIGHTING" || playerTypes[i] === "GROUND" || playerTypes[i] === "STEEL") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "FIGHTING":
                        if(playerTypes[i] === "BUG" || playerTypes[i] === "ROCK" || playerTypes[i] === "DARK"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "FLYING" || playerTypes[i] === "PSYCHIC" || playerTypes[i] === "FAIRY") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "ELECTRIC":
                        if(playerTypes[i] === "ELECTRIC" || playerTypes[i] === "FLYING" || playerTypes[i] === "STEEL"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "GROUND") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "FIRE":
                        if(playerTypes[i] === "FIRE" || playerTypes[i] === "GRASS" || playerTypes[i] === "ICE" || playerTypes[i] === "BUG" || playerTypes[i] === "FAIRY" || playerTypes[i] === "STEEL"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "WATER" || playerTypes[i] === "GROUND" || playerTypes[i] === "ROCK") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "NORMAL":
                        if(playerTypes[i] === "GHOST"){
                            playerScore.push(0)
                        }
                        else if (playerTypes[i] === "FIGHTING") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "FLYING":
                        if(playerTypes[i] === "GRASS" || playerTypes[i] === "FIGHTING" || playerTypes[i] === "BUG"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "ELECTRIC" || playerTypes[i] === "ICE" || playerTypes[i] === "ROCK") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else if (playerTypes[i] === "GROUND"){
                            playerScore.push(0)
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "PSYCHIC":
                        if(playerTypes[i] === "FIGHTING" || playerTypes[i] === "PSYCHIC"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "BUG" || playerTypes[i] === "GHOST" || playerTypes[i] === "DARK") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    case "WATER":
                        if(playerTypes[i] === "FIRE" || playerTypes[i] === "WATER" || playerTypes[i] === "ICE" || playerTypes[i] === "STEEL"){
                            playerScore.push(1)
                            overallScore += 1
                        }
                        else if (playerTypes[i] === "ELECTRIC" || playerTypes[i] === "GRASS") {
                            playerScore.push(3)
                            overallScore += 3
                        }
                        else {
                            playerScore.push(2)
                            overallScore += 2
                        }
                        break;
                    default:
                        playerScore.push(0)
                }
            }
            else{
                playerScore.push(0)
            }
        }
        //build out comp tiers based on player pokemon count
        let zeroTier = 0;
        let oneTier = playerCount * 1
        let twoTier= playerCount * 2
        let threeTier= playerCount * 3

        console.log(playerScore)
        console.log(playerCount)
        console.log(overallScore)

        console.log(`0 tier = ${zeroTier}`)
        console.log(`1 tier = ${oneTier}`)
        console.log(`2 tier = ${twoTier}`)
        console.log(`3 tier = ${threeTier}`)

        if(overallScore >= zeroTier && overallScore <= oneTier) {
            console.log("YOU PARTY IS NOT VERY EFFECTIVE!")
            $("#overall-results-display").html(`Your battle party is: <span class="poor">NOT VERY EFFECTIVE</span>`)
        }
        else if (overallScore > oneTier && overallScore <= twoTier){
            console.log("YOU PARTY HAS NEUTRAL EFFECTIVENESS")
            $("#overall-results-display").html(`Your battle party has: <span class="normal">NORMAL EFFECTIVENESS</span>`)

        }
        else if (overallScore > twoTier && overallScore <= threeTier){
            console.log("YOU PARTY IS SUPER EFFECTIVE!")
            $("#overall-results-display").html(`Your battle party is: <span class="great">SUPER EFFECTIVE</span>`)
        }

        updateCards(playerScore);
    }

    //Perform poke search
    $("#submit").on("click", function(e){
        e.preventDefault();
        let searchTerm = $("#input-box").val();
        apiSearch(searchTerm);
    });

    //set the email for the logged in user so we can track their party members
    $("#set-email").on("click", function(e){
        e.preventDefault();
        if(!$("#email-box").val()){
            $("#login-error").show();
            setTimeout(function(){$("#login-error").hide()},5000);
        }
        else {
            email = $("#email-box").val();
            email = email.trim().toLowerCase();
            localStorage.setItem("email", email);
            $("#user-display").text(`${textBuild} (${email}):`);

            $("#login").text("Logout");
            $("#loginModal").modal('toggle');
            loadParty(email);
        }
    });

    //Load popup modal when user clicks login
    $("#login").on("click", function(e){
        if($("#login").text() === "Login"){
            $("#loginModal").modal('toggle');
        }
        else {
            $("#login").text("Login");
            $("#email-box").val("")
            email = null;
            $("#user-display").text(`${textBuild}:`);
            localStorage.removeItem("email");
            for (i = 1; i < 7 ; i++){
                let slotCard = $(`[data-slot="${i}"]`).parents().eq(2)
                resetPartyMember(slotCard,i)
            }
        }
    });

    //When a dropdown choice is made on the gym page stage the gym leader so we can use it to load the cards for the gym loadout
    $(document).on("click",".gym-selector", function(){
        battleGym = $(this).data("leader");
        $("#gym-dropdown").text($(this).text())
        resetCards();
        loadGymParty(battleGym);
    });

    //When a dropdown choice is made on the gym page stage the gym leader so we can use it to load the cards for the gym loadout
    $(document).on("click","#battle", function(){
        if(battleGym){
            //grab gym leader pokemon type so we can pass it to the battle function
            gymType = $(".gym-card").data("type");
            
            //console log both sets of data so we can see what we have to work with
            console.log(`Our types: ${battleType}`)
            console.log(`Gym type: ${gymType}`)
            
            //run battleSim function liam is working on
            gymBattle(battleType,gymType,gymCount);
        }
        else{
            //display error message to choose gym leader first
            displayAddPartyMemberError("<strong>ERROR!</strong> You must pick a gym leader from the dropdown before you can begin a battle.")
        }
    });

    //When an add to party button is clicked add the searched pokemon to the party
    $(document).on("click",".add-to-party", function(){
        let selectedPokemon = $("#pokemon-name")
        if($(selectedPokemon).data("name")){
            let slotNumber = $(this).data("slot");
            let slotCard = $(this).parents().eq(2)
            addPartyMember(slotCard,slotNumber,selectedPokemon);
        }
        else{
            displayAddPartyMemberError()
        }
    });

    //When the remove button is clicked for a slot remove a pokemon from the party
    $(document).on("click",".remove-from-party", function(){
        let slotNumber = $(this).data("slot");
        let slotCard = $(this).parents().eq(2)
        resetPartyMember(slotCard,slotNumber);
    });

    //Check to see if we need to log in or not so we can load their previous party
    checkForSession();
})