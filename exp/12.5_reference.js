// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------
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

// imgs for attention check, targets and distractors
var attentionArray = ["2001-600.jpg", "2002-600.jpg", "2003-600.jpg", "2004-600.jpg", "2005-600.jpg", 
					"2006-600.jpg", "2007-600.jpg", "2009-600.jpg", "2010-600.jpg", "2011-600.jpg",
					"2012-600.jpg", "2013-600.jpg", "2014-600.jpg", "2015-600.jpg", "2027-600.jpg", 
					"2017-600.jpg", "2018-600.jpg", "2019-600.jpg", "2028-600.jpg", "2021-600.jpg", 
					"2022-600.jpg", "2023-600.jpg", "2024-600.jpg", "2025-600.jpg", "2026-600.jpg"];

var basePath = "tabletobjects/";

var trueLabelPoints= 100; 

var trueClickPoints = 30;

var trueChargeForClick = 70;

var trueCorrectPoints = 100;

// ---------------- HELPER ------------------

// function to display nine random object images in a grid (uses bootstrap)
function getRandomImages(imgAr, path, gameOrAttention, count) {
    shuffle(imgAr);
    var imgSet = [];
    classes = " col-xs-4 col-lg-3 ";
    offset= " col-xs-offset-0 col-lg-offset-2 ";
    idTag= ' "instObject" '
    if (gameOrAttention=="game") {
    	classes = " col-xs-3 col-lg-2 toSelect ";
    	offset = " col-xs-offset-2 col-lg-offset-3 ";
    	//need to flexibily add imgObject ID because this is how we must set the hover style from the css
    	// adding here prevents hover funciton from appearing on the initial instructions slide array though. 
    	idTag= " imgObject ";
    }
    if (gameOrAttention=="Attention") {classes=" col-xs-2 toSelect "; offset= " col-xs-offset-1 "; idTag= " imgObject ";}
    for (var i=0; i < imgAr.length; ++i) {
    	//if were not building the array for the attention check, proceed here for a 3x3 display
    	if (gameOrAttention!="Attention") {
    		if (i==0 || i==3 || i==6) {
    			imgSet[i] = '<img style="max-width:200px" class=" ' + classes + offset + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		} else {
    			imgSet[i] = '<img style="max-width:200px" class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		}
    	// if we are building the 5x5 array for the attention check slide, the images with offsets are different
    	} else {
    		if (i==0 || i==5 || i==10 || i==15 || i==20) {
    			imgSet[i] = '</div> <div class="row"> <img style="max-width:150px" class=" ' + classes + offset + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		} else {
    			imgSet[i] = '<img style="max-width:150px" class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		}
    	}
    }
    output= new Array;
    for (i=0; i<imgSet.length; i++) {
    	output = output + imgSet[i];
    }
    return output;
}

function getOrderedImage(imgAr, path, count) {
	var imgStr = '<img class="col-xs-10 " style="max-width:600px" id="orderedImage" src="' + basePath + imgAr[count] + '" alt = "'+imgAr[count]+'">';
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

// shifted to 1, 2, 4
// need to output which object gets which level of exposure?
function exposureStimuli(imgAr) {
  shuffle(imgAr);
  // set to constants
  var exposureRate = [1, 2, 4]
	  arr1 = fillArray(imgAr[0], exposureRate[0]);
	  arr2 = fillArray(imgAr[1], exposureRate[0]);
	  arr3 = fillArray(imgAr[2], exposureRate[0]);
	  arr4 = fillArray(imgAr[3], exposureRate[1]);
	  arr5 = fillArray(imgAr[4], exposureRate[1]);
	  arr6 = fillArray(imgAr[5], exposureRate[1]);
	  arr7 = fillArray(imgAr[6], exposureRate[2]);
	  arr8 = fillArray(imgAr[7], exposureRate[2]);
	  arr9 = fillArray(imgAr[8], exposureRate[2]);
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

//function that takes and image and looks up how many times it appears in a given array
function getOccurences(img, imgAr) {
	var count = 0;
    for (var i = 0; i < imgAr.length; i++) {
        if (imgAr[i] === img) {
            count++;
        }
    }
    return count;
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
  	shuffledTestImgs[i] = '<img class="col-xs-6 col-md-7 col-lg-5 col-xs-offset-4 col-lg-offset-5" id="gameTargetImage" src="' + basePath + testImgs[i] + '" alt = "'+ testImgs[i] +'">';
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

function preload(imgAr, index) {
        index = index || 0;
        if (imgAr && imgAr.length > index) {
            var img = new Image ();
            img.onload = function() {
                preload(imgAr, index + 1);
            }
            img.src = 'tabletobjects/' + imgAr[index];
}
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
preload(imgArray);
preload(attentionArray);
gameArray = gameStimuli(imgArray);

//get full number of 'slides' to increment progress bar
var totalSlides = 1 + 1 + exposureStimuli(imgArray).length + 1 + imgArray.length + 1 + 1 + gameArray.length + 1 + 1;
// 1 slide values refer to the irb slide, instructions slide, pretest slide,  pregame slide, gameCheck slide, and attention check, respectively. 
// plus a final 1 so that the final slide is not quite 100%

showSlide("welcome");
	if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {document.getElementById("welcomeStart").disabled=true}
	else {document.getElementById("welcomeStart").onclick = function() {experiment.instructions(2)}
};
var progressBars = document.getElementsByClassName('progress-bar');
for(var i = 0; i<progressBars.length; i++) {
	progressBars[i].style.width = String(1*100/totalSlides) + "%" ;
}
document.getElementById("objects").innerHTML = getRandomImages(imgArray, basePath, false);
//shuffle name array so participants get random object/label pairings. placed here to ensure it only happens once.
shuffle(imgArrayFIXED);


// MAIN EXPERIMENT
var experiment = {
	//global variables?
	// subID: workerIda,
	date: getCurrentDate(), //the date of the experiment
	// arrays to store the data we are collecting for each trial
	testTrials: [],
	ruleQuestions: [],
	gameTrials: [],
	attnCheck: [],

	instructions: function(slideNumber) {
		showSlide("instructions");
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		document.getElementById("beforeStudy").onclick = function() {experiment.exposure(slideNumber+1)};
	},

	//transition from instruction slide to the exposure phase
	exposure: function(slideNumber) {
		showSlide("exposure");
		$("#clickme").hide();
		$("#beginGame").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
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
		document.getElementById("clickme").onclick = function() {experiment.exposures(0, slideNumber+1)};
	},

	exposures: function(index, slideNumber) {
		$("#clickme").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
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
			document.getElementById("clickme").onclick = function() {experiment.exposures(i, slideNumber+1)};
		} else if (i >= lastExposure) {
			experiment.pretest(slideNumber);
	}},

	pretest: function(slideNumber) {
		showSlide('pretest');
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		shuffle(imgArray);
		setTimeout(function() {$("#beginTest").fadeIn()}, 2000);
		document.getElementById("beginTest").innerHTML = "Begin Test";
		document.getElementById("beginTest").onclick = function() {experiment.test(0, slideNumber+1)};
	},

	test: function(testNumber, slideNumber) {
		showSlide('test');
		document.getElementById('progressBar').style.width= String(31 + testNumber * .5) + "%" ;
		document.getElementById('testInput').value = '';
		document.getElementById('testInput').disabled=false;
		document.getElementById('notSure').disabled=false;
		document.getElementById('notSure').checked=false;
		document.getElementById('nextObject').disabled=true;
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
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
				if(document.getElementById('notSure').checked) {blah = "UNKNOWN"; testCorrect=0}
				//pass trial data for eventual output
				testTrials= {
					phase : "test",
					trialnum : slideNumber,
					targetObjectName : document.getElementById('orderedImage').alt,
					exposureRate : getOccurences(document.getElementById('orderedImage').alt, exposureArray),
					realLabel : pairObjectLabels(document.getElementById('orderedImage').alt),
					typedLabel: blah,
						//label entered by particpant, null if no label entered or if (test trial) participant selected don't know
					responseCorrect: testCorrect,
						//whether the response matched target, either as click or typed message. 
					timestamp: getCurrentTime(), //the time that the trial was completed at 
				};
				experiment.testTrials.push(testTrials);
				//move on to next test trial!
				experiment.test(testNumber+1, slideNumber+1);
			};
		} if (testNumber >= lastExposure) {
			experiment.prestudy(slideNumber);
		};
	},

	prestudy: function(slideNumber) {
		showSlide("prestudy");
		$("#typingExample").hide();
		$("#exampleTarget").hide();
		$("#gameReady").hide();
		document.getElementById('ifTypePoints').innerHTML ="You will get all <strong> " + trueLabelPoints + " points</strong>."
		document.getElementById('ifRight').innerHTML ="If your partner gets it right, you get " + trueCorrectPoints + " points."
			// document.getElementById("clickme").removeAttribute("onclick");
			for(var i = 0; i<progressBars.length; i++) {
				progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
			}
			document.getElementById("beginGame").innerHTML = "Check My Answers";
			var myPoints = document.createTextNode(0);
				document.getElementById('myScore').appendChild(myPoints);
		// series of timing events to walk through examples that illustrate the game rules
		//typing example, right message
		setTimeout(function() {$("#clickText").fadeOut(500)}, 5500)
		setTimeout(function() {$("#exampleTarget").fadeIn(500)}, 6000)
		setTimeout(function() {$("#ifRight").hide(); $("#typingExample").fadeIn(500)}, 12000)
		setTimeout(function() {document.getElementById("ifTyping").value="s"}, 12500)
		setTimeout(function() {document.getElementById("ifTyping").value="sh"}, 12700)
		setTimeout(function() {document.getElementById("ifTyping").value="sho"}, 12900)
		setTimeout(function() {document.getElementById("ifTyping").value="shoe"}, 13100)
		setTimeout(function() {$("#typingExample").fadeOut(500)}, 16000); 
		//typing exmaple, wrong messsage
		setTimeout(function() {$("#typingExample").fadeIn(500);
				document.getElementById("ifTyping").value=""; 
				document.getElementById("ifType").innerHTML="But if your partner gets it wrong based on your message...";
				document.getElementById("ifTypePoints").innerHTML="You won't get any points."}, 17000)
		setTimeout(function() {document.getElementById("ifTyping").value="c"}, 17500)
		setTimeout(function() {document.getElementById("ifTyping").value="ch"}, 17700)
		setTimeout(function() {document.getElementById("ifTyping").value="cha"}, 17900)
		setTimeout(function() {document.getElementById("ifTyping").value="chai"}, 18100)
		setTimeout(function() {document.getElementById("ifTyping").value="chair";
								document.getElementById("clickText").innerHTML="If you click on the object here..."}, 18300)
		///clicking example
		setTimeout(function() {$("#typingExample").fadeOut(500)}, 22000)
		setTimeout(function() {$("#clickText").fadeIn(500)}, 22500)
		setTimeout(function() {document.getElementById("shoeTarget").style.border= "3px black solid"}, 24000)
		setTimeout(function() {document.getElementById("ifClick").innerHTML="You will be charged "+ trueChargeForClick +" points, so you will end up with <strong> "+trueClickPoints+" points </strong> when your partner gets it right."}, 25500)
		setTimeout(function() {$("#gameReady").fadeIn(500)}, 28000)
		//switch to the slide of questions about the game rules
		document.getElementById("gameReady").onclick = function() {
				for(var i = 0; i<progressBars.length; i++) {
					progressBars[i].style.width = String((slideNumber+1)*100/totalSlides) + "%" ;
				};
				showSlide("gameCheck");
				$("#beginGame").fadeIn();
				// this functions checks all the inputs, and when they have content, enables the button
				(function() {
				    $('.gameQuestion').change(function() {
				        var empty = false;
				        
				        $('.gameQuestion').each(function() {
				            if ($(this).val() == '') {
				                empty = true;
				            }
				        });				      
				        if (empty) {
				            $('#beginGame').attr('disabled', 'disabled');
				        } else {
				            $('#beginGame').removeAttr('disabled');
				        }
				    });
				})()
				
				// a work around for the above method of trying to require inputs
				// document.getElementById("pointsForLabel").disabled=true; 
				// document.getElementById("pointsForWrong").disabled=true; 
				// document.getElementById("pointsForClick").onchange = function() {
				// 	if($(this).value()== '') {document.getElementById("beginGame").disabled=true}
				// 	document.getElementById("pointsForLabel").disabled=false
				// }
				// document.getElementById("pointsForLabel").onchange = function() {
				// 	if(this.value()== '') {document.getElementById("beginGame").disabled=true}
				// 	document.getElementById("pointsForWrong").disabled=false
				// }
				// document.getElementById("pointsForWrong").onchange = function() {
				// 	if(this.value()== '') {document.getElementById("beginGame").disabled=true}
				// 	document.getElementById("beginGame").disabled=false
				// }

				//on submit, evaluate Ps answers
				document.getElementById("beginGame").onclick = function() {
					if (document.getElementById("pointsForClick").value != trueClickPoints) {
						$("#pointsForClick").addClass("incorrect");
						document.getElementById("clickCorrection").innerHTML= "Actually, you will receive <em>" + trueClickPoints + "</em> points for clicking!"
						$("#clickCorrection").fadeIn()
					}
					if (document.getElementById("pointsForLabel").value != trueLabelPoints) {
						$("#pointsForLabel").addClass("incorrect");
						document.getElementById("labelCorrection").innerHTML= "Not quite, you will receive <em>" + trueLabelPoints + "</em> points for using the right label!"
						$("#labelCorrection").fadeIn()
					}
					if (document.getElementById("pointsForWrong").value != 0) {
						$("#pointsForWrong").addClass("incorrect");
						document.getElementById("wrongCorrection").innerHTML= "In fact, you will receive <em>" + 0 + "</em> points if your partner is wrong!"
						$("#wrongCorrection").fadeIn()
					}
					//store P's response data before moving on
					ruleQuestions = {
						phase: "pregameCheck",
						pointsClick : document.getElementById("pointsForClick").value,
						pointsLabel : document.getElementById("pointsForLabel").value,
						pointsWrong : document.getElementById("pointsForWrong").value,
						clickCorrect : document.getElementById("pointsForClick").value == trueClickPoints,
						labelCorrect : document.getElementById("pointsForLabel").value == trueLabelPoints,
						wrongCorrect : document.getElementById("pointsForWrong").value == 0,
						timestamp: getCurrentTime(),
							//the time that the trial was completed at 
					};
					experiment.ruleQuestions.push(ruleQuestions);
					document.getElementById("beginGame").innerHTML = "Begin Game";
					document.getElementById("beginGame").onclick = function() {experiment.game(0, 0, slideNumber+2)};		
				}
		}
		// experiment.game(0, 0, slideNumber+2)
		// button.onclick("click", Functionsion() {experiment.exposures(i)});
		// $("#clickme").on("click", function() {experiment.exposures(i)});
	},


	game: function(score, roundNumber, slideNumber) {
		showSlide("referenceGame");
		$("#sendMessage").show();
		document.getElementById("sendMessage").innerHTML = "Send Message"
		$("#waitingForPartner").hide();
		$("#spinningWaiting").hide();
		$("#messageFromPartner").hide();
		$("#nextRound").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
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
			// if they have erased the text box so it is now empty
			if (document.getElementById("labelInput").value =="") {
				// if they clicked the object, leave that as the message
				if (message==1) {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> "+ trueClickPoints +" Possible Points </em> </strong>"}
				// if they havent clicked an object and now have emptied the text box, revert to no message state and disable stuff
				else {
					document.getElementById("sendMessage").disabled = true;
					document.getElementById("sendMessage").innerHTML="Send Message";
				}
			} else {
				document.getElementById("sendMessage").disabled = false;
				if (message==1) {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>"}
				else {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"}
			}
		};
		$('.toSelect').click(function() {
			var blah = document.getElementById('labelInput').value.toLowerCase().trim();
				//if the target has already been clicked on, assume they are 'unclicking' and revert..
				if (message==1) {
					// if you have selected an object, and are trying to click another object, do nothing.
					if (this.style.border!="5px solid black") {return}
					// otherwise, revert the selection 
					this.style.border="";
					// if there is a label typed out, keep the sendMessage button enabled and change it to 10 possible points
					if (blah != '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"}
					else {
					document.getElementById("sendMessage").disabled = true;
					document.getElementById("sendMessage").innerHTML="Send Message";}
					message=0;
					return;
				}
				//if neither pointing nor typing has occured, select the target element and note that.
				if (message==0) {
					this.style.border="5px solid black";
					document.getElementById("sendMessage").disabled = false;
					document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>";
					selection = pairObjectLabels(this.alt);
					message = 1; // change message value to 1 if clicked. 
						isCorrect = 1; // flag as correct. will be overwritten if incorrect. 
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
				// if the user typed a response AND clicked, set method to 'label_click', but follow directions as if clicked
				if (message==1) {method="label_click";
								if(selection != target) {message = 3; isCorrect = 0};}
				// if they only typed, mark selection as null and flag their method
				else {selection=null;
					method = "label";
					// if user enters the appropriate label, give them all 10 points.
					if(blah == target) {
						message=2;
						isCorrect = 1;
					} if (blah != target) {
						message=3;
						isCorrect = 0;
					}
				}
			}
			// if they havent typed a label...
			if (blah == '') {
				blah = null;
				method = "click";
				if(selection != target) {message = 3; isCorrect = 0};
			}
			if(message==0) {return}

			//store trial data before moving on
			gameTrials = {
				phase : "game",
				trialnum : slideNumber,
				targetObjectName : document.getElementById("gameTargetImage").alt,
				exposureRate : getOccurences(document.getElementById('gameTargetImage').alt, exposureArray),
				realLabel : pairObjectLabels(document.getElementById("gameTargetImage").alt),
				// note special case for label_click method. click will override label to determin if message is correct.
					// typed label will still be recorded, but whether it is wrong or right will not be!
				method: method,
				typedLabel: blah,
					//label entered by particpant, null if no label entered or if (test trial) participant selected don't know
				clickedObject: selection,
					//the object clicked on by the pariticpant during the game, null if typed response was chosen
				responseCorrect: isCorrect,
					//whether the response matched target, either as click or typed message. 
				timestamp: getCurrentTime(),
					//the time that the trial was completed at 
			};
			experiment.gameTrials.push(gameTrials);
			//send message, return 'partner response'
			if(message==1) {$("#sendMessage").hide(); 
								document.getElementById("messageFromPartner").innerHTML = "Nice work- your partner figured it out!";
								experiment.gameWaiting(score + trueClickPoints,roundNumber+1, slideNumber+1)}
			if(message==2) {$("#sendMessage").hide(); 
								document.getElementById("messageFromPartner").innerHTML = "Nice work- your partner figured it out!";
								experiment.gameWaiting(score + trueLabelPoints,roundNumber+1, slideNumber+1)}
			// label or sellection is incorrect is case message = 3
			if(message==3) {$("#sendMessage").hide(); 
								document.getElementById("messageFromPartner").innerHTML = "Uh oh- looks like your partner chose the wrong object!";
								experiment.gameWaiting(score,roundNumber+1, slideNumber+1)}
		};	
	},

	gameWaiting: function(score, count, slideNumber) {
		$("#waitingForPartner").show();
		$("#spinningWaiting").show();
		$('.toSelect').click(function() {return;});
		$('.labelInput').disabled = true;
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
			document.getElementById("nextRound").onclick = function() {experiment.game(score,count, slideNumber)};
		} else {
			document.getElementById("nextRound").onclick = function() {experiment.attentionCheck(slideNumber)}};
		// setTimeout(experiment.game(score, count), 5000);
	},

	attentionCheck: function(slideNumber) {
		showSlide('attentionSlide');
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		clicked=0;
		recognizedItems = new Array;
		document.getElementById("objects3").innerHTML = getRandomImages(attentionArray, basePath, "Attention");
		$('.toSelect').click(function() {
				//if the target has already been clicked on, assume they are 'unclicking' and revert styling..
				if (this.style.border=="5px solid black") {
					this.style.border="";
					clicked=0;
					//but we also need to remove that item from the array being built of selected recognized objects
					if (pairObjectLabels(this.alt) == undefined) {
						var toBeRemoved = recognizedItems.indexOf(this.alt)
					} else {
						var toBeRemoved=recognizedItems.indexOf(pairObjectLabels(this.alt))
					}
					recognizedItems.splice(toBeRemoved, 1);
				}
				else {
					this.style.border= '5px solid black';
					//collect selected object name
					selection = this.alt;
					//mark all as incorrect
					correct = 0;
					//if this object has a label, selecting it is correct, overwrite that flag
					recognizedItems.push(selection);
					clicked = 1; // change message value to 1 if clicked. 
					return;
				}
		});
		document.getElementById("endStudy").onclick = function() {
			//store data for the attention check.
			for (var i = 0; i<recognizedItems.length; i++) {
				if (pairObjectLabels(recognizedItems[i]) != undefined) {
					correct = 1
				} else {correct=0};
				attnCheck= {
					phase: "attnCheck",
					recognizedObject : recognizedItems[i],
					correctRecog : correct
				}
				experiment.attnCheck.push(attnCheck);
			}
			experiment.end()};

	},

	//the end of the experiment, where the background becomes completely black
    end: function () {
    	showSlide("finish");
    	document.body.style.background = "black";
    	turk.submit(experiment);
    },
}

//for  testing and debugging, jump to a part of the experiment directly with (the relevant version of) this line
//breaks progressbar
// experiment.prestudy(3,3,3);




