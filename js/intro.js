function start()
{
	$('.rule1').fadeIn(function(){ 
		$('.rule2').fadeIn(function(){ 
			$('.rule3').fadeIn(function(){
				$('.rule4').fadeIn(1000);
			}); 
		}); 
	}); 
}


window.addEventListener( "load",start, false );