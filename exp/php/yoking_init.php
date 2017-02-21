<?php
//based on Mike Frank's maker and getter file for Turk experimental assignments
//called when the page loads to get the experimental condition from a file on the server
//or to create such a file if it doesn't exist yet.

// also sets subject status to pending by timestamping it. then

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
				// echo 'cannot get lock';
			    if ($wouldblock && $count++ < $timeout_secs) {
			        sleep(.001);
			    } else {
			        $got_lock = false;
			        break;
			    }
			}
			if ($got_lock) {
			    // Do stuff with file
				fwrite($fh, $printString);
				//return any of the indices from conds_array
				// $choice = rand(1,count($conds_array));
				// $array_keys = array_keys($conds_array);
				// echo $array_keys[$choice];
				flock($fh, LOCK_UN);
			}
			fclose($fh);


		} else {
			echo 'The resulting condition format is ill-formed';
		}
	} else {
		//if it does exist, read it in 
		$fid = $assignment_dir.$filename.".txt";
		$fh = fopen($fid, 'r+') or die("can't open file");

			$count = 0;
			$timeout_secs = 10; //number of seconds of timeout
			$got_lock = true;
			//while you can't get the lock, just wait, up to a point
			while (!flock($fh, LOCK_EX | LOCK_NB, $wouldblock)) {
				// echo 'cannot get lock';
			    if ($wouldblock && $count++ < $timeout_secs) {
			        sleep(.001);
			    } else {
			        $got_lock = false;
			        break;
			    }
			}
			if ($got_lock) {
			    // read in the file 
				$conds_string = fread($fh, filesize($fid));
						//parse the conds
						$conditions = explode(';',$conds_string);
						$conds_array = array();
						$subj_left = array();	
						$remaining = 0;

						foreach ($conditions as $condition){
							$temp = explode(',',$condition);
								//code previously known as fixer. checks for stale 'timestamps', and overwrites what is stale. 
								date_default_timezone_set('America/Chicago');
								$now = date('Y-m-d H:i:s');
									// code assumes that subs are only tagged with 1/0/timestamp. could become problematic?
									if ($temp[1] != 1) {
										if ($temp[1] != 0) {
											$candidate = ((strtotime($now)- strtotime($temp[1]))/60);
											if ($candidate >= 20) {
												$temp[1] = 1;
											}
										}
									}

							$conds_array[$temp[0]] = $temp[1];
							$subj_left[count($subj_left)] = $temp[1];
							if ($temp[1] == 1) {
								++$remaining;
							}
						}
						if (count($conds_array) >= 1){
							if ($remaining >= 1){
								$cond_array_keys = array_keys($conds_array);
								// maker_getter code (ish), grab a 1 value
								$choice = $cond_array_keys[array_search(1, $subj_left)];
								echo $choice;

								// if this is really a turker -- ie one who has accepted the hit. 
								if (isset($_GET['turkID']) && strlen($choice) <= 3) {
									// [decrementer.php] 
									// timestamp the file to indicate someone is working on that subject assignment
									date_default_timezone_set('America/Chicago');
									$conds_array[$choice] = $date = date('Y-m-d H:i:s');
							 		$newString = '';
									foreach ($conds_array as $key => $value){
										$newString = $newString.$key.','.$value.';';
									}
									//remove the trailing newline
									$newString = substr($newString,0,-1);

									// need to overwrite the file from the beginning
									// fseek($fh, 0);
									//write file with the new timestamp
									// fwrite($fh, $newString);
									file_put_contents($fid, $newString);
								}


							} else {
								//else for the case where turk dislapys assignments, when we don't have one...
								echo 'waiting';
								// this should only happen when turk tries to assign a hit that should be availabe, but hasn't been 'fixed' yet
								// we will need the js to make some statement in this case about how turkers should check back in a few minutes.

								// waiting_counter code
								// get the state of the participant file to understand what causes limbo
								//write a new file with unique label and contents of subjectID file at this time point
								// date_default_timezone_set('America/Chicago');
								$timestamp = microtime(true);
								$fid = $assignment_dir.'limbo_'.$timestamp.".txt";
								touch($fid);
								$fh2 =  fopen($fid, 'w') or die("can't open file");
								fwrite($fh2, $conds_string);
								fclose($fh2);
							}
						} else {
							echo 'The resulting condition format is ill-formed';
						}
				flock($fh, LOCK_UN);
			} else {
				// if you really really can't get the lock after searching for the entire timeout, we can't do anything but call you waiting, sorry.
				echo 'waiting timedout';
			}
			fclose($fh);
	}
} else {	
	echo "The necessary parameters are not set";
}
?>