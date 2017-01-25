<?php
//maker and getter file for Turk experimental assignments
//called when the page loads to get the experimental condition from a file on the langcog server
//or to create such a file if it doesn't exist yet.

#sample query string
#if:
#conds= unstructured-12,12;1515-12,12;2424-12,12;3333-12,12
#filename= sm_unstructured_13jan
#then the query string looks like:
#?conds=unstructured-12,12;1515-12,12;2424-12,12;3333-12,12&filename=sm_unstructured_13jan

header('Access-Control-Allow-Origin: *');
if (isset($_GET['filename']) && isset($_GET['conds'])){
	$filename = $_GET['filename'];
	$conds_string = $_GET['conds'];
	
	$assignment_dir = '../experiment_files/';
	$assignment_files =  scandir($assignment_dir);

	// if the filename doesn't exist yet, 
	if(!in_array($filename.'.txt',$assignment_files)){
		//parse the conds
		$conditions = explode(';',$conds_string);
		$conds_array = array();
		foreach ($conditions as $condition){
			$temp = explode(',',$condition);
			$conds_array[$temp[0]] = $temp[1];
		}
		if (count($conds_array) >= 1){
		//create a printstring with the contents of the conds_array
			$printString = '';
			foreach ($conds_array as $key => $value){
				$printString = $printString.$key.','.$value.';';
			}
			//remove the trailing newline
			$printString = substr($printString,0,-1);
	
			//write a new file with the conds
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

			//return any of the indices from conds_array
			$choice = rand(1,count($conds_array));
			//echo "choice =".$choice;
			$array_keys = array_keys($conds_array);
			echo $array_keys[$choice];
		} else {
			echo 'The resulting condition format is ill-formed';
		}
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
	
		//parse the conds
		$conditions = explode(';',$conds_string);
		$conds_array = array();
		$subj_left = array();	
		$remaining = 0;

		foreach ($conditions as $condition){
			$temp = explode(',',$condition);
			$conds_array[$temp[0]] = $temp[1];
			$subj_left[count($subj_left)] = $temp[1];
			if ($temp[1] == 1) {
				++$remaining;
			}
		}
		if (count($conds_array) >= 1){
			if ($remaining >= 1){
				$cond_array_keys = array_keys($conds_array);
				echo $cond_array_keys[array_search(1, $subj_left)];
			} else {
				//else for the case where turk dislapys assignments, when we don't have one...
				echo 'waiting';
				// this should only happen when turk tries to assign a hit that should be availabe, but hasn't been 'fixed' yet
				// we will need the js to make some statement in this case about how turkers should check back in a few minutes. 
			}
		} else {
			echo 'The resulting condition format is ill-formed';
		}
	}
}
else{
	
	echo "The necessary parameters are not set";
}
?>