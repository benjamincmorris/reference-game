// Simple study demonstrating the use of a tablet-designed webpage. 
// Study is designed using simple JS/HTML/CSS, with data saves to a server
// controlled by call to a short php script. 

// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------

var numTrials = 28;

//amount of white space between trials
var normalpause = 1500;

//pause after picture chosen, to display red border around picture selected
var timeafterClick = 1000;

//length of filler (every time fill2 comes up, add 1sec of time)
var fillerpause = 5000;

//an array of all the novel words used in the study; used for look-up purposes in pic1type, pic2type, and trialtype
var novelWords = ["modi", "dax", "pifo", "dofa", "toma", "fep", "wug", "kreeb", "blicket"];

// imgs for reference game
var imgArray = ["2001-600.jpg", "2002-600.jpg", "2003-600.jpg", 
				"2025-600.jpg", "2005-600.jpg", "2006-600.jpg",
				"2007-600.jpg", "2009-600.jpg", "2023-600.jpg"];
// imgs for reference game
// shuffle this array once and never shuffle again. only used for looking up object label pair. 
// reshuffling directly or by calling a function such as getRandomImages, which uses shuffling, will mess up the object label pairs.
var imgArrayFIXED = ["2001-600.jpg", "2002-600.jpg", "2003-600.jpg", 
					"2025-600.jpg", "2005-600.jpg", "2006-600.jpg",
					"2007-600.jpg", "2009-600.jpg", "2023-600.jpg"];

// imgs for reference game
var attentionArray = ["2001-600.jpg", "2002-600.jpg", "2003-600.jpg", "2004-600.jpg", "2005-600.jpg", 
					"2006-600.jpg", "2007-600.jpg", "2009-600.jpg", "2010-600.jpg", "2011-600.jpg",
					"2012-600.jpg", "2013-600.jpg", "2014-600.jpg", "2015-600.jpg", "2027-600.jpg", 
					"2017-600.jpg", "2018-600.jpg", "2019-600.jpg", "2028-600.jpg", "2021-600.jpg", 
					"2022-600.jpg", "2023-600.jpg", "2024-600.jpg", "2025-600.jpg", "2026-600.jpg"];

var basePath = "tabletobjects/";

// ---------------- HELPER ------------------

