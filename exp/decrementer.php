<?php
//decrementer for Turk experimental assignments
//called when the subject submits the HIT

#sample query string
#if:
#filename= sm_unstructured_13jan
#to_decrement= unstructured-12
#?to_decrement=unstructured-12&filename=sm_unstructured_13jan

header('Access-Control-Allow-Origin: *'); //in order to call this from JS on turk
echo '<script language="javascript">';
echo 'alert("message successfully sent")';
echo '</script>';

if (isset($_GET['filename']) && isset($_GET['to_decrement'])){
	$filename = $_GET['filename'];
	$cond_to_decrement = $_GET['to_decrement'];

	//check to make sure that there are the proper parameters-- if not filled, what will the response be?
 		echo "<script type='text/javascript'>alert('hjellloaweifmlkaj');</script>";

	$assignment_dir = 'experiment_files/';
	$assignment_files =  scandir($assignment_dir);

	if($filename.'.txt',$assignment_files)){
		$fid = '../../'.$filename.".txt";
		$fh = fopen($fid, 'r') or die("can't open file");
 		echo "<script type='text/javascript'>alert('fh'".$fh.");</script>";

		$conds_string = fread($fh, filesize($fid));
		fclose($fh);
	
		//is there a way to check the well-formedness of this string?
		$conditions = explode(';',$conds_string);
		$conds_array = array();
		foreach ($conditions as $condition){
			$temp = explode(',',$condition);
			$conds_array[$temp[0]] = $temp[1];
		}
		if (count($conds_array) >= 1){
			$conds_array[$cond_to_decrement] = $conds_array[$cond_to_decrement]-1;
	 		$printString = '';
			foreach ($conds_array as $key => $value){
				$printString = $printString.$key.','.$value.';';
			}
			//remove the trailing newline
			$printString = substr($printString,0,-1);
	
			//write a new file with the conds
			$fid = '../../'.$filename.".txt";
			$fh = fopen($fid, 'w') or die("can't open file");
 		echo "<script type='text/javascript'>alert('fh'".$fh.");</script>";
			fwrite($fh, $printString);
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