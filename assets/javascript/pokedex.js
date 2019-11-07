$(document).ready(function() {
    //create table based on passed array of pokemon
    function buildPokedexTable(array){
        array.sort(function(a,b) { return parseInt(a.number) - parseInt(b.number) } );
        console.log(array);
        for(i=0; i< array.length;i++){
            let table = $("#pokedex-table");
            let tableNum = array[i].number;
            let tableName = array[i].name.toUpperCase();
            let tableSprite = `<td><img class="img-fluid pokedex-img" src="${array[i].sprite}" alt="${array[i].name}"></td>`;
            let tableType = array[i].type.toUpperCase();
            let tableAttack = array[i].attack;
            let tableDefense = array[i].defense;
            let tableSpeed = array[i].speed;
            let tableXAttack = array[i].xattack;
            let tableXDefense = array[i].xdefense;

            let newRow = $("<tr>").addClass("table-secondary").attr('id', tableName).append(
                $("<td>").text(tableNum),
                $("<td>").text(tableName),
                $(`<td class="img-column">`).html(tableSprite),
                $("<td>").text(tableType),
                $("<td>").text(tableAttack),
                $("<td>").text(tableDefense),
                $("<td>").text(tableSpeed),
                $("<td>").text(tableXAttack),
                $("<td>").text(tableXDefense)
            );
            table.append($(newRow))
        }
    }
    function updateModal(pokemon, youtube){
        $(".modal-body").empty()
        let video = youtube.items[0].id.videoId
        console.log(video)
        let youtubeIframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        $("#youtubeModalLabel").text(`Youtube Search Results: ${pokemon}`)
        $(".modal-body").append(youtubeIframe)
    }
    function ajaxYoutube(pokeName){
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q="+ pokeName +"%20pokemon%20emerald&key=AIzaSyBqYnT_xCPQVOuKCsNfu4o5OGbmEIU64_A",
            method: "GET"
        }).then(function (response) {
            updateModal(pokeName, response)
            console.log(response);
        })
    }
    //grab pokemon from friebase so we can create table
    pokedexRef.once("value", function(data) {
        let obj = data.val()
        let pokedexList = new Object();
        let pokedexArray = new Array();
        Object.values(obj).forEach(value=>{
                pokedexList = {
                    name: value.name,
                    number: value.number,
                    type: value.type,
                    attack: value.baseATK,
                    defense: value.baseDEF,
                    xattack: value.baseSPCATK,
                    xdefense: value.baseSPCDEF,
                    speed: value.baseSPD,
                    sprite: value.sprite
                }
                pokedexArray.push(pokedexList);
        });
        if(pokedexArray.length > 0) {
            buildPokedexTable(pokedexArray);
        }
        else{
            console.log("nothing to load in firebase")
        }
    });
    $(document).on("click",".table-secondary", function(event){
        let pokeName = $(this).attr("id")
        console.log(pokeName);
        ajaxYoutube(pokeName);
        
        $("#youtubeModal").modal("toggle");
    })

    /*<iframe width="560" height="315" src="https://www.youtube.com/embed/ydxAZ32hFqA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/
});
