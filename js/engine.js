window.onload = init;
var xhr = new XMLHttpRequest();
var gameData;


const processJson = () =>{
	if(xhr.readyState === 4){
		let scObj = JSON.parse(xhr.responseText);
		//If somethings actually changed (timestamp included)
		if(scObj != gameData) {
			gameData = scObj;
			doStuffWithData();
		}
	}
}

const checkAndUpdateField = (fieldName) => {
	let tweeningField = $(`#${fieldName}`).parent();

	//Check if we need to update, then do so.
	if(gameData[fieldName]  && $(`#${fieldName}`).length && $(`#${fieldName}`).text() != gameData[fieldName] ) { 
		//Fade out
		TweenMax.to(
			tweeningField,
			.3,
			{css:{ opacity: 0}
			,ease:Quad.easeOut,
			delay:0,
			onComplete:function(){ 

				//Update text
				$(`#${fieldName}`).html(gameData[fieldName]);
			
			//Fade in
			TweenMax.to(
				tweeningField,
				.3,
				{css:{opacity: 1},
				ease:Quad.easeOut,
				delay:.2});
			}
		});
	}
}

const doStuffWithData = () => {
	//List of all fields to check and update
	//Should be the name in the xml/json and the field id in html
	const fieldsToUpdate = ['p1Name', 'p2Name', 'round', 'p1Score', 'p2Score', 'comm1', 'comm2'];

	fieldsToUpdate.forEach(field => {
		checkAndUpdateField(field);
	});
}

function init(){
	//Start function, kicks off the json call loop
	const streamJSON = '../sc/streamcontrol.json';
	const resetTime = 2000;
	let cBust = 0;
	
	xhr.overrideMimeType('application/json');
	
	function pollJSON(){
		xhr.open('GET',streamJSON+'?v='+cBust,true);
		xhr.send();
		cBust++;
	}
	
	pollJSON();
	setInterval(function(){pollJSON();},resetTime);
	
	xhr.onreadystatechange = processJson;	
}