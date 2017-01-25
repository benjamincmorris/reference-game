<?php
//incrementer/decrmenter for Turk experimental assignments
// incrementer version called when the subject returns or closes the hit early. 
// decrementer_submit version called when the subject finishes the experiment


header('Access-Control-Allow-Origin: *'); //in order to call this from JS on turk
// ignore_user_abort(true);
if (isset($_GET['filename'])){
	$filename = $_GET['filename'];
	if (isset($_GET['to_increment'])) {
		$cond_to_increment = $_GET['to_increment'];
	}
	if (isset($_GET['to_decrement'])) {
		$cond_to_decrement = $_GET['to_decrement'];
	}
	//check to make sure that there are the proper parameters-- if not filled, what will the response be?

	$assignment_dir = '../experiment_files/';
	$assignment_files =  scandir($assignment_dir);

	if(in_array($filename.'.txt',$assignment_files)){
		$fid = $assignment_dir.$filename.".txt";

		$fh = fopen($fid, 'r+') or die("can't open file");
			$count = 0;
			$timeout_secs = 5; //number of seconds of timeout
			$got_lock = true;
			//while you can't get the lock, just wait, up to a point
			while (!flock($fh, LOCK_EX | LOCK_NB, $wouldblock)) {
				echo 'cannot get lock';
			    if ($wouldblock && $count++ < $timeout_secs) {
			        sleep(.001);
			    } else {
			        $got_lock = false;
			        break;
			    }
			}
			if ($got_lock) {
			    // Do stuff with file
				$conds_string = fread($fh, filesize($fid));
				//is there a way to check the well-formedness of this string?
				$conditions = explode(';',$conds_string);
				$conds_array = array();
				foreach ($conditions as $condition){
					$temp = explode(',',$condition);
					$conds_array[$temp[0]] = $temp[1];
				}

				if (count($conds_array) >= 1){
					if (isset($_GET['to_increment'])) {	
						$conds_array[$cond_to_increment] = '1';
					}
					if (isset($_GET['to_decrement'])) {
						$conds_array[$cond_to_decrement] = '0';
					}
			 		$printString = '';
					foreach ($conds_array as $key => $value){
						$printString = $printString.$key.','.$value.';';
					}
					//remove the trailing newline
					$printString = substr($printString,0,-1);

					//truncate old file, and rewrite
					// fseek($fh, 0);
					// fwrite($fh, $printString);
					file_put_contents($fid, $printString);
				}
				flock($fh, LOCK_UN);
			}
			fclose($fh);	
	} else {
		echo "That file doesn't exist in ".$assignment_dir;
	}
} else {
	echo "filename is not set"."<br /><br />";
}

?>