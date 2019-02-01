// Overview: (i) Parameters (ii) Helper Functions (iii) Control Flow

// ---------------- PARAMETERS ------------------
//an array of all the novel words used in the study; used for look-up purposes in pic1type, pic2type, and trialtype
var novelWords = ["blicket", "kreeb", "wug", "fep", "toma", "dax"];

// imgs for reference game
var imgArray = ["2001-600.jpg", "2002-600.jpg", "2056-600.jpg", 
				"2025-600.jpg", "2005-600.jpg", "2006-600.jpg"];

// imgs for reference game
// shuffle this array once and never shuffle again. only used for looking up object label pair. 
// reshuffling directly or by calling a function such as getRandomImages, which uses shuffling, will mess up the object label pairs.
var imgArrayFIXED = ["2001-600.jpg", "2002-600.jpg", "2056-600.jpg", 
					"2025-600.jpg", "2005-600.jpg", "2006-600.jpg"];

//imgs for the familiar objects example
var familiarArray = ["pen.jpg", "computer.jpg", "shoe.jpg", 
					"key.jpg", "chair.jpg", "newspaper.jpg"];

// imgs for attention check, targets and distractors
var attentionArray = ["2001-600.jpg", "2002-600.jpg", "2005-600.jpg", "2004-600.jpg", "2056-600.jpg", 
					"2006-600.jpg", "2007-600.jpg", "2009-600.jpg", "2010-600.jpg", "2011-600.jpg",
					"2012-600.jpg", "2013-600.jpg", "2014-600.jpg", "2015-600.jpg", "2027-600.jpg", 
					"2017-600.jpg", "2018-600.jpg", "2019-600.jpg", "2028-600.jpg", "2021-600.jpg", 
					"2022-600.jpg", "2023-600.jpg", "2024-600.jpg", "2025-600.jpg", "2026-600.jpg"];

var basePath = "tabletobjects/";

// var trueLabelPoints= 100; 
// var trueClickPoints = 30;
// var doingBothPoints = 30;
// var pointsLabelWrong = -0;
// var pointsClickWrong = -70;
// var pointsBothWrong = -70;

var debugging= false;

// var timePerTrial = 11
// 11/1.7 =~ 6.5
var timePerTrial= 6.5
var convertTimeToPoints = (11/timePerTrial)
var convertTimeToPoints = convertTimeToPoints.toPrecision(2)
console.log(convertTimeToPoints)

var realTrialsPerObj= 3

var exposureRate = [2, 3, 5]

var participantsPer=40


// while we outlawed producing english words, 
//   some participants produced responses like "topleft" so we want to build an array to search for these words
var commonWords = ["top", "bottom", "left", "right", "corner",
          "blue", "red", "green", "pink", "black", "white", "orange", "silver", "yellow", "grey", "gray",
          "thing", "dont", "know"]

var partnersName = "ben"

