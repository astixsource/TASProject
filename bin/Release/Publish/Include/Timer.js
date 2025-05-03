			// This script is for disabling the " Save Successfully !!! " Message	
		
			var myinterval;
			var timeInMilliseconds = 5000;
				
			function fnStartTimer()
			{
				myinterval = window.setInterval('fnEndTimer()',timeInMilliseconds);
			}
				
			function fnEndTimer()
			{	
				if(document.getElementById("dvMessage") !=null)
				{
					document.getElementById("dvMessage").innerHTML = "";
				}	
				window.clearInterval(myinterval);
			}	
			
			//=================== For Saving the data though Web Services 
	//		=========================
	