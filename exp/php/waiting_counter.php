<?php
//this file for Turk experimental assignments tracks if turk tries to give out any assignments when we're not ready. 
// writes the state of the subject counting file to a new file for each attmept. 

header('Access-Control-Allow-Origin: *');
if (isset($_GET['filename']) && isset($_GET['timestamp'])){
	$filename = $_GET['filename'];
	$timestamp = $_GET['timestamp'];
	
	$assignment_dir = '../experiment_files/';
	$assignment_files =  scandir($assignment_dir);

		//if it does exist, read it in 
		$fid = $assignment_dir.$filename.".txt";
		$fh = fopen($fid, 'r') or die("can't open file");

			// get lock and read in subjectID file
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
	
		//write a new file with unique label and contents of subjectID file at this time point
		$fid = $assignment_dir.'limbo_'.$timestamp.".txt";
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
				fwrite($fh, $conds_string);
				flock($fh, LOCK_UN);
			}
			fclose($fh);
}
else{
	
	echo "The necessary parameters are not set";
}
?>