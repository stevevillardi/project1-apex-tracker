$(document).ready(function() {
    let email;
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let textBuild;
    let battleType = [];

    if(page === "gym.html"){
        textBuild =`YOUR SELECTED YOUR BATTLE PARTY`
    }
    else{
        textBuild = `BUILD YOUR BATTLE PARTY`
    }

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

    function displaySearchError(){
        $("#search-error").show();
        setTimeout(function(){$("#search-error").hide()},5000);
    }

    function displayAddPartyMemberError(text){
        $("#add-error").html(text).show();
        setTimeout(function(){$("#add-error").hide()},5000);
    }

    function displaySearch(pokemon){
        $("#search-container").empty();
        let title = `<h1 class="display-4" id="pokemon-name" data-name="${pokemon.name}" data-number="${pokemon.number}" data-type="${pokemon.type}" data-sprite="${pokemon.sprite}" data-attack="${pokemon.baseATK}" data-speed="${pokemon.baseSPD}" data-defense="${pokemon.baseDEF}">${pokemon.name}  (#${pokemon.number}) <img src="${pokemon.sprite}" alt="${pokemon.name}"></h1>`
        let description = `<p class="lead" id="pokemon-description">${pokemon.description}</p>`
        let cardBorder = $("<div>").addClass("card border-secondary mb-3")
        let cardBody = $("<div>").addClass("card-body text-secondary")
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

    function resetPartyMember(slot,slotNumber){
        $(slot).empty();
        let cardHeader = `<div class="card-header">Available Slot <img src="./assets/images/pokeball.png" alt="pokeball"></div>`
        let cardBody = $("<div>").addClass("card-body text-secondary")
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
            let cardBody = $("<div>").addClass("card-body text-secondary")
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
            let cardBody = $("<div>").addClass("card-body text-secondary")
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
                    console.log(battleType)
                }
            }                        
            else{
                console.log("nothing to load in firebase")
            }
        });
    }

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
            console.log(battleType)
        }
    }

    $("#submit").on("click", function(e){
        e.preventDefault();
        let searchTerm = $("#input-box").val();
        apiSearch(searchTerm);
    });

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

    $(document).on("click",".remove-from-party", function(){
        let slotNumber = $(this).data("slot");
        let slotCard = $(this).parents().eq(2)
        resetPartyMember(slotCard,slotNumber);
    });

    //Check to see if we need to log in or not
    checkForSession();
})