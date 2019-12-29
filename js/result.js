function start()
{
    localStorage.getItem("message1");
    localStorage.getItem("message2");
    localStorage.getItem("message3");
    localStorage.getItem("message4");
    localStorage.getItem("message5");
    var commentResult = document.getElementById("commentResult");
    commentResult.innerHTML = "<span id = 'msg1'>"+localStorage.getItem("message1")+"</span><span id = 'msg2'>"+localStorage.getItem("message2")+"</span><span id = 'msg3'>"+localStorage.getItem("message3")+"</span><span id = 'msg4'>"+localStorage.getItem("message4")+"</span><span id = 'msg5'>"+localStorage.getItem("message5")+"</span>";

    console.log(commentResult);
    var gameResult = localStorage.getItem("gameOver");
    if(gameResult == "true")
        win();
    else
    {
        var remainFound = localStorage.getItem("found");
        console.log(remainFound);
        if(remainFound <18)
            gameOver();
        else
            returnMix();
        
    }
        
}

function win()
{
    var delayTime = window.setTimeout(function()
    {
        var resultIMG = document.getElementById("resultIMG");
        resultIMG.innerHTML = "<img src = 'resource/result_img.jpeg' style = 'width:100% ;height:100%'/>";
        var winAnimate = document.getElementById("resultAnimate");
        winAnimate.innerHTML = "<span id = 'winAnimate1'><img src = 'resource/win.png' style = 'width:100% ;height:100%'/></span>"+"<span id = 'winAnimate2'><img src = 'resource/動物_推動.png' style = 'width:100% ;height:100%'/></span>";
        //console.log(winAnimate);
        var winText = document.getElementById("resultText").innerHTML = "<p><h1 class = 'heartbeat'>You Win</h1></p>";
    },3000);
    var buttonRestart = window.setTimeout(function()
    {
        var restartButton = document.getElementById("restartButton");
        restartButton.innerHTML = "<input type = 'button' id = 'restartButton' class= 'btn restartButton' value = '重新開始';></button> ";
        restartButton.addEventListener("click",restart,false); 
        localStorage.removeItem("message1");
        localStorage.removeItem("message2");
        localStorage.removeItem("message3");
        localStorage.removeItem("message4");
        localStorage.removeItem("message5");
    },6000);

    
}

function gameOver()
{
    var delayTime = window.setTimeout(function()
    {
        
        var resultIMG = document.getElementById("resultIMG");
        resultIMG.innerHTML = "<img src = 'resource/result_img.jpeg' style = 'width:100% ;height:100%'/>";
        var loseAnimate = document.getElementById("resultAnimate");
        loseAnimate.innerHTML = "<span id = 'loseAnimate1'><img src = 'resource/failStamp.png' style = 'width:100% ;height:100%'/></span>"+"<span id = 'loseAnimate2'><img src = 'resource/fail.png' style = 'width:100% ;height:100%'/></span>";
        var loseText = document.getElementById("resultText").innerHTML = "<p><h1 class = 'heartbeat' style = font-size:60px;>你已經失敗到沒錢了<br><br>重新開始吧！</h1></p> ";
    },3000);
    var buttonRestart = window.setTimeout(function()
    {
        var restartButton = document.getElementById("restartButton");
        restartButton.innerHTML = "<input type = 'button' id = 'restartButton' class= 'btn restartButton' value = '重新開始';></button> ";
        restartButton.addEventListener("click",restart,false);
        localStorage.removeItem("message1");
        localStorage.removeItem("message2");
        localStorage.removeItem("message3");
        localStorage.removeItem("message4");
        localStorage.removeItem("message5");
    },6000);

}

function returnMix()
{
    var delayTime = window.setTimeout(function()
    {
        
        var resultIMG = document.getElementById("resultIMG");
        resultIMG.innerHTML = "<img src = 'resource/result_img.jpeg' style = 'width:100% ;height:100%'/>";
        var returnAnimate = document.getElementById("resultAnimate");
        returnAnimate.innerHTML = "<span id = 'returnAnimate'><img src = 'resource/fighting.gif' style = 'width:100%;height:100%'/></span>";
        var returnText = document.getElementById("resultText").innerHTML = "<p><h1 class = 'heartbeat' style = font-size:60px;>調配失敗<br><br>回去重新調配吧！</h1></p>";
    },3000);
    var buttonRestart = window.setTimeout(function()
    {
        var restartButton = document.getElementById("restartButton");
        restartButton.innerHTML = "<input type = 'button' id = 'restartButton' class= 'btn restartButton' value = '回去調配';></button> ";
        restartButton.addEventListener("click",restart,false);
        localStorage.removeItem("message1");
        localStorage.removeItem("message2");
        localStorage.removeItem("message3");
        localStorage.removeItem("message4");
        localStorage.removeItem("message5");
    },6000);
}

function restart()
{
    var gameResult = localStorage.getItem("gameOver");
    var remainFound = localStorage.getItem("found");
    if(gameResult == "false" && remainFound>=18)
        window.location.replace ("game.html");
    else if(gameResult == "false" && remainFound<18)
        window.location.replace("home.html");
    else //true
        window.location.replace("home.html");
    localStorage.removeItem("gameOver"); 
}
window.addEventListener("load",start,false);