/**
 * This javascript file checks for the brower/browser tab action.
 * It is based on the file menstioned by Daniel Melo.
 * Reference: http://stackoverflow.com/questions/1921941/close-kill-the-session-when-the-browser-or-tab-is-closed
 */
var validNavigation = false;
 

 
// function wireUpEvents() {
  /**
   * For a list of events that triggers onbeforeunload on IE
   * check http://msdn.microsoft.com/en-us/library/ms536907(VS.85).aspx
   *
   * onbeforeunload for IE and chrome
   * check http://stackoverflow.com/questions/1802930/setting-onbeforeunload-on-body-element-in-chrome-and-ie-using-jquery
   */
  var dont_confirm_leave = 0; //set dont_confirm_leave to 1 when you want the user to be able to leave without confirmation
  var leave_message = 'You sure you want to leave?'
                
  function goodbye() {
    if (!validNavigation) {
      if (dont_confirm_leave!==1) {
        // if(!e) e = window.event;
            // console.log("pretending to be on turk here for debugging")
            // if (subjectIdentifier.length <= 3) {
            if (subjectIdentifier.length <= 3 && turk.workerId.length > 0) {
                console.log("goodbye user, resetting txt file...")
                var xmlHttp = null;
                xmlHttp = new XMLHttpRequest();
                cond =subjectIdentifier;
                xmlHttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                        // Action to be performed when the document is read;  
                            console.log("write file of users who quit...")
                            var xmlHttp = null;
                            xmlHttp = new XMLHttpRequest();
                            cond =subjectIdentifier;
                            xmlHttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                    // Action to be performed when the document is read;
                                      console.log("..." + xmlHttp.responseText)
                                    }
                                };
                            // xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/window_counter.php?filename=" + filename2 + "&turkid=testinggggg", true);
                            xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/_crementer.php?filename=" + filename + "&to_increment=" + cond, false);
                            xmlHttp.send(null)             
                        }
                    };
                    filename2= "participants_who_closed"
                    xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/window_counter.php?filename=" + filename2 + "&turkid=" + turk.workerId + "&slideNumber=" + slide_number, false);
                        // xmlHttp.open("GET", "https://callab.uchicago.edu/experiments/reference/php/window_counter.php?filename=" + filename2 + "&turkid=testingggg&slideNumber=" + slide_number, false);

                    xmlHttp.send(null)
                    // return null;
            }
        //e.cancelBubble is supported by IE - this will kill the bubbling process.
        // e.cancelBubble = true;
        // e.returnValue = leave_message;
        // //e.stopPropagation works in Firefox.
        // if (e.stopPropagation) {
        //   e.stopPropagation();
        //   e.preventDefault();
        // }
        //return works for Chrome and Safari

        // return leave_message;
      }
    }
  }
  // window.onbeforeunload=goodbye;
 
 
  // Attach the event click for all links in the page
  $("a").bind("click", function() {
    validNavigation = true;
  });
 
  // Attach the event submit for all forms in the page
  $("form").bind("submit", function() {
    validNavigation = true;
  });
 
  // Attach the event click for all inputs in the page
  $("input[type=submit]").bind("click", function() {
    validNavigation = true;
  });
   
// }
 
// Wire up the events as soon as the DOM tree is ready
// $(document).ready(function() {
//   wireUpEvents();  
// });