// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------
//are we yolking or not?
// var yoked = true
var yoked = false
// how many rounds of the game should we play?
repeats = 3;


//an array of all the novel words used in the study; used for look-up purposes in pic1type, pic2type, and trialtype
var novelWords = ["blicket", "kreeb", "wug", "fep", "toma", "dax", "gazzer", "kiv", "manu"];

// imgs for reference game
var imgArray = ["2001-600.jpg", "2002-600.jpg", "2056-600.jpg", 
				"2025-600.jpg", "2005-600.jpg", "2006-600.jpg",
				"2007-600.jpg", "2009-600.jpg", "2023-600.jpg"];

// imgs for reference game
// shuffle this array once and never shuffle again. only used for looking up object label pair. 
// reshuffling directly or by calling a function such as getRandomImages, which uses shuffling, will mess up the object label pairs.
var imgArrayFIXED = ["2001-600.jpg", "2002-600.jpg", "2056-600.jpg", 
					"2025-600.jpg", "2005-600.jpg", "2006-600.jpg",
					"2007-600.jpg", "2009-600.jpg", "2023-600.jpg"];

//imgs for the familiar objects example
var familiarArray = ["pen.jpg", "computer.jpg", "shoe.jpg", 
					"apple.jpg", "plant.jpg", "phone.jpg",
					"key.jpg", "chair.jpg", "newspaper.jpg"];

// imgs for attention check, targets and distractors
var attentionArray = ["2001-600.jpg", "2002-600.jpg", "2005-600.jpg", "2004-600.jpg", "2056-600.jpg", 
					"2006-600.jpg", "2007-600.jpg", "2009-600.jpg", "2010-600.jpg", "2011-600.jpg",
					"2012-600.jpg", "2013-600.jpg", "2014-600.jpg", "2015-600.jpg", "2027-600.jpg", 
					"2017-600.jpg", "2018-600.jpg", "2019-600.jpg", "2028-600.jpg", "2021-600.jpg", 
					"2022-600.jpg", "2023-600.jpg", "2024-600.jpg", "2025-600.jpg", "2026-600.jpg"];

var basePath = "tabletobjects/";

targetArrayFromPartner = ["2002-600.jpg", "2001-600.jpg", "2056-600.jpg", "2005-600.jpg", "2056-600.jpg"]

messagesFromPartner = ["blicket", "mano", "2056-600.jpg", "wug", "2005-600.jpg"];


//default value, to be overwritten during yoking
var subCondition = "100_30";
var trueLabelPoints= 100; 
var trueClickPoints = 30;




// ---------------- HELPER ------------------