// ---------------- HELPER ------------------
function timeToPointsConverter(millisPassed, conversionRate) {
  // console.log('convertingggg')
  timeLeft = timePerTrial - (millisPassed/1000)
  calculatedPoints = Math.floor(timeLeft*conversionRate)*10
  // calculatedPoints < 50 ? calculatedPoints+= -10 : calculatedPoints
  calculatedPoints <= 10 ? calculatedPoints = 10 : calculatedPoints
  return calculatedPoints
}


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
    		// 	imgSet[i] = '</div> <div class="row"> <img style="max-width:200px" class=" ' + classes + offset + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		// } else {
    		// 	imgSet[i] = '<img  style="max-width:200px" class="' + classes + '" id = ' + idTag + ' src="' + path + imgAr[i] + '" alt = "'+imgAr[i]+'">';
    		// }
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
	var imgStr = '<img  class="col-xs-10 " style="max-width:600px" id="orderedImage" src="' + basePath + imgAr[count] + '" alt = "'+imgAr[count]+'">';
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
	  arr1 = fillArray(imgAr[0], exposureRate[0]);
	  arr2 = fillArray(imgAr[1], exposureRate[0]);
	  arr3 = fillArray(imgAr[2], exposureRate[1]);
	  arr4 = fillArray(imgAr[3], exposureRate[1]);
	  arr5 = fillArray(imgAr[4], exposureRate[2]);
	  arr6 = fillArray(imgAr[5], exposureRate[2]);
	  // arr7 = fillArray(imgAr[6], exposureRate[2]);
	  // arr8 = fillArray(imgAr[7], exposureRate[2]);
	  // arr9 = fillArray(imgAr[8], exposureRate[2]);
  exposureImgs = arr1.concat(arr2, arr3, arr4, arr5, arr6);
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
    // numRoundsPerWord = 3;
    gameImgs = []
    for (var i=0; i < imgArray.length; i++) {
      arr1 = fillArray(imgAr[i], realTrialsPerObj)
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
  	shuffledGameImgs[i] = '<img height="200px" id="gameTargetImage" src="' + basePath + gameImgs[i] + '" alt = "'+ gameImgs[i] +'">';
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
  var expRate = exposureRate.slice(0)
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


// https://github.com/johnschult/jquery.countdown360
var initializeTimer = function(timerName, size, labelsOn) {
    if (labelsOn == true) {
      timerLabelsColor = 'white'
      timerLabels = ['points', 'points']
    } else{timerLabelsColor = 'fff'; timerLabels = ['', '']}
    // code for the game timer, this version is a per trial timer
    $("#"+timerName+"").countdown360({
      radius      : size,
      seconds     : timePerTrial,
      fillStyle   : '#fff',
      strokeStyle : 'black',
      strokeWidth : 5,
      // fontSize    : 50,
      fontColor   : timerLabelsColor,
      label: timerLabels,
      autostart: false,
      smooth: true,
      onComplete  : function () { 
        console.log('time is up!')
      }
    }).start()
    $("#"+timerName+"").countdown360({}).stop()
}

var startTimer = function(timerName) {
      time1 = new Date().getTime();
      $("#"+timerName+"").countdown360({}).start()
      timeRemaining = $("#"+timerName+"").countdown360({}).getTimeRemaining()
      // console.log(timeRemaining)
      // console.log($("#"+timerName+"").countdown360({}).getTimeRemaining())
      timerInterval = setInterval(function() {
        // console.log('hm')
        timeNow = new Date().getTime()
        timeRemaining = $("#"+timerName+"").countdown360({}).getTimeRemaining()
        // console.log(timeRemaining)
        if (timeRemaining <= 1) {
          setTimeout(function() {$("#"+timerName+"").countdown360({}).stop()}, 50)
        }
      }, 200)
}

var stopTimer = function(timerName) {
      $("#"+timerName+"").countdown360({}).stop()
      clearInterval(timerInterval)
      if (timeRemaining <= 1) {
        timeRemaining=1
      }
}

var buildCondCounts = function(numofConditions) {
	res = ''
	for (var i=1; i<=numofConditions*participantsPer; i++) {
		var str1 = i.toString();
		tmp = str1.concat(",1;")
		res = res.concat(tmp)
	}
	return res
}

// (function($) {
//   $.fn.randomize = function(tree, childElem) {
//     return this.each(function() {
//       var $this = $(this);
//       if (tree) $this = $(this).find(tree);
//       var unsortedElems = $this.children(childElem);
//       var elems = unsortedElems.clone();
      
//       elems.sort(function() { return (Math.round(Math.random())-0.5); });  

//       for(var i=0; i < elems.length; i++)
//         unsortedElems.eq(i).replaceWith(elems[i]);
//     });    
//   };
// })(jQuery);


var arrowKeySelection = function(member) {
      $(document).on('keyup', function (e) {
        // up arrow detect
        if(e.keyCode == 38) {
          currentOne="null"
          $("."+member).each(function() {
            if (this.style.border == "1px solid black") {
              currentOne = this.alt
              if(this.alt != 1) {
                this.style.border = "";
              } 
            }
            $("."+member).each(function() {
              if (this.alt == (currentOne -1)) {
                  this.style.border = "1px solid black"
              }
            })
          })
        }
        if(e.keyCode == 40) {
          currentOne="null"
          $("."+member).each(function() {
            if (this.style.border == "1px solid black") {
              currentOne = this.alt
              if(this.alt != 4) {
                this.style.border = "";
              } 
            }
            if (this.alt == (currentOne +1)) {
                this.style.border = "1px solid black"
            }
          })
        }
      })

      // allowing click behavior
      // manipulationChecked= null 
      count = 1
      $("."+member).each(function() {
        if (count==1) {
          this.style.border = "1px solid black"
        } 
        this.alt = count
        count++;
        // console.log(this.alt)
      })
}


// var checkArrowSelection = function(member, newVar) {
//   console.log(newVar)
//   $("." + member).each(function() {
//     if (this.style.border == "1px solid black") {
//       this.style.border="3px solid black"
//       newVar. = this.id
//       console.log(newVar)
//       this.alt = "selected"
//     }
//   })
//   console.log(newVar)
// }



//-----------------------------------------------

// // ***********************************************

// // ***********************************************
// subjectIdentifier just used during the course of the experiment
subjectIdentifier=randomIntFromInterval(0,9999)
// manually set condition
//    having had trouble with condtiion assignmment, this code will be manually set to offer 1/12 conditions in seperate hits.
// 1.27.2019.
// 12 conditions (speeds X listener training levels)
  // 3 speeds (40, 20, 10)
var speedOptions = [40,20,10]
  // 4 listener training levels (0, 1/2, same, double)
var listenerOptions = ["0","1/2","1", "perfect"]

var numTrials=imgArray.length*realTrialsPerObj
console.log(numTrials)
//need best points from piloting to simulate leaderboard scores later for a given condtion
  //labeling points are the same (just determined by individ speed of typing label)
bestLabelPoints = 90

condition= $("#conditionHTML").html()
console.log(condition)
//condition 1
if(condition==1){
  speedAsLag = speedOptions[0]
  partnersExposure= "0"
  arrNumKnownByExp = [0,0,0]
  bestClickPoints= 20
}

// // condition 2
if(condition==2){
  speedAsLag = speedOptions[0]
  partnersExposure= "1/2"
  arrNumKnownByExp = [2,1,0]
  bestClickPoints= 20
}

// // condition 3
if(condition==3){
  speedAsLag = speedOptions[0]
  partnersExposure= "1"
  arrNumKnownByExp = [2,2,1]
  bestClickPoints= 20
}

// // condition 4
if(condition==4){
  speedAsLag = speedOptions[0]
  partnersExposure= "perfect"
  arrNumKnownByExp = [2,2,2]
  bestClickPoints= 20
}


// // condition 5
if(condition==5){
  speedAsLag = speedOptions[1]
  partnersExposure= "0"
  arrNumKnownByExp = [0,0,0]
  bestClickPoints= 50
}

// // condition 6
if(condition==6){
  speedAsLag = speedOptions[1]
  partnersExposure= "1/2"
  arrNumKnownByExp = [2,1,0]
  bestClickPoints= 50
}

// // condition 7
if(condition==7){
  speedAsLag = speedOptions[1]
  partnersExposure= "1"
  arrNumKnownByExp = [2,2,1]
  bestClickPoints= 50
}

// // condition 8
if(condition==8){
  speedAsLag = speedOptions[1]
  partnersExposure= "perfect"
  arrNumKnownByExp = [2,2,2]
  bestClickPoints= 50
}



// // condition 9
if(condition==9){
  speedAsLag = speedOptions[2]
  partnersExposure= "0"
  arrNumKnownByExp = [0,0,0]
  bestClickPoints= 80
}

// // condition 10
if(condition==10){
  speedAsLag = speedOptions[2]
  partnersExposure= "1/2"
  arrNumKnownByExp = [2,1,0]
  bestClickPoints= 80
}

// condition 11
if(condition==11){
  speedAsLag = speedOptions[2]
  partnersExposure= "1"
  arrNumKnownByExp = [2,2,1]
  bestClickPoints= 80
}

// condition 12
if(condition==12){
  speedAsLag = speedOptions[2]
  partnersExposure= "perfect"
  arrNumKnownByExp = [2,2,2]
  bestClickPoints= 80
}

console.log(speedAsLag + " | " + partnersExposure + " | " + arrNumKnownByExp)


//simulate a leaderboard for later
  numThingsToTeach = 6-arrNumKnownByExp.reduce(function(a, b) { return a + b; }, 0)
  numPossibleLabelTrials = arrNumKnownByExp.reduce(function(a, b) { return a + b; }, 0)*realTrialsPerObj

  bestTeachPoints=bestClickPoints-10
  bestPointsFromTeaching = numThingsToTeach*bestTeachPoints
  bestPointsFromLabel = (numTrials-numThingsToTeach)*bestLabelPoints

  bestPerson= "Sarah"
  bestScore=bestPointsFromTeaching + bestPointsFromLabel
  secPerson= "testor"
  secScore=((numThingsToTeach-1)*bestTeachPoints) + ((numTrials - numThingsToTeach - realTrialsPerObj)*bestLabelPoints)
  thirdPerson= "Buddy"
  thirdScore = ((numThingsToTeach-2)*bestTeachPoints) + ((numTrials - numThingsToTeach - realTrialsPerObj)*bestLabelPoints)

  firstSeed = bestPerson + ": " + bestScore + " points"
  secondSeed = secPerson +": " + secScore + " points"
  thirdSeed = thirdPerson + ": " + thirdScore + " points"
  leaderboard = "<br><br>" + firstSeed +"<br>" + secondSeed+"<br>" +thirdSeed
// end leaderboard



var progressBars = document.getElementsByClassName('progress-bar');
  // alert(preload(imgArray, 'tabletobjects/', 0));
  // preload(attentionArray, 'tabletobjects/');
  // preload(familiarArray, 'images/familiar/');
exposureArray = exposureStimuli(imgArray);


shuffle(familiarArray)
gameArray = gameStimuli(imgArray);

  //get full number of 'slides' to increment progress bar
var totalSlides = 1 + 1 + exposureStimuli(imgArray).length + 1 + imgArray.length + 1 + 1 + gameArray.length + 1 + 1;
console.log(totalSlides)
console.log(progressBars.length)


             
  showSlide("welcome");
  $("#conditionHTML").hide()
    if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {document.getElementById("welcomeStart").disabled=true}
    else {
      $("#welcomeStart").hide()
      // document.getElementById("welcomeStart").innerHTML = "(press 'Enter' to begin) <br> (if nothing happens, click inside this window and try again)"
        $("#welcomeStart").show()
        document.getElementById("welcomeStart").disabled=true
        document.getElementById('consented').onchange = function() {
          if(document.getElementById('consented').checked==true){
            document.getElementById("welcomeStart").disabled=false
            $("#welcomeStart").click(function() {
              experiment.instructions(2)
            })
          } else {
            document.getElementById("welcomeStart").disabled=true
          }
        }
  };
  slide_number = 1; 
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
	expDuration: [],
	testTrials: [],
	training: [],
	ruleQuestions: [],
  manipCheck: [],
	gameTrials: [],
	attnCheck: [],
  comments: [],

	instructions: function(slideNumber) {
    slide_number=slideNumber;
		showSlide("instructions");
    $("#beforeStudy").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
    setTimeout(function() {
        $("#beforeStudy").show();
        $(window).on('keyup', function(event){
          if(event.keyCode == 13) {
            $(window).off("keyup")
            experiment.exposure(slideNumber+1)
          }
        })
    }, 4000)
	},

	//transition from instruction slide to the exposure phase
	exposure: function(slideNumber) {
    $(function () {
      var left = $("#my-div").css("left");
    });
    $("#paneExposures").fadeIn(250)
    $("#label").hide()
    $('#animatedPointer').hide()
    imgArrayShuffled = shuffle(imgArray.slice(0))
    count=0
    var index=0;
    $('.exposuresArray').each(function() {
      this.src='tabletobjects/'+imgArrayShuffled[count]
      this.id=imgArrayShuffled[count]
      count=count+1
    })
    setTimeout(function() {
      $("#label").fadeIn(250)
      $('.exposuresArray').each(function() {
        if (this.id==exposureArray[index]) {
          this.style.border="3px solid black"
          hm = this.name
        }
      })
      box.addClass(hm)
      $('#animatedPointer').fadeIn(250)
    }, 500)

    // setTimeout(function(){console.log($("#"+exposureArray[index]).offset())},1000)
    box = $('#animatedPointer'),
    // boxMarginX = parseInt(box.css('margin-left'))
    // console.log(boxMarginX )
    count = 0

    // pointerAnimating = setInterval(function() {
    //     // console.log(boxMarginX - count)
    //     // console.log((count))
    //     count++
    //     box.css({"margin-left":  (boxMarginX - count) })
    //     // box.css({
    //     //     left: (boxMarginX - (3*count)),
    //     //     // top: function(i,v) { return newv(v, 38, 40); }
    //     // });
    // }, 20)

    slide_number=slideNumber;
		time1 = new Date().getTime()
		showSlide("exposure");
		$("#clickme").hide();
		$("#beginGame").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		// exposureArray = exposureStimuli(imgArray);
		// var exposureTrial = document.createElement("img");
		// exposureTrial.src = "tabletobjects/" + exposureArray[index];
		// exposureTrial.style.height = '400px';
		// document.getElementById('content').appendChild(exposureTrial);
		var firstlabel = document.createTextNode(pairObjectLabels(exposureArray[index]));
		document.getElementById('label').appendChild(firstlabel);
		// document.getElementById("clickme").innerHTML = "Next";
		setTimeout(function() {
      $("#clickme").fadeIn(500)
      $(window).on('keyup', function(event){
        if(event.keyCode == 13) {
          $(window).off("keyup")
    			time2 = new Date().getTime()
    			//pass trial data for eventual output
    			expDuration= {
                    phase : "exposure",
            subID : subjectIdentifier,
            speed: speedAsLag,
    				trialnum : slideNumber,
    				object: exposureArray[index],
            label: pairObjectLabels(exposureArray[index]),
    				exposureRate : getOccurences(exposureArray[index], exposureArray),
    				timestamp: getCurrentTime(), //the time that the trial was completed at 
    				duration : time2 - time1,
    				};
    			experiment.expDuration.push(expDuration);
          $("#label").fadeOut(250)
          // $("#paneExposures").fadeOut(250)
          $("#animatedPointer").fadeOut(250)
    			setTimeout(function() {box.removeClass(hm); experiment.exposures(0, slideNumber+1)}, 250)
        };
      })
    }, 1500);
	},

	exposures: function(index, slideNumber) {
    // $("#paneExposures").fadeIn(250)
    setTimeout(function() {
      $("#animatedPointer").fadeIn(250)
      $("#label").fadeIn(250)
      $('.exposuresArray').each(function() {
        if (this.id==exposureArray[i]){
          this.style.border="3px solid black"          
        }
      })
    }, 500)
    slide_number=slideNumber;
		time1 = new Date().getTime()
		$("#clickme").hide();
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		var $img = $("img"), speed = 200;
		i= index + 1;
    // imgArrayShuffled = shuffle(imgArray.slice(0))

    // setTimeout(function(){
      count=0
      $('.exposuresArray').each(function() {
        // this.src='tabletobjects/'+imgArrayShuffled[count]
        // this.id=imgArrayShuffled[count]
        this.style.border=''
        if (this.id==exposureArray[i]) {
          // this.style.border="3px solid black"
          hm = this.name
          // console.log(hm)
        }
        count++
      })


    // }, 1000)
    box = $('#animatedPointer'),
    box.addClass(hm)
		ar = exposureArray;
    // console.log("change this back")
    debugging ? lastExposure = 3 : lastExposure = ar.length;
		if (i < lastExposure) {
		  	newPic= ar[i];
			// document.getElementById('content').removeChild(
			// 	document.getElementById('content').lastChild);
			document.getElementById('label').removeChild(
				document.getElementById('label').lastChild);
			var newLabel = document.createTextNode(pairObjectLabels(newPic));
			var newImage = document.createElement("img");
			newImage.src = "tabletobjects/" + newPic;
			newImage.style.height = '400px';
			// document.getElementById('content').appendChild(newImage);
			document.getElementById('label').appendChild(newLabel);
			$("#content").fadeIn(speed);
			// $("#label").fadeIn(speed);

      // box.removeClass(hm)

			setTimeout(function() {
        $("#clickme").fadeIn(500)
        $(window).on('keyup', function(event){
          if(event.keyCode == 13) {
            $(window).off("keyup")
      				time2 = new Date().getTime();
      				expDuration= {
      					phase : "exposure",
                  subID : subjectIdentifier,
                  speed: speedAsLag,
      					trialnum : slideNumber,
      					object: newPic,
                label: pairObjectLabels(newPic),
      					exposureRate : getOccurences(newPic, exposureArray),
      					timestamp: getCurrentTime(), //the time that the trial was completed at 
      					duration : time2 - time1,
      					};
      				experiment.expDuration.push(expDuration);
              $("#label").fadeOut(250)
              $("#animatedPointer").fadeOut(250)
              // $("#paneExposures").fadeOut(250)
              setTimeout(function() {
                box.removeClass(hm)
      				  experiment.exposures(i, slideNumber+1)
              }, 250)
          }
        })
      }, 1500);
		} else if (i >= lastExposure) {
      box.removeClass(hm)
			experiment.pretest(slideNumber);
	}},

	pretest: function(slideNumber) {
    slide_number=slideNumber;
		showSlide('pretest');
    $("#beginTest").hide()
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		shuffle(imgArray);
		setTimeout(function() {
      $("#beginTest").fadeIn()
      $(window).on('keyup', function(event){
        if(event.keyCode == 13) {
          $(window).off("keyup")
          experiment.test(0, slideNumber+1)
        }
      })
    }, 2000);
	},

	test: function(testNumber, slideNumber) {
    slide_number=slideNumber;
		time1 = new Date().getTime();
		showSlide('test');
    $("#nextObject").hide()
		document.getElementById('progressBar').style.width= String(31 + testNumber * .5) + "%" ;
		document.getElementById('testInput').value = '';
		document.getElementById('testInput').disabled=false;
    $("#testInput").focus()
		document.getElementById('notSure').disabled=false;
		document.getElementById('notSure').checked=false;
		// document.getElementById('nextObject').disabled=true;
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
    // console.log("change this back too")
    debugging ? lastTest= 2 : lastTest= imgArray.length;
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
		if (testNumber < lastTest) {
			document.getElementById("testInput").onkeyup = function() {
				if (document.getElementById("testInput").value =="") {
					document.getElementById('notSure').disabled = false;
          $("#nextObject").fadeOut()
				} else {
					document.getElementById('notSure').disabled = true;
          $("#nextObject").fadeIn()
				}
			};
			document.getElementById('notSure').onchange = function() {
				if(document.getElementById('notSure').checked) {
					document.getElementById('testInput').disabled=true;
          $("#nextObject").fadeIn()
					notKnown=1;
				} else {
					document.getElementById('testInput').disabled=false;
          $("#nextObject").fadeOut()
					notKnown=0;
				}
			}
			document.getElementById("testObject").innerHTML = getOrderedImage(imgArray, basePath, testNumber);
			// if (blah != '') {
			// 	document.getElementById("nextObject").disabled = true;
			// }
      $(window).on('keyup', function(event){
        var blah = document.getElementById('testInput').value.toLowerCase().trim();
        if(event.keyCode == 13) {
          if(blah == '' && (document.getElementById('notSure').checked==false)) {return false
          } else {
            $(window).off('keyup')
    				candidate='';
    				time2 = new Date().getTime();
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
    				if(document.getElementById('notSure').checked) {blah = "UNKNOWN"; testCorrect='UNKNOWN'}
    				//pass trial data for eventual output
    				testTrials= {
    					phase : "test",
                  subID : subjectIdentifier,
                  speed: speedAsLag,
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
          }
  			};
      })
		} if (testNumber >= lastTest) {
			experiment.prestudy(slideNumber);
		};
	},

	prestudy: function(slideNumber) {
    $(window).off("keyup")
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
			// document.getElementById("clickme").removeAttribute("onclick");
			for(var i = 0; i<progressBars.length; i++) {
				progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
			}
			document.getElementById("beginGame").innerHTML = "Check My Answers";
			var myPoints = document.createTextNode(0);
				document.getElementById('myScore').appendChild(myPoints);
		
    // (hideous) series of timing events to walk through examples that illustrate the game rules
    // creates a little 'video.' would be so much easier to adjust if we could pass a variable TIMER as the ms for the timeout,
    //      but i haven't been able to write it that way because of the way setTimeout operates. 
    $(window).on('keyup', function(event){
      var blah = document.getElementById('testInput').value.toLowerCase().trim();
      if(event.keyCode == 13) {
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
  			document.getElementById("clickText").innerHTML="<br> <br> Your partner will only see the six objects."
        document.getElementById("shoe").style.border= ""
        document.getElementById("shoe").style.outline= ""
  			
        //general rules
  			setTimeout(function() {$("#clickText").fadeIn(500)}, 4000)			
  			// document.getElementById('ifRight').innerHTML ="If your partner selects the target based on your message, you will earn <strong> points</strong>. <br> But if your partner gets it wrong, you won't get any points."
        // document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br> typing, <br> pointing, <br> typing and pointing"
        document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br>typing,<br>pointing,<br>teaching "
  			setTimeout(function() {$("#timerText").fadeIn(500)}, 7000)
        setTimeout(function() {
          // $("#gameReady").fadeIn(500)
          $("#pressEnterEx").show()
          $(window).on('keyup', function(event){
            if(event.keyCode == 13) {
              $(window).off("keyup")
              experiment.prestudyTypeRight(slideNumber)
            }
          })
        }, 11000)
      }
      // document.getElementById("gameReady").innerHTML = "Got it So Far"

      // document.getElementById("gameReady").onclick = function() {
      //   experiment.prestudyTypeRight(slideNumber)
      // }
    })
  },

  prestudyTimer: function(slideNumber, ifStart) {
    document.getElementById("ifTyping").value = "";
    document.getElementById("shoe").style.border= "";
    document.getElementById("shoe").style.outline= "";
    slide_number=slideNumber;  
    showSlide("prestudy");
    $("#tryThatAgain").hide()
    $("#sendMessageDemo").hide();
    $("#exampleText").hide();
    $("#howToPlay").hide();
    $("#typingExample").hide();
    $("#clickText").hide()
    $("#exampleTarget").fadeIn(500)
    $("#clickArray").hide()
    $("#generalInst").fadeIn(500)
    $("#pressEnterEx").hide()
    $("#pointerEx").hide()
    $("#ifClick").hide()


    // console.log('timerText')
    $("#timerText").fadeOut(500)
        $("#gameReady").hide()
        $("#clickText").fadeOut(500)
        $("#ifRight").fadeOut(500)

    setTimeout(function() {
      document.getElementById("timerText").innerHTML = "<br> Whatever message you send, you will earn points based on how long it takes you to send your message."
      $("#timerText").fadeIn(500)
    }, 500)
    setTimeout(function() {
      initializeTimer("countdownExample", 30, true)
      $("#ifRight").fadeIn(500)
      document.getElementById("ifRight").innerHTML = "A timer at the top of your screen shows roughly how many points you could still win (always >= 10 points)."
    }, 3500)
    setTimeout(function() {
      document.getElementById("ifRight").innerHTML = "A timer at the top of your screen shows roughly how many points you could still win (always >= 10 points).<br> <strong>The timer starts when you press a key.</strong>"
    }, 7500)

    setTimeout(function() {
      // $("#pressEnterEx").show()
      // $(window).on('keyup', function(event){
      //   if(event.keyCode == 13) {
      //     $(window).off('keyup')
      //     if(ifStart) {
      //       stopTimer("countdownExample")
      //     }
      //     experiment.prestudyType(slideNumber, true)
      //   }
      // })
      $("#ifRight").fadeOut(500) 

    
      setTimeout(function() {
        $("#ifRight").fadeIn(500)
        // document.getElementById('ifRight').innerHTML = "Try those examples again with the timer <br> in 3..."
        document.getElementById('ifRight').innerHTML = "Try those examples again with the timer <br> in <strong><font color='red'>3</font></strong>, 2, 1..."
      }, 500)
      setTimeout(function() {
        // document.getElementById('ifRight').innerHTML = "Try those examples again with the timer <br> in 3, 2..."
        document.getElementById('ifRight').innerHTML = "Try those examples again with the timer <br> in 3, <strong><font color='red'>2</font></strong>, 1..."
      }, 1500)
      setTimeout(function() {
        document.getElementById('ifRight').innerHTML = "Try those examples again with the timer <br> in 3, 2, <strong><font color='red'>1...</font></strong>"
        $("#ifRight").fadeOut(250) 
      }, 2500)
    }, 11500)


    setTimeout(function() {
      time1 = new Date().getTime()
      $("#typingExample").fadeIn(500)
      $("#ifTypePoints").fadeIn(500)
      document.getElementById("ifType").innerHTML = "You can type here:"
      $("#ifTyping").focus()
      document.getElementById("ifTypePoints").innerHTML = "(try sending 'shoe' again)"
      isClockOn = false
      $(window).on('keydown', function(event) {
        if(ifStart) {
          if (isClockOn == false) {
            startTimer("countdownExample")
            isClockOn = true
          }
        }
      })
      $(window).on('keyup', function(event){
        if(event.keyCode == 13) {
          console.log(levDist(document.getElementById("ifTyping").value, "shoe"))
          if (levDist(document.getElementById("ifTyping").value, "shoe") > 2) {
            $("#tryThatAgain").fadeIn(500)
            setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 1500)
          } else {
          	time2 = new Date().getTime()
          	shoeDurationClock = time2-time1
          	console.log(shoeDurationClock)
            $(window).off("keyup")
            stopTimer("countdownExample")
            $("#tryThatAgain").fadeOut(500)
            if(ifStart) {
              // var pointsEx= Math.floor(timeRemaining*convertTimeToPoints)*10
              var pointsEx = timeToPointsConverter(shoeDurationClock, convertTimeToPoints)
              document.getElementById('ifClick').innerHTML ="Based on the time left on the clock, <br> you would end up with <strong>" + (pointsEx) + " points</strong>."
              $("#ifClick").fadeIn(500)
            }
            document.getElementById("shoe").style.outline="3px dashed red"
            setTimeout(function() {
              $("#pressEnterEx").show()
              $(window).on('keyup', function(event){
                if(event.keyCode == 13) {
                  $(window).off("keyup")
                  experiment.prestudyClick(slideNumber, true)
                }
              })
            }, 2000)
          }
        }
      })
    }, 15000)



  },

  prestudyTypeRight: function(slideNumber, clockOnIfTrue) {
    slide_number=slideNumber;  
    showSlide("prestudy");
    $("#tryThatAgain").hide()
    $("#sendMessageDemo").hide();
    $("#exampleText").hide();
    $("#howToPlay").hide();
    $("#typingExample").hide();
    $("#clickText").hide()
    $("#exampleTarget").fadeIn(500)
    $("#clickArray").fadeIn(500)
    $("#generalInst").fadeIn(500)
    $("#pressEnterEx").hide()
    // $("#timerText").hide()
    document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br> <strong> typing, </strong><br> pointing, <br>teaching "

    isClockOn =false
    $(window).on('keydown', function(event){
      if (clockOnIfTrue==true && isClockOn==false) {
        startTimer("countdownExample")
        isClockOn=true
      }
    })

      //typing example, right message
        // document.getElementById("ifType").innerHTML="You can send a message by typing the object's label here...";
        document.getElementById("ifType").innerHTML="try typing 'shoe' here";
        document.getElementById('ifTypePoints').innerHTML =""
        $("#gameReady").hide()
        $("#clickText").fadeOut(500)
        $("#ifRight").fadeOut(500)
        //typing example, right message
        setTimeout(function() {
                    $("#typingExample").fadeIn(500)
                    document.getElementById("ifTyping").focus(); 
                    time1= new Date().getTime();
                    }, 500)
        setTimeout(function() {
          document.getElementById('ifTypePoints').innerHTML ="(type 'shoe' in the box above!) <br> press 'Enter' to send your message"
          document.getElementById('ifTypePoints').innerHTML ="press 'Enter' to send your message"
          $("#ifTypePoints").fadeIn(500);
        }, 2000)
  			// setTimeout(function() {document.getElementById("ifTyping").value="s"}, 500)
  			// setTimeout(function() {document.getElementById("ifTyping").value="sh"}, 700)
  			// setTimeout(function() {document.getElementById("ifTyping").value="sho"}, 900)
  			// setTimeout(function() {document.getElementById("ifTyping").value="shoe"}, 1100)
        // try it yourself demonstration
        // setTimeout(function() {$("#sendMessageDemo").fadeIn(500)}, 3000)
      $(window).on('keyup', function(event){
        if(event.keyCode == 13) {
          // if they don't type shoe, display a little reminder
          if (levDist(document.getElementById("ifTyping").value, "shoe") > 2) {
            $("#ifTypePoints").addClass('redText');
            $("#tryThatAgain").fadeIn(500)
            setTimeout(function() {$("#tryThatAgain").fadeOut(500)
              $("#ifTypePoints").removeClass('redText')
              }, 2500)
            return false
          } else {
          	time2 = new Date().getTime();
          	console.log(time2 - time1)
            responseTime = time2-time1
            if(clockOnIfTrue==true){ stopTimer("countdownExample") }
            $(window).off('keyup')
            document.getElementById("ifTypePoints").innerHTML=""
            $("#sendMessageDemo").hide()
            // partner's selection
            setTimeout(function() {document.getElementById('clickText').innerHTML ="<br> <br> You will then be shown what your partner selected."
                $("#clickText").fadeIn(500)
              }, 500)
            setTimeout(function() {document.getElementById("shoe").style.outline = "3px red dashed";}, 1500)
            setTimeout(function() {
              if(clockOnIfTrue) {
                var pointsEx = timeToPointsConverter(responseTime, convertTimeToPoints)
                document.getElementById('ifClick').innerHTML ="Since your partner chose the target and you had " + (pointsEx) + "  points on the clock, <br> you would end up with <strong>" + (pointsEx) + " points</strong>."
              } else {document.getElementById('ifClick').innerHTML ="<br> <strong>Nice! Your partner knows what 'shoe' is and figured it out! </strong>"}
                $("#ifClick").fadeIn(500)}, 2500)
            setTimeout(function() {document.getElementById("gameReady").innerHTML = "Still With You";
                    // $("#gameReady").fadeIn(500)
                  $("#pressEnterEx").show()
              $(window).on('keyup', function(event){
                if(event.keyCode == 13) {
                  $(window).off("keyup")
					if (clockOnIfTrue==true) {shoeDurationClock = time2-time1
					} else {shoeDuration=time2-time1}
                  experiment.prestudyClick(slideNumber)
                }
              })
            }, 5000)
          }

        }
        // document.getElementById("gameReady").onclick = function() {
        //   experiment.prestudyTypeWrong(slideNumber)
        // }
      })
  },

  prestudyTypeWrong: function(slideNumber, clockOnIfTrue) {
    document.getElementById("shoe").style.border= ""
    document.getElementById("shoe").style.outline= ""
    slide_number=slideNumber;  
    showSlide("prestudy");
    $("#tryThatAgain").hide()
    $("#sendMessageDemo").hide();
    $("#exampleText").hide();
    $("#howToPlay").hide();
    $("#typingExample").hide();
    $("#clickText").hide()
    $("#exampleTarget").fadeIn(500)
    $("#clickArray").fadeIn(500)
    $("#generalInst").fadeIn(500)
    $("#pressEnterEx").hide()
    $("#timerText").hide()
    $("#ifRight").hide()
    $("#typingExample").hide();

    if (clockOnIfTrue==true) {
      initializeTimer("countdownExample", 30, true)
    }
    hasClockStarted =false
    $(window).on('keydown', function(event){
      if (clockOnIfTrue==true && hasClockStarted ==false) {
        startTimer("countdownExample")
        hasClockStarted = true
      }
    })

        //typing exmaple, wrong messsage
          $("#gameReady").hide()
          //fade out old stuff
    			$("#typingExample").fadeOut(500)
                $("#clickText").fadeOut(500)
                $("#ifClick").fadeOut(500)
          //typing exmaple, wrong messsage
    	  setTimeout(function() {
              document.getElementById("shoe").style.border= ""
              $("#typingExample").fadeIn(500);
              $("#pointerEx").hide();
    					document.getElementById("ifTyping").value=""; 
    					document.getElementById("ifClick").innerHTML="But if your partner gets it wrong based on your message...";
              document.getElementById("ifType").innerHTML='(try typing "chair" below)'
              $("#ifClick").fadeIn(500)
              // $("#ifTypePoints").fadeIn(500);
              document.getElementById("ifTyping").focus(); 
              time1 = new Date().getTime();
          }, 500)

          // diy example
          $(window).on('keyup', function(event){
            if(event.keyCode == 13) {
              // if they don't type chair, display a little reminder
              if (levDist(document.getElementById("ifTyping").value, "chair") > 2) {
                $("#ifTypePoints").addClass('redText');
                $("#tryThatAgain").fadeIn(500)
                setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
                return false
              } else {
              	time2 = new Date().getTime();
                if (clockOnIfTrue==true) {stopTimer("countdownExample")}
                $(window).off("keyup")
                $("#ifTypePoints").hide()
                $("#sendMessageDemo").hide()
                document.getElementById("ifClick").innerHTML="But if your partner gets it wrong based on your message... <br> You will earn <strong> 0 points</strong> regardless of how many seconds are left."
                setTimeout(function() {$("#ifClick").fadeIn(500)}, 1500)
                setTimeout(function() {document.getElementById("chairDistractor").style.border= "3px red dashed"}, 500)
                setTimeout(function() {
                  document.getElementById('pressEnterEx').innerHTML="<br>Press 'Enter' to Continue"
                  $("#pressEnterEx").show()
                  $(window).on('keyup', function(event){
                    if(event.keyCode == 13) {
					  if (clockOnIfTrue==true) {chairDurationClock= time2 - time1
					  } else {chairDuration = time2-time1}

    					training= {
	    					phase : "training",
	                  		subID : subjectIdentifier,
	                  		speed: speedAsLag,
	                  		partnersExposure: partnersExposure,
	    					timestamp: getCurrentTime(), //the time that the trial was completed at 
	    					shoeDuration: shoeDuration,
	    					shoeDurationClock: shoeDurationClock,
	    					clickDuration: clickDuration,
	    					clickDurationClock: clickDurationClock,
	    					bothDuration: bothDuration,
	    					bothDurationClock: bothDurationClock,
	    					chairDurationClock:chairDurationClock,
	    				};
	    				experiment.training.push(training);					  

                      $(window).off("keyup")
                      experiment.partnering(slideNumber+1)
                    }
                  })
                  // document.getElementById("gameReady").innerHTML = "Got It";
                  // $("#gameReady").fadeIn(500)
                }, 3000)
              }
              // document.getElementById("gameReady").onclick = function() {
              //       experiment.prestudyClick(slideNumber)
              // }
            }
          })
  },

  prestudyClick: function(slideNumber, clockOnIfTrue) {
    document.getElementById("chairDistractor").style.border= ""
    document.getElementById("shoe").style.outline= ""
    slide_number=slideNumber;  
    // adding these hide/show lines allows us to jump around to this specific example during testing
        // it seems repetative, but it needs to be so that the proper things are always showing?
    showSlide("prestudy");
    $("#tryThatAgain").hide()
    $("#sendMessageDemo").hide();
    $("#exampleText").hide();
    $("#howToPlay").hide();
    $("#typingExample").hide();
    $("#clickText").hide()
    $("#exampleTarget").fadeIn(500)
    $("#clickArray").fadeIn(500)
    $("#generalInst").fadeIn(500)
    $("#pointerEx").fadeIn(500)
    $("#pressEnterEx").hide()
    $("#ifClick").hide()
          // $("#pointerEx").hide()


      document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br> <strike> typing,</strike><br> <strong> pointing,</strong><br>teaching"
      if (clockOnIfTrue) {$("#timerText").hide()}
      $(window).off("keyup")

          //clicking example
          // diy

                // this chunk of code enables the user to control the pointer now
                enterPressed=false;
                var paneEx = $('#paneEx'),
                    pointerEx = $('#pointerEx'),
                    w = 600 - pointerEx.width(),
                    d = {},
                    x = 1;
                pointerEx.css({
                  left: "170px",
                  top: "200px"
                });  

                function newv(v,a,b) {
                    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
                    return n < 0 ? 0 : n > w ? w : n;
                }
                isClockOn=false
                $(window).keydown(function(e) { 
                  d[e.which] = true; 
                  if (clockOnIfTrue==true && isClockOn==false) {
                    startTimer("countdownExample")
                    isClockOn=true
                  }
                });
                $(window).keyup(function(e) { d[e.which] = false; });
                 detectMovementInterval= setInterval(function() {
                    pointerEx.css({
                        left: function(i,v) { return newv(v, 37, 39); },
                        top: function(i,v) { return newv(v, 38, 40); }
                    });
                }, speedAsLag);
                detectHoverInterval = setInterval(function() {
                      rect1 = document.getElementById("pointerEx").getBoundingClientRect()
                      $('.famObjects').each(function() {
                        rect2 = this.getBoundingClientRect()
                        //this code determine the object that the 'pointer ' is hovering over
                        if((rect1.top > rect2.top) && (rect1.top < rect2.bottom) &&
                                      (rect1.left+40 > rect2.left) && (rect1.left+40 < rect2.right))
                          {this.style.border = "5px solid black"
                        }
                        else {this.style.border = ''}
                      })
                    }, 20)
                // detect enter events and handle
                $(window).on('keyup', function(event){
                  if(event.keyCode == 13) {
                      // scan each of the possible objects to figure out which one we are talking about
                      $('.famObjects').each(function() {
                        if(this.style.border== "5px solid black") {
                          demoSelection=this.id;

                            if (demoSelection != 'shoe') {
                              document.getElementById("ifTyping").focus(); 
                              $("#ifTypePoints").addClass('redText');
                              $("#tryThatAgain").fadeIn(500)
                              setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
                              return false
                            } else {
                                time2 = new Date().getTime();
              					         console.log(time2-time1)
                                clickExTime= time2-time1
                              $("#pressEnterEx").hide()
                              if (clockOnIfTrue==true) {stopTimer("countdownExample")}
                              enterPressed = true;
                              $("#ifClick").fadeOut(500)
                              // this prevents pointer movement because that is now broken
                              clearInterval(detectMovementInterval)
                              clearInterval(detectHoverInterval)
                              document.getElementById("shoe").style.border= "5px solid black"
                                $("#pointerEx").fadeOut(500)
                                  //prevent more enter events
                                      // this isn't the best method cause it will also break the pointer movement code, so we will have to redfine that later.
                                      // is there a better method (i.e. that can more specifically target the enter keyup events)?
                                $(window).off("keyup")


                              $("#ifTypePoints").hide()
                              $("#sendMessageDemo").hide()
                              setTimeout(function() {
                                document.getElementById("shoe").style.outline= "3px red dashed"
                                document.getElementById("shoe").style.zIndex= "1"
                              }, 500)
                              setTimeout(function() {
                                if (clockOnIfTrue==true) {
                                  var pointsEx = timeToPointsConverter(clickExTime, convertTimeToPoints)
                                  document.getElementById("ifClick").innerHTML="you would end up with <strong>"+(pointsEx)+" points </strong> <br> when your partner gets it right."
                                } else {
                                  document.getElementById("ifClick").innerHTML="<br> <strong>Cool! Your partner understood your message.</strong"
                                }
                                $("#ifClick").fadeIn(500)
                              }, 1000)
                              setTimeout(function() {
                                  document.getElementById("pressEnterEx").innerHTML="Press 'Enter' to Continue"
                                $("#pressEnterEx").show()
                                $(window).on('keyup', function(event){
                                  if(event.keyCode == 13) {
                                    $(window).off("keyup")
                                    if (clockOnIfTrue) {
                                      clickDurationClock= time2 - time1
                                      experiment.prestudyDoingBoth(slideNumber, true)
                                    } else {
                                      clickDuration = time2-time1
                                      experiment.prestudyDoingBoth(slideNumber)
                                    }
                                  }
                                })
                                // document.getElementById("gameReady").innerHTML = "Anything Else?";
                                // $("#gameReady").fadeIn(500)
                                // document.getElementById("gameReady").onclick = function() {
                                //   experiment.prestudyDoingBoth(slideNumber)
                                // }

                              }, 3500)      
                            }
                          }
                        })
                      }

                  })

            // restart timer
            if (clockOnIfTrue==true) {initializeTimer("countdownExample", 30, true)}

            // this is the general set up stuff for the example
              // $('.famArray').addClass('toSelect')
            $("#ifClick").hide()
            $("#gameReady").hide()
            document.getElementById("ifClick").innerHTML="<strong>You can also send a message by using the pointer to select the object...</strong>"
            if (clockOnIfTrue) {document.getElementById("ifClick").innerHTML="Try using the pointer to select the shoe again..."}
            // fade out the old
            $("#typingExample").fadeOut(500)
            setTimeout(function() {document.getElementById("chairDistractor").style.border= ""}, 500)
            //bring in the new
            setTimeout(function() {
              $("#ifClick").fadeIn(500)
              time1 = new Date().getTime();
            }, 500)
            setTimeout(function() {
              // if someone is fast enough to do the example before this message comes in, we don't want it to show up
              if (enterPressed==false) {
                document.getElementById("ifClick").innerHTML="<strong>You can also send a message by using the pointer to select the object...</strong> <br> Move the pointer with the arrow keys, <br> then press 'Enter' to send your message"
                if (clockOnIfTrue) {document.getElementById("ifClick").innerHTML="Try using the pointer to select the shoe again..."}
                $("#ifClick").fadeIn(500)
              }
            }, 3000)
            setTimeout(function() {
              if (enterPressed==false) {
                if (! clockOnIfTrue) {
                  // document.getElementById("clickText").innerHTML="You can also send a message by selecting the object here... <br> <strong> Try selecting the shoe </strong>"
                  document.getElementById("pressEnterEx").innerHTML=" <br><br><strong> (if the pointer doesn't move, try clicking inside the window first)</strong>"
                  $("#pressEnterEx").show()
                }
              }
            }, 7000)

            // document.getElementById("gameReady").onclick = function() {
            //   experiment.prestudyDoingBoth(slideNumber)
            // }
  },



  prestudyDoingBoth: function(slideNumber, clockOnIfTrue) {
    slide_number=slideNumber;  
    // adding these hide/show lines allows us to jump around to this specific example during testing
        // it seems repetative, but it needs to be so that the proper things are always showing?
    showSlide("prestudy");
    $("#tryThatAgain").hide()
    $("#sendMessageDemo").hide();
    $("#exampleText").hide();
    $("#howToPlay").hide();
    $("#typingExample").hide();
    $("#clickText").hide()
    $("#pressEnterEx").hide()
    $("#ifRight").hide()
    // reset pointer location for next example
    setTimeout(function() {
      $("#pointerEx").fadeIn(500);  
      pointerEx.css({
        left: "170px",
        top: "200px"
      });  
    }, 500)
    document.getElementById('timerText').innerHTML ="<br><br><br>You can send a message by: <br> <strike> typing,</strike><br> <strike> pointing,</strike><br> <strong>teaching</strong>"
    $(window).off("keyup")

    // restart timer
    if (clockOnIfTrue == true ){initializeTimer("countdownExample", 30, true)}
    $("#exampleTarget").fadeIn(500)
    $("#clickArray").fadeIn(500)
    $("#generalInst").fadeIn(500)

                // need to redefine pointer movement, because we broke it above
                var paneEx = $('#paneEx'),
                    pointerEx = $('#pointerEx'),
                    w = 600 - pointerEx.width(),
                    d = {},
                    x = 1;
                function newv(v,a,b) {
                    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
                    return n < 0 ? 0 : n > w ? w : n;
                }
                isClockOn=false
                $(window).keydown(function(e) {
                  if (clockOnIfTrue==true && isClockOn==false) {
                    startTimer("countdownExample")
                    isClockOn=true
                  }
                  d[e.which] = true;
                });
                $(window).keyup(function(e) { d[e.which] = false; });
                detectMovementInterval= setInterval(function() {
                    pointerEx.css({
                        left: function(i,v) { return newv(v, 37, 39); },
                        top: function(i,v) { return newv(v, 38, 40); }
                    });
                }, speedAsLag);
                detectHoverInterval = setInterval(function() {
                      rect1 = document.getElementById("pointerEx").getBoundingClientRect()
                      $('.famObjects').each(function() {
                        rect2 = this.getBoundingClientRect()
                        //this code determine the object that the 'pointer ' is hovering over
                        if((rect1.top > rect2.top) && (rect1.top < rect2.bottom) &&
                                      (rect1.left+40 > rect2.left) && (rect1.left+40 < rect2.right))
                          {this.style.border = "5px solid black"
                        }
                        else {this.style.border = ''}
                      })
                    }, 20)


            // doing both example
              // need to reset this here, then when there's a click event it will be set anew.
              clickDemo=''
              $("#gameReady").hide()
              //get rid of the old example
              $("#clickText").fadeOut(500);
              document.getElementById("shoe").style.border= "";
              document.getElementById("shoe").style.outline= "";
              $("#ifClick").fadeOut(500);
              //bring in the last example
              $("#typingExample").fadeIn(500);
              $("#ifTypePoints").fadeIn(500);
              document.getElementById("ifTyping").focus(); 
              document.getElementById("ifTyping").value=""; 
              document.getElementById("ifTypePoints").innerHTML="(try typing 'shoe' and selecting that object)"; 
              document.getElementById("ifType").innerHTML="You can also teach by sending both messages..."
              if(clockOnIfTrue==true)  {document.getElementById("ifType").innerHTML="Try teaching again..."}
              if(clockOnIfTrue==true)  {document.getElementById("ifTypePoints").innerHTML="(type 'shoe' and select that object)"}
              time1 = new Date().getTime();
              // diy demo


                // detect enter events and handle
                $(document).ready(function() {
                  $(window).on('keyup', function(event){
                    if(event.keyCode == 13) {
                      hasClicked=false
                      // scan each of the possible objects to figure out which one we are talking about
                      $('.famObjects').each(function() {
                        if(this.style.border== "5px solid black") {
                          hasClicked=true
                          demoSelection=this.id;
                            // if they don't type shoe and/or don't click the shoe, display a little reminder
                            if (demoSelection!= 'shoe' || levDist(document.getElementById("ifTyping").value, "shoe") > 2) {
                              $("#ifTypePoints").addClass('redText');
                              $("#tryThatAgain").fadeIn(500)
                              setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
                              // return false
                            } else {
                            	time2 = new Date().getTime();
				              	console.log(time2-time1)
								if (clockOnIfTrue==true) {
									bothDurationClock= time2 - time1
								} else {
									bothDuration = time2-time1
								}
                                $(window).off("keyup")
                                if (clockOnIfTrue==true) {stopTimer("countdownExample")}
                                // this prevents pointer movement because that is now broken
                                clearInterval(detectMovementInterval)
                                //also clears hovering, important because we want the 'selected' border to remain and the hovering code requires the pointer to do this
                                clearInterval(detectHoverInterval)
                                document.getElementById("shoe").style.border= "5px solid black"
                                $("#pointerEx").fadeOut(500)
                                  //prevent more enter events
                                      // this isn't the best method cause it will also break the pointer movement code, so we will have to redfine that later.
                                      // is there a better method (i.e. that can more specifically target the enter keyup events)?

                              $("#ifTypePoints").hide()
                              $("#sendMessageDemo").hide()
                                setTimeout(function() {
                                        document.getElementById("gameReady").innerHTML = "I'm Ready"
                                        document.getElementById("shoe").style.outline= "3px red dashed"
                                      }, 500)
                                setTimeout(function() {
                                        if (clockOnIfTrue) {
                                          var pointsEx = timeToPointsConverter(bothDurationClock, convertTimeToPoints)
                                          document.getElementById("ifClick").innerHTML="You end up with <strong>" + (pointsEx) + " points</strong> and your partner learned this is a 'shoe.'"
                                        } else {document.getElementById("ifClick").innerHTML="<strong>Your partner figured it out here too <br> and you taught him this was called a 'shoe.'</strong>"}
                                      $("#ifClick").fadeIn(500)
                                      }, 1500)
                                setTimeout(function() {
                                  // $("#gameReady").fadeIn(500)
                                  $("#pressEnterEx").show()
                                  $(window).on('keyup', function(event){
                                    if(event.keyCode == 13) {
                                      $(window).off("keyup")
                                        // experiment.partnering(slideNumber+1)
                                        if (clockOnIfTrue) {
                                          experiment.prestudyTypeWrong(slideNumber, true)
                                        } else {
                                          experiment.prestudyTimer(slideNumber, true)
                                        }
                                    }
                                  })
                                  // issue where if you get referred to back to watching the instructions again, the on click function call doubled up and negated itself
                                  $(".toSelect").unbind()
                                }, 2500)
                                // document.getElementById("gameReady").onclick = function() {
                                //   experiment.partnering(slideNumber)
                                // }
                              }
                            } 
                          }) 
                            if (hasClicked == false) {
                                if (document.getElementById("ifTyping").value != '') {
                                  $("#ifTypePoints").addClass('redText');
                                  $("#tryThatAgain").fadeIn(500)
                                  setTimeout(function() {$("#tryThatAgain").fadeOut(500)}, 2500)
                                }
                            }
                        }
                      })
                    })          
  },

      


  //           }
  //         }
  //       }			
  //     }

		// }
  // },

  //no longer using this slide, because we removed point values in this version
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
				    $('.gameQuestion').on("keyup click change", function() {
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
              speed: speedAsLag,
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
						setTimeout(function() {
              experiment.partnering(0, 0, slideNumber+2)
            }, 800);
						// document.getElementById("beginGame").onclick = function() {experiment.partnering(0, 0, slideNumber+2)};
					}		
				}
		// experiment.game(0, 0, slideNumber+2)
		// button.onclick("click", Functionsion() {experiment.exposures(i)});
		// $("#clickme").on("click", function() {experiment.exposures(i)});
	},

	partnering: function(slideNumber) {
    $(window).off("keyup")
    slide_number=slideNumber;
		showSlide("getYourPartner");
    $(".howManyTimes").hide()
    $("#squareExamples").hide()
		$("#spinner").hide();
    $('#userName').focus()
    $('#gameStartFinal').hide()
		document.getElementById("gameStartFinal").innerHTML = "Press 'Enter' to Find a Partner";
		// this event handler checks the input, and when they have content, enables the button
		$('#userName').on("keyup click change", function() {
				        var empty = false;
				            if ($(this).val() == '') {
				                empty = true;
				            }				      
				        if (empty) {
                    $('#gameStartFinal').fadeOut();
				        } else {
                    $('#gameStartFinal').show();
				        }
		});
    $(window).on('keyup', function(event){
      if(event.keyCode == 13) {
        if($('#userName').val() != '') {
          $(window).off("keyup")      
          $('#gameStartFinal').hide()
          $("#partneringHeadingStuff").addClass("blink_me")
          document.getElementById("partneringHeading").innerHTML= "Okay, <strong>" + $("#userName").val()+ "</strong>, we are searching now! "
    			document.getElementById("partneringHeading").style.margin = "-50px 0 0 0"
          $("#userName").hide();
    			// document.getElementById("partneringText").innerHTML = "Okay, <strong>" + $("#userName").val()+ "</strong>, we are searching now!"
          document.getElementById("partneringText").innerHTML = "Note that you saw the objects and their labels <strong> "+ exposureStimuli(imgArray).length +" times </strong> "
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
          // setTimeout(function() {$("#squareExamples").fadeIn(500)}, 3000)

          // we found a partner!
    			setTimeout(function() {$("#partneringHeadingStuff").fadeOut(501)}, searchTime - 500)
    			setTimeout(function() {
            document.getElementById("exposureText").innerHTML= "We found you a partner called <strong>"+partnersName+"</strong>! <br>"
            document.getElementById("exposureText").style.margin = "-50px 0 0 0"
    				// document.getElementById("partneringText").innerHTML= "<br><br>"
              $("#squareExamples").fadeIn(500)
              $("#fewer").fadeOut(0)
              $("#none").fadeOut(0)
              $("#same").fadeOut(0)
              $("#double").fadeOut(0)
    				if (partnersExposure=="0") { 
              checkCorrect = "none"
              // $("#fewer").css("visibility", "hidden")
              setTimeout(function() {
                $("#none").fadeIn(500)
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
            console.log('flag1')
            if (partnersExposure=="perfect") {
                          console.log('flag2')

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
    				document.getElementById("gameStartFinal").innerHTML= "Press 'Enter' to Move On!"
    				setTimeout(function() {$("#gameStartFinal").fadeIn(1000)
              $(window).on('keyup', function(event){
                if(event.keyCode == 13) {
                  $(window).off("keyup")
                  experiment.partneringCheck(slideNumber, $("#userName").val())
                }
              })
            }, 4000);
    			}, searchTime)
        }
		  }
    })
	},

  partneringCheck: function(slideNumber, username) {
    // alert('debugging, so i assigned a value for partners knwoeldge');
    // var checkCorrect='double';
    // var messageAboutPartner = "coolio";

    // (function($) {
    //   $.fn.randomize = function(tree, childElem) {
    //     return this.each(function() {
    //       var $this = $(this);
    //       if (tree) $this = $(this).find(tree);
    //       var unsortedElems = $this.children(childElem);
    //       var elems = unsortedElems.clone();
          
    //       elems.sort(function() { return (Math.round(Math.random())-0.5); });  

    //       for(var i=0; i < elems.length; i++)
    //         unsortedElems.eq(i).replaceWith(elems[i]);
    //     });    
    //   };
    // })(jQuery);

    // $("div.band").randomize("table tr td", "div.member");
    // $("div.band").randomize("table tr td", "div.times");

    var manipulationChecked= null
    slide_number=slideNumber;
    showSlide("getYourPartner");
    $("#spinner").hide();
    $(".howManyTimes").hide()
    $('#gameStartFinal').hide()
    document.getElementById("gameStartFinal").innerHTML = "Press 'Enter' to Find a Partner";
    // this event handler checks the input, and when they have content, enables the button
    $('#gameStartFinal').hide()
    $("#partneringText").hide()
    $("#partneringHeadingStuff").hide()
    $("#exposureVisualization").hide()
    $("#userName").hide();
    document.getElementById("exposureText").innerHTML= "<br> Wait a second, how many times did <strong>"+partnersName+"</strong> see the objects? <br> <br>"
    $("#exposureText").fadeIn(500);
    // $("#squareExamples").fadeOut(500)
    // document.getElementById("fewerText").innerHTML= "half as many times as you"
    // document.getElementById("noneText").innerHTML= "never seen them before"
    // document.getElementById("sameText").innerHTML= "as many times as you"
    // document.getElementById("doubleText").innerHTML= "twice as many times as you"

    // arrowKeySelection("member")
    document.getElementById("userName").value = ''
    $("#squareExamples").hide()
    document.getElementById("gameStartFinal").innerHTML= "Press 'Enter' to Move On!"
    //free response manip check
    setTimeout(function(){
      $("#userName").fadeIn(500)
      $('#userName').focus()
      $("#gameStartFinal").fadeIn(500)
    }, 1000)

    $(window).on('keyup', function(event){
      if(event.keyCode == 13) {
        if($('#userName').val() != '') {
          $('#userName').hide()
          $(window).off("keyup")
          manipulationChecked = $("#userName").val()
          console.log(manipulationChecked)
          $("#gameStartFinal").hide()
          // $("#exposureText").hide()
          var tense= null
          realTrialsPerObj==1 ? tense=" time" : tense=" times"
          setTimeout(function() {
            $("#exposureText").html("<br> NOTE: You will be asked to send messages to your partner about each object <strong>"+ realTrialsPerObj+ tense +".</strong> <br><br>") 
            setTimeout(function(){
              document.getElementById("userName").value = ''
              $("#userName").fadeIn(500)
              $("#userName").focus()
              $("#gameStartFinal").fadeIn(1000)
              $("#gameStartFinal").html("Press 'Enter' to Move On!")
              $("#exposureText").append("<br><br> Just checking, how many times will you talk about each object?")
              $(window).on('keyup', function(event){
                if(event.keyCode == 13 & document.getElementById("userName").value != "") {
                  $(window).off("keyup")
                  $("#userName").hide()
                  $("#exposureText").hide()
                  $("#gameStartFinal").hide()
                  setTimeout(function() {
                    console.log(manipulationChecked + "   " + document.getElementById("userName").value)

                                  manipCheck = {
                                    subID : subjectIdentifier,
                                    speed: speedAsLag,
                                    partnersExposure: partnersExposure,
                                    manipResponse: manipulationChecked,
                                    manipActual: checkCorrect,
                                    numTrialsActual: realTrialsPerObj,
                                    numTrialsResponse: document.getElementById("userName").value,
                                    timestamp: getCurrentTime(),
                                  };
                                  experiment.manipCheck.push(manipCheck);
                                  setTimeout(function() {
                                    $("#exposureText").html("<br><strong>And finally-- Let's play the game!</strong><br>")
                                    $("#exposureText").append("<br><br> Here is a leaderboard of our best players so far:")
                                    $("#exposureText").append(leaderboard)
                                    $("#exposureText").fadeIn(500)
                                    $("#gameStartFinal").fadeIn(500)
                                    $("#gameStartFinal").html("Press Enter to Begin!")
                                    $(window).on('keyup', function(event){
                                      if(event.keyCode == 13) {
                                        $(window).off("keyup")
                                        experiment.game(0, 0, slideNumber+1, username)
                                      }
                                    })
                                  }, 1000)


                  }, 1000)
                }
              })
            }, 3000) 
          }, 1500)


        }
      }
    })


                // if they select correctly
                // $("#exposureText").css('visibility', 'hidden')
                // if (manipulationChecked == checkCorrect) {
                //   setTimeout(function() {
                //     document.getElementById("exposureText").innerHTML= "<br>That's Right- You're Ready to Play! <br><br>"
                //     $("#exposureText").css('visibility', 'visible')
                //   }, 1000)
                // } else {
                //   $(".member").each(function() {
                //     this.style.border = ""
                //   })
                //   setTimeout(function() {
                //     document.getElementById("exposureText").innerHTML= "Whoops- that's not right, "+ messageAboutPartner + "<br><br>"
                //     $(".member").each(function() {
                //     $("#exposureText").css('visibility', 'visible')
                //       if (this.id == checkCorrect) {
                //         this.style.border= "5px solid red"
                //       }
                //     })
                //   }, 1000)
                // }
    //             setTimeout(function() {
    //               setTimeout(function() {
    //                 $("#exposureText").fadeIn(500)
    //               }, 499)
    //               var tense= null
    //               realTrialsPerObj==1 ? tense=" time" : tense=" times"
    //               $("#exposureText").html("<br> You will be asked to send messages to your partner about each object <strong>"+ realTrialsPerObj+ tense +".</strong> <br><br>") 
    //               $("#gameStartFinal").show()
    //               $("#gameStartFinal").html("Press 'Enter' to Move On!")
    //               $(window).on('keyup', function(event){
    //                 if(event.keyCode == 13) {
    //                   $(window).off("keyup")
    //                  setTimeout(function() {
    //                     $("#gameStartFinal").fadeIn(500)
    //                     $("#gameStartFinal").html("Press Enter to Move On!")    
    //                     $(window).on('keyup', function(event){
    //                       if(event.keyCode == 13) {
    //                         $("#gameStartFinal").hide()
    //                         $(window).off("keyup")
    //                         $("#exposureText").fadeOut(500)
    //                         setTimeout(function() {
    //                           $("#exposureText").fadeIn(500)
    //                           $("#exposureText").html("Wait, how many times will you send messages about each object?")
    //                           $(".howManyTimes").fadeIn(500)
    //                           arrowKeySelection("times")
    //                           $(window).on('keyup', function(event){
    //                             if(event.keyCode == 13) {
    //                               $(window).off("keyup")
    //                               var userTrialsPerObj= "null";
    //                               // checkArrowSelection("times", testing)
    //                               $(".times").each(function() {
    //                                 if (this.style.border == "1px solid black") {
    //                                   this.style.border="3px solid black"
    //                                   userTrialsPerObj = this.id
    //                                   this.alt = "selected"
    //                                 }
    //                               })
    //                               if (userTrialsPerObj == realTrialsPerObj) {
    //                                 var isNumTrialsCorrect = 1
    //                                 $("#exposureText").fadeOut(500)
    //                                 setTimeout(function() {
    //                                   $("#exposureText").html("That's correct! Let's get started!")
    //                                   $("#exposureText").fadeIn(500)
    //                                 }, 500)
    //                               } else {
    //                                 var isNumTrialsCorrect = 0
    //                                 $("#exposureText").fadeOut(500)
    //                                 setTimeout(function() {
    //                                   $("#exposureText").html("Whoops! Actually you will send messages about each object <strong>" +realTrialsPerObj + " times!</strong>")
    //                                   $("#exposureText").fadeIn(500)
    //                                   $(".times").each(function() {
    //                                     if (this.id == realTrialsPerObj) {
    //                                       this.style.border="3px solid red"
    //                                     } else {
    //                                       this.style.border= ""
    //                                     }
    //                                   })      
    //                                 }, 500)
    //                               }
    //                                               console.log(manipulationChecked)

    //                               manipCheck = {
    //                                 subID : subjectIdentifier,
    //                                 speed: speedAsLag,
    //                                 partnersExposure: partnersExposure,
    //                                 manipResponse: manipulationChecked,
    //                                 manipActual: checkCorrect,
    //                                 manipCorrect: isManipCorrect,
    //                                 numTrialsActual: realTrialsPerObj,
    //                                 numTrialsResponse: userTrialsPerObj,
    //                                 numTrialsCorrect: isNumTrialsCorrect,
    //                                 timestamp: getCurrentTime(),
    //                               };
    //                               experiment.manipCheck.push(manipCheck);
    //                               setTimeout(function() {
    //                                 $("#gameStartFinal").fadeIn(500)
    //                                 $("#gameStartFinal").html("Press Enter to Begin!")
    //                                 $(window).on('keyup', function(event){
    //                                   if(event.keyCode == 13) {
    //                                     $(window).off("keyup")
    //                                     experiment.game(0, 0, slideNumber+1, username)
    //                                   }
    //                                 })
    //                               }, 1000)
    //                             }
    //                           })

    //                         }, 500)
    //                         // experiment.game(0, 0, slideNumber+1, username)
    //                       }
    //                     })
    //                   }, 3000)

    //                 }
    //               })
    //             }, 2500)
    //       } else {
    //         $("#gameStartFinal").hide()
    //         $(window).off("keyup")
    //         if (this.alt == "selected") {
    //           this.style.border=""
    //           this.alt = ""
    //           manipulationChecked = null

    //         }
    //       }

      
    //   }
    // })
      // $("#none").fadeIn(500)
      // $("#same").fadeIn(500)
      // $("#double").fadeIn(500)

    // setTimeout(function(){
    //   $("#squareExamples").fadeIn(500)
    //   $("#fewer").fadeIn(500)
    //   $("#none").fadeIn(500)
    //   $("#same").fadeIn(500)
    //   $("#double").fadeIn(500)
    // }, 500)


          // bring in the examples after a few seconds

        

  },


	game: function(score, roundNumber, slideNumber, username) {
    $(window).off("keyup")
                            // selection = null;
                        // selectedObject = null;
                        // message = null;
    clockStarted=false
    document.getElementById('myScore').innerHTML = "your points: " + score;
    imgArrayShuffled = shuffle(imgArray.slice(0))
    count=0
    $('.gameArray').each(function() {
      this.src='tabletobjects/'+imgArrayShuffled[count]
      this.id=imgArrayShuffled[count]
      count++
    })
      // make sure the pointer resets to center each time 
        $('#box').css({
            left: "220px",
            top: "275px"
        });

    slide_number=slideNumber;
    if (roundNumber == 0) {
        // need to ensure this only happens once. 
        // build partner knowledge for the game later
        partnerKnows = partnerKnowledge(exposureArray, arrNumKnownByExp)
        // console.log(partnerKnows)
    }
		showSlide("referenceGame");
    console.log(partnerKnows)

		$("#waitingForPartner").hide();
		$("#spinningWaiting").hide();
		$("#messageFromPartner").hide();
		$("#nextRound").hide();
    $("#pressEnterToMove").hide();

  

    // code for the game timer, this version is a per trial timer 
        // 5.2 timer is now started at keystroke   
    initializeTimer("countdown", 30, false)




    // clear any border formatting on objects (would be left over from previuos trials)
          $('.circleArray').each(function() {
            this.style.border=''
            this.style.outline=''
          })
		for(var i = 0; i<progressBars.length; i++) {
			progressBars[i].style.width = String((slideNumber)*100/totalSlides) + "%" ;
		}
		document.getElementById('labelInput').value = '';
		document.getElementById("gameTarget").innerHTML = gameArray[roundNumber];




    var pane = $('#pane'),
        box = $('#box'),
        w = pane.width() - box.width(),
        d = {},
        x = 1;
    function newv(v,a,b) {
        var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
        return n < 0 ? 0 : n > w ? w : n;

    }
    $(window).keydown(function(e) { 
      d[e.which] = true;       
      if (clockStarted != true) {startTimer("countdown"); time1 = new Date().getTime();}
      clockStarted = true
    });
    $(window).keyup(function(e) { d[e.which] = false; });
     detectMovementInterval= setInterval(function() {
        box.css({
            left: function(i,v) { return newv(v, 37, 39); },
            top: function(i,v) { return newv(v, 38, 40); }
        });
    }, speedAsLag);




		var target = pairObjectLabels(document.getElementById("gameTargetImage").alt);
    // console.log(target + '   ' + document.getElementById("gameTargetImage").alt)
		var message = 0; // no message

    setInterval(function() {
          rect1 = document.getElementById("box").getBoundingClientRect()
          $('.circleArray').each(function() {
            rect2 = this.getBoundingClientRect()
            //this code determine the object that the 'pointer ' is hovering over
            if((rect1.top > rect2.top) && (rect1.top < rect2.bottom) &&
                          (rect1.left+10 > rect2.left) && (rect1.left+10 < rect2.right))
              {this.style.border = "5px solid black"
            }
            else {this.style.border = ''}
          })
        }, 20)

    // // explicit version
    //
		// document.getElementById("objects2").innerHTML = getRandomImages(imgArray, basePath, "game", roundNumber);
		//prevent enter key from default submission when typing
		// $(document).ready(function() {
		  // $(window).keyup(function(event){
		  //   if(event.keyCode == 13) {
    //       console.log(evaluating)
		  //     // event.preventDefault();
		  //     // return false;
    //       rect1 = document.getElementById("box").getBoundingClientRect()
    //             var blah = document.getElementById('labelInput').value.toLowerCase().trim();
    //       $('.toSelect').each(function() {
    //         rect2 = this.getBoundingClientRect()
    //         //this code determine the object that the 'pointer ' is hovering over
    //         if((rect1.top > rect2.top) && (rect1.top < rect2.bottom) &&
    //                       (rect1.left+10 > rect2.left) && (rect1.left+10 < rect2.right))
    //           {
    //             // console.log(this)
    //             // console.log(this.alt)
    //             // console.log(this.id)

    //                   if (message==1) {
    //                     // if you have selected an object, and are trying to click another object, do nothing.
    //                     if (this.style.border!="5px solid black") {return}
    //                     // otherwise, revert the selection 
    //                     this.style.border="";
    //                     // if there is a label typed out, keep the sendMessage button enabled and change it to X possible points
    //                     if (blah != '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"
    //                       pointChange = trueLabelPoints;
    //                     }
    //                     else {
    //                       document.getElementById("sendMessage").disabled = true;
    //                       document.getElementById("sendMessage").innerHTML="Send Message";
    //                     }
    //                     message=0;
    //                     return;
    //                   }
    //                   //if neither pointing nor typing has occured, select the target element and note that.
    //                   if (message==0) {
    //                     // console.log(pairObjectLabels(this.alt));
    //                     this.style.border="5px solid black";
    //                     var thisOneIsMoving = this.getBoundingClientRect()
    //                     // console.log(thisOneIsMoving)
    //                     document.getElementById("sendMessage").disabled = false;
    //                     if (blah == '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>"; 
    //                                   pointChange = trueClickPoints;
    //                     }
    //                     else {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +doingBothPoints+" Possible Points </em> </strong>"
    //                                   pointChange = doingBothPoints;
    //                     }
    //                     selection = pairObjectLabels(this.id);
    //                     selectedObject = this.id;
    //                     // console.log(this)
    //                     // console.log(this.id)
    //                     // console.log("selection is " + selection + "; selected object is " + selectedObject)
    //                     message = 1; // change message value to 1 if clicked. 
    //                       isCorrect = 1; // flag as correct. will be overwritten if incorrect. 
    //                     return;
    //                   }
    //           }
    //         })
          

  		//     }
  		//   // });
  		// });

		document.getElementById("labelInput").disabled = false;
    document.getElementById("labelInput").focus();
    // retains permanant focus on the text box, even if you click elsewhere
    $('#labelInput').on('blur',function(){
      if (this.value.length < 7) this.focus();
    });

		// document.getElementById("labelInput").onkeyup = function() {
		// 	// var node = $(this);
		// 	// node.value(node.val().replace(/[^a-z ]/g,'') );
		// 	// if they have erased the text box so it is now empty
		// 	if (document.getElementById("labelInput").value =="") {
		// 		// if they clicked the object, leave that as the message
		// 		if (message==1) {
  //         document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> "+ trueClickPoints +" Possible Points </em> </strong>"
  //         pointChange = trueClickPoints;
  //       }
		// 		// if they havent clicked an object and now have emptied the text box, revert to no message state and disable stuff
		// 		else {
		// 			document.getElementById("sendMessage").disabled = true;
		// 			document.getElementById("sendMessage").innerHTML="Send Message";
		// 		}
		// 	} else {
		// 		document.getElementById("sendMessage").disabled = false;
		// 		if (message==1) {
  //         document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +doingBothPoints+" Possible Points </em> </strong>"
  //         pointChange = doingBothPoints;
  //       }
		// 		else {
  //         document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"
  //         pointChange = trueLabelPoints;
  //       }
		// 	}
		// };
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

  //   // when user clicks on one of the objects in the array
		// $('.toSelect').mousedown(function() {
		// 	var blah = document.getElementById('labelInput').value.toLowerCase().trim();
  //       //if the target has already been clicked on, assume they are 'unclicking' and revert..
		// 		if (message==1) {
		// 			// if you have selected an object, and are trying to click another object, do nothing.
		// 			if (this.style.border!="5px solid black") {return}
		// 			// otherwise, revert the selection 
		// 			this.style.border="";
		// 			// if there is a label typed out, keep the sendMessage button enabled and change it to X possible points
		// 			if (blah != '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"
  //           pointChange = trueLabelPoints;
  //         }
		// 			else {
		// 				document.getElementById("sendMessage").disabled = true;
		// 				document.getElementById("sendMessage").innerHTML="Send Message";
		// 			}
		// 			message=0;
		// 			return;
		// 		}
		// 		//if neither pointing nor typing has occured, select the target element and note that.
		// 		if (message==0) {
  //         // console.log(pairObjectLabels(this.alt));
		// 			this.style.border="5px solid black";
  //         var thisOneIsMoving = this.getBoundingClientRect()
  //         console.log(thisOneIsMoving)
		// 			document.getElementById("sendMessage").disabled = false;
		// 			if (blah == '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>"; 
  //                       pointChange = trueClickPoints;
  //         }
		// 			else {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +doingBothPoints+" Possible Points </em> </strong>"
  //                       pointChange = doingBothPoints;
  //         }
		// 			selection = pairObjectLabels(this.alt);
  //         selectedObject = this.alt;
		// 			message = 1; // change message value to 1 if clicked. 
		// 				isCorrect = 1; // flag as correct. will be overwritten if incorrect. 
		// 			return;
		// 		}
		// });

		// document.getElementById("sendMessage").onclick = function() {

    $(document).ready(function() {
      $(window).on('keyup', function(event){
        if(event.keyCode == 13) {
          clicked = false
          // event.preventDefault();
          // return false;
          rect1 = document.getElementById("box").getBoundingClientRect()
          var blah = document.getElementById('labelInput').value.toLowerCase().trim();
          $('.circleArray').each(function() {
            rect2 = this.getBoundingClientRect()
            //this code determine the object that the 'pointer ' is hovering over
            if (this.style.border=="5px solid black")
              {
                // console.log(this)
                // console.log(this.alt)
                // console.log(this.id)
                      clicked = true;
                      $("#countdown").countdown360({}).stop()
                      // if (message==1) {
                      //   // if you have selected an object, and are trying to click another object, do nothing.
                      //   if (this.style.border!="5px solid black") {return}
                      //   // otherwise, revert the selection 
                      //   this.style.border="";
                      //   // if there is a label typed out, keep the sendMessage button enabled and change it to X possible points
                      //   if (blah != '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueLabelPoints+"  Possible Points </em> </strong>"
                      //     pointChange = trueLabelPoints;
                      //   }
                      //   else {
                      //     document.getElementById("sendMessage").disabled = true;
                      //     document.getElementById("sendMessage").innerHTML="Send Message";
                      //   }
                      //   message=0;
                      //   console.log("this never happens anymore?")
                      //   return;
                      // }
                      //if neither pointing nor typing has occured, select the target element and note that.
                      // if (message==0) {
                        // console.log(pairObjectLabels(this.alt));
                        this.style.border="5px solid black";
                        var thisOneIsMoving = this.getBoundingClientRect()
                        // console.log(thisOneIsMoving)
                        // if (blah == '') {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +trueClickPoints+" Possible Points </em> </strong>"; 
                        //               pointChange = trueClickPoints;
                        // }
                        // else {document.getElementById("sendMessage").innerHTML="Send Message for <strong> <em> " +doingBothPoints+" Possible Points </em> </strong>"
                        //               pointChange = doingBothPoints;
                        // }
                        selection = pairObjectLabels(this.id);
                        selectedObject = this.id;
                        // console.log(this)
                        // console.log(this.id)
                        // console.log("selection is " + selection + "; selected object is " + selectedObject)
                        message = 1; // change message value to 1 if clicked. 
                          isCorrect = 1; // flag as correct. will be overwritten if incorrect. 
                        return;
                      // }
              }
            })
          if (clicked == false && blah == '') {
            return false
          } else {
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
                  // $("#sendMessage").show()
        					$("#thatIsEnglish").fadeIn(500)
        					document.getElementById("thatIsEnglish").innerHTML = "Oops, that looks like English. Remember to type in our new language! <br> Try that one again!"
        					return;
        				}
                for (i=0; i < commonWords.length; i++) {
                  searching = blah.search(commonWords[i])
                  if (searching >= 0) {
                    document.getElementById("thatIsEnglish").innerHTML = "Oops, that looks like English. Remember to type in our new language! <br> Try that one again!"
                    $("#thatIsEnglish").fadeIn(500)
                    return;
                  }
                }
      			}
      			time2 = new Date().getTime();
            $("#countdown").countdown360({}).stop()
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
                        // pointChange = pointsBothWrong
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
                    // pointChange = trueLabelPoints;
                  // if this is a word we are probably going to get wrong, let partner 'guess'
                  } else {            
                    message=3;
                    isCorrect = 0;
                    // pointChange = pointsLabelWrong;
                  }
      					} if (candidate != target) {
      						message=3;
      						isCorrect = 0;
                  // pointChange = pointsLabelWrong;
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
                    // pointChange = trueLabelPoints;
                  } else {message = 3; isCorrect=0; 
                    // pointChange=pointsLabelWrong;
                    pseudoPartnersSelection = partnerKnows[wordLocation+1]} 
                }
      				}
      			}
      			// if they havent typed a label...
      			if (blah == '') {
      				blah = null;
      				method = "click";
      				if(selection != target) { message = 3; isCorrect = 0;
                // pointChange = pointsClickWrong; 
                pseudoPartnersSelection = selectedObject};
      			}
      			if(message==0) {return}

            // some stuff to try to get the 'receiver' to guess using mutual exclusivity assumption   
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
                mappingsToSearch = partnersUnknown.length-1
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
        }

      //send message, return 'partner response'
      if (isCorrect == 1) {
        // pointChange = 10;
        pointChange = timeToPointsConverter(time2-time1, convertTimeToPoints)

        // pointChange = (timePerTrial + 1 - Math.ceil(((time2-time1))/1000))*20
        if (pointChange <= 0) {pointChange = 10}
        pseudoPartnersSelection = document.getElementById("gameTargetImage").alt
        document.getElementById("messageFromPartner").innerHTML = "Nice work- "+partnersName+" figured it out and you got "+pointChange+ " points!";
      } else {
        document.getElementById("messageFromPartner").innerHTML = "Uh oh- looks like "+partnersName+" chose the wrong object!";
        pointChange = 0;
      }
  
      $('.circleArray').each(function() {
        // console.log('this')
        if(this.id == document.getElementById("gameTargetImage").alt) {
          targetDeg = this.name
        }
      })

      document.getElementById("labelInput").blur()
      //issue with saving the array of partner knowledge... 
      partnerKnowsSave = partnerKnows.slice(0)
      //store trial data before moving on
      gameTrials = {
        phase : "game",
        subID : subjectIdentifier,
        username: username,
        speed: speedAsLag,
        partnersExposure: partnersExposure,
        trialnum : slideNumber,
        score: pointChange,
        partnerVocab: partnerKnowsSave,
        targetObjectName : document.getElementById("gameTargetImage").alt,
        targetPosition: targetDeg,
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
		  }
    });	
    })
	},

	gameWaiting: function(score, count, slideNumber, selectedObject, username) {
    // this line freezes the pointer by removing the interval that we were using to detect pointer movement, 
     clearInterval(detectMovementInterval)
     // need to unbind event that catches enter presses to prevent multiple sending event and
        // and prevent stacking function definition
        $(window).off("keyup")

    slide_number=slideNumber;
		$("#waitingForPartner").show();
		$("#spinningWaiting").show();
		$('.toSelect').click(function() {return;});
		$('.labelInput').disabled = true;
		waitTime = randomIntFromInterval(1000,4000);
		waitingTimer = setTimeout(function() {
      $("#waitingForPartner").hide(); 
      $("#spinningWaiting").hide()
    }, waitTime-250);
		feedbackTimer= setTimeout(function() {
      // $("#nextRound").show();
			$("#messageFromPartner").show();
			// document.getElementById('myScore').removeChild(document.getElementById('myScore').lastChild);
			// var newPoints = document.createTextNode(score);
			// document.getElementById('myScore').appendChild(newPoints);
      document.getElementById('myScore').innerHTML = "your points: " + score;
      $('.circleArray').each(function() {
        if(this.id == pseudoPartnersSelection) {
          // console.log(this.alt + "   " + pseudoPartnersSelection); 
          this.style.outline="3px dashed red"
        }
      })
		}, waitTime);
    // console.log('change this back')
	  // numOfGames = gameArray.length; 
    debugging ? numOfGames= 3 : numOfGames=gameArray.length
    // console.log(numOfGames) 
    nextTimer= setTimeout(function() {
      $("#pressEnterToMove").show()
      // $("#pressEnterToMove").innerHTML="(press 'Enter' to move to the next round!)"
      if (count < numOfGames) {
  			// document.getElementById("nextRound").onclick = function() {experiment.game(score,count, slideNumber, username)};
        //press enter to get to new slide
      $(document).ready(function() {
        $(window).on('keyup', function(event){
          if(event.keyCode == 13) {
            $(window).off("keyup")
            experiment.game(score,count, slideNumber, username)
          }
        })
      })
        // if this is the last trial, pressing enter sends Ps to the final attention check
  		} else {
  			// document.getElementById("nextRound").onclick = function() {experiment.attentionCheck(slideNumber)}};
        $(window).on('keyup', function(event){
          if(event.keyCode == 13) {
            $(window).off("keyup")
            experiment.attentionCheck(slideNumber)
          }
        })
      };
    }, waitTime);
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
        // var xmlHttp = null;
        // xmlHttp = new XMLHttpRequest();
        // xmlHttp.onreadystatechange = function() {
            // if (this.readyState == 4 && this.status == 200) {
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
            // }
        // };
        // xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/_crementer.php?filename=" + filename + "&to_decrement=" + subjectIdentifier, true);
        // xmlHttp.send(null)
      }

    },
}

//for  testing and debugging, jump to a part of the experiment directly with (the relevant version of) this line
//breaks progressbar
// setTimeout(function() {experiment.partnering(0,0,30);}, 100)