// function to display nine random object images in a grid (uses bootstrap)
function getRandomImages(imgAr, path, gameOrAttention, count) {
    shuffle(imgAr);
    var imgSet = [];
    classes = " col-xs-2 ";
    offset= " col-xs-offset-3 ";
    idTag= ' "instObject" '
    if (gameOrAttention=="game") {
    	classes = " col-xs-3 toSelect ";
    	offset = " col-xs-offset-2 ";
    	//need to flexibily add imgObject ID because this is how we must set the hover style from the css
    	// adding here prevents hover funciton from appearing on the initial instructions slide array though. 
    	idTag= " imgObject ";
    	// var target = randomIntFromInterval(0,8);
    }
    if (gameOrAttention=="Attention") {classes=" col-xs-2 toSelect "; offset= " col-xs-offset-1 "; idTag= " imgObject ";}
    for (var i=0; i < imgAr.length; ++i) {
    	//if were not building the array for the attention check, proceed here for a 3x3 display
    	if (gameOrAttention!="Attention") {
    		if (i==0 || i==3 || i==6) {
    		// if (target==i) {
    		// 	imgSet[target] = '<img class="' + classes + offset + '" id="imgTarget" src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		// } else {
    			imgSet[i] = '<img class=" ' + classes + offset + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		// }
    		} else {
    		// if (target==i) {
    		// 	imgSet[target] = '<a> <img class="' + classes + '" id="imgTarget" src="' + path + imgAr[target] + '" alt = "'+imgAr[i]+'"> </a>';
    		// } else {
    			imgSet[i] = '<img class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		}
    	// if we are building the 5x5 array for the attention check slide, the images with offsets are different
    	} else {
    		if (i==0 || i==5 || i==10 || i==15 || i==20) {
    			imgSet[i] = '<img class=" ' + classes + offset + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		} else {
    			imgSet[i] = '<img class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		}
    	}
    }
    // var imgStr2 = '<img class="col-xs-2 col-sm-2 col-md-2" src="' + path + imgAr[1] + '" alt = "">';
    // var imgStr3 = '<img class="col-xs-2 col-sm-2 col-md-2" src="' + path + imgAr[2] + '" alt = "">';
    // var imgStr4 = '<img class="col-xs-2 col-sm-2 col-md-2 col-xs-offset-3" src="' + path + imgAr[3] + '" alt = "">';
    // var imgStr5 = '<img class="col-xs-2 col-sm-2 col-md-2" src="' + path + imgAr[4] + '" alt = "">';
    // var imgStr6 = '<img class="col-xs-2 col-sm-2 col-md-2" src="' + path + imgAr[5] + '" alt = "">';
    // var imgStr7 = '<img class="col-xs-2 col-sm-2 col-md-2 col-xs-offset-3" src="' + path + imgAr[6] + '" alt = "">';
    // var imgStr8 = '<img class="col-xs-2 col-sm-2 col-md-2" src="' + path + imgAr[7] + '" alt = "">';
    // var imgStr9 = '<img class="col-xs-2 col-sm-2 col-md-2" src="' + path + imgAr[8] + '" alt = "">';
    output= new Array;
    for (i=0; i<imgSet.length; i++) {
    	output = output + imgSet[i];
    }
    return output;
}

function getOrderedImage(imgAr, path, count) {
	var imgStr = '<img class="col-xs-10 col-md-12" id="orderedImage" src="' + basePath + imgAr[count] + '" alt = "'+imgAr[count]+'">';
	return imgStr;
}

// function that takes array and repeats some elements a certain number of times
// used so that Ps are exposed to some stimuli more than others
function fillArray(value, len) {
  var arr = new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = value;
  }
  return arr;
}

function exposureStimuli(imgAr) {
  shuffle(imgAr);
  arr1 = fillArray(imgAr[0], 9);
  arr2 = fillArray(imgAr[1], 9);
  arr3 = fillArray(imgAr[2], 9);
  arr4 = fillArray(imgAr[3], 6);
  arr5 = fillArray(imgAr[4], 6);
  arr6 = fillArray(imgAr[5], 6);
  arr7 = fillArray(imgAr[6], 3);
  arr8 = fillArray(imgAr[7], 3);
  arr9 = fillArray(imgAr[8], 3);
  exposureImgs = arr1.concat(arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9);
  shuffle(exposureImgs);
  //keep calling this function until weve got an array with no back to back repeats!
  for (i=0; i< exposureImgs.length -1 ; i++) {
  	if (exposureImgs[i] === exposureImgs[i+1]) {
  		exposureStimuli(imgAr);
  	}
  }
  return exposureImgs;  
}

function gameStimuli(imgAr) {
  shuffle(imgAr);
  arr1 = fillArray(imgAr[0], 2);
  arr2 = fillArray(imgAr[1], 2);
  arr3 = fillArray(imgAr[2], 2);
  arr4 = fillArray(imgAr[3], 2);
  arr5 = fillArray(imgAr[4], 2);
  arr6 = fillArray(imgAr[5], 2);
  arr7 = fillArray(imgAr[6], 2);
  arr8 = fillArray(imgAr[7], 2);
  arr9 = fillArray(imgAr[8], 2);
  testImgs = arr1.concat(arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9);
  shuffle(testImgs);
  //test for repreats, if they exist, redo the process
  for (i=0; i< testImgs.length -1 ; i++) {
  	if (testImgs[i] === testImgs[i+1]) {
  		gameStimuli(imgAr);
  	}
  }
  shuffledTestImgs = new Array;
  for (i=0; i < testImgs.length; i++) {
  	shuffledTestImgs[i] = '<img class="col-xs-10 col-md-12" id="gameTargetImage" src="' + basePath + testImgs[i] + '" alt = "'+ testImgs[i] +'">';
  }
  return shuffledTestImgs;
}

function pairObjectLabels(imgName) {
  for (var i = 0; i < imgArrayFIXED.length; i++) {
  	if (imgName===imgArrayFIXED[i]) {
  		return novelWords[i]
  	}
  }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function selectThis() {
}


// show slide function
function showSlide(id) {
  $(".slide").hide(); //jquery - all elements with class of slide - hide
  $("#"+id).show(); //jquery - element with given id - show
}

//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

getCurrentDate = function() {
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	return (month + "/" + day + "/" + year);
}

//currently not called; could be useful for reaction time?
getCurrentTime = function() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (minutes < 10) minutes = "0" + minutes;
	return (hours + ":" + minutes);
}
//-----------------------------------------------

showSlide("instructions");
document.getElementById("objects").innerHTML = getRandomImages(imgArray, basePath, false);
//shuffle name array so participants get random object/label pairings. placed here to ensure it only happens once.
shuffle(imgArrayFIXED);
//also construct an array for game stimuli
// var targets = [];
// for (var i=0; i<imgArray.length; i++) targets.push(i);
 gameArray = gameStimuli(imgArray);

// MAIN EXPERIMENT
var experiment = {

	subid: "",
		//inputed at beginning of experiment
	trialnum: 0,
		//trial number
	order: 1,
		//whether child received list 1 or list 2
	word: "",
		//word that child is queried on
	pic1: "",
		//the name of the picture on the left
	pic2: "",
		//the name of the picture on the right
	pic1type: "",
		//whether the picture on the left is familiar or novel 
	pic2type: "",
		//whether the picture on the right is familiar or novel
	side: "",
		//whether the child picked the left (L) or the right (R) picture
	chosenpic: "",
		//the name of the picture the child picked
	response: "",
		//whether the response was the correct response (Y) or the incorrect response (N)
	trialtype: "",
		//whether the trial was a word recognition (rec) or mutual exclusivity (me) trial;
		// control (MEcontrol) or experimental (MEexperimental)
	date: getCurrentDate(),
		//the date of the experiment
	timestamp: getCurrentTime(),
		//the time that the trial was completed at 
	reactiontime: 0,
	//TODO : add reaction time variable ***** 
	

	//Checks to see whether the experimenter inputted appropriate values before moving on with the experiment
	begin: function() {
		document.body.style.background = "white";
		experiment.exposure();
	},

	exposure: function() {
		showSlide("exposure");
		$("#clickme").hide();
		$("#beginGame").hide();
		var index=0;
		exposureArray = exposureStimuli(imgArray);
		var exposureTrial = document.createElement("img");
		exposureTrial.src = "tabletobjects/" + exposureArray[index];
		exposureTrial.style.height = '400px';
		document.getElementById('content').appendChild(exposureTrial);
		var firstlabel = document.createTextNode(pairObjectLabels(exposureArray[index]));
		document.getElementById('label').appendChild(firstlabel);
		document.getElementById("clickme").innerHTML = "Next";
		setTimeout(function() {$("#clickme").fadeIn()}, 1250);
		document.getElementById("clickme").onclick = function() {experiment.exposures(0)};
	},

	exposures: function(index) {
		$("#clickme").hide();
		var $img = $("img"), speed = 200;
		i= index + 1;
		ar = exposureArray;
		lastExposure = ar.length;
		if (i < lastExposure) {
		  	newPic= ar[i];
			$img.attr("src", "tabletobjects/" + newPic);
			document.getElementById('label').removeChild(
				document.getElementById('label').lastChild);
			var newLabel = document.createTextNode(pairObjectLabels(newPic));
			document.getElementById('label').appendChild(newLabel);
			$("#content").fadeIn(speed);
			$("#label").fadeIn(speed);
			setTimeout(function() {$("#clickme").fadeIn()}, 1250);
			document.getElementById("clickme").onclick = function() {experiment.exposures(i)};
		} else if (i >= lastExposure) {
			experiment.pretest();
	}},

	pretest: function() {
		showSlide('pretest');
		shuffle(imgArray);
		setTimeout(function() {$("#beginTest").fadeIn()}, 2000);
		document.getElementById("beginTest").innerHTML = "Begin Test";
		document.getElementById("beginTest").onclick = function() {experiment.test(0)};
	},

	test: function(testNumber) {
		showSlide('test');
		document.getElementById('testInput').value = '';
		document.getElementById('testInput').disabled=false;
		document.getElementById('notSure').disabled=false;
		document.getElementById('notSure').checked=false;
		document.getElementById('nextObject').disabled=true;
		lastExposure= imgArray.length;
		ar = imgArray;
		notKnown=0;
		var blah = document.getElementById('testInput').value.toLowerCase().trim();
		//disable default enter key behavior for the textbox
		$(document).ready(function() {
		  $(window).keydown(function(event){
		    if(event.keyCode == 13) {
		      event.preventDefault();
		      return false;
		    }
		  });
		});
		if (testNumber < lastExposure) {
			document.getElementById("testInput").onkeyup = function() {
				if (document.getElementById("testInput").value =="") {
					document.getElementById('notSure').disabled = false;
					document.getElementById('nextObject').disabled=true;
				} else {
					document.getElementById('notSure').disabled = true;
					document.getElementById('nextObject').disabled=false;				
				}
			};
			document.getElementById('notSure').onchange = function() {
				if(document.getElementById('notSure').checked) {
					document.getElementById('testInput').disabled=true;
					document.getElementById('nextObject').disabled=false;
					notKnown=1;
				} else {
					document.getElementById('testInput').disabled=false;
					document.getElementById('nextObject').disabled=true;
					notKnown=0;
				}
			}
			document.getElementById("testObject").innerHTML = getOrderedImage(imgArray, basePath, testNumber);
			// if (blah != '') {
			// 	document.getElementById("nextObject").disabled = true;
			// }
			document.getElementById("nextObject").onclick = function() {
				var blah = document.getElementById('testInput').value.toLowerCase().trim();
				if (blah != '') {
					// if user enters the appropriate label, give them all 10 points.
					if(blah == pairObjectLabels(document.getElementById('orderedImage').alt)) {
						var testCorrect=1;
					} else {
						var testCorrect=0;
					}
				}
				experiment.test(testNumber+1);
			};
		} if (testNumber >= lastExposure) {
			experiment.prestudy();
		};
	},

	prestudy: function() {
		showSlide("prestudy");
			// document.getElementById("clickme").removeAttribute("onclick");
			setTimeout(function() {$("#beginGame").fadeIn()}, 2000);
			document.getElementById("beginGame").innerHTML = "Begin Game";
			var myPoints = document.createTextNode(0);
				document.getElementById('myScore').appendChild(myPoints);
			document.getElementById("beginGame").onclick = function() {experiment.game(0, 0)};
		// button.onclick("click", Functionsion() {experiment.exposures(i)});
		// $("#clickme").on("click", function() {experiment.exposures(i)});
	},


	game: function(score, roundNumber) {
		showSlide("referenceGame");
		$("#sendMessage").show();
		$("#waitingForPartner").hide();
		$("#spinningWaiting").hide();
		$("#messageFromPartner").hide();
		$("#nextRound").hide();
		document.getElementById('labelInput').value = '';
		document.getElementById("sendMessage").disabled = true;
		document.getElementById("gameTarget").innerHTML = gameArray[roundNumber];
		var target = pairObjectLabels(document.getElementById("gameTargetImage").alt);
		var message = 0; // no message
		document.getElementById("objects2").innerHTML = getRandomImages(imgArray, basePath, "game", roundNumber);
		//prevent enter key from default submission when typing
		$(document).ready(function() {
		  $(window).keydown(function(event){
		    if(event.keyCode == 13) {
		      event.preventDefault();
		      return false;
		    }
		  });
		});
		document.getElementById("labelInput").disabled = false;
		document.getElementById("labelInput").onkeyup = function() {
			if (document.getElementById("labelInput").value =="") {
				document.getElementById("sendMessage").disabled = true;
			} else {
				document.getElementById("sendMessage").disabled = false;
			}
		};
		$('.toSelect').click(function() {
			var blah = document.getElementById('labelInput').value.toLowerCase().trim();
			if (blah != '') {return}
				//if the target has already been clicked on, assume they are 'unclicking' and revert..
				if (message==1) {
					if (this.style.border!="5px solid black") {return}
					this.style.border="";
					// renable ability to type label
					document.getElementById("labelInput").disabled = false;
					document.getElementById("sendMessage").disabled = true;
					message=0;
					return;
				}
				//if neither pointing nor typing has occured, select the target element and note that.
				if (message==0) {
					this.style.border="5px solid black";
					// disable textbox to prevent clicking and typing in same trial
					document.getElementById("labelInput").disabled = true;
					document.getElementById("sendMessage").disabled = false;
					selection = pairObjectLabels(this.alt);
					message = 1; // change message value to 1 if clicked. 
					return;
				}
		});
		document.getElementById("sendMessage").onclick = function() {
			//disable input/clicking options after message sent
			document.getElementById("labelInput").disabled = true;
			$('.toSelect').click(function() {return false;});
			//final check of what, if anything, was typed in the textbox to determine score. 
			var blah = document.getElementById('labelInput').value.toLowerCase().trim();
			if (blah != '') {
				// if user enters the appropriate label, give them all 10 points.
				if(blah == target) {
					message=2;
				} if (blah != target) {
					message=3;
				}
			}
			if (blah == '') {
				if(selection != target) {message = 3}
			}
			if(message==0) {return}
			if(message==1) {$("#sendMessage").hide(); 
								document.getElementById("messageFromPartner").innerHTML = "Nice work- your partner figured it out!";
								experiment.gameWaiting(score + 3,roundNumber+1)}
			if(message==2) {$("#sendMessage").hide(); 
								document.getElementById("messageFromPartner").innerHTML = "Nice work- your partner figured it out!";
								experiment.gameWaiting(score + 10,roundNumber+1)}
			// label or sellection is incorrect is case message = 3
			if(message==3) {$("#sendMessage").hide(); 
								document.getElementById("messageFromPartner").innerHTML = "Uh oh- looks like your partner chose the wrong object!";
								experiment.gameWaiting(score,roundNumber+1)}
		};	
	},

	gameWaiting: function(score, count) {
		$("#waitingForPartner").show();
		$("#spinningWaiting").show();
		waitTime = randomIntFromInterval(1000,4000);
		setTimeout(function() {$("#waitingForPartner").hide(); $("#spinningWaiting").hide()}, waitTime-250);
		setTimeout(function() {$("#nextRound").show();
			$("#messageFromPartner").show();
			document.getElementById('myScore').removeChild(document.getElementById('myScore').lastChild);
			var newPoints = document.createTextNode(score);
			document.getElementById('myScore').appendChild(newPoints);
			}, waitTime);
		numOfGames = gameArray.length; 
		if (count < numOfGames) {
			document.getElementById("nextRound").onclick = function() {experiment.game(score,count)};
		} else {document.getElementById("nextRound").onclick = function() {experiment.attentionCheck()}}
		// setTimeout(experiment.game(score, count), 5000);
	},

	attentionCheck: function() {
		showSlide('attentionSlide');
		clicked=0;
		document.getElementById("objects3").innerHTML = getRandomImages(attentionArray, basePath, "Attention");
		$('.toSelect').click(function() {
				//if the target has already been clicked on, assume they are 'unclicking' and revert..
				if (this.style.border=="5px solid black") {
					this.style.border="";
					clicked=0;
					return;
				}
				else {
					this.style.border= '5px solid black';
					selection = pairObjectLabels(this.alt);
					clicked = 1; // change message value to 1 if clicked. 
					return;
				}
		});
	},

	//the end of the experiment, where the background becomes completely black
    end: function () {
    	setTimeout(function () {
    		$("#stage").fadeOut();
    	}, normalpause);
    	showSlide("finish");
    	document.body.style.background = "black";
    },

	//concatenates all experimental variables into a string which represents one "row" of data in the eventual csv, to live in the server
	processOneRow: function() {
		var dataforRound = experiment.subid; 
		dataforRound += "," + experiment.order + "," + experiment.trialnum + "," + experiment.word;
		dataforRound += "," + experiment.pic1 + "," + experiment.pic2 + "," + experiment.pic1type + "," + experiment.pic2type;
		dataforRound += "," + experiment.side + "," + experiment.chosenpic + "," + experiment.response + "," + experiment.trialtype;
		dataforRound += "," + experiment.date + "," + experiment.timestamp + "," + experiment.reactiontime + "\n";
		// $.post("http:.....php", {postresult_string : dataforRound});	
	},
}

//for  testing and debugging, jump to a part of the experiment directly with (the relevant version of) this line
// experiment.prestudy();




