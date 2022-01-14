window.onload = init;

function init(){
	
	var xhr = new XMLHttpRequest();
	var streamJSON = '../sc/streamcontrol.json';
	var scObj;
	var startup = true;
	var animated = false;
	var cBust = 0;
	var game;
	var p1Wrap = $('#p1Wrapper');
	var p2Wrap = $('#p2Wrapper');
	var p1NameAloneVar = $('#p1NameAlone');
	var p2NameAloneVar = $('#p2NameAlone');
	var rdResize = $('#round');
	
	xhr.overrideMimeType('application/json');
	
	function pollJSON(){
		xhr.open('GET',streamJSON+'?v='+cBust,true);
		xhr.send();
		cBust++;
	}
	
	pollJSON();
	setInterval(function(){pollJSON();},500);
	
	xhr.onreadystatechange = parseJSON;
	
	function parseJSON(){
		if(xhr.readyState === 4){
			scObj = JSON.parse(xhr.responseText);
			if(animated == true){
				scoreboard();
			}
		}
	}
		
	function scoreboard(){
		
		
		if(startup == true){
			//I do want to implement game specific overlay support at some point
			/*game = scObj['game'];
			
			if(game == 'BBTAG' || game == 'SFVAE' || game == 'TEKKEN7' || game == 'UNIST'){
				$('#scoreboardVid').attr('src','../webm/scoreboard_1.webm');
			}
			else if(game == 'BBCF' || game == 'DBFZ' || game == 'GGXRD' || game == 'KOFXIV' || game == 'MVCI' || game == 'UMVC3'){
				$('#scoreboardVid').attr('src','../webm/scoreboard_2.webm'); //changes webm to 2nd one if appropriate game is picked
				TweenMax.set('#leftWrapper',{css:{y: adjust2}}); //sets scoreboard text wrappers to match placement of 2nd webm
				TweenMax.set('#rightWrapper',{css:{y: adjust2}});
			}
			else if(game == 'USF4'){
				$('#scoreboardVid').attr('src','../webm/scoreboard_3.webm');
				TweenMax.set('#leftWrapper',{css:{y: adjust3}});
				TweenMax.set('#rightWrapper',{css:{y: adjust3}});
			}
			else{				
				$('#scoreboardVid').attr('src','../webm/scoreboard_2.webm');
				TweenMax.set('#leftWrapper',{css:{y: adjust2}}); //if 'game' value is anything other than specified above it defaults to 2nd webm/placement
				TweenMax.set('#rightWrapper',{css:{y: adjust2}});
			$('#gameHold').html(game);
			}*/
			//``$('#scoreboardVid').attr('src','../webm/scoreboard_1.webm');
			//document.getElementById('scoreboardVid').play(); //what will happen if I try to remove this line???
			game = scObj['game'];
			$('#gameHold').html(game);
			getData(); //getData happens every time scoreboard is called, which is every 300ms
			startup = false;
			animated = true;
			//setTimeout(ticker,200);
			//setTimeout(logoLoop, 200);
		}
		else{
			getData();
			
		}
		
	}
	setTimeout(scoreboard,300); //every 300ms the scoreboard function is called
	
	/*function logoLoop() {
		var initialTime = 700; //initial fade-in time for first logo
		var intervalTime = 5000; //amount of time between changing of logos
		var fadeTime = 2000; //duration of crossfade between logos
		var currentItem = 0; //placement value within logoWrapper container of current logo being operated on in function
		var itemCount = $("#logoWrapper").children().length; //number of logo <img> objects located within logoWrapper container

		if (itemCount > 1) {
			$("#logoWrapper").find("img").eq(currentItem).fadeIn(initialTime);

			setInterval(function () {
				$("#logoWrapper").find("img").eq(currentItem).fadeOut(fadeTime);

				if (currentItem == itemCount - 1) {
					currentItem = 0;
				} else {
					currentItem++;
				}

				$("#logoWrapper").find("img").eq(currentItem).fadeIn(fadeTime);
			}, intervalTime);
		} else {
			$(".logos").fadeIn(initialTime);
		}
	}
	function ticker(){
		var ints = [scObj['int0'], scObj['int1'], scObj['int2'], scObj['int3']];
		
		var initialTime = 700; //initial fade-in time for first logo
		var intervalTime = 5000; //amount of time between changing of logos
		var fadeTime = 0.4; //duration of crossfade between logos (TweenMax value so needs to be in full seconds)
		var currentItem = 0; //placement value within logoWrapper container of current logo being operated on in function
		var itemCount = ints.length; //number of logo <img> objects located within logoWrapper container
		
		if(itemCount > 1){
			$('#ticker1').html(ints[0]);
			TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut});
			
			setInterval(function(){
				
				TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 0},ease:Quad.easeOut});
			
				setTimeout(function(){
					if(currentItem == itemCount - 1){
						currentItem = 0;
						ints[0] = scObj['int0']; // check int0 if it needs to be updated
					}
					else{
						var nextItem = currentItem+1; //what the next index in the array is
						var nextInt = 'int'+nextItem; //convert to a readable string for scObj check
						ints[currentItem+1] = scObj[nextInt]; //check and change the next variable
						currentItem++;
					}
					$('#ticker1').html(ints[currentItem]);
					
				
				}, 200);
				
				TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:fadeTime});
				
				
				
			},intervalTime);
		}
		else{
			$('#ticker1').html(ints[0]);
			TweenMax.to('#ticker1',.2,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut});
		}
	}*/
	
	function getData(){
		// p1Loser is automatic L hold-outer, it checks if that box is true and adds the L
		if (scObj['p1Loser'] == 1) {
			p1Name = scObj['p1Name'] + ' (L)';}
		else {
			p1Name = scObj['p1Name'];}
		if (scObj['p2Loser'] == 1) {
			p2Name = scObj['p2Name'] + ' (L)';}
		else {
			p2Name = scObj['p2Name'];}
		// check if the team variable is empty, if not it adds the | character everyone loves or whatever
		if (scObj['p1Team'] == '') {
			var p1Team = scObj['p1Team'];}
		else {
			var p1Team = scObj['p1Team'] + ' | ';}
		if (scObj['p2Team'] == '') {
			var p2Team = scObj['p2Team'];}
		else {
			var p2Team = scObj['p2Team'] + ' | ';}
		//var p1Score = scObj['p1Score'];
		//var p2Score = scObj['p2Score'];
		var s1p1Score = scObj['s1p1Score'];
		var s1p2Score = scObj['s1p2Score'];
		var s2p1Score = scObj['s2p1Score'];
		var s2p2Score = scObj['s2p2Score'];
		var s3p1Score = scObj['s3p1Score'];
		var s3p2Score = scObj['s3p2Score'];
		var s4p1Score = scObj['s4p1Score'];
		var s4p2Score = scObj['s4p2Score'];
		var s5p1Score = scObj['s5p1Score'];
		var s5p2Score = scObj['s5p2Score'];
		/*var p1Region = scObj['p1Region'];
		var p2Region = scObj['p2Region'];
		var round = scObj['round'];*/
		var p1Pronoun = scObj['p1Pronoun'];
		var p2Pronoun = scObj['p2Pronoun'];
		
		var comm1 = scObj['comm1'];
		var comm2 = scObj['comm2'];
		var comm1Pronoun = scObj['comm1Pronoun'];
		var comm2Pronoun = scObj['comm2Pronoun'];
		var comms = "Commentators: " + comm1 + " (" + comm1Pronoun + ") & " + comm2 + " (" + comm2Pronoun + ")";
				
		if(startup == true){
			TweenMax.set('#p1Wrapper',{css:{x:p1Move}});
			TweenMax.set('#p2Wrapper',{css:{x:p2Move}});
			TweenMax.set('#comm1Wrapper',{css:{x:p1Move}});
			TweenMax.set('#comm2Wrapper',{css:{x:p2Move}});
			$('#p1Name').html(p1Name);
			$('#p2Name').html(p2Name);
			$('#p1NameAlone').html(p1Name);
			$('#p2NameAlone').html(p2Name);
			$('#p1Team').html(p1Team);
			$('#p2Team').html(p2Team);
			$('#s1p1Score').html(s1p1Score);
			$('#s1p2Score').html(s1p2Score);
			$('#s2p1Score').html(s2p1Score);
			$('#s2p2Score').html(s2p2Score);
			$('#s3p1Score').html(s3p1Score);
			$('#s3p2Score').html(s3p2Score);
			$('#s4p1Score').html(s4p1Score);
			$('#s4p2Score').html(s4p2Score);
			$('#s5p1Score').html(s5p1Score);
			$('#s5p2Score').html(s5p2Score);
			//$('#p1Score').html(p1Score);
			//$('#p2Score').html(p2Score);
			$('#p1Pronoun').html(p1Pronoun);
			$('#p2Pronoun').html(p2Pronoun);
			//$('#round').html(round);
			$('#comm1').html(comm1);
			$('#comm2').html(comm2);
			$('#comm1Pronoun').html(comm1Pronoun);
			$('#comm2Pronoun').html(comm2Pronoun);
			$('#comms').html(comms);
			$('#p1Region').attr('src', '../imgs/regions/'+p1Region+".png");
			$('#p2Region').attr('src', '../imgs/regions/'+p2Region+".png");
			
			p1Wrap.each(function(i, p1Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p1Wrap).css('font-size', newFontSize);
				}
			});
			
			p2Wrap.each(function(i, p2Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p2Wrap).css('font-size', newFontSize);
				}
			});
			
			p1NameAloneVar.each(function(i, p1NameAloneVar){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p1NameAloneVar.scrollWidth > p1NameAloneVar.offsetWidth || p1NameAloneVar.scrollHeight > p1NameAloneVar.offsetHeight){
					var newFontSize = (parseFloat($(p1NameAloneVar).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p1NameAloneVar).css('font-size', newFontSize);
				}
			});

			p2NameAloneVar.each(function(i, p2NameAloneVar){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p2NameAloneVar.scrollWidth > p2NameAloneVar.offsetWidth || p2NameAloneVar.scrollHeight > p2NameAloneVar.offsetHeight){
					var newFontSize = (parseFloat($(p2NameAloneVar).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p2NameAloneVar).css('font-size', newFontSize);
				}
			});

			var comm1Wrap = $('#comm1Wrapper');
			comm1Wrap.each(function(i, comm1Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(comm1Wrap.scrollWidth > comm1Wrap.offsetWidth || comm1Wrap.scrollHeight > comm1Wrap.offsetHeight){
					var newFontSize = (parseFloat($(comm1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(comm1Wrap).css('font-size', newFontSize);
				}
			});
			
			var comm2Wrap = $('#comm2Wrapper');
			comm2Wrap.each(function(i, comm2Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(comm2Wrap.scrollWidth > comm2Wrap.offsetWidth || comm2Wrap.scrollHeight > comm2Wrap.offsetHeight){
					var newFontSize = (parseFloat($(comm2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(comm2Wrap).css('font-size', newFontSize);
				}
			});

			rdResize.each(function(i, rdResize){
				while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
					var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
					$(rdResize).css('font-size', newFontSize);
				}
			});

			//Score colour check, don't hate me this is what i can to
			if(s1p1Score == 3){document.getElementById('s1p1Score').style.backgroundColor = 'green';}
			if(s1p2Score == 3){document.getElementById('s1p2Score').style.backgroundColor = 'green';}
			if(s2p1Score == 3){document.getElementById('s2p1Score').style.backgroundColor = 'green';}
			if(s2p2Score == 3){document.getElementById('s2p2Score').style.backgroundColor = 'green';}
			if(s3p1Score == 3){document.getElementById('s3p1Score').style.backgroundColor = 'green';}
			if(s3p2Score == 3){document.getElementById('s3p2Score').style.backgroundColor = 'green';}
			if(s4p1Score == 3){document.getElementById('s4p1Score').style.backgroundColor = 'green';}
			if(s4p2Score == 3){document.getElementById('s4p2Score').style.backgroundColor = 'green';}
			if(s5p1Score == 3){document.getElementById('s5p1Score').style.backgroundColor = 'green';}
			if(s5p2Score == 3){document.getElementById('s5p2Score').style.backgroundColor = 'green';}

			//First make the elements come in
			/*TweenMax.to('#p1NamePNG',nameTime,{css:{x:p1PNGMove,opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#p2NamePNG',nameTime,{css:{x:p2PNGMove,opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#roundPNG',rdTime,{css:{y:'+80px',opacity: 1},ease:Quad.easeOut,delay:rdDelay})
			TweenMax.to('#p1ScorePNG',scTime,{css:{x:p1SMove,opacity: 1},ease:Quad.easeOut,delay:sceDelay})
			TweenMax.to('#p2ScorePNG',scTime,{css:{x:p2SMove,opacity: 1},ease:Quad.easeOut,delay:sceDelay})*/
			//Then make the text come in
			TweenMax.to('#p1Wrapper',nameTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#p2Wrapper',nameTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('.nameAlone',nameTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('#comms',nameTime,{css:{y:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('.comms',nameTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('.scores',scTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			TweenMax.to('.Labels',scTime,{css:{x:'+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay})
			/*TweenMax.to('#round',rdTime,{css:{y:'+0px', opacity: 1},ease:Quad.easeOut,delay:rdDelay})
			TweenMax.to('.regions',rdTime,{css:{y:'+0px', opacity: 1},ease:Quad.easeOut,delay:rdDelay})*/
		}
		else{
			game = scObj['game'];
			
			if($('#p1Name').text() != p1Name || $('#p1Team').text() != p1Team || $('#p1Pronoun').text() != p1Pronoun){ //if either name or team do not match, fades out wrapper and updates them both
				TweenMax.to(p1NameAloneVar,.3,{css:{x: 0, opacity: 0},ease:Quad.easeOut,delay:0});
				TweenMax.to('#p1Wrapper',.3,{css:{x: p1Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //uses onComplete parameter to execute function after TweenMax
					$('#p1Wrapper').css('font-size',nameSize); //restores default font size based on variable set in scoreboard.html
					$('#p1Name').html(p1Name); //updates name and team html objects with current json values
					$('#p1Team').html(p1Team);
					$('#p1NameAlone').html(p1Name);
					$('#p1Pronoun').html(p1Pronoun);
					
					p1Wrap.each(function(i, p1Wrap){//same resize functions from above
						while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p1Wrap).css('font-size', newFontSize);
						}
					});
					p1NameAloneVar.each(function(i, p1NameAloneVar){ //same resize functions from above
						while(p1NameAloneVar.scrollWidth > p1NameAloneVar.offsetWidth || p1NameAloneVar.scrollHeight > p1NameAloneVar.offsetHeight){
							var newFontSize = (parseFloat($(p1NameAloneVar).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p1NameAloneVar).css('font-size', newFontSize);
						}
					});
					TweenMax.to(p1NameAloneVar,.3,{css:{x: 0, opacity: 1},ease:Quad.easeOut,delay:.2});
					TweenMax.to('#p1Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2}); //fades name wrapper back in while moving to original position
				}});
			}
			
			if($('#p2Name').text() != p2Name || $('#p2Team').text() != p2Team || $('#p2Pronoun').text() != p2Pronoun){
				TweenMax.to(p2NameAloneVar,.3,{css:{x: 0, opacity: 0},ease:Quad.easeOut,delay:0});
				TweenMax.to('#p2Wrapper',.3,{css:{x: p2Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Wrapper').css('font-size',nameSize);
					$('#p2Name').html(p2Name);
					$('#p2Team').html(p2Team);
					$('#p2NameAlone').html(p2Name);
					$('#p2Pronoun').html(p2Pronoun);					
					
					p2Wrap.each(function(i, p2Wrap){
						while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p2Wrap).css('font-size', newFontSize);
						}
					});
					p2NameAloneVar.each(function(i, p2NameAloneVar){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
						while(p2NameAloneVar.scrollWidth > p2NameAloneVar.offsetWidth || p2NameAloneVar.scrollHeight > p2NameAloneVar.offsetHeight){
							var newFontSize = (parseFloat($(p2NameAloneVar).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p2NameAloneVar).css('font-size', newFontSize);
						}
					});
					TweenMax.to(p2NameAloneVar,.3,{css:{x: 0, opacity: 1},ease:Quad.easeOut,delay:.2});
					TweenMax.to('#p2Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			/*if($('#round').text() != round){
				TweenMax.to('#round',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //same format as changing names just no change in positioning, only fade in/out
					$('#round').css('font-size',rdSize);
					$('#round').html(round);					
			
					rdResize.each(function(i, rdResize){
						while(rdResize.scrollWidth > rdResize.offsetWidth || rdResize.scrollHeight > rdResize.offsetHeight){
							var newFontSize = (parseFloat($(rdResize).css('font-size').slice(0,-2)) * .95) + 'px';
							$(rdResize).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#round',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}*/
			
			if($('#comms').text() != comms){
				TweenMax.to('#comms',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#comms').html(comms);
					
					TweenMax.to('#comms',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#comm1').text() != comm1 || $('#comm1Pronoun').text() != comm1Pronoun){
				TweenMax.to('#comm1Wrapper',.3,{css:{x: p1Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#comm1').html(comm1);
					$('#comm1Pronoun').html(comm1Pronoun);			
					
					var comm1Wrap = $('#comm1Wrapper');
					comm1Wrap.each(function(i, comm1Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
					while(comm1Wrap.scrollWidth > comm1Wrap.offsetWidth || comm1Wrap.scrollHeight > comm1Wrap.offsetHeight){
						var newFontSize = (parseFloat($(comm1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
						$(comm1Wrap).css('font-size', newFontSize);
					}
				});
					
					TweenMax.to('#comm1Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#comm2').text() != comm2 || $('#comm2Pronoun').text() != comm2Pronoun){
				TweenMax.to('#comm2Wrapper',.3,{css:{x: p2Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#comm2').html(comm2);
					$('#comm2Pronoun').html(comm2Pronoun);			
					
					var comm2Wrap = $('#comm2Wrapper');
					comm2Wrap.each(function(i, comm2Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
					while(comm2Wrap.scrollWidth > comm2Wrap.offsetWidth || comm2Wrap.scrollHeight > comm2Wrap.offsetHeight){
						var newFontSize = (parseFloat($(comm2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
						$(comm2Wrap).css('font-size', newFontSize);
					}
				});
					
					TweenMax.to('#comm2Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#s1p1Score').text() != s1p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#s1p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s1p1Score').html(s1p1Score);

					if(s1p1Score == 3){document.getElementById('s1p1Score').style.backgroundColor = 'green';}
					else{document.getElementById('s1p1Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s1p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#s1p2Score').text() != s1p2Score){
				TweenMax.to('#s1p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s1p2Score').html(s1p2Score);
					if(s1p2Score == 3){document.getElementById('s1p2Score').style.backgroundColor = 'green';}
					else{document.getElementById('s1p2Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s1p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#s2p1Score').text() != s2p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#s2p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s2p1Score').html(s2p1Score);
					if(s2p1Score == 3){document.getElementById('s2p1Score').style.backgroundColor = 'green';}
					else{document.getElementById('s2p1Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s2p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#s2p2Score').text() != s2p2Score){
				TweenMax.to('#s2p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s2p2Score').html(s2p2Score);
					if(s2p2Score == 3){document.getElementById('s2p2Score').style.backgroundColor = 'green';}
					else{document.getElementById('s2p2Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s2p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#s3p1Score').text() != s3p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#s3p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s3p1Score').html(s3p1Score);
					if(s3p1Score == 3){document.getElementById('s3p1Score').style.backgroundColor = 'green';}
					else{document.getElementById('s3p1Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s3p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#s3p2Score').text() != s3p2Score){
				TweenMax.to('#s3p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s3p2Score').html(s3p2Score);
					if(s3p2Score == 3){document.getElementById('s3p2Score').style.backgroundColor = 'green';}
					else{document.getElementById('s3p2Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s3p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#s4p1Score').text() != s4p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#s4p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s4p1Score').html(s4p1Score);
					if(s4p1Score == 3){document.getElementById('s4p1Score').style.backgroundColor = 'green';}
					else{document.getElementById('s4p1Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s4p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#s4p2Score').text() != s4p2Score){
				TweenMax.to('#s4p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s4p2Score').html(s4p2Score);
					if(s4p2Score == 3){document.getElementById('s4p2Score').style.backgroundColor = 'green';}
					else{document.getElementById('s4p2Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s4p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#s5p1Score').text() != s5p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#s5p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s5p1Score').html(s5p1Score);
					if(s5p1Score == 3){document.getElementById('s5p1Score').style.backgroundColor = 'green';}
					else{document.getElementById('s5p1Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s5p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#s5p2Score').text() != s5p2Score){
				TweenMax.to('#s5p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#s5p2Score').html(s5p2Score);
					if(s5p2Score == 3){document.getElementById('s5p2Score').style.backgroundColor = 'green';}
					else{document.getElementById('s5p2Score').style.backgroundColor = 'transparent';}
					TweenMax.to('#s5p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			/*if($('#p1Region').attr('src') != '../imgs/regions/'+p1Region+".png"){ //just fade out, update image, fade back in
				TweenMax.to('#p1Region',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p1Region').attr('src', '../imgs/regions/'+p1Region+".png");
					TweenMax.to('#p1Region',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			if($('#p2Region').attr('src') != '../imgs/regions/'+p2Region+".png"){ //just fade out, update image, fade back in
				TweenMax.to('#p2Region',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Region').attr('src', '../imgs/regions/'+p2Region+".png");
					TweenMax.to('#p2Region',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}

			if($('#p1Score').text() != p1Score){ //same as round, no postioning changes just fade out, update text, fade back in
				TweenMax.to('#p1Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p1Score').html(p1Score);
					
					TweenMax.to('#p1Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
			
			if($('#p2Score').text() != p2Score){
				TweenMax.to('#p2Score',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Score').html(p2Score);
					
					TweenMax.to('#p2Score',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}*/
			
		}
		
	}
	
}