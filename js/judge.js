function start()
{
	loadBag();
}

function loadBag()
{
	//console.log("123");
	var length = localStorage.length;
	materials = [];
	var j=0;
	//把不是found的item加進material陣列裡面
	for (var i = 0; i < length; ++i) 
	{
		if(localStorage.key(i)!="found")
		{
			materials[j] = localStorage.key(i);
			j++;
		}
	}
	
	var markup="";
	for(tag in materials)
	{
		if(materials[tag]=="ice")
			markup += "<tr><td>冰塊</th><td>"+localStorage.getItem(materials[tag])+"g</td></tr>";
		else if(materials[tag]=="sugar")
			markup += "<tr><td>糖</td><td>"+localStorage.getItem(materials[tag])+"g</td></tr>";
		else
			markup += "<tr><td>"+materials[tag]+"</td><td>"+localStorage.getItem(materials[tag])+"g</td></tr>";
	}
	
	document.getElementById("bag").innerHTML = markup;
}


function check()
{
	var pearl = document.getElementById("pearlOption").value;
	var pearlNumber = document.getElementById("pearlText").value;
	pearlNumber = parseInt(pearlNumber);

	var tea = document.getElementById("teaOption").value;
	var teaNumber = document.getElementById("teaText").value;
	teaNumber = parseInt(teaNumber);

	var milk = document.getElementById("milkOption").value;
	var milkNumber = document.getElementById("milkText").value;
	milkNumber = parseInt(milkNumber);

	var powder = document.getElementById("powderOption").value;
	var powderNumber = document.getElementById("powderText").value;
	powderNumber = parseInt(powderNumber);

	var sugarNumber = document.getElementById("sugarText").value;
	sugarNumber = parseInt(sugarNumber);
	
	var iceNumber = document.getElementById("iceText").value;
	iceNumber = parseInt(iceNumber);
	
	//每種材料 預設糖跟冰塊都有買
	var icons = [pearl,tea,milk,powder,'sugar','ice'];
	var lock = 1; //如果檢查出來有錯 就改0
	
	var i = 0;
	for(tag in icons) //檢查各個項目都符合規定
	{
		//材料不為空 且 存在在locaStorage裡面 就做檢查
		if((icons[tag]!='sugar'&&icons[tag]!='ice'&&icons[tag]!="") && localStorage.getItem(icons[tag]) ) //想調配材料必須在localStorage;但可以為空
		{
			//檢查庫存夠不夠
			iconNumber = localStorage.getItem(icons[tag]); //庫存
			iconNumber = parseInt(iconNumber);
			if(i==0)
			{
				if(pearlNumber*5>iconNumber)
				{
					alert(icons[tag]+"不夠啦!");
					lock = 0;
				}
			}
			else if(i==1)
			{
				if(teaNumber*5>iconNumber)
				{
					alert(icons[tag]+"不夠啦!");
					lock = 0;
				}
			}
			else if(i==2)
			{
				if(milkNumber*5>iconNumber)
				{
					alert(icons[tag]+"不夠啦!");
					lock = 0;
				}
			}
			else if(i==3)
			{
				if(powderNumber*5>iconNumber)
				{
					alert(icons[tag]+"不夠啦!");
					lock = 0;
				}
			}
		}
		else if(icons[tag]=="sugar")
		{
			iconNumber = localStorage.getItem("suagr");
			iconNumber = parseInt(iconNumber);
			if(localStorage.getItem('sugar')) //檢查有沒有買
			{
				if(sugarNumber*5>localStorage.getItem('sugar'))
				{
					alert("糖不夠啦!");
					lock = 0;
				}
			}
			else
			{
				alert("你根本沒買糖");
				lock = 0;
			}
		}
		else if(icons[tag]=="ice")
		{
			iconNumber = localStorage.getItem("ice");
			iconNumber = parseInt(iconNumber);
			if(localStorage.getItem('ice'))
			{
				if(iceNumber*5>localStorage.getItem('ice'))
				{
					alert("冰塊不夠啦!");
					lock = 0;
				}
			}
			else
			{
				alert("你根本沒買冰塊");
				lock = 0;
			}
		}
		//材料不為空 但材料不在localStorage裡面
		else if(icons[tag]!="" && !localStorage.getItem(icons[tag]))
		{
			alert("你根本沒買"+icons[tag]);
			lock = 0;
		}
		i++;
	}
	
	if(lock == 1)
	{
		i=0;
		if(isNaN(pearlNumber))
			pearlNumber=0;
		if(isNaN(teaNumber))
			teaNumber=0;
		if(isNaN(milkNumber))
			milkNumber=0;
		if(isNaN(powderNumber))
			powderNumber=0;
		if(isNaN(sugarNumber))
			sugarNumber=0;
		if(isNaN(iceNumber))
			iceNumber=0;
		
		for(tag in icons)
		{
			if(icons[tag])
			{
				if(i==0)
					setUp(icons[tag],pearlNumber);
				else if(i==1)
					setUp(icons[tag],teaNumber);
				else if(i==2)
					setUp(icons[tag],milkNumber);
				else if(i==3)
					setUp(icons[tag],powderNumber);
				
			}
			if(icons[tag]=='sugar')
				setUp('sugar',sugarNumber);
			if(icons[tag]=='ice')
				setUp('ice',iceNumber);
			i++;
		}
		var numberArray = [pearlNumber,teaNumber,milkNumber,powderNumber,sugarNumber,iceNumber];
		judge();
		//alert("123");
	}
	return lock;
}

