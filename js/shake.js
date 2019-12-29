function start()
{
    //document.writeln("hello");
    var leftRightShake = document.getElementById("leftRightShake");
    var topDownShake = document.getElementById("topDownShake");
    var hardShake = document.getElementById("hardShake");
    var littleShake = document.getElementById("littleShake");
    var crazyShake = document.getElementById("crazyShake");
    leftRightShake.addEventListener("click",shakeMethod,false);
    topDownShake.addEventListener("click",shakeMethod,false);
    hardShake.addEventListener("click",shakeMethod,false);
    littleShake.addEventListener("click",shakeMethod,false);
    crazyShake.addEventListener("click",shakeMethod,false);
    
    
}

function shakeMethod(e)
{  
    var clickID;
    var animatePic = document.getElementById("animatePic");
    animatePic.setAttribute("src","resource/shake_animation.jpg");
    animatePic.setAttribute("style","height:60%;width:900px;");


    //window.location.href = "shaking.html";

    if ( e.target.tagName.toLowerCase() == "div" )
	{
        clickID = e.target.getAttribute("id");
		if( e.which )
		{
            
            console.log(clickID);
            if(clickID == "leftRightShake")
            {
                var imgCreate = document.createElement("img");
                var shakeIMG = document.getElementById("shakeIMG");
                imgCreate.setAttribute("src","resource/bubble_shake.png");
                imgCreate.setAttribute("style","width:20%");
                imgCreate.setAttribute("class","shake-horizontal");
                shakeIMG.appendChild(imgCreate);
                shakeIMG.innerHTML = "<img src = 'resource/bubble_shake.png' class = 'shake-horizontal shake-constant' />";
                console.log(shakeIMG);
            }
            else if(clickID == "topDownShake")
            {
                var shakeIMG = document.getElementById("shakeIMG");
                shakeIMG.innerHTML = "<img src = 'resource/bubble_shake.png' class = 'shake-vertical shake-constant' />";
            }
            else if(clickID == "hardShake")
            {
                var shakeIMG = document.getElementById("shakeIMG");
                shakeIMG.innerHTML = "<img src = 'resource/bubble_shake.png' class = 'shake-hard shake-constant' />";
            }
            else if(clickID == "littleShake")
            {
                var shakeIMG = document.getElementById("shakeIMG");
                shakeIMG.innerHTML = "<img src = 'resource/bubble_shake.png' class = 'shake-little shake-constant' />";
            }
            else //clickID == "crazyShake"
            {
                var shakeIMG = document.getElementById("shakeIMG");
                shakeIMG.innerHTML = "<img src = 'resource/bubble_shake.png' class = 'shake-crazy shake-constant' width :10%; />";
            }

        }
    }

    var shakeButton = document.getElementById("shakeButton");
    shakeButton.innerHTML = "<input type = 'button' id = 'shakeButton' class= 'btn shakeButton' value = '去評分!';></button> ";
    shakeButton.addEventListener("click",upToNextPage,false); 

}

function upToNextPage()
{
    window.location.replace("judge.html");
}



window.addEventListener("load",start,false);