// function to display nine random object images in a grid (uses bootstrap)
function getRandomImages(imgAr, path, gameOrAttention, count) {
    shuffle(imgAr);
    var imgSet = [];
    classes = " col-xs-4 ";
    offset= " col-xs-offset-0 ";
    idTag= ' "instObject" '
    if (gameOrAttention=="game") {
    	classes = " col-xs-2 col-lg-2 toSelect ";
    	offset = " col-xs-offset-3 col-lg-offset-3 ";
    	//need to flexibily add imgObject ID because this is how we must set the hover style from the css
    	// adding here prevents hover funciton from appearing on the initial instructions slide array though. 
    	idTag= " imgObject ";
    }
    if (gameOrAttention=="Attention") {classes=" col-xs-2 toSelect "; offset= " col-xs-offset-1 "; idTag= " imgObject ";}
    for (var i=0; i < imgAr.length; ++i) {
    	//if were not building the array for the attention check, proceed here for a 3x3 display
    	if (gameOrAttention!="Attention") {
    		if (i==0 || i==3 || i==6) {
    			imgSet[i] = '</div> <div class="row"><img class=" ' + classes + offset + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		} else {
    			imgSet[i] = '<img class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
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

//function that takes an image and looks up how many times it appears in a given array
function getOccurences(img, imgAr) {
	var count = 0;
    for (var i = 0; i < imgAr.length; i++) {
        if (imgAr[i] === img) {
            count++;
        }
    }
    return count;
}


function gameStimuli(imgAr, notTheImage) {
  shuffle(imgAr);
  var testingImgs = []
  for (var i = 0; i < imgAr.length; i++) {
    // console.log('each one ' + fillArray(imgAr[i], repeats))

    testingImgs = testingImgs.concat(fillArray(imgAr[i], repeats))
    }
  // arr1 = fillArray(imgAr[0], repeats);
  // arr2 = fillArray(imgAr[1], repeats);
  // arr3 = fillArray(imgAr[2], repeats);
  // arr4 = fillArray(imgAr[3], repeats);
  // arr5 = fillArray(imgAr[4], repeats);
  // arr6 = fillArray(imgAr[5], repeats);
  // arr7 = fillArray(imgAr[6], repeats);
  // arr8 = fillArray(imgAr[7], repeats);
  // arr9 = fillArray(imgAr[8], repeats);
  // testImgs = arr1.concat(arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9);
  // console.log('array of arrays ' + testImgs)
  // testImgs = arr0.concat(arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8);
  testImgs = testingImgs.slice()
  shuffle(testImgs);
  //test for repreats, if they exist, redo the process
  for (i=0; i< (testImgs.length - 1); i++) {
  	if (testImgs[i] === testImgs[i+1]) {
        // console.log(i + ' ' + testImgs[i] + " <br> " + testImgs[i+1])
  		gameStimuli(imgAr);
  	}
  }
  if (notTheImage == true) {
    return testImgs;
  } else {
    shuffledTestImgs = new Array;
    for (i=0; i < testImgs.length; i++) {
  	 shuffledTestImgs[i] = '<img class="col-xs-6 col-md-7 col-lg-5 col-xs-offset-4 col-lg-offset-5" id="gameTargetImage" src="' + basePath + testImgs[i] + '" alt = "'+ testImgs[i] +'">';
    }
    return shuffledTestImgs;
  }
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

function preload(imgAr, path, index) {
        index = index || 0;
        if (imgAr && imgAr.length > index) {
            var img = new Image ();
            img.onload = function() {
                preload(imgAr, index + 1);
            }
            img.src = path + imgAr[index];
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


// http://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript
var levDist = function(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}

// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }
matchedGameArray = []
matchedTargetArray = []
matchedExposureArray = []
matchedExposureLabelArray = []


// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "messagesForPartner.csv",
//         dataType: "text",
//         success: function(data) {processData(data,1, matchedGameArray)}
//      });
// });

function getMatchedExposures(allText, subID) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    var subjectRows = ((subID - 1) * 21) + 1

    for (var i=subjectRows; i<(subjectRows+22); i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    for (var i=0; i<21; i++) {
	    var thingOne = lines[i] + '';
	    var cleanedOne = thingOne.split(",");
	    var grabbedObject = cleanedOne[1].replace(/["]+/g, '')
	    var grabbedLabel = cleanedOne[2].replace(/["]+/g, '')
	    matchedExposureArray.push(grabbedObject)
	    matchedExposureLabelArray.push(grabbedLabel)
	}
}

function processData(allText, subID, array, otherArray) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    var subjectRows = ((subID - 1) * 18) + 1

    for (var i=subjectRows; i<(subjectRows+19); i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    for (var i=0; i<18; i++) {
	    var thingOne = lines[i] + '';
	    var cleanedOne = thingOne.split(",");
	    var grabbedWord = cleanedOne[1].replace(/["]+/g, '')
	    var grabbedTarget = cleanedOne[2].replace(/["]+/g, '')
	    array.push(grabbedWord)
	    otherArray.push(grabbedTarget)
	}
}


    // for (var i=1; i<allTextLines.length; i++) {
    // for (var i=(1+(subID*18)); i<(i+18); i++) {


//-----------------------------------------------
// alert(preload(imgArray, 'tabletobjects/', 0));
// preload(attentionArray, 'tabletobjects/');
// preload(familiarArray, 'images/familiar/');

// following code from https://github.com/kemacdonald/Act-Learn/blob/master/expt/expt-code/js/act-learn-yoked.js
/* Call Maker getter to get cond variables
 * Takes number and counts for each condition
 * Returns a condition number 
 */


try { 
    var xmlHttp = null;
    var filename = "receiver_yoked_final_good";
    // var condCounts= "1,0;2,1;3,1"
    // conditions for piloting (need nine 1s)
    // var condCounts = "1,1;2,1;3,1;4,1;5,0;6,1;7,1;8,1;9,0;10,0;11,1;12,1";
    var condCounts = "1,1;2,1;3,1;4,1;5,1;6,1;7,1;8,1;9,1;10,1;11,1;12,1;13,1;14,1;15,1;16,1;17,1;18,1;19,1;20,1;21,1;22,1;23,1;24,1;25,1;26,1;27,1;28,1;29,1;30,1;31,1;32,1;33,1;34,1;35,1;36,1;37,1;38,1;39,1;40,1";
    // var condCounts = "1,1;2,1;3,1;4,1;5,0;6,1;7,1;8,1;9,0;10,0;11,1;12,1;13,0;14,1;15,0;16,1;17,0;18,1;19,1;20,1;21,1;22,1;23,1;24,1;25,1;26,1;27,0;28,1;29,1;30,0;31,1;32,1;33,1;34,1;35,1;36,1;37,1;38,1;39,1;40,1;41,1;42,1;43,1;44,1;45,1;46,1;47,1;48,1;49,1;50,1;51,1;52,1;53,1;54,1;55,1;56,1;57,1;58,1;59,1;60,1";
        // note that the above condCounts are yoked for specific data, so do not include certain partiicpants e.g. 5 whose data was flawed. 
    // var condCounts = "1,1;2,1;3,1;4,1;5,1;6,1;7,1;8,1;9,1;10,1;11,1;12,1;13,1;14,1;15,1;16,1;17,1;18,1;19,1;20,1;21,1;22,1;23,1;24,1;25,1;26,1;27,1;28,1;29,1;30,1;31,1;32,1;33,1;34,1;35,1;36,1;37,1;38,1;39,1;40,1;41,1;42,1;43,1;44,1;45,1;46,1;47,1;48,1;49,1;50,1;51,1;52,1;53,1;54,1;55,1;56,1;57,1;58,1;59,1;60,1";
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
            console.log("checking for fixes, maker_getting...")
            var cond = this.responseText; // For actual experimental runs
            console.log("subjectID returning as " + this.responseText);
            subjectIdentifier = cond;
                //if a buggy and uniformative subjectIdentifier code slips through, force them into 'waiting' state
                console.log('subID is how long?    ' + subjectIdentifier.length + ' character(s).' );
                if (subjectIdentifier != 'waiting' && subjectIdentifier.length > 3) {
                    subjectIdentifier = 'waiting';
                    cond = 'waiting';
                    console.log('setting broken id tag to ' + subjectIdentifier + ' as default... ');
                };
            if (subjectIdentifier == 'waiting') {
                // also, if this happens, yoke_init will make a unique file of the current state to understand /why/
                if (turk.workerId.length > 0) {
                    console.log('limbo-ed and accepted')
                    showSlide("limboAccepted");
                    document.getElementById("disabledAcceptedStart").disabled=true;
                } else {
                    console.log('be stuck')
                    showSlide("limbo");
                    document.getElementById("disabledStart").disabled=true;
                }
            } else {

                do_all_the_setup();
                // experiment.game(0,0,20);

            }
        }
    };
    if (turk.workerId.length > 0) { 
        //if we are on turk, send turker flag to the php
        console.log("time-stamping...")
        xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/yoking_init.php?filename=" + filename + "&conds=" + condCounts + "&turkID=true", true);
    } else {
        //if we are not on turk (or hit not accepted yet), omit this flag
            xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/yoking_init.php?filename=" + filename + "&conds=" + condCounts, true);
            // xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/yoking_init.php?filename=" + filename + "&conds=" + condCounts + "&turkID=true", true);

    }
    xmlHttp.send(null)

} catch (e) {
    var cond = 20;
    var subjectIdentifier = 20;
}





var progressBars = document.getElementsByClassName('progress-bar');
//get full number of 'slides' to increment progress bar
var totalSlides = 1 + 1 + 21 + 1 + imgArray.length + 1 + 1 + repeats*(imgArray.length) + 1 + 1;
    // 1 slide values refer to the irb slide, instructions slide, pretest slide,  pregame slide, gameCheck slide, and attention check, respectively. 
    // plus a final 1 so that the final slide is not quite 100%


function do_all_the_setup() {
    console.log('is set? _ ' + turk.assignmentId + ' _')
    //assign to points conditions, based on subjectIdentifier number
    if(subjectIdentifier > 20) { 
        subCondition = "80_50";
        trueLabelPoints = 80; 
        trueClickPoints = 50;
    }
    slide_number = 1; 

    //shuffle name array so participants get random object/label pairings. placed here to ensure it only happens once.
    shuffle(imgArrayFIXED);

    if (yoked==true) {
        setTimeout(function() {                         
                                $.ajax({
                                    type: "GET",
                                    url: "experiment_files/matchedExposures.csv",
                                    dataType: "text",
                                    success: function(data) {getMatchedExposures(data,subjectIdentifier)}
                                 });
                exposureArray = matchedExposureArray;
                exposureLabelArray = matchedExposureLabelArray
                            $.ajax({
                                type: "GET",
                                url: "experiment_files/matchedGameTrials.csv",
                                dataType: "text",
                                success: function(data) {processData(data,subjectIdentifier, matchedGameArray, matchedTargetArray)}
                             });
                            gameArray = matchedGameArray
                            targetArray = matchedTargetArray
                    }, 1)
    } else {
        // otherwise we will give them the right labels randomly
        exposureArray = exposureStimuli(imgArray)
        exposureLabelArray = []
        for (var i = 0; i < exposureArray.length; i++) {
            exposureLabelArray.push(pairObjectLabels(exposureArray[i]))
        }
        targetArray = gameStimuli(imgArray, true)
        gameArray = [] 
        for (i=0;i<targetArray.length;i++) {
            gameArray[i] = pairObjectLabels(targetArray[i])
        }
    }


    shuffle(familiarArray)
    showSlide("welcome");
        if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {document.getElementById("welcomeStart").disabled=true}
        else {document.getElementById("welcomeStart").onclick = function() {
            experiment.instructions(2)
            };
        };
    for(var i = 0; i<progressBars.length; i++) {
        progressBars[i].style.width = String(1*100/totalSlides) + "%" ;
    }
    document.getElementById("objects").innerHTML = getRandomImages(imgArray, basePath, false);

    
    // console.log("this function is only used for demos, comment out for turk")
    // experiment.game(0,0,31);
}




// MAIN EXPERIMENT
var experiment = {
	//global variables?
	// subID: workerId,
	date: getCurrentDate(), //the date of the experiment
	// arrays to store the data we are collecting for each trial
	expDuration: [],
	testTrials: [],
	ruleQuestions: [],
	gameTrials: [],
	attnCheck: [],

	instructions: function(slideNumber) {
        slide_number = slideNumber;
		showSlide("instructions");
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		document.getElementById("beforeStudy").onclick = function() {
                experiment.exposure(slideNumber+1);
            };
	},

	//transition from instruction slide to the exposure phase
	exposure: function(slideNumber) {
        slide_number = slideNumber;
		time1 = new Date().getTime()
		showSlide("exposure");
		$("#clickme").hide();
		$("#beginGame").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		var index=0;
		var exposureTrial = document.createElement("img");
		exposureTrial.src = "tabletobjects/" + exposureArray[index];
		exposureTrial.style.height = '400px';
		document.getElementById('content').appendChild(exposureTrial);
		var firstlabel = document.createTextNode(exposureLabelArray[index]);
		document.getElementById('label').appendChild(firstlabel);
		document.getElementById("clickme").innerHTML = "Next";
		setTimeout(function() {$("#clickme").fadeIn()}, 1250);
		document.getElementById("clickme").onclick = function() {
			time2 = new Date().getTime()
			//pass trial data for eventual output
			expDuration= {
                subID : subjectIdentifier,
                condition: subCondition,
				phase : "exposure",
				trialnum : slideNumber,
				object: exposureArray[index],
				realLabel: exposureLabelArray[index], 
				exposureRate : getOccurences(exposureArray[index], exposureArray),
				timestamp: getCurrentTime(), //the time that the trial was completed at 
				duration : time2 - time1,
				};
			experiment.expDuration.push(expDuration);
			experiment.exposures(0, slideNumber+1)};
	},

	exposures: function(index, slideNumber) {
        slide_number = slideNumber;
		time1 = new Date().getTime()
		$("#clickme").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		var $img = $("img"), speed = 200;
		i= index + 1;
        // exposureArray = exposureStimuli(imgArray)
		ar = exposureArray;
		lastExposure = ar.length;
		if (i < lastExposure) {
		  	newPic= ar[i];
			document.getElementById('content').removeChild(
				document.getElementById('content').lastChild);
			document.getElementById('label').removeChild(
				document.getElementById('label').lastChild);
			var newLabel = document.createTextNode(exposureLabelArray[i]);
			var newImage = document.createElement("img");
			newImage.src = "tabletobjects/" + newPic;
			newImage.style.height = '400px';
			document.getElementById('content').appendChild(newImage);
			document.getElementById('label').appendChild(newLabel);
			$("#content").fadeIn(speed);
			$("#label").fadeIn(speed);
			setTimeout(function() {$("#clickme").fadeIn()}, 1250);
			document.getElementById("clickme").onclick = function() {
				time2 = new Date().getTime();
				expDuration= {
                    subID : subjectIdentifier,
                    condition: subCondition,
					phase : "exposure",
					trialnum : slideNumber,
					object: newPic,
					realLabel: exposureLabelArray[i],
					exposureRate : getOccurences(newPic, exposureArray),
					timestamp: getCurrentTime(), //the time that the trial was completed at 
					duration : time2 - time1,
					};
				experiment.expDuration.push(expDuration);
				experiment.exposures(i, slideNumber+1)};
		} else if (i >= lastExposure) {
			experiment.pretest(slideNumber);
	}},

	pretest: function(slideNumber) {
        slide_number = slideNumber;
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
        slide_number = slideNumber;
		time1 = new Date().getTime();
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
		// redundant now with added control from next event tag?
		// $(document).ready(function() {
		//   $(window).keydown(function(event){
		//     if(event.keyCode == 13) {
		//       event.preventDefault();
		//       return false;
		//     }
		//   });
		// });
		$("#testInput").bind("keydown", function(event){
		  // Allow controls such as backspace
		  var arr = [8,16,17,20,35,36,37,38,39,40,45,46];

		  // Allow letters
		  for(var i = 65; i <= 90; i++){
		    arr.push(i);
		  }

		  // Prevent default if not in array
		  if(jQuery.inArray(event.which, arr) === -1){
		    event.preventDefault();
		  }
		});
		// prevent user from pasting in illegal characters (non A-Z)
		$("#testInput").bind("input", function(){
		  var regexp = /[^a-zA-Z ]/g;
		  if($(this).val().match(regexp)){
		    $(this).val( $(this).val().replace(regexp,'') );
		  }
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
				candidate='';
				time2 = new Date().getTime();
				var blah = document.getElementById('testInput').value.toLowerCase().trim();
				if (blah != '') {
					// adjusting input for levDist
						for (var i=0; i<novelWords.length; i++){
							inputWord = blah
							thisOne = levDist(inputWord, novelWords[i])
							// if this is the first round, make this word our candidate
							if (i==0) {
								candidate = novelWords[i]
							// otherwise, evaluate new word versus current candidate and update candidate if needed. 
							} else
								// deal with the case where two candidates are as close
								if (thisOne == levDist(inputWord, candidate)) {
									// flip a coin, if heads, update candidate
									if (randomIntFromInterval(0,1)==1) {candidate = novelWords[i]}
								}
								if (thisOne < levDist(inputWord, candidate)) {
									candidate = novelWords[i]
								}
						}
						// final check, upper bound on edit distance. 
						if (levDist(inputWord, candidate)>2) {candidate =""}
					// if user enters the appropriate label, mark answer as correct
					// if(blah == pairObjectLabels(document.getElementById('orderedImage').alt)) {
					// 	var testCorrect=1;
					// } else {
					// 	var testCorrect=0;
					// }
				}
				if(document.getElementById('notSure').checked) {blah = "UNKNOWN"; testCorrect=0}
				//pass trial data for eventual output
				testTrials= {
                    subID : subjectIdentifier,
					phase : "test",
                    condition: subCondition,
					trialnum : slideNumber,
					targetObjectName : document.getElementById('orderedImage').alt,
					exposureRate : getOccurences(document.getElementById('orderedImage').alt, exposureArray),
					// realLabel : pairObjectLabels(document.getElementById('orderedImage').alt),
					typedLabel: blah,
						//label entered by particpant, null if no label entered or if (test trial) participant selected don't know
					adjLabel: candidate,
						// find closest vocab word by levDist and see if that is right
					// responseCorrect: testCorrect,
						//whether the response matched target, either as click or typed message. 
					timestamp: getCurrentTime(), //the time that the trial was completed at 
					duration: time2 - time1,
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
            console.log(subCondition + '  ' + trueLabelPoints)

        slide_number = slideNumber;
		showSlide("prestudy");
		document.getElementById('beginGame').disabled=true;
        $("#wrongCorrection").hide();
		$("#exampleText").show();
		$("#howToPlay").show();
		$("#typingExample").hide();
		$("#clickText").hide()
		$("#exampleTarget").hide();
		$("#clickArray").hide();
		$("#generalInst").hide();
		$("#gameReady").hide();
			// document.getElementById("clickme").removeAttribute("onclick");
			for(var i = 0; i<progressBars.length; i++) {
				progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
			}
			document.getElementById("beginGame").innerHTML = "Check My Answers";
			var myPoints = document.createTextNode(0);
				document.getElementById('myScore').appendChild(myPoints);
		// series of timing events to walk through examples that illustrate the game rules
		document.getElementById("howToPlay").onclick = function() {
			$("#exampleText").hide()
			$("#howToPlay").hide()
			$("#ifClick").hide()
			$("#ifRight").hide()
			//certain things need to be 'reset' that won't affect first viewing, but would affect Ps who get sent back to watch again.
			document.getElementById("shoeTarget").style.border= ""
			document.getElementById("ifTyping").value=""
			$("#exampleTarget").fadeIn(500)
			$("#clickArray").fadeIn(500)
			$("#generalInst").fadeIn(500)
			document.getElementById("clickText").innerHTML=" <br> You will only see the nine objects."
			//typing example, right message
			setTimeout(function() {$("#clickText").fadeIn(500)}, 5000)			
			document.getElementById("ifType").innerHTML="Your partner might send you an object label...";
			document.getElementById('ifTypePoints').innerHTML ="If you get the right object, <br> you will get <strong> " + trueLabelPoints + " points</strong>."
			document.getElementById('ifRight').innerHTML ="Your partner will send you a message. <br> If you figure it out and select the right object, you will earn points."
			setTimeout(function() {$("#ifRight").fadeIn(500)}, 8500)
			setTimeout(function() {$("#clickText").fadeOut(500)
									$("#ifRight").fadeOut(500)}, 14500)
			setTimeout(function() {$("#typingExample").fadeIn(500)}, 15000)
            setTimeout(function() {$("#ifTyping").show()}, 15000)
			setTimeout(function() {document.getElementById("ifTyping").value="s"}, 15500)
			setTimeout(function() {document.getElementById("ifTyping").value="sh"}, 15700)
			setTimeout(function() {document.getElementById("ifTyping").value="sho"}, 15900)
			setTimeout(function() {document.getElementById("ifTyping").value="shoe"}, 16100)
			setTimeout(function() {$("#typingExample").fadeOut(500)}, 20000); 
			//typing exmaple, wrong messsage
			setTimeout(function() {$("#typingExample").fadeIn(500);
					$("#ifTyping").hide(); 
					document.getElementById("ifType").innerHTML="But if you choose an object your partner didn't mean...";
					document.getElementById("ifTypePoints").innerHTML="You will get <strong> 0 points</strong>."}, 20500)
			setTimeout(function() {
									document.getElementById("clickText").innerHTML="<br> Your partner might also send a message by clicking the object..."}, 21500)
			///clicking example
			setTimeout(function() {$("#typingExample").fadeOut(500)}, 25000)
			setTimeout(function() {$("#clickText").fadeIn(500)}, 25500)
			setTimeout(function() {document.getElementById("shoeTarget").style.border= "3px black solid"}, 27000)
			setTimeout(function() {document.getElementById("ifClick").innerHTML="and you will get <strong> "+trueClickPoints+" points</strong> <br> if you get it right."
									$("#ifClick").fadeIn(500)}, 28500)
			setTimeout(function() {$("#gameReady").fadeIn(500)}, 30000)
		}
		//switch to the slide of questions about the game rules
		document.getElementById("gameReady").onclick = function() {
                slide_number = slideNumber + 1;
				for(var i = 0; i<progressBars.length; i++) {
					progressBars[i].style.width = String((slideNumber+1)*100/totalSlides) + "%" ;
				};
                showSlide("gameCheck");
                // $("#prestudy").hide();
				// $("#gameCheck").show();
				document.getElementById('pointsForClick').value=null;
				document.getElementById('pointsForLabel').value=null;
				document.getElementById('pointsForWrong').value=null;
				$("#beginGame").fadeIn();
				// this functions checks all the inputs, and when they have content, enables the button
				(function() {
				    $('.gameQuestion').bind("keyup click change", function() {
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
				//on submit, evaluate Ps answers
				var ruleCheckProblems = 0
				document.getElementById("beginGame").onclick = function() {
					if (document.getElementById("pointsForClick").value != trueClickPoints) {
						ruleCheckProblems += 1;
					}
					if (document.getElementById("pointsForLabel").value != trueLabelPoints) {
						ruleCheckProblems += 1;
					}
					if (document.getElementById("pointsForWrong").value != 0) {
						ruleCheckProblems += 1;
					}
					//store P's response data before moving on
					ruleQuestions = {
                        subID : subjectIdentifier,
						phase: "pregameCheck",
                        condition: subCondition,
						// lots of redundent info here, but saves time during analysis.
						pointsClick : document.getElementById("pointsForClick").value,
						pointsLabel : document.getElementById("pointsForLabel").value,
						pointsWrong : document.getElementById("pointsForWrong").value,
						clickCorrect : document.getElementById("pointsForClick").value == trueClickPoints,
						labelCorrect : document.getElementById("pointsForLabel").value == trueLabelPoints,
						wrongCorrect : document.getElementById("pointsForWrong").value == 0,
						trueClickPoints : trueClickPoints,
						trueLabelPoints : trueLabelPoints,
						timestamp: getCurrentTime(),
							//the time that the trial was completed at 
					};
					experiment.ruleQuestions.push(ruleQuestions);
					//if they got a question wrong, let them know and make them watch example again. 
					if (ruleCheckProblems>0) {	
						document.getElementById("wrongCorrection").innerHTML= "It looks like you missed <em>" + ruleCheckProblems + "</em> of our questions. Let's take a look at that example again!"
						$('#wrongCorrection').show();
						$('#beginGame').hide();
						setTimeout(function() {experiment.prestudy(slideNumber)}, 3500);
					} else {
						$('#beginGame').hide();
						document.getElementById("wrongCorrection").innerHTML= "That's right! Click the button bellow to get started!"
						$('#wrongCorrection').show();
						document.getElementById("beginGame").innerHTML = "Begin Game";
						setTimeout(function() {$('#beginGame').fadeIn(500)}, 1000);
    						document.getElementById("beginGame").onclick = function() {
    						    // $.ajax({
    						    //     type: "GET",
    						    //     url: "experiment_files/matchedGameTrials.csv",
    						    //     dataType: "text",
    						    //     success: function(data) {processData(data,subjectIdentifier, matchedGameArray, matchedTargetArray)}
    						    //  });
    							experiment.game(0, 0, slideNumber+2)
                            };
                         
					}		
				}
		}
		// experiment.game(0, 0, slideNumber+2)
		// button.onclick("click", Functionsion() {experiment.exposures(i)});
		// $("#clickme").on("click", function() {experiment.exposures(i)});
	},


	game: function(score, roundNumber, slideNumber) {
        slide_number = slideNumber;
		time1 = new Date().getTime();

		showSlide("referenceGame");
		$("#objects2").fadeIn(500)
		document.getElementById("myScore").innerHTML = score;
		$("#messageFromPartner").hide()
		$("#sendMessage").show();
		$("#yourPartnerSent").hide();
		$("#partnerMessage").hide();
		document.getElementById("sendMessage").innerHTML = "Next Round";

		$("#waitingForPartner").show();
		$("#spinningWaiting").show();
		$('.toSelect').click(function() {return;});
		$('.labelInput').disabled = true;
		waitTime = randomIntFromInterval(1000,4000);
		setTimeout(function() {$("#waitingForPartner").hide(); 
								$("#spinningWaiting").hide()
								}, waitTime);
		setTimeout(function() {$("#yourPartnerSent").fadeIn(500);
								$("#partnerMessage").fadeIn(500)}, waitTime)
		$("#nextRound").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		var message = 0; // no message
		document.getElementById("objects2").innerHTML = getRandomImages(imgArray, basePath, "game", roundNumber);
		$('.toSelect').click(function() {
				//if neither pointing nor typing has occured, select the target element and note that.
				if (message==0) {
					this.style.border="5px solid black";
					document.getElementById("sendMessage").disabled = false;
					// possible points determined by the type of trial, receiving a click message or label message	
					if (getOccurences(gameArray[roundNumber], imgArray)>0) {
						receivedMessage = 'click';
						typedMessage= '';
						document.getElementById("sendMessage").innerHTML="Select Object for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>";
					} else {
						receivedMessage = 'label';
						typedMessage = gameArray[roundNumber];
						document.getElementById("sendMessage").innerHTML="Select Object for <strong> <em> " +trueLabelPoints+" Possible Points </em> </strong>";
					}
					selection = this.alt;
                    // console.log(pairObjectLabels(selection))
					message = 1; // change message value to 1 if clicked. 
						isCorrect = 1; // flag as correct. will be overwritten if incorrect. 
					return;
				}
				//if the target has already been clicked on, assume they are 'unclicking' and revert..
				if (message==1) {
					// if you have selected an object, and are trying to click another object, do nothing.
					if (this.style.border!="5px solid black") {return}
					// otherwise, revert the selection, check if this is a clicked message situation and make appropriate change 
					if (gameArray[roundNumber] == this.alt) {
						this.style.border= "2px dashed black";
					} else {this.style.border=""}
					// if there is a label typed out, keep the sendMessage button enabled and change it to 10 possible points
					document.getElementById("sendMessage").disabled = true;
					document.getElementById("sendMessage").innerHTML="Next Round";}
					message=0;
					return;
		});
		document.getElementById("sendMessage").disabled = true;
		document.getElementById("partnerMessage").innerHTML = "";
		setTimeout(function() {		
			if (getOccurences(gameArray[roundNumber], imgArray)>0) {
				document.getElementById("yourPartnerSent").innerHTML = "Your partner clicked on this object:";
				$('.toSelect').each(function() {
					if (this.alt == gameArray[roundNumber]) {
						this.style.border= "2px dashed black";
					}
				})
			} else {
				document.getElementById("yourPartnerSent").innerHTML = "Your partner sent this message:";
				document.getElementById("partnerMessage").innerHTML = gameArray[roundNumber];
			}
		}, waitTime);
		document.getElementById("sendMessage").onclick = function() {
			time2 = new Date().getTime();
			$('.toSelect').click(function() {return false;});
			if(selection != targetArray[roundNumber]) {isCorrect = 0};
			if(message==0) {return}

			//store trial data before moving on
			gameTrials = {
                subID : subjectIdentifier,
				phase : "game",
                condition: subCondition,
				trialnum : slideNumber,
				targetObjectName : targetArray[roundNumber],
				receivedMessageType : receivedMessage,
				typedMessage : typedMessage,
				clickedObject: selection,
					//the object clicked on by the pariticpant during the game, null if typed response was chosen
				responseCorrect: isCorrect,
					//whether the response matched target, either as click or typed message. 
				timestamp: getCurrentTime(),
					//the time that the trial was completed at 
				duration: time2 - time1,
			};
			experiment.gameTrials.push(gameTrials);
			//send message, return 'partner response'
			// it went one slide too long?
			numOfGames = gameArray.length - 1; 
			
				if(receivedMessage=='click' & isCorrect==1) {$("#sendMessage").hide(); 
									document.getElementById("messageFromPartner").innerHTML = "Nice work- you chose the right object!";
									$("#messageFromPartner").fadeIn(500);
									document.getElementById("myScore").innerHTML = score + trueClickPoints;
									setTimeout(function() {$("#messageFromPartner").fadeOut(500)
															$("#objects2").fadeOut(500)
															$("#partnerMessage").fadeOut(500)
															$("#yourPartnerSent").fadeOut(500)															
															}, 1500);
									if (roundNumber < numOfGames) {
										setTimeout(function() {experiment.game(score + trueClickPoints,roundNumber+1, slideNumber+1)}, 2000);
									} else {
										setTimeout(function() {experiment.attentionCheck(slideNumber+1)}, 2000);										
									}
				}
				if(receivedMessage=='label' & isCorrect==1) {$("#sendMessage").hide(); 
									document.getElementById("messageFromPartner").innerHTML = "Nice work- you chose the right object!";
									$("#messageFromPartner").fadeIn(500);
									document.getElementById("myScore").innerHTML = score + trueLabelPoints;
									setTimeout(function() {$("#messageFromPartner").fadeOut(500)
															$("#objects2").fadeOut(500)
															$("#partnerMessage").fadeOut(500)
															$("#yourPartnerSent").fadeOut(500)															
															}, 1500);									
									if (roundNumber < numOfGames) {										
										setTimeout(function() {experiment.game(score + trueLabelPoints,roundNumber+1, slideNumber+1)}, 2000);
									} else {
										setTimeout(function() {experiment.attentionCheck(slideNumber+1)}, 2000);										
									}									
				}
				// label or sellection is incorrect is case message = 3
				if(isCorrect==0) {$("#sendMessage").hide(); 
									document.getElementById("messageFromPartner").innerHTML = "Whoops, that's not the one your partner meant!";
									$("#messageFromPartner").fadeIn(500);
									document.getElementById("myScore").innerHTML = score;
									setTimeout(function() {$("#messageFromPartner").fadeOut(500)
															$("#objects2").fadeOut(500)
															$("#partnerMessage").fadeOut(500)
															$("#yourPartnerSent").fadeOut(500)
															}, 1500);
									if (roundNumber < numOfGames) {										
										setTimeout(function() {experiment.game(score,roundNumber+1, slideNumber+1)}, 2000);
									} else {
										setTimeout(function() {experiment.attentionCheck(slideNumber+1)}, 2000);										
									}									
				}
		}	
	},

	attentionCheck: function(slideNumber) {
        slide_number = slideNumber;
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
					var toBeRemoved=recognizedItems.indexOf(this.alt)
					recognizedItems.splice(toBeRemoved, 1);
				}
				else {
					this.style.border= '5px solid black';
					//collect selected object name
					selection = this.alt;
					recognizedItems.push(selection);
					clicked = 1; // change message value to 1 if clicked. 
					return;
				}
		});
		document.getElementById("endStudy").onclick = function() {
            //store data for the attention check.
            for (var i = 0; i<recognizedItems.length; i++) {
                if (getOccurences(recognizedItems[i], imgArray) > 0) {
                    correct = 1
                } else {correct=0};
                attnCheck= {
                    subID : subjectIdentifier,
                    phase: "attnCheck",
                    condition: subCondition,
                    recognizedObject : recognizedItems[i],
                    correctRecog : correct
                }
                experiment.attnCheck.push(attnCheck);
            }

                var xmlHttp = null;
                xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    // Action to be performed when the document is read;
                        console.log('truly decrementing partipcant file')
                            // there is a potential issue where after finishing the experiment, the page is 'unloaded'
                                // so our onbeforeunload script tries to run, which involves incrementing the subject count
                                // changing the subId here should prevent that because the unload script has a max length conditional
                            subjectIdentifier = 'garbage noise so that the on-close script is not run';
                            console.log('overwriting subID before submission (testing for who wins the race)')
                                // need to makes sure that this subID overwrite happens AFTER the decrementer call!!
                                // otherwise paritipcants won't get zeroed out. 
                            experiment.end()
                    }
                };
                xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/_crementer.php?filename=" + filename + "&to_decrement=" + subjectIdentifier, true);
                xmlHttp.send(null)
        };
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
// experiment.attentionCheck(0,0,20);




