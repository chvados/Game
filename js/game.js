// ОТМЕНА ОТПРАВКИ ЧЕРЕЗ ENTER INPUT 
$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
});

let player_name='';
let comGenerate = [];
let player = [];
let cows =  0;
let bulls = 0;
let count = 0;
let minutes = 1;
let seconds = 5;
let time;

function checkValidation(value){
    let mass = value.split('')
    if(mass.length == 4){
        for(i=0; i<mass.length; i++){
            if(mass.indexOf(mass[i], i+1) != -1){
                return false;
            }
            else{
                if(!value.match(/^\d+$/)){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
    }
    else{
            return false;
    }
}
function generationNumber(mass){  
    let i = 0;
    while ( i != 4){
        rand =  String(Math.floor(Math.random() * (9-0)) + 0);
        if (mass.indexOf(rand) == -1){
            mass.push(rand);
            i++;
        }
    }
    return mass;
}
function checkСows(first_mass, sec_mass){
    cows = 0;
    first_mass.forEach(element => {
        if(sec_mass.indexOf(element) != -1){
            cows++;
        }
    });
    return cows;
}
function checkBulls(first_mass, sec_mass){
    bulls = 0;
    first_mass.forEach(element => {
        if(first_mass.indexOf(element) == sec_mass.indexOf(element)){
            bulls++;
        }
    });
    return bulls;
}
function createBlock(){
    let answer = $("#text").val();
    let player = $("#text").val().split('');
    if(checkValidation(answer)){
        $("#game_table").prepend(
            "<tr><td>"+
            answer+"</td><td>"+
            checkСows(comGenerate, player)+"</td><td>"+
            checkBulls(comGenerate,player)+"</td></tr>"
        );
    }else{
        return false;
    }
}
function startGame(){
    comGenerate = [];
    player = [];
    cows =  0;
    bulls = 0;
    count = 0;
    minutes = 5;
    seconds = 4;
    checkTime();
    generationNumber(comGenerate);
    $("#game_table-body").empty();
    console.log(comGenerate);
};
function endGame(){
    clearTimeout(time);
    $("#game_window").css('display', 'none');
    $("#game_register").css('display', 'none');
    $("#game_end-player").empty();
    if((cows == 0 && bulls == 0) || (minutes == 0 && seconds == 0)){
        $("#game_end-result").text("Вы проиграли")
    }
    else{
        $("#game_end-result").text("Вы выйграли");
    }
    $("#game_end").css('display', 'flex');
    $("#game_end-player").text(player_name);
    $("#game_end-count").text(count);
    $("#game_end-time").text(minutes+  ":" + seconds);
    
};
function checkTime(){
    
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);
    if(seconds == 0){
        if(minutes == 0){
            return endGame();
        }
        else{
            minutes -= 1;
            seconds = 59;
        }
    }
    else{
        seconds-= 1;
    }
    time = setTimeout(checkTime, 1000);
}
$("#input").click(function(){
    createBlock();
    count++;
    if(cows == 4 && bulls == 4){
        endGame();
    }

});
$("#restart_game").click(function(){
    startGame();
    $("#game_end").css('display', 'none');
    $("#game_window").css('display', 'flex');
});
$("#input_nickname").change(function(){
    if($("#input_nickname").val() != ''){
        $('#start').prop( "disabled", false );
    }
    else{
        $('#start').prop( "disabled", true );
    }
});
$('#start').click(function(){
    player_name = $("#input_nickname").val();
    $("#game_register").css('display', 'none');;
    $(".game_field").prepend("<p id='player_name'>"+player_name+"</p>");
    $("#game_window").css('display', 'flex');
    startGame();
});