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

            let newRow = $("<tr>").addClass("table-secondary").append(
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
});