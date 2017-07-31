// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------
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

var trueLabelPoints= 100; 
var trueClickPoints = 30;
var doingBothPoints = 30;
var pointsLabelWrong = -0;
var pointsClickWrong = -70;
var pointsBothWrong = -70;


// while we outlawed producing english words, 
//   some participants produced responses like "topleft" so we want to build an array to search for these words
var commonWords = ["top", "bottom", "left", "right", "corner",
          "blue", "red", "green", "pink", "black", "white", "orange", "silver", "yellow", "grey", "gray",
          "thing", "dont", "know"]

var partnersName = "ben"

// ---------------- HELPER ------------------

// function to display nine random object images in a grid (uses bootstrap)
function getRandomImages(imgAr, path, gameOrAttention, count) {
    shuffle(imgAr);
    var imgSet = [];
    classes = " col-xs-4 ";
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
          imgSet[i] = '<img  style="max-width:150px" class=" ' + classes + offset+ '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
        } else {
          imgSet[i] = '<img style="max-width:150px" class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
        }
      // if we are building the 5x5 array for the attention check slide, the images with offsets are different
      } else {
        if (i==0 || i==5 || i==10 || i==15 || i==20) {
          imgSet[i] = '</div></center> <center> <div class="row"> <img style="width:100px" class="toSelect" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
        } else {
         imgSet[i] = '<img  style="width:100px" class="toSelect" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
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

function gameStimuli(imgAr, fixing) {
  if (fixing!=true) {
    shuffle(imgAr);
    numRoundsPerWord = 3;
    gameImgs = []
    for (var i=0; i < imgArray.length; i++) {
      arr1 = fillArray(imgAr[i], numRoundsPerWord)
      gameImgs = gameImgs.concat(arr1)
    }
    shuffle(gameImgs);
  }
  // console.log(gameImgs)

  // test for repreats, if they exist, redo the process
      // go to length - 2, because loop checks i, i+1, i+2 elements
  for (i=0; i< gameImgs.length - 1 ; i++) {
    // if we find two in a row 
  	if (gameImgs[i] === gameImgs[i+1]) {
        gameStimuli(imgAr);
    }

    // old code that iteratively checks the arrays, maybe useful if were doing 4 or 5 copies of each?
   //    // check to make sure we don't have 3 in a row - geeze!
   //    if (gameImgs[i+1] != gameImgs[i+2]) {
   //      // if it is just the two, swap the second with the one following it
   //      tmp =  gameImgs[i+1]
   //      gameImgs[i+1] = gameImgs[i+2]
   //      gameImgs[i+2] = tmp
   //      // and call again without shuffling
   //      gameStimuli(imgAr, true);
   //    // otherwise, we won the lottery and got three in a row so we should just start over
   //    } else {
   //      console.log("starting over")
   //      gameStimuli(imgAr)
   //    }
  	// }
   //  // other lottery case where last three elements are X, Y, Y
   //      // have to check if final two elements match
   //  if (i == gameImgs.length - 3) {
   //    if (gameImgs[i+1] != gameImgs[i+2]) {
   //      // if this really did happen, we should probably just start over again
   //      console.log("starting over (lottery 2)")
   //      gameStimuli(imgAr)
   //    }
   //  }
  }
  shuffledGameImgs = new Array;
  for (i=0; i < gameImgs.length; i++) {
  	shuffledGameImgs[i] = '<img class="col-xs-6 col-md-7 col-lg-5 col-xs-offset-4 col-lg-offset-5" id="gameTargetImage" src="' + basePath + gameImgs[i] + '" alt = "'+ gameImgs[i] +'">';
  }
  return shuffledGameImgs;
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

// only run this funciton once with the exposureArray. 
// other parameter is an array to set the number of words we want the partner to know by exposureRate 
function partnerKnowledge(expAr,  arrNumKnownByExp) {
  var expRate = [4,2,1]
  var numKnownXexp = arrNumKnownByExp.slice(0);
  numWordsKnown = 0
  for (var i =0; i < numKnownXexp.length; i++) {
    // tally the total number of words we want the partner to know to use as a cuttoff
    numWordsKnown = numWordsKnown + numKnownXexp[i]
  }
  var partnersVocab = new Array(numWordsKnown);
  // shuffle the array so we can grab any elements that meet exposure criteria
  shuffle(imgArray)
  count = 0
  for (var i =0; i < imgArray.length; i++) {
    // get the exposure rate for each word
    wordExposure = getOccurences(imgArray[i], exposureArray)
    arrLocation = expRate.indexOf(wordExposure)
    if (numKnownXexp[arrLocation] > 0) {
      // grab the first N words with that epxosure (order is random anyway)
      partnersVocab[count] = pairObjectLabels(imgArray[i])
      // decrement the count for words of that exposure rate
      numKnownXexp[arrLocation] = numKnownXexp[arrLocation] - 1
      count++
    }
  }
  return partnersVocab;
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
  var seconds = currentTime.getSeconds();


	if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
	return (hours + ":" + minutes + ":" + seconds);
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

participantsPer = 40
numofConditions = 6
var buildCondCounts = function() {
  res = ''
  for (var i=1; i<=numofConditions*participantsPer; i++) {
    var str1 = i.toString();
    tmp = str1.concat(",1;")
    res = res.concat(tmp)
  }
  return res
}



//-----------------------------------------------

try { 
	// console.log("want a turk flag here")
	    // if (turk.workerId.length > 0) { 
    var xmlHttp = null;
    var filename = "sender_condition_counts";
    // var condCounts = "1,1;2,1;3,1;4,1;5,1;6,1;7,1;8,1;9,1;10,1;11,1;12,1;13,1;14,1;15,1;16,1;17,1;18,1;19,1;20,1;21,1;22,1;23,1;24,1;25,1;26,1;27,1;28,1;29,1;30,1;31,1;32,1;33,1;34,1;35,1;36,1;37,1;38,1;39,1;40,1;41,1;42,1;43,1;44,1;45,1;46,1;47,1;48,1;49,1;50,1;51,1;52,1;53,1;54,1;55,1;56,1;57,1;58,1;59,1;60,1";
    // var condCounts = "1,1;2,1;3,1;4,1;5,1;6,1;7,1;8,1;9,1;10,1;11,1;12,1;13,1;14,1;15,1;16,1;17,1;18,1;19,1;20,1";
    var condCounts = buildCondCounts()
    // var condCounts = "1,0;2,0"
    // var condCounts= "100_30,30;80_50,30"
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
             subjectIdentifier = this.responseText; // For actual experimental runs
            console.log("subID returning as " + this.responseText);
                //if a buggy and uniformative subjectIdentifier code slips through, force them into 'waiting' state
                console.log('subID is how long?    ' + subjectIdentifier.length + ' character(s).' );

                //if waiting or broken
                if (subjectIdentifier.length>3) {
                  showSlide("limbo")
                  document.getElementById("disabledStart").disabled=true;
                  return;
                } else {
                
                  do_all_the_setup()
                  // for debugging, use line below to jump around the exp
                     // experiment.partnering(0,0,30);
                }

        }
    };
    if (turk.workerId.length > 0) { 
        //if we are on turk, send turker parameter to the php
        console.log("time stamping...")
        // xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/_crementer.php?filename=" + filename + "&to_decrement=" + cond, true);
          xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/yoking_init.php?filename=" + filename + "&conds=" + condCounts + "&turkID=true", true);
    } else {
        //if we are not on turk (or hit not accepted yet), omit this flag
        // xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/condition_assignment_turk.php?filename=" + filename + "&conds=" + condCounts + "&to_decrement=true", true);
        xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/yoking_init.php?filename=" + filename + "&conds=" + condCounts, true);
    }
    xmlHttp.send(null)

} catch (e) {
  // this catch condition needs updating
    var subjectIdentifer = "waiting";
}



var progressBars = document.getElementsByClassName('progress-bar');
  // alert(preload(imgArray, 'tabletobjects/', 0));
  // preload(attentionArray, 'tabletobjects/');
  // preload(familiarArray, 'images/familiar/');
exposureArray = exposureStimuli(imgArray);


shuffle(familiarArray)
gameArray = gameStimuli(imgArray);

  //get full number of 'slides' to increment progress bar
var totalSlides = 1 + 1 + exposureStimuli(imgArray).length + 1 + imgArray.length + 1 + 1 + gameArray.length + 1 + 1;
  // 1 slide values refer to the irb slide, instructions slide, pretest slide,  pregame slide, gameCheck slide, and attention check, respectively. 
  // plus a final 1 so that the final slide is not quite 100%


function do_all_the_setup() {
              // 5.12 subject assignment
                if(subjectIdentifier <= participantsPer*6) {
                    cond = "100_30"
                    partnersExposure = "0"
                  if (subjectIdentifier <= participantsPer*5) {
                    partnersExposure = "1/2"
                  } if (subjectIdentifier <= participantsPer*4) {
                    partnersExposure = "perfect"
                  }
                  if(subjectIdentifier <= participantsPer*3) {
                   cond = "80_50"
                   partnersExposure = "0"
                        trueLabelPoints = 80;
                        trueClickPoints = 50;
                        doingBothPoints = 30;
                        pointsLabelWrong = -20;
                        pointsClickWrong = -50;
                        pointsBothWrong = -70;
                  }
                  if (subjectIdentifier <= participantsPer*2) {
                    partnersExposure = "1/2"
                  } if (subjectIdentifier <= participantsPer*1) {
                    partnersExposure = "perfect"
                  }
                }


                if (partnersExposure == "1/2") {
                  arrNumKnownByExp = [2,1,0]
                } if (partnersExposure =="1") {
                  arrNumKnownByExp = [3,1,1]
                } if (partnersExposure =="0") {
                  arrNumKnownByExp = [0,0,0]
                } if (partnersExposure =="perfect") {
                  arrNumKnownByExp = [3,3,3]
                }

                console.log("cond set to " + cond + "    partnersExposure set to " +partnersExposure)
                if (subjectIdentifier.length > 7) {
                    cond = '100_30';
                    console.log('setting broken id tag to ' + subjectIdentifier + ' as default... ');
                };





  showSlide("welcome");
  	if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {document.getElementById("welcomeStart").disabled=true}
  	else {document.getElementById("welcomeStart").onclick = function() {experiment.instructions(2)}
  };
  slide_number = 1; 
  for(var i = 0; i<progressBars.length; i++) {
  	progressBars[i].style.width = String(1*100/totalSlides) + "%" ;
  }
  document.getElementById("objects").innerHTML = getRandomImages(imgArray, basePath, false);
  //shuffle name array so participants get random object/label pairings. placed here to ensure it only happens once.
  shuffle(imgArrayFIXED);

}



// MAIN EXPERIMENT
var experiment = {
	//global variables?
	// subID: workerIda,
	date: getCurrentDate(), //the date of the experiment
	// arrays to store the data we are collecting for each trial
	expDuration: [],
	testTrials: [],
	ruleQuestions: [],
  manipCheck: [],
	gameTrials: [],
	attnCheck: [],
  comments: [],

	instructions: function(slideNumber) {
    slide_number=slideNumber;
		showSlide("instructions");
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		document.getElementById("beforeStudy").onclick = function() {experiment.exposure(slideNumber+1)};
	},

	//transition from instruction slide to the exposure phase
	exposure: function(slideNumber) {
    slide_number=slideNumber;
		time1 = new Date().getTime()
		showSlide("exposure");
		$("#clickme").hide();
		$("#beginGame").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		var index=0;
		// exposureArray = exposureStimuli(imgArray);
		var exposureTrial = document.createElement("img");
		exposureTrial.src = "tabletobjects/" + exposureArray[index];
		exposureTrial.style.height = '400px';
		document.getElementById('content').appendChild(exposureTrial);
		var firstlabel = document.createTextNode(pairObjectLabels(exposureArray[index]));
		document.getElementById('label').appendChild(firstlabel);
		document.getElementById("clickme").innerHTML = "Next";
		setTimeout(function() {$("#clickme").fadeIn()}, 1250);
		document.getElementById("clickme").onclick = function() {
			time2 = new Date().getTime()
			//pass trial data for eventual output
			expDuration= {
                phase : "exposure",
        subID : subjectIdentifier,
        condition: cond,
				trialnum : slideNumber,
				object: exposureArray[index],
				exposureRate : getOccurences(exposureArray[index], exposureArray),
				timestamp: getCurrentTime(), //the time that the trial was completed at 
				duration : time2 - time1,
				};
			experiment.expDuration.push(expDuration);
			experiment.exposures(0, slideNumber+1)};
	},

	exposures: function(index, slideNumber) {
    slide_number=slideNumber;
		time1 = new Date().getTime()
		$("#clickme").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		var $img = $("img"), speed = 200;
		i= index + 1;
		ar = exposureArray;
    // console.log("change this back")
    // lastExposure = 3;
		lastExposure = ar.length;
		if (i < lastExposure) {
		  	newPic= ar[i];
			document.getElementById('content').removeChild(
				document.getElementById('content').lastChild);
			document.getElementById('label').removeChild(
				document.getElementById('label').lastChild);
			var newLabel = document.createTextNode(pairObjectLabels(newPic));
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
					phase : "exposure",
            subID : subjectIdentifier,
            condition: cond,
					trialnum : slideNumber,
					object: newPic,
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
    slide_number=slideNumber;
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
    slide_number=slideNumber;
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
    // console.log("change this back too")
    // lastExposure= 1;
		lastExposure= imgArray.length;
		ar = imgArray;
		notKnown=0;
		var blah = document.getElementById('testInput').value.toLowerCase().trim();
		//disable control buttons we don't want [e.g. enter]
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
		// prevent user from /pasting/ in illegal characters (non A-Z)
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
              subID : subjectIdentifier,
              condition: cond,
					trialnum : slideNumber,
					targetObjectName : document.getElementById('orderedImage').alt,
					exposureRate : getOccurences(document.getElementById('orderedImage').alt, exposureArray),
					realLabel : pairObjectLabels(document.getElementById('orderedImage').alt),
					typedLabel: blah,
						//label entered by particpant, null if no label entered or if (test trial) participant selected don't know
					adjLabel: candidate,
						// find closest vocab word by levDist and see if that is right
					responseCorrect: testCorrect,
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
    slide_number=slideNumber;
    showSlide("prestudy");
    document.getElementById('beginGame').disabled=true;
    $("#paneEx").hide()
    $("#tryThatAgain").hide()
    $("#sendMessageDemo").hide();
    $("#exampleText").show();
    $("#typingExample").hide();
    $("#pointerEx").hide()
    $("#clickText").hide()
    $("#exampleTarget").hide();
    $("#clickArray").hide();
    $("#generalInst").hide();
    $("#gameReady").hide();
    $("#pressEnterEx").hide();
    $("#timerText").hide();
    $("#ifClick").hide();
    $("#howToPlay").fadeIn(500);
      // document.getElementById("clickme").removeAttribute("onclick");
      for(var i = 0; i<progressBars.length; i++) {
        progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
      }
      document.getElementById("beginGame").innerHTML = "Check My Answers";
      // var myPoints = document.createTextNode(0);
      //   document.getElementById('myScore').appendChild(myPoints);
    
    // (hideous) series of timing events to walk through examples that illustrate the game rules
    // creates a little 'video.' would be so much easier to adjust if we could pass a variable TIMER as the ms for the timeout,
    //      but i haven't been able to write it that way because of the way setTimeout operates. 
    document.getElementById("howToPlay").onclick = function() {
        $(window).off('keyup')
        $("#pressEnterEx").hide()
        $("#exampleText").hide()
        $("#howToPlay").hide()
        $("#ifClick").hide()
        $("#ifRight").hide()
        $("#timerText").hide()
        //certain things need to be 'reset' that won't affect first viewing, but would affect Ps who get sent back to watch again.
        document.getElementById("ifTyping").value=""
        $("#paneEx").fadeIn(500)
        $("#exampleTarget").fadeIn(500)
        $("#clickArray").fadeIn(500)
        $("#generalInst").fadeIn(500)
        document.getElementById("clickText").innerHTML="<br> <br> Your partner will only see the nine objects."
        document.getElementById("shoeTarget").style.border= ""
        document.getElementById("shoeTarget").style.outline= ""
        
        //general rules
        setTimeout(function() {$("#clickText").fadeIn(500)}, 4000)      
        document.getElementById('timerText').innerHTML ="<br> <br> <br> If your partner selects the target based on your message, you will earn <strong> points</strong>.  <br> But you will be charged for sending different kinds of messages."
        // document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br> typing, <br> pointing, <br> typing and pointing"
        setTimeout(function() {$("#timerText").fadeIn(500)}, 7000)
        setTimeout(function() {
          $("#timerText").fadeOut(500)
        }, 11000)
        setTimeout(function() {
          document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br>typing,<br>pointing,<br>teaching "
          $("#timerText").fadeIn(500)
        }, 11500)
        setTimeout(function() {

            $("#gameReady").fadeIn(500)
            document.getElementById("gameReady").innerHTML = "Got it So Far"
            document.getElementById("gameReady").onclick = function() {
              experiment.prestudyTypeRight(slideNumber)
            }
        }, 13000)
      }
      // document.getElementById("gameReady").innerHTML = "Got it So Far"

      // document.getElementById("gameReady").onclick = function() {
      //   experiment.prestudyTypeRight(slideNumber)
      // }

  },

  prestudyTypeRight: function(slideNumber) {
    slide_number=slideNumber;  
       document.getElementById("ifType").innerHTML="You can type a label here...";
        document.getElementById('ifTypePoints').innerHTML =""
        $("#gameReady").hide()
        $("#clickText").fadeOut(500)
        $("#topText").fadeOut(500)
        document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br><strong>typing,</strong><br>pointing,<br>teaching "
        //typing example, right message
        setTimeout(function() {
                    $("#typingExample").fadeIn(500); 
                    }, 500)
        setTimeout(function() {document.getElementById('ifTypePoints').innerHTML ="(try typing 'shoe' in the box above!)"
              $("#ifTypePoints").fadeIn(500);
          }, 2000)
        // setTimeout(function() {document.getElementById("ifTyping").value="s"}, 500)
        // setTimeout(function() {document.getElementById("ifTyping").value="sh"}, 700)
        // setTimeout(function() {document.getElementById("ifTyping").value="sho"}, 900)
        // setTimeout(function() {document.getElementById("ifTyping").value="shoe"}, 1100)
        // try it yourself demonstration
        setTimeout(function() {$("#sendMessageDemo").fadeIn(500)}, 3000)
        document.getElementById("sendMessageDemo").onclick = function() {
          // if they don't type shoe, display a little reminder
          if (document.getElementById("ifTyping").value!= 'shoe') {
            $("#ifTypePoints").addClass('redText');
            $("#tryThatAgain").fadeIn(500)
            setTimeout(function() {$("#tryThatAgain").fadeOut(500)
              $("#ifTypePoints").removeClass('redText')
              }, 2500)
            return false}
          document.getElementById("ifTypePoints").innerHTML=""
          $("#sendMessageDemo").hide()
          // partner's selection
          setTimeout(function() {document.getElementById('clickText').innerHTML ="<br><br> You will then be shown what your partner selected."
              $("#clickText").fadeIn(500)
            }, 500)
          setTimeout(function() {document.getElementById("shoeTarget").style.border= "3px red dashed";}, 1500)
          setTimeout(function() {document.getElementById('ifClick').innerHTML ="Nice! Your partner knows what 'shoe' is and figured it out! <br> You would end up with <strong> " + trueLabelPoints + " points</strong> in this example."
              $("#ifClick").fadeIn(500)}, 2500)
          setTimeout(function() {document.getElementById("gameReady").innerHTML = "Still With You";
                  $("#gameReady").fadeIn(500)}, 5000)
        }

        //typing exmaple, wrong messsage
        document.getElementById("gameReady").onclick = function() {
          $("#gameReady").hide()
          //fade out old stuff
          $("#typingExample").fadeOut(500)
                $("#clickText").fadeOut(500)
                $("#ifClick").fadeOut(500)
          //typing exmaple, wrong messsage
          setTimeout(function() {
              document.getElementById("shoeTarget").style.border= ""
              $("#typingExample").fadeIn(500);
              document.getElementById("ifTyping").value=""; 
              document.getElementById("ifType").innerHTML="But if your partner gets it wrong based on your message...";
              document.getElementById("ifTypePoints").innerHTML="(try typing 'chair' above)"
              $("#ifTypePoints").fadeIn(500);
            }, 500)
          // setTimeout(function() {document.getElementById("ifTyping").value="c"}, 700)
          // setTimeout(function() {document.getElementById("ifTyping").value="ch"}, 900)
          // setTimeout(function() {document.getElementById("ifTyping").value="cha"}, 1100)
          // setTimeout(function() {document.getElementById("ifTyping").value="chai"}, 1300)
          // setTimeout(function() {document.getElementById("ifTyping").value="chair";
          //            }, 1500)
          // diy example
          setTimeout(function() {$("#sendMessageDemo").fadeIn(500)}, 3000)
          document.getElementById("sendMessageDemo").onclick = function() {
            // if they don't type shoe, display a little reminder
            if (document.getElementById("ifTyping").value!= 'chair') {
              $("#ifTypePoints").addClass('redText');
              $("#tryThatAgain").fadeIn(500)
              setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
              return false}
            $("#ifTypePoints").hide()
            $("#sendMessageDemo").hide()
            document.getElementById("ifClick").innerHTML="You will be <strong> charged "+ Math.abs(pointsLabelWrong) +" points</strong>."
            setTimeout(function() {$("#ifClick").fadeIn(500)}, 1500)
            setTimeout(function() {document.getElementById("chairDistractor").style.border= "3px red dashed"}, 500)
            setTimeout(function() {document.getElementById("gameReady").innerHTML = "Got It";
                    $("#gameReady").fadeIn(500)}, 3000)
          }

          //clicking example
          document.getElementById("gameReady").onclick = function() {
            document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br><strike>typing,</strike><br><strong>pointing,</strong><br>teaching "
            $('.famArray').addClass('toSelect')
            $("#ifClick").hide()
            $("#gameReady").hide()
            document.getElementById("clickText").innerHTML="<br> You can send a message by clicking the object here..."
            // fade out the old
            $("#typingExample").fadeOut(500)
            setTimeout(function() {document.getElementById("chairDistractor").style.border= ""}, 500)
            //bring in the new
            setTimeout(function() {$("#clickText").fadeIn(500)}, 500)
            setTimeout(function() {document.getElementById("clickText").innerHTML="<br> You can send a message by clicking the object here... <br> <strong> Try clicking on the shoe </strong>"
                }, 2000)
            //diy demonstration
            //check if an element in the array is clicked on
            clickDemo= ''
            $(".toSelect").click(function() {
              console.log("clicked "+ this.style.border)
              // if this object hasn't been clicked
              if (this.style.border == '') {
                // check if anything has been clicked on, if so, don't do anything when there are more clicks
                sum=0
                $(".famArray").each(function(){
                  if (this.style.border != '') {sum=sum+1}
                })
                if(sum>0) {return false}
                // if nothing else had been clicked on, then set this to 'clicked and store it?'
                this.style.border = "5px solid black"
                clickDemo = this.alt 
              } else {
                this.style.border=''
                console.log("unclick")
                clickDemo = '' 
              } 
            })
            setTimeout(function() {$("#sendMessageDemo").fadeIn(500)}, 3000)
            document.getElementById("sendMessageDemo").onclick = function() {
              // if they don't type shoe, display a little reminder
              if (clickDemo!= 'shoe') {
                $("#ifTypePoints").addClass('redText');
                $("#tryThatAgain").fadeIn(500)
                setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
                return false}
              $("#ifTypePoints").hide()
              $("#sendMessageDemo").hide()
              setTimeout(function() {document.getElementById("ifClick").innerHTML="and you will end up with <strong> "+trueClickPoints+" points</strong> <br> when your partner gets it right."
                          $("#ifClick").fadeIn(500)}, 1500)
              setTimeout(function() {
                        document.getElementById("shoeTarget").style.outline= "3px red dashed"
                        document.getElementById("shoeTarget").style.zIndex= "1"
                      }, 500)
              setTimeout(function() {document.getElementById("gameReady").innerHTML = "Anything Else?";
                    $("#gameReady").fadeIn(500)}, 3500)
            }
      

            // doing both example
            document.getElementById("gameReady").onclick = function() {
              document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br><strike>typing,</strike><br><strike>pointing,</strike><br><strong>teaching </strong>"
              // need to reset this here, then when there's a click event it will be set anew.
              clickDemo=''
              $("#gameReady").hide()
              //get rid of the old example
              $("#clickText").fadeOut(500);
              document.getElementById("shoeTarget").style.border= "";
              document.getElementById("shoeTarget").style.outline= "";
              $("#ifClick").fadeOut(500);
              //bring in the last example
              $("#typingExample").fadeIn(500);
              $("#ifTypePoints").fadeIn(500);
              document.getElementById("ifTyping").value=""; 
              document.getElementById("ifTypePoints").innerHTML="(try typing 'shoe' and clicking on that object)"; 
              document.getElementById("ifType").innerHTML="You can also teach by sending both messages..."
              // diy demo
              setTimeout(function() {$("#sendMessageDemo").fadeIn(500)}, 3000)
              document.getElementById("sendMessageDemo").onclick = function() {
                // if they don't type shoe and/or don't click the shoe, display a little reminder
                if (clickDemo!= 'shoe' || document.getElementById("ifTyping").value != 'shoe') {
                  $("#ifTypePoints").addClass('redText');
                  $("#tryThatAgain").fadeIn(500)
                  setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
                  return false}
                $("#ifTypePoints").hide()
                $("#sendMessageDemo").hide()


                setTimeout(function() {
                        document.getElementById("gameReady").innerHTML = "I'm Ready"
                        document.getElementById("shoeTarget").style.outline= "3px red dashed"
                      }, 500)
                setTimeout(function() {document.getElementById("ifClick").innerHTML="Your partner figured it out here too<br>and you taught him this was called a 'shoe.'<br>You will be charged for doing each strategy<br>and end up with <strong> "+ doingBothPoints+" points</strong>."
                            $("#ifClick").fadeIn(500)
                      }, 1500)
                setTimeout(function() {$("#gameReady").fadeIn(500)
                    // issue where if you get referred to back to watching the instructions again, the on click function call doubled up and negated itself
                    $(".toSelect").unbind()
                  }, 3500)
                document.getElementById("gameReady").onclick = function() {
                  experiment.gameQuestions(slideNumber)
                }
              }
            }
          }
        }     
  },


  gameQuestions: function(slideNumber) {
		//switch to the slide of questions about the game rules
        slide_number=slideNumber + 1;
				for(var i = 0; i<progressBars.length; i++) {
					progressBars[i].style.width = String((slideNumber+1)*100/totalSlides) + "%" ;
				};
				showSlide("gameCheck");
				$("#wrongCorrection").hide();
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
					if (document.getElementById("pointsForWrong").value != doingBothPoints) {
						ruleCheckProblems += 1;
					}
					//store P's response data before moving on
					ruleQuestions = {
              subID : subjectIdentifier,
              condition: cond,
						phase: "pregameCheck",
						// lots of redundent info here, but saves time during analysis.
						pointsClick : document.getElementById("pointsForClick").value,
						pointsLabel : document.getElementById("pointsForLabel").value,
						pointsWrong : document.getElementById("pointsForWrong").value,
						clickCorrect : document.getElementById("pointsForClick").value == trueClickPoints,
						labelCorrect : document.getElementById("pointsForLabel").value == trueLabelPoints,
						bothCorrect : document.getElementById("pointsForWrong").value == doingBothPoints,
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
						document.getElementById("wrongCorrection").innerHTML= "That's right!"
						$('#wrongCorrection').show();
						// document.getElementById("beginGame").innerHTML = "Begin Game";
						// setTimeout(function() {$('#beginGame').fadeIn(500)}, 1000);
						setTimeout(function() {experiment.partnering(0, 0, slideNumber+2)}, 800);
						// document.getElementById("beginGame").onclick = function() {experiment.partnering(0, 0, slideNumber+2)};
					}		
				}
		// experiment.game(0, 0, slideNumber+2)
		// button.onclick("click", Functionsion() {experiment.exposures(i)});
		// $("#clickme").on("click", function() {experiment.exposures(i)});
	},

	partnering: function(score, roundNumber, slideNumber) {
    slide_number=slideNumber;
		showSlide("getYourPartner");
    $("#squareExamples").hide()
		$("#spinner").hide();
		$('#gameStartFinal').fadeIn(1000);
		document.getElementById("gameStartFinal").innerHTML = "Search for a Partner";
		// this event handler checks the input, and when they have content, enables the button
		$('#userName').bind("keyup click change", function() {
				        var empty = false;
				            if ($(this).val() == '') {
				                empty = true;
				            }				      
				        if (empty) {
				            $('#gameStartFinal').attr('disabled', 'disabled');
				        } else {
				            $('#gameStartFinal').removeAttr('disabled');
				        }
		});
		document.getElementById("gameStartFinal").onclick = function() {
      $("#partneringHeadingStuff").addClass("blink_me")
      document.getElementById("partneringHeading").innerHTML= "Okay, <strong>" + $("#userName").val()+ "</strong>, we are searching now! "
			 document.getElementById("partneringHeading").style.margin = "-50px 0 0 0"
      $("#userName").hide();
			// document.getElementById("partneringText").innerHTML = "Okay, <strong>" + $("#userName").val()+ "</strong>, we are searching now!"
      document.getElementById("partneringText").innerHTML = "<br> Note that you saw the objects and their labels <strong> 21 times </strong> "
      $("#exposureText").fadeIn(500);
      // document.getElementById("exposureText").innerHTML = "<br> Your partner may have seen the objects fewer, the same, or more times"
              expVisualized = ''

      for(var i=0; i<exposureArray.length; i++) {
        thisObject = '<img class="square" style="margin:1px">'
        expVisualized= expVisualized + thisObject
      }
      document.getElementById('myVisual').innerHTML = expVisualized
      // expVisualized = ''
      // for(var i=12; i<exposureArray.length; i++) {
      //   thisObject = '<img class="col-xs-1" src=' + basePath + exposureArray[i] + ' style="margin:0px">'
      //   expVisualized= expVisualized + thisObject
      // }
      // console.log(expVisualized)
      // document.getElementById('myVisualOther').innerHTML = expVisualized

			searchTime = randomIntFromInterval(10000,12000);
			$("#spinner").fadeIn(500);
			$("#gameStartFinal").hide();

      //squares example to illustrate exposure differences
          document.getElementById('squaresSame').innerHTML = expVisualized
          expVisualized = ''
          for(var i=0; i<exposureArray.length; i++) {
              thisObject = '<img class="emptySquare" style="margin:2px">'
              expVisualized= expVisualized + thisObject
          }
          document.getElementById('squaresNone').innerHTML = expVisualized
          expVisualized = ''
          for(var i=0; i<(exposureArray.length/2); i++) {
              thisObject = '<img class="square" style="margin:1px">'
              expVisualized= expVisualized + thisObject
          } for(var i=(exposureArray.length/2)+1; i<exposureArray.length; i++) {
              thisObject = '<img class="emptySquare" style="margin:2px">'
              expVisualized= expVisualized + thisObject
          }
          document.getElementById('squaresFewer').innerHTML = expVisualized
              expVisualized = ''
              for(var i=0; i<(exposureArray.length*2); i++) {
                prefix = ''
                  if(i==0) {
                    prefix = '<div class="row">'
                  } if(i==exposureArray.length) {
                    prefix = '</div> <div class="row">'
                  } 
                thisObject = prefix + '<img class="square" style="margin:1px">'
                expVisualized= expVisualized + thisObject
              }
              document.getElementById('squaresDouble').innerHTML = expVisualized
      // bring in the examples after a few seconds
      setTimeout(function() {$("#squareExamples").fadeIn(500)}, 3000)

      // we found a partner!
			setTimeout(function() {$("#partneringHeadingStuff").fadeOut(501)}, searchTime - 500)
			setTimeout(function() {
        document.getElementById("exposureText").innerHTML= "<br> We found you a partner called <strong>"+partnersName+"</strong>!"
        document.getElementById("exposureText").style.margin = "-50px 0 0 0"
				// document.getElementById("partneringText").innerHTML= "<br><br>"
        $("#fewer").fadeOut(500)
        $("#none").fadeOut(500)
        $("#same").fadeOut(500)
        $("#double").fadeOut(500)
        if (partnersExposure=="0") { 
          checkCorrect = "none"
          // $("#fewer").css("visibility", "hidden")
          setTimeout(function() {$("#none").fadeIn(500)
            messageAboutPartner = "<br> <strong>"+partnersName+"</strong> saw the objects and their labels <strong> 0 times</strong>!"
            document.getElementById("noneText").innerHTML = messageAboutPartner
            // $("#noneText").addClass("redText")
            }, 1500)
        }
        if (partnersExposure=="1/2") {
          checkCorrect = "fewer"
          setTimeout(function() {
            messageAboutPartner = "<br> <strong>"+partnersName+"</strong> saw the objects and their labels <strong> 1/2 as many times</strong> as you did!"
            document.getElementById("fewerText").innerHTML = messageAboutPartner
            $("#fewer").fadeIn(500)
            // $("#fewerText").addClass("redText")
          }, 1500)
        }
        if (partnersExposure=="1") {
          checkCorrect = "same"
          setTimeout(function() {
            messageAboutPartner = "<br> <strong>"+partnersName+"</strong> saw the objects and their labels <strong> just as many times</strong> as you did!"
            document.getElementById("sameText").innerHTML = messageAboutPartner
            $("#same").fadeIn(500)
            // $("#sameText").addClass("redText")
          }, 1500)
        }
        if (partnersExposure=="perfect") {
          checkCorrect = "double"
          setTimeout(function() {
            messageAboutPartner = "<br> <strong>"+partnersName+"</strong> saw the objects and their labels <strong> twice as many times</strong> as you did!"
            document.getElementById("doubleText").innerHTML = messageAboutPartner
            $("#double").fadeIn(500)
            // $("#doubleText").addClass("redText")
          }, 1500)
        }
        $("#partneringText").fadeTo(500, .5)
        $("#myVisual").fadeTo(500, .5)
        $("#partneringText").fadeIn(500);
        $("#exposureText").fadeIn(500);
				document.getElementById("gameStartFinal").innerHTML= "Move On!"
				document.getElementById("gameStartFinal").onclick = function() {
          experiment.partneringCheck(slideNumber, $("#userName").val())
        }
				setTimeout(function() {$("#gameStartFinal").fadeIn(1000)}, 4000);
			}, searchTime)
		}
	},


  partneringCheck: function(slideNumber, username) {

    (function($) {
      $.fn.randomize = function(tree, childElem) {
        return this.each(function() {
          var $this = $(this);
          if (tree) $this = $(this).find(tree);
          var unsortedElems = $this.children(childElem);
          var elems = unsortedElems.clone();
          
          elems.sort(function() { return (Math.round(Math.random())-0.5); });  

          for(var i=0; i < elems.length; i++)
            unsortedElems.eq(i).replaceWith(elems[i]);
        });    
      };
    })(jQuery);

    $("div.band").randomize("table tr td", "div.member");

    slide_number=slideNumber;
    showSlide("getYourPartner");
    $("#squareExamples").hide()
    $("#spinner").hide();
    // this event handler checks the input, and when they have content, enables the button
    $('#gameStartFinal').hide()
    $("#partneringText").hide()
    $("#partneringHeadingStuff").hide()
    $("#exposureVisualization").hide()
    $("#userName").hide();
    document.getElementById("exposureText").innerHTML= "<br> Wait a second, how many times did <strong>"+partnersName+"</strong> see the objects?"
    $("#exposureText").fadeIn(500);
    $("#squareExamples").fadeOut(500)
    document.getElementById("fewerText").innerHTML= "half as many times as you"
    document.getElementById("noneText").innerHTML= "never seen them before"
    document.getElementById("sameText").innerHTML= "as many times as you"
    document.getElementById("doubleText").innerHTML= "twice as many times as you"
    document.getElementById("gameStartFinal").innerHTML= "Check Your Answer!"
    document.getElementById("gameStartFinal").disabled=true


      // allowing click behavior
      manipulationChecked= null 
      count = 1
      $(".member").each(function() {
        this.onmouseenter = function() {
          if (manipulationChecked == null) {
            this.style.border="1px solid black"
          }
        } 
        this.onmouseleave = function() {
          if (manipulationChecked == null) {
            this.style.border=""
          }
        }
        this.onclick = function() {
          if (manipulationChecked == null) {
            // console.log('is null')
            this.style.border="3px solid black"
            manipulationChecked=this.id
            // console.log(manipulationChecked)
            document.getElementById("gameStartFinal").disabled=false
          } else {
            // console.log("isn't null")
            if (this.style.border=="3px solid black") {
              // console.log('selected')
              this.style.border=""
              manipulationChecked=null
            }
          }
        }
      })

      
        document.getElementById("gameStartFinal").onclick = function() {
                $("#gameStartFinal").hide()
                // if they select correctly
                $("#exposureText").css('visibility', 'hidden')
                if (manipulationChecked == checkCorrect) {
                  setTimeout(function() {
                    document.getElementById("exposureText").innerHTML= "<br>That's Right- You're Ready to Play! <br><br>"
                    $("#exposureText").css('visibility', 'visible')
                  }, 1000)
                } else {
                  $(".member").each(function() {
                    this.style.border = ""
                  })
                  setTimeout(function() {
                    document.getElementById("exposureText").innerHTML= "Whoops- that's not right, "+ messageAboutPartner + "<br><br>"
                    $(".member").each(function() {
                    $("#exposureText").css('visibility', 'visible')
                      if (this.id == checkCorrect) {
                        this.style.border= "5px solid red"
                      }
                    })
                  }, 1000)
                }
                setTimeout(function() {
                  $("#gameStartFinal").show()
                  document.getElementById("gameStartFinal").innerHTML= "Got It!"
                  document.getElementById("gameStartFinal").onclick = function() {
                      if(manipulationChecked == checkCorrect){
                        isManipCorrect=1
                      } else {isManipCorrect =0}
                                manipCheck = {
                                    subID : subjectIdentifier,
                                    condition: cond,
                                    partnersExposure: partnersExposure,
                                    manipResponse: manipulationChecked,
                                    manipActual: checkCorrect,
                                    manipCorrect: isManipCorrect,
                                    timestamp: getCurrentTime(),
                                  };
                                  experiment.manipCheck.push(manipCheck);
                      $("#squareExamples").fadeOut(500)
                      $("#gameStartFinal").hide()
                      $("#squareExamples").fadeOut(500)
                      setTimeout(function() {
                        $("#exposureText").fadeIn(500)
                      }, 499)
                      document.getElementById("exposureText").innerHTML = "<br> You will be asked to send messages to your partner about each object <strong>3 times.</strong> <br><br>"
                      setTimeout(function() {
                        $("#gameStartFinal").fadeIn(500)
                        document.getElementById("gameStartFinal").innerHTML= "Begin Game!"
                        document.getElementById("gameStartFinal").onclick = function() {
                            experiment.game(0, 0, slideNumber+1, username)
                          }
                      }, 3000)
                    }
                }, 2500)
        }
      $("#none").fadeIn(500)
      $("#same").fadeIn(500)
      $("#double").fadeIn(500)

    setTimeout(function(){
      $("#squareExamples").fadeIn(500)
      $("#fewer").fadeIn(500)
      $("#none").fadeIn(500)
      $("#same").fadeIn(500)
      $("#double").fadeIn(500)
      $("#gameStartFinal").fadeIn(500)
    }, 500)


          // bring in the examples after a few seconds

        

  },

	game: function(score, roundNumber, slideNumber, username) {
    slide_number=slideNumber;
		time1 = new Date().getTime();
    if (roundNumber == 0) {
        // need to ensure this only happens once. 
        // build partner knowledge for the game later
        partnerKnows = partnerKnowledge(exposureArray, arrNumKnownByExp)
        // console.log(partnerKnows)

    }
    // console.log(partnerKnows)
		showSlide("referenceGame");
          // document.getElementById('myScore').innerHTML = "your points: " + score;

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

    // console.log(target)
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
			// var node = $(this);
			// node.value(node.val().replace(/[^a-z ]/g,'') );
			// if they have erased the text box so it is now empty
			if (document.getElementById("labelInput").value =="") {
				// if they clicked the object, leave that as the message
				if (message==1) {
          document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> "+ trueClickPoints +" Possible Points </em> </strong>"
          pointChange = trueClickPoints;
        }
				// if they havent clicked an object and now have emptied the text box, revert to no message state and disable stuff
				else {
					document.getElementById("sendMessage").disabled = true;
					document.getElementById("sendMessage").innerHTML="Send Message";
				}
			} else {
				document.getElementById("sendMessage").disabled = false;
				if (message==1) {
          document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +doingBothPoints+" Possible Points </em> </strong>"
          pointChange = doingBothPoints;
        }
				else {
          document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"
          pointChange = trueLabelPoints;
        }
			}
		};
		// another event tag which prevents the typing of non letters!
		$("#labelInput").bind("keydown", function(event){
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
		$("#labelInput").bind("input", function(){
		  var regexp = /[^a-zA-Z ]/g;
		  if($(this).val().match(regexp)){
		    $(this).val( $(this).val().replace(regexp,'') );
		  }
		});

    // when user clicks on one of the objects in the array
		$('.toSelect').click(function() {
			var blah = document.getElementById('labelInput').value.toLowerCase().trim();
				//if the target has already been clicked on, assume they are 'unclicking' and revert..
				if (message==1) {
					// if you have selected an object, and are trying to click another object, do nothing.
					if (this.style.border!="5px solid black") {return}
					// otherwise, revert the selection 
					this.style.border="";
					// if there is a label typed out, keep the sendMessage button enabled and change it to X possible points
					if (blah != '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"
            pointChange = trueLabelPoints;
          }
					else {
						document.getElementById("sendMessage").disabled = true;
						document.getElementById("sendMessage").innerHTML="Send Message";
					}
					message=0;
					return;
				}
				//if neither pointing nor typing has occured, select the target element and note that.
				if (message==0) {
          // console.log(pairObjectLabels(this.alt));
					this.style.border="5px solid black";
					document.getElementById("sendMessage").disabled = false;
					if (blah == '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>"; 
                        pointChange = trueClickPoints;
          }
					else {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +doingBothPoints+" Possible Points </em> </strong>"
                        pointChange = doingBothPoints;
          }
					selection = pairObjectLabels(this.alt);
          selectedObject = this.alt;
					message = 1; // change message value to 1 if clicked. 
						isCorrect = 1; // flag as correct. will be overwritten if incorrect. 
					return;
				}
		});
		document.getElementById("sendMessage").onclick = function() {
      $("#sendMessage").hide()
      pseudoPartnersSelection = 'UNCAUGHT'
        // testing setting, should be overwritten, if any are submitted, we know we missed something
			//make sure the message about english messages is hidden
			$("#thatIsEnglish").hide()
			// first things first. check blah. if it is an enlish word, return an error and let them click again. 
				  //final check of what, if anything, was typed in the textbox to determine score. 
			var blah = document.getElementById('labelInput').value.toLowerCase().trim();
      document.getElementById('waitingForPartner').innerHTML = partnersName + " is thinking...."
			if(blah != '') {
  				if(Word_List.isInList(blah)) {
            $("#sendMessage").show()
  					$("#thatIsEnglish").fadeIn(500)
  					document.getElementById("thatIsEnglish").innerHTML = "Oops, looks like you might be typing in English. Remember, you need to send your message in our new language! <br> Try that one again!"
  					return;
  				}
          for (i=0; i < commonWords.length; i++) {
            searching = blah.search(commonWords[i])
            if (searching >= 0) {
                $("#sendMessage").show()
              document.getElementById("thatIsEnglish").innerHTML = "Oops, looks like you might be typing in English. Remember, you need to send your message in our new language! <br> Try that one again!"
              $("#thatIsEnglish").fadeIn(500)
              return;
            }
          }
			}
			time2 = new Date().getTime();
			//disable input/clicking options after message sent
			document.getElementById("labelInput").disabled = true;
			$('.toSelect').click(function() {return false;});
			// set default  lev adjusted 'candidate' value to be NULL
			candidate = '';
					// this is overwritten below if the P has typed (and not clicked)
			if (blah != '') {
            // want to adjust their input according levenshtein distance to vocab words
            for (var i=0; i<novelWords.length; i++) {
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
          if (levDist(inputWord, candidate)>2) {candidate =""};

				// if the user typed a response AND clicked, set method to 'label_click', but follow directions as if clicked
				if (message==1) {
              pseudoPartnersSelection = selectedObject
              method="label_click"
              // also need to add a mapping for this word for our learner, who is now intelligent. 
                // if the word isn't one partner already knows
              if (partnerKnows.indexOf(candidate) < 0 || partnerKnows.indexOf(candidate) >= 0 && candidate!=target) {
                partnerKnows.push(blah)
                partnerKnows.push(selectedObject)
                novelWords.push(blah)
              }
								if(selection != target) {
                  message = 3; 
                  isCorrect = 0; 
                  pointChange = pointsBothWrong
                } 
        }
				// if they only typed, 
				//   then mark selection as null and flag their method
				else {
					selection=null;
					method = "label";
					// if user enters the appropriate label, give them points.
              // can the partner be taught something wrong? seems like it should be allowed to happen? 
					// if(candidate == target || getOccurences(blah, partnerKnows)>0) {
          if(candidate == target) {
            // need to check if 'partner' 'knows'
            if (getOccurences(candidate, partnerKnows)>0) {
  						message=2;
  						isCorrect = 1;
              pointChange = trueLabelPoints;
            // if this is a word we are probably going to get wrong, let partner 'guess'
            } else {            
              message=3;
              isCorrect = 0;
              pointChange = pointsLabelWrong;
            }
					} if (candidate != target) {
						message=3;
						isCorrect = 0;
            pointChange = pointsLabelWrong;
					}               
          partnersStartingVocab = 0
          for (var i =0; i<arrNumKnownByExp.length; i++){
            partnersStartingVocab = arrNumKnownByExp[i] + partnersStartingVocab
          }
          // special case where what you typed is a word you taught your partner (i.e. added to their vocab)
          wordLocation = partnerKnows.indexOf(candidate)
          // need to check for ambiguious vocab words in partner knowledge and get the most recent definition
            // i.e. the element with the highest index for that word
          if (getOccurences(candidate, partnerKnows) > 1) {
            for (var i = 0; i<partnerKnows.length; i++) {
              if (partnerKnows[i] == candidate) {
                wordLocation=i
              }
            }
          }
          if (wordLocation > partnersStartingVocab-1) {
            // console.log('oh my partner taught me this one! ')
            // now we check whether candiate matches the n+1 thing in list ? 
            if (document.getElementById("gameTargetImage").alt == partnerKnows[wordLocation+1]) {
              message=2;
              isCorrect = 1;
              pointChange = trueLabelPoints;
            } else {message = 3; isCorrect=0; pointChange=pointsLabelWrong; pseudoPartnersSelection = partnerKnows[wordLocation+1]} 
          }
				}
			}
			// if they havent typed a label...
			if (blah == '') {
				blah = null;
				method = "click";
				if(selection != target) {message = 3; isCorrect = 0; pointChange = pointsClickWrong; pseudoPartnersSelection = selectedObject};
			}
			if(message==0) {return}


      // some fancy stuff to try to get the 'receiver' to guess using mutual exclusivity assumption   
      if (method == "label") {    
        // regardless of whether the 'receiver' selects the target, they should guess smartly if it's a word they know
        wordLocation = partnerKnows.indexOf(candidate)
        if (wordLocation > partnersStartingVocab-1) {
          pseudoPartnersSelection = partnerKnows[wordLocation+1]
                    // console.log("i was taught and i choose you  " + pseudoPartnersSelection)

        } if (wordLocation < partnersStartingVocab) {
            for (var i = 0; i<imgArray.length; i++) {
              if (pairObjectLabels(imgArray[i]) == partnerKnows[wordLocation]) {
                pseudoPartnersSelection = imgArray[i]
                // console.log("i always knew you and i choose you  " + pseudoPartnersSelection)
              }
            }
        }


        // there is a better way of doing all of this where the state of what the partner knows is kept up to date
        // by deleting entries that are overwritten? and formatting the list differently (as label, referent) throughout

        // if it's really not a word the partner knows, then they need to guess randomly from the set of objects they don't know
        if (wordLocation < 0) {
          partnersUnknown = []
          // take each of the novel objects
          for (var i = 0; i<imgArray.length; i++) {
            // if no version of it appears in the partnerKnows array, store it 
            if (getOccurences(pairObjectLabels(imgArray[i]), partnerKnows) == 0 && getOccurences(imgArray[i], partnerKnows) == 0) {
              partnersUnknown.push(imgArray[i])
            }
            // if there are mutliple copies of one word?
            if (getOccurences(pairObjectLabels(imgArray[i]), partnerKnows) > 1) {
              // figure out if there is a later one... 
              count = 0
              for (var x = 0 ; x < partnerKnows.length; x++) {
                if (pairObjectLabels(imgArray[i]) == partnerKnows[x]) {
                  count = count + 1;
                  // if this isn't the last copy...
                  if(count < getOccurences(pairObjectLabels(imgArray[i]), partnerKnows)) {
                    partnersUnknown.push(imgArray[i])
                  }
                }
              }
            }
            //  other case is one in which sender teaches an unknown word and teaches it wrongly
                 // creating an array of the form "gazzer", "wug", "dax", "2001" where 2001 is not actually called "dax"
            learnedLabelLocation = partnerKnows.indexOf(pairObjectLabels(imgArray[i]))
            if (learnedLabelLocation >= partnersStartingVocab) {
              if (partnerKnows[learnedLabelLocation] != pairObjectLabels(partnerKnows[learnedLabelLocation+1])) {
                partnersUnknown.push(imgArray[i])
              }
            }
          }
          mappingsToSearch = partnersUnknown.length -1
          //special case where we know all the words but receive unintelligible input, then guess randomly
          if ((partnersUnknown.length) == 0) {
            mappingsToSearch=8
            partnersUnknown = imgArray.slice(0)
          }
          // console.log(partnerKnows)
          randomInt= randomIntFromInterval(0, mappingsToSearch) 
          // console.log('are we running this part' + randomInt + ' and partners unknown thing ' +(partnersUnknown.length-1))
          pseudoPartnersSelection = partnersUnknown[randomInt]
          // this is the only such situation where there is a special case and the partner randomly gets it right. 
                  // as is, a receiver doesn't 'learn' from this event, but realistically they should. 
                // 5.2: we are making it impossible for people to get it right by random chance since it is cleaner.
                //   but we need a case for when there is only one choice left or the whole thing will break.
                count=0
                while (pseudoPartnersSelection == document.getElementById("gameTargetImage").alt) {
                  // console.log("would have accidently gotten this right, keep searching")
                  if (mappingsToSearch==0) {
                    isCorrect=1
                    break
                  } else{
                  randomInt= randomIntFromInterval(0, mappingsToSearch) 
                  pseudoPartnersSelection = partnersUnknown[randomInt]
                  count++
                  }
                  // pointChange = trueLabelPoints;
                }


          // console.log("randomly grabbed this selection from   " + partnersUnknown)

        }
      }


      //send message, return 'partner response'
      if (isCorrect == 1) {
        pseudoPartnersSelection = document.getElementById("gameTargetImage").alt
        document.getElementById("messageFromPartner").innerHTML = "Nice work- "+partnersName+" figured it out!";
      } else {document.getElementById("messageFromPartner").innerHTML = "Uh oh- looks like "+partnersName+" chose the wrong object!";}
  

      //issue with saving the array of partner knowledge... 
      partnerKnowsSave = partnerKnows.slice(0)
      //store trial data before moving on
      gameTrials = {
        phase : "game",
        subID : subjectIdentifier,
        username: username,
        condition: cond,
        partnersExposure: partnersExposure,
        trialnum : slideNumber,
        score: pointChange,
        partnerVocab: partnerKnowsSave,
        targetObjectName : document.getElementById("gameTargetImage").alt,
        exposureRate : getOccurences(document.getElementById('gameTargetImage').alt, exposureArray),
        realLabel : pairObjectLabels(document.getElementById("gameTargetImage").alt),
        // note special case for label_click method. click will override label to determin if message is correct.
          // typed label will still be recorded, but whether it is wrong or right will not be!
        method: method,
        typedLabel: blah,
          //label entered by particpant, null if no label entered or if (test trial) participant selected don't know
        adjLabel: candidate, 
          //the vocab word that has the smallest levDist from the typedLabel
          //returns '' if the edit distance is too much
        clickedObject: selection,
          //the object clicked on by the pariticpant during the game, null if typed response was chosen
        responseCorrect: isCorrect,
          //whether the response matched target, either as click or typed message. 
        partnerSelection: pseudoPartnersSelection,
        timestamp: getCurrentTime(),
          //the time that the trial was completed at 
        duration: time2 - time1,
      };
      experiment.gameTrials.push(gameTrials);





      experiment.gameWaiting(score + pointChange,roundNumber+1, slideNumber+1, pseudoPartnersSelection, username)
			// if(message==1) {$("#sendMessage").hide(); 
			// 					document.getElementById("messageFromPartner").innerHTML = "Nice work- your partner figured it out!";
			// 					experiment.gameWaiting(score + trueClickPoints,roundNumber+1, slideNumber+1)
			// 				}
			// if(message==2) {$("#sendMessage").hide(); 
			// 					document.getElementById("messageFromPartner").innerHTML = "Nice work- your partner figured it out!";
			// 					experiment.gameWaiting(score + trueLabelPoints,roundNumber+1, slideNumber+1)
			// 				}
			// // label or sellection is incorrect is case message = 3
			// if(message==3) {$("#sendMessage").hide(); 
			// 					document.getElementById("messageFromPartner").innerHTML = "Uh oh- looks like your partner chose the wrong object!";
			// 					experiment.gameWaiting(score,roundNumber+1, slideNumber+1)
			// 				}
		};	
	},

	gameWaiting: function(score, count, slideNumber, selectedObject, username) {
    slide_number=slideNumber;
		$("#waitingForPartner").show();
		$("#spinningWaiting").show();
		$('.toSelect').click(function() {return;});
		$('.labelInput').disabled = true;
		waitTime = randomIntFromInterval(1000,4000);
		setTimeout(function() {$("#waitingForPartner").hide(); $("#spinningWaiting").hide()}, waitTime-250);
		setTimeout(function() {$("#nextRound").show();
			$("#messageFromPartner").show();
      document.getElementById('myScore').innerHTML = "your points: " + score;
      $('.toSelect').each(function() {
        if(this.alt == pseudoPartnersSelection) {
          // console.log(this.alt + "   " + pseudoPartnersSelection); 
          if (this.style.border != '') {
                this.style.outline="3px dashed red"; 
                this.style.zIndex = "1"
          } else{this.style.border='3px dashed red'}
        }
      })
		}, waitTime);
    // console.log('change this baaaaaaaaaaaaaaaaaack')
		numOfGames = gameArray.length;  
    // numOfGames = 4;
    console.log(numOfGames)  
		if (count < numOfGames) {
			document.getElementById("nextRound").onclick = function() {experiment.game(score,count, slideNumber, username)};
		} else {
			document.getElementById("nextRound").onclick = function() {experiment.attentionCheck(slideNumber)}};
		// setTimeout(experiment.game(score, count), 5000);
	},

	attentionCheck: function(slideNumber) {
    slide_number=slideNumber;
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
          subID: subjectIdentifier,
					phase: "attnCheck",
          time: getCurrentTime(),
					recognizedObject : recognizedItems[i],
					correctRecog : correct
				}
				experiment.attnCheck.push(attnCheck);
			}
      experiment.end()
    }
	},
    
    //the end of the experiment, where the background becomes completely black
    end: function () {
      showSlide("finished");
      teachingQuestion=null
      muchEnjoyment=null
      document.getElementById("submitData").disabled=true

      $('.teachingQuestion').on("change", function() {
        gotOne =false
        $(".teachingQuestion").each(function() { 
          if (this.checked == true) {
            gotOne = true
            if (muchEnjoyment != null) {
              document.getElementById("submitData").disabled=false
            }
            teachingQuestion = this.value
          }
        })
      })

      $('.likert').on("change", function() {
        $("[name='likert']").each(function(){
          if(this.checked==true){
            muchEnjoyment = this.value
            if (teachingQuestion != null) {
              document.getElementById("submitData").disabled=false
            }
          }
        })   
      })

      document.getElementById("submitData").onclick = function() {
        // $("[name='likert']").each(function(){
        //   if(this.checked==true){
        //     muchEnjoyment = this.value
        //   }
        // })
        comments= {
          subID: subjectIdentifier,
          time: getCurrentTime(),
          enjoyedGame : muchEnjoyment, 
          teachingQuestion : teachingQuestion,
          ifOther : document.getElementById("otherText").value,
          comments : document.getElementById("anyComments").value,
        }
        experiment.comments.push(comments);
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
                $("#submitData").hide()
                console.log('truly decrementing partipcant file')
                    // there is a potential issue where after finishing the experiment, the page is 'unloaded'
                        // so our onbeforeunload script tries to run, which involves incrementing the subject count
                        // changing the subId here should prevent that because the unload script has a max length conditional
                    subjectIdentifier = 'garbage noise so that the on-close script is not run';
                    console.log('overwriting subID before submission (testing for who wins the race)')
                        // need to makes sure that this subID overwrite happens AFTER the decrementer call!!
                        // otherwise paritipcants won't get zeroed out. 

                        turk.submit(experiment);
                        $("#finished").hide()
                        document.body.style.background = "black";
            }
        };
        xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/_crementer.php?filename=" + filename + "&to_decrement=" + subjectIdentifier, true);
        xmlHttp.send(null)
      }

    },
}

//for  testing and debugging, jump to a part of the experiment directly with (the relevant version of) this line
//breaks progressbar
// experiment.partnering(0,0,30);




