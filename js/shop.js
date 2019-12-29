function start()
{
	var pearl = document.getElementById("pearl");
	var tea = document.getElementById("tea");
	var milk = document.getElementById("milk");
	var powder = document.getElementById("powder");
	var sugar = document.getElementById("sugar");
	var ice = document.getElementById("ice");
	pearl.addEventListener("click", purchase, false);
	tea.addEventListener("click", purchase, false);
	milk.addEventListener("click", purchase, false);
	powder.addEventListener("click", purchase, false);
	sugar.addEventListener("click", purchase, false);
	ice.addEventListener("click", purchase, false);
	
	
	var buy = document.getElementById("buy");
	if(localStorage.getItem("found")>=18)
		buy.addEventListener("click", checkout, false);
	else
	{
		var conversation = document.getElementById("conversation");
		conversation.innerHTML = "甚麼都不能買了";
	}
	
	loadBag();	

}

function purchase( e )
{
	var checkout = document.getElementById("checkout");
	var conversation = document.getElementById("conversation");
	if ( e.target.tagName.toLowerCase() == "button" )
	{
		if( e.which )
		{
			clickID = e.target.getAttribute("id");
			if(clickID=="pearl") //2000g/100$
			{
				conversation.innerHTML = "珍珠類<br>每2000克100元喔";
				checkout.innerHTML = "<label><input type='radio' class='option-input radio' name='example' value='黑糖珍珠' /><span>黑糖珍珠</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='蜂蜜珍珠' /><span>蜂蜜珍珠</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='仙人掌珍珠' /><span>仙人掌珍珠</span></label>";
				//localStorage.setItem(clickID,"O");
			}
			else if(clickID=="tea") //2000g/120$
			{
				conversation.innerHTML = "茶類<br>每2000克120元喔";
				checkout.innerHTML = "<label><input type='radio' class='option-input radio' name='example' value='阿薩姆'/><span>阿薩姆</span></label><br><br><label><input type='radio' class='option-input radio' name='example'  value='烏龍茶'/><span>烏龍茶</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='玄米茶'/><span>玄米茶</span></label>";
			}
			else if(clickID=="milk") //1500g/135$
			{
				conversation.innerHTML = "奶類<br>每1500克135元喔";
				checkout.innerHTML = "<label><input type='radio' class='option-input radio' name='example' value='奶精'/><span>奶精</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='鮮奶'/><span>鮮奶</span></label>";
			}
			else if(clickID=="powder") //1500g/150$
			{
				conversation.innerHTML = "調味粉類<br>每1500克150元喔";
				checkout.innerHTML = "<label><input type='radio' class='option-input radio' name='example' value='可可粉'/><span>可可粉</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='抹茶粉'/><span>抹茶粉</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='辣椒粉'/><span>辣椒粉</span></label>";
			}
			else if(clickID=="sugar") //1000g/40$
			{
				conversation.innerHTML = "糖<br>每1000克40元喔";
				checkout.innerHTML = "<label><input type='radio' class='option-input radio' name='example' value='sugar_1000'/><span>1000g</span></label><br><br><label><input type='radio' class='option-input radio' name='example'  value='sugar_3000'/><span>3000g</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='sugar_9000'/><span>9000g</span></label>";
			}
			else if(clickID=="ice") //1000g/18$
			{
				conversation.innerHTML = "冰塊<br>每1000克18元喔";
				checkout.innerHTML = "<label><input type='radio' class='option-input radio' name='example' value='ice_1000'/><span>1000g</span></label><br><br><label><input type='radio' class='option-input radio' name='example'  value='ice_4000'/><span>4000g</span></label><br><br><label><input type='radio' class='option-input radio' name='example' value='ice_12000'/><span>12000g</span></label>";
			}
		}
	}
}

