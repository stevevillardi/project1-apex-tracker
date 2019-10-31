//Objects of all the gym leaders
const gymLeaders = [
    Roxanne = {
        name: "Roxanne",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/rock",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/74",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/74",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/299",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },

    Brawly = {
        name: "Brawly",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/fighting",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/66",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/307",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/296",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },

    Wattson = {
        name: "Wattson",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/electric",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/100",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/82",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/309",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon4:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/310",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },

    Flannery = {
        name: "Flannery",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/fire",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/322",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/218",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/323",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon4:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/324",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },
    Norman = {
        name: "Norman",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/normal",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/327",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/288",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/264",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon4:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/289",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },
    Winona = {
        name: "Winona",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/flying",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/333",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/357",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/279",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon4:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/227",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon5:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/334",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },
    Tate_and_Liza = {
        name: "Tate & Liza",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/psychic",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/344",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/178",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/337",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon4:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/338",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    },
    Juan = {
        name: "Juan",
        mainType:
            $.ajax({
                url: "https://pokeapi.co/api/v2/type/water",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon1:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/370",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon2:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/340",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon3:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/364",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon4:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/342",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            }),
        pokemon5:
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/230",
                method: "GET"
            }).then(function (response) {
                //console.log(response);
            })
    }
]
