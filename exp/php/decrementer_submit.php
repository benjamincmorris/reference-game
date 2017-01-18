<?php
//decrementer for Turk experimental assignments
//called when the subject submits the HIT

#sample query string
#if:
#filename= sm_unstructured_13jan
#to_decrement= unstructured-12
#?to_decrement=unstructured-12&filename=sm_unstructured_13jan

header('Access-Control-Allow-Origin: *'); //in order to call this from JS on turk

if (isset($_GET['filename']) && isset($_GET['to_decrement'])){
	$filename = $_GET['filename'];
	$cond_to_decrement = $_GET['to_decrement'];

	//check to make sure that there are the proper parameters-- if not filled, what will the response be?

	$assignment_dir = '../experiment_files/';
	$assignment_files =  scandir($assignment_dir);

	if(in_array($filename.'.txt',$assignment_files)){
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
	
		//is there a way to check the well-formedness of this string?
		$conditions = explode(';',$conds_string);
		$conds_array = array();
		foreach ($conditions as $condition){
			$temp = explode(',',$condition);
			$conds_array[$temp[0]] = $temp[1];
		}
		if (count($conds_array) >= 1){
			$conds_array[$cond_to_decrement] = 0;
	 		$printString = '';
			foreach ($conds_array as $key => $value){
				$printString = $printString.$key.','.$value.';';
			}

			//remove the trailing newline
			$printString = substr($printString,0,-1);
			//write a new file with the conds
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
				fwrite($fh, $printString);
				flock($fh, LOCK_UN);
			}
			fclose($fh);	
		} else {
			echo 'The resulting condition format is ill-formed';
		}	
	} else {
		echo "That file doesn't exist in ".$assignment_dir;
	}
} else {
	echo "filename or to_decrement is not set"."<br /><br />";
}

?>