function checkout()
{
	var total;
	var found;
	var price;
	var weight;
	var icon = document.querySelector("input[name='example']:checked").value;
	if(clickID=="pearl")
	{
		var found = localStorage.getItem("found");
		found -=100;
		if(found>=0)
		{
			if(!localStorage.getItem(icon))
				localStorage.setItem(icon, 2000);
			else
			{
				total = localStorage.getItem(icon);
				total = parseInt(total);
				total += 2000;
				localStorage.setItem(icon,total);
			}
			localStorage.setItem("found", found);
			show(1);
		}
		else
		{
			setConversation();
			show(2);
		}
		
	}
	else if(clickID=="tea")
	{
		var found = localStorage.getItem("found");
		found -=120;
		if(found>=0)
		{
			if(!localStorage.getItem(icon))
				localStorage.setItem(icon, 2000);
			else
			{
				total = localStorage.getItem(icon);
				total = parseInt(total);
				total += 2000;
				localStorage.setItem(icon,total);
			}
			localStorage.setItem("found", found);
			show(1);
		}
		else
		{
			setConversation();
			show(2);
		}
		
	}
	else if(clickID=="milk")
	{
		var found = localStorage.getItem("found");
		found -=135;
		if(found>=0)
		{
			if(!localStorage.getItem(icon))
				localStorage.setItem(icon, 1500);
			else
			{
				total = localStorage.getItem(icon);
				total = parseInt(total);
				total += 1500;
				localStorage.setItem(icon,total);
			}
			localStorage.setItem("found", found);
			show(1);
		}
		else
		{
			setConversation();
			show(2);
		}
	}
	else if(clickID=="powder")
	{
		var found = localStorage.getItem("found");
		found -=150;
		if(found>=0)
		{
			if(!localStorage.getItem(icon))
				localStorage.setItem(icon, 1000);
			else
			{
				total = localStorage.getItem(icon);
				total = parseInt(total);
				total += 1000;
				localStorage.setItem(icon,total);
			}
			localStorage.setItem("found", found);
			show(1);
		}
		else
		{
			setConversation();
			show(2);
		}
	}
	else if(clickID=="sugar")
	{
		weight = parseInt(icon.split('_')[1]);
		price = (weight/1000)*40;
		found = localStorage.getItem("found");
		if(!localStorage.getItem(icon.split('_')[0]))
		{
			if(found-price>=0)
			{
				found-=price;
				localStorage.setItem("found", found);
				localStorage.setItem(icon.split('_')[0], weight);
				show(1);
			}
			else
			{
				setConversation();
				show(2);
			}
		}
		else
		{
			total = localStorage.getItem(icon.split('_')[0]);
			total = parseInt(total);
			total += weight;
			if(found-price>=0)
			{
				found-=price;
				localStorage.setItem("found", found);
				localStorage.setItem(icon.split('_')[0],total);
				show(1);
			}
			else
			{
				setConversation();
				show(2);
			}
			
		}
	}
	else if(clickID=="ice")
	{
		weight = parseInt(icon.split('_')[1]);
		price = (weight/1000)*18;
		found = localStorage.getItem("found");
		if(!localStorage.getItem(icon.split('_')[0]))
		{	
			if(found-price>=0)
			{
				found -=price;
				localStorage.setItem("found", found);
				localStorage.setItem(icon.split('_')[0], weight);
				show(1);
			}
			else
			{
				setConversation();
				show(2);
			}
		}
		else
		{
			total = localStorage.getItem(icon.split('_')[0]);
			total = parseInt(total);
			total += weight;
			if(found-price>=0)
			{
				found-=price;
				localStorage.setItem("found", found);
				localStorage.setItem(icon.split('_')[0],total);
				show(1);
			}
			else
			{
				setConversation();
				show(2);
			}
		}
		
	}
	loadBag();
}

function loadBag()
{
	var length = localStorage.length;
	material = [];
	var j=0;
	//把不是found的item加進material陣列裡面
	for (var i = 0; i < length; ++i) 
	{
		if(localStorage.key(i)!="found")
		{
			material[j] = localStorage.key(i);
			j++;
		}
	}
	
	var markup="";
	for(tag in material)
	{
		if(material[tag]=="ice")
			markup += "<tr><td>冰塊</th><td>"+localStorage.getItem(material[tag])+"g</td></tr>";
		else if(material[tag]=="sugar")
			markup += "<tr><td>糖</td><td>"+localStorage.getItem(material[tag])+"g</td></tr>";
		else
			markup += "<tr><td>"+material[tag]+"</td><td>"+localStorage.getItem(material[tag])+"g</td></tr>";
	}
	
	var found = localStorage.getItem("found");
	document.getElementById("found").innerHTML = "你剩"+found+"元喔!";
	document.getElementById("bag").innerHTML = markup;
}

function setConversation()
{
	var conversation = document.getElementById("conversation");
	var con = ["沒錢仔，還敢買阿","你沒錢了，滾","先去調配奶茶ㄅ","沒錢別來搞笑了"];
	var random_con = Math.floor( Math.random() * con.length );
	message = con[random_con];
	conversation.innerHTML = message;
	
}


function show(result)
{
    //buying_correct.png
	var comfirm;
	comfirm = document.createElement("IMG");
	comfirm.setAttribute("class", "buying");
	if(result == 1)
	{
		comfirm.setAttribute("src", "resource/buying_correct.png");
	}
	else
	{
		comfirm.setAttribute("src", "resource/buying_wrong.png");
	}
	document.getElementById("buying").appendChild(comfirm);
	var pic = document.getElementById("buying");
	var num = 10;
	var flag = true;
	if(flag){
		var st = setInterval(function(){
			num--;
			flag = false;
			pic.style.opacity = num/10;
			if (num<=0) {
				clearInterval(st);
				document.getElementById("buying").removeChild(comfirm);
				flag = true;
			}
		},90);
	}
}
window.addEventListener( "load", start, false );
