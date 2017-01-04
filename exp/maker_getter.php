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
echo '<script language="javascript">';
echo 'alert("message successfully sent from maker-getter")';
echo '</script>';

if (isset($_GET['filename']) && isset($_GET['conds'])){
	$filename = $_GET['filename'];
	$conds_string = $_GET['conds'];
	
	$assignment_dir = 'experiment_files/';
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
			$fid = '../../'.$filename.".txt";
			touch($fid);
			$fh =  fopen($fid, 'w') or die("can't open file");
			fwrite($fh, $printString);
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
		$fid = 'experiment_files/'.$filename.".txt";
		$fh = fopen($fid, 'r') or die("can't open file");
		$conds_string = fread($fh, filesize($fid));
		fclose($fh);
	
		//parse the conds
		$conditions = explode(';',$conds_string);
		$conds_array = array();
		$subj_left = array();	

		foreach ($conditions as $condition){
			$temp = explode(',',$condition);
			$conds_array[$temp[0]] = $temp[1];
			$subj_left[count($subj_left)] = $temp[1];
		}
		if (count($conds_array) >= 1){
			//and find the lowest valued one
			$cond_array_keys = array_keys($conds_array);	
			echo $cond_array_keys[array_search(max($subj_left), $subj_left)];
		} else {
			echo 'The resulting condition format is ill-formed';
		}
	}
}
else{
	
	echo "The necessary parameters are not set";
}
?>