function start()
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
	
	if(material.length==0)
		document.getElementById("message").innerHTML = "先去批貨吧<br><br>你甚麼材料都沒有";
	else
	{
		var lock=0;
		for(tag in material)
		{
			if(localStorage.getItem(material[tag])<=150)
			{
				document.getElementById("message").innerHTML = "材料有點不夠了，看你要不要補個貨";
				lock=1;
			}
		}

		if(lock==0)
			document.getElementById("message").innerHTML = "<br>"+"材料充足，往右去調配你的珍奶吧";
	}
	
	
}


window.addEventListener( "load",start, false );