var material={};
function setUp(key,value)
{
	iconNumber = localStorage.getItem(key);
	iconNumber = parseInt(iconNumber);
	localStorage.setItem(key,iconNumber-(value*5)); //煮5杯(5個評審)
	material[key] = value;
}

function judge()
{	
	var win=0;
	//每位評審各自的prefer 中其中一個就覺得好喝
	var judge1 = ["黑糖珍珠:24", "奶精:25", "玄米茶:15"];
	var judge2 = ["蜂蜜珍珠:24", "辣椒粉:20", "可可粉:20"];
	var judge3 = ["玄米茶:15", "鮮奶:25"];
	var judge4 = ["仙人掌珍珠:24", "烏龍茶:15", "抹茶粉:20"];
	var judge5 = ["阿薩姆:15", "可可粉:20"];
	
	//standard(誤差+-5)全中不管細目為何 大家都會覺得好喝
	var standard=[24,15,25,20,35,102];
	
	var items=[];
	for(var key in material)
		items.push(key+":"+material[key]);
	
	//重要材料沒有缺 進入正式評判
	numbers=[];
	for(tag in items) //先把各個材料的量輸到numbers陣列
	{
		var number = parseInt(items[tag].split(":")[1]);
		numbers.push(number);
	}

	var good1=[];
	var bad1=[];
	var good2=[];
	var bad2=[];
	var good3=[];
	var bad3=[];
	var good4=[];
	var bad4=[];
	var good5=[];
	var bad5=[];
	for(tag in items)
	{
		item = items[tag].split(":")[0];
		//比對有沒有每個評審prefer的材料
		judge1Message = preferJudge(item,numbers[tag],judge1,numbers);
		if(judge1Message[1]==1) //好喝
			good1.push(judge1Message[0]);
		else if(judge1Message[1]==0)
			bad1.push(judge1Message[0]);
		
		judge2Message = preferJudge(item,numbers[tag],judge2,numbers);
		if(judge2Message[1]==1) //好喝
			good2.push(judge2Message[0]);
		else if(judge2Message[1]==0)
			bad2.push(judge2Message[0]);
		
		judge3Message = preferJudge(item,numbers[tag],judge3,numbers);
		if(judge3Message[1]==1) //好喝
			good3.push(judge3Message[0]);
		else if(judge3Message[1]==0)
			bad3.push(judge3Message[0]);
		
		judge4Message = preferJudge(item,numbers[tag],judge4,numbers);
		if(judge4Message[1]==1) //好喝
			good4.push(judge4Message[0]);
		else if(judge4Message[1]==0)
			bad4.push(judge4Message[0]);
		
		judge5Message = preferJudge(item,numbers[tag],judge5,numbers);
		if(judge5Message[1]==1) //好喝
			good5.push(judge5Message[0]);
		else if(judge5Message[1]==0)
			bad5.push(judge5Message[0]);
	}
	
	
	//如果good陣列長度>0則放good  否則放bad
	if(good1.length>0)
	{
		var random = Math.floor( Math.random() * good1.length );
		message1 = good1[random];
		win+=1;
	}
	else
	{
		var random = Math.floor( Math.random() * bad1.length );
		message1 = bad1[random];
	}
	
	if(good2.length>0)
	{
		var random = Math.floor( Math.random() * good2.length );
		message2 = good2[random];
		win+=1;
	}
	else
	{
		var random = Math.floor( Math.random() * bad2.length );
		message2 = bad2[random];
	}
	
	if(good3.length>0)
	{
		var random = Math.floor( Math.random() * good3.length );
		message3 = good3[random];
		win+=1;
	}
	else
	{
		var random = Math.floor( Math.random() * bad3.length );
		message3 = bad3[random];
	}
	if(good4.length>0)
	{
		var random = Math.floor( Math.random() * good4.length );
		message4 = good4[random];
		win+=1;
	}
	else
	{
		var random = Math.floor( Math.random() * bad4.length );
		message4 = bad4[random];
	}
	if(good5.length>0)
	{
		var random = Math.floor( Math.random() * good5.length );
		message5 = good5[random];
		win+=1;
	}
	else
	{
		var random = Math.floor( Math.random() * bad5.length );
		message5 = bad5[random];
	}
	
	
	//檢查肯定難喝的 沒珍珠||沒茶||沒奶
	for(var i=0;i<3;i++)
	{
		if(items[i].split(":")[1]=="0")
			commentSet(0);
	}

	console.log(message1);
	console.log(message2);
	console.log(message3);
	console.log(message4);
	console.log(message5);

	localStorage.setItem("message1",message1);
	localStorage.setItem("message2",message2);
	localStorage.setItem("message3",message3);
	localStorage.setItem("message4",message4);
	localStorage.setItem("message5",message5);

	
	
	var gameOver=false;
	localStorage.setItem("gameOver","false");
	if(win>=3)
	{	
		gameOver=true;
		localStorage.setItem("gameOver","true");

	}
		
	
	items=[];
}

