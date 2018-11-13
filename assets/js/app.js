$(document).ready(function(e){
    $("#btnName").click(searchCoctail);
    $("#favorites").hide();

    function searchCoctail(e){
        e.preventDefault(); //don't reload page

        var drinkName = $("#name-input").val().trim();

        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ drinkName,
            method: "GET"
        }).then(function(response){
            $("#showDrinks").empty(); //clear div
            $("#img1").hide();
            // showDrinks(response.drinks)
            $.each(response.drinks, function(index, value){
            showDrinkOnScreen(value, false)
                
        })
    })

    $(document).on('click',".drinklink",goToLink)

    function goToLink(){
        $("#showDrinks").empty(); //clear div
       

        var drinkSelected = $(this)
        var drinkSelectedName = drinkSelected.attr("data-name")

        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ drinkSelectedName,
            method: "GET"
        }).then(function(response){
        // console.log(response)

            showDrinkOnScreen(response.drinks[0], true)

        })
    }

    function showDrinkOnScreen(value, onlyOneDrink){
       var drinkNameValue = value.strDrink
       var drinkImgSrc = value.strDrinkThumb
   
       var drinkCard = $("<div class='card-body drinklink'>") //<--- hold all our drink info 
       drinkCard.attr("data-name", drinkNameValue)
       drinkCard.attr("data-img", drinkImgSrc)

   
       var drinkName = $("<h2>").text(drinkNameValue) //<--name of drink
       var drinkImg = $("<img class='drimg'>").attr('src', drinkImgSrc).css({'width' : '250px' , 'height' : '250px'}) // <--- drink image
   
   
       drinkCard.append(drinkName) 
       drinkCard.append(drinkImg)
   
       var drinkInstructions = $("<div class='instr'>").text(value.strInstructions )
       var drinkGlass = $("<div>").text(value.strGlass)

      
       

    if(onlyOneDrink){

        for (let i = 1; i < 15; i++) {
           var keyString = "strIngredient" + i;
           if(value[keyString] !== ""){
               var drinkIngredient = $("<li class='ingr'>").text(value[keyString])
            drinkCard.append(drinkIngredient)
           }
            }
        

        drinkCard.append("instruction:",drinkInstructions)
        drinkCard.append("Serve:", drinkGlass)
}

$("#showDrinks").append(drinkCard)
    }

    }

    //name "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
    //ingredient "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka"
})