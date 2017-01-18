<?php
//this file for Turk experimental assignments tracks IDs of participants who refresh or navigate during the study. 
//called when the page unloads (e.g., refresh, closure, new site, back button...)
//or to create such a file if it doesn't exist yet.


header('Access-Control-Allow-Origin: *');
if (isset($_GET['filename']) && isset($_GET['turkid'])){
	$filename = $_GET['filename'];
	$turkid = $_GET['turkid'];
	
	$assignment_dir = '../experiment_files/';
	$assignment_files =  scandir($assignment_dir);

	// if the filename doesn't exist yet, 
	if(!in_array($filename.'.txt',$assignment_files)){
		//parse the turkid
			$printString = '';
			$printString = $printString.$turkid.',';
			//remove the trailing newline
			// $printString = substr($printString,0,-1);
	
			//write a new file with the the particiapnt id
			$fid = $assignment_dir.$filename.".txt";
			touch($fid);
			$fh =  fopen($fid, 'w') or die("can't open file");

			$count = 0;
			$timeout_secs = 5; //number of seconds of timeout
			$got_lock = true;
			//while you can't get the lock, just wait, up to a point
			while (!flock($fh, LOCK_EX | LOCK_NB, $wouldblock)) {
				echo 'cannot get lock';
			    if ($wouldblock && $count++ < $timeout_secs) {
			        sleep(.01);
			    } else {
			        $got_lock = false;
			        break;
			    }
			}
			if ($got_lock) {
			    // Do stuff with file
				fwrite($fh, $printString);
				flock($fh, LOCK_UN);
			}
			fclose($fh);

	} else {
		//if it does exist, read it in 
		$fid = $assignment_dir.$filename.".txt";
		$fh = fopen($fid, 'r') or die("can't open file");

			$count = 0;
			$timeout_secs = 5; //number of seconds of timeout
			$got_lock = true;
			//while you can't get the lock, just wait, up to a point
			while (!flock($fh, LOCK_EX | LOCK_NB, $wouldblock)) {
				echo 'cannot get lock';
			    if ($wouldblock && $count++ < $timeout_secs) {
			        sleep(.01);
			    } else {
			        $got_lock = false;
			        break;
			    }
			}
			if ($got_lock) {
			    // Do stuff with file
				$conds_string = fread($fh, filesize($fid));
				flock($fh, LOCK_UN);
			}
			fclose($fh);
	
		//parse the turkid
		$printString = '';
		$printString = $printString.$turkid.',';
		//remove the trailing newline
		// $printString = substr($printString,0,-1);


		$fid = $assignment_dir.$filename.".txt";
		$fh = fopen($fid, 'w') or die("can't open file");

			$count = 0;
			$timeout_secs = 5; //number of seconds of timeout
			$got_lock = true;
			//while you can't get the lock, just wait, up to a point
			while (!flock($fh, LOCK_EX | LOCK_NB, $wouldblock)) {
				echo 'cannot get lock';
			    if ($wouldblock && $count++ < $timeout_secs) {
			        sleep(.01);
			    } else {
			        $got_lock = false;
			        break;
			    }
			}
			if ($got_lock) {
			    // Do stuff with file
				fwrite($fh, $conds_string.$printString);
				flock($fh, LOCK_UN);
			}
			fclose($fh);
	}
}
else{
	
	echo "The necessary parameters are not set";
}
?>