function preferJudge(item,number,judgePrefer,numbers)
{
	var lock = 0;
	for(var k in judgePrefer)
	{
		var jItem = judgePrefer[k].split(":")[0];
		var jItemNumber = parseInt(judgePrefer[k].split(":")[1]);
		if(item==jItem) //如果有
		{
			if((number-jItemNumber<=5) && (number-jItemNumber>=-5)) //且誤差+-5
			{
				message = commentSet(1); //他就會覺得好喝
				lock = 1;
			}
		}
	}
	if(lock == 0) //沒有prefer到 就進入一般評判
		message = normalJudge(numbers);
	//console.log(message);
	return [message,lock];
}

function normalJudge(numbers)
{
	message=[];
	var standard=[24,15,25,20,35,102];

	if(numbers[0]-standard[0]>5)
		message.push("珍珠太多");
		
	else if(numbers[0]-standard[0]<-5)
		message.push("珍珠太少");
	
	if(numbers[1]-standard[1]>5)
		message.push("茶味太重");
	else if(numbers[1]-standard[1]<-5)
		message.push("茶味太淡");
	
	if(numbers[2]-standard[2]>5)
		message.push("奶味太重");
	else if(numbers[2]-standard[2]<-5)
		message.push("奶味太淡");
	
	if(numbers[3]-standard[3]>5)
		message.push("過度調味");
	
	if(numbers[4]-standard[4]>5)
		message.push("太甜了");
	else if(numbers[4]-standard[4]<-5)
		message.push("不夠甜");
	
	if(numbers[5]-standard[5]>5)
		message.push("太冰了!");
	else if(numbers[5]-standard[5]<-5)
		message.push("不夠清涼");
	
	
	//多個缺點會挑一個來講
	var random = Math.floor( Math.random() * message.length );
	message = message[random];
	return message;
}

function commentSet(comment)
{
	if(comment==0) //都覺得很難喝
	{
		comment=["你要好好想一下到底甚麼叫 珍珠 奶 茶","這是一杯沒有靈魂的珍奶","我看你還是繼續當肥宅吧","進步空間有點太大了","你得好好想想你缺了甚麼","可以退遊了","好噁心","肥宅難過水"];
		var random_com = Math.floor( Math.random() * comment.length );
		message1 = comment[random_com];
		random_com = Math.floor( Math.random() * comment.length );
		message2 = comment[random_com];
		random_com = Math.floor( Math.random() * comment.length );
		message3 = comment[random_com];
		random_com = Math.floor( Math.random() * comment.length );
		message4 = comment[random_com];
		random_com = Math.floor( Math.random() * comment.length );
		message5 = comment[random_com];
		
		var messages=[message1,message2,message3,message4,message5];
		return messages; 
	}

	//覺得很好喝的那位
	if(comment==1)
	{
		comment=["有點好喝喔","比例很讚","去開店賺錢吧","出師了","你的前途一片光明","666","鬼之珍奶","respect you!","珍奶大師就是你","這杯珍奶很可以","最新肥宅快樂水","好好喝","還想再喝一杯","我願意為這杯珍奶變胖"];
		var random_com = Math.floor( Math.random() * comment.length );
		message = comment[random_com];
		return message;
	}
}

function change()
{
	var lock=check();
	if(lock==1)
		window.location.replace('shake.html');
}

window.addEventListener( "load",start, false );