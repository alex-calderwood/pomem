function diff(s1, s2) {
	console.log('s1: ', s1);
	console.log('s2: ', s2);

	// Pad strings with null character to make graph indexing easier
	s1 = '\u0000' + s1;
	s2 = '\u0000' + s2;

	// Initialize memoization table
	var table = new Array(s1.length);
	for (var i = 0; i < s1.length; i++) {
		table[i] = new Array(s2.length);
	}

	for (var i = 0; i < s1.length; i++) {
		table[i][0] = 0;
	}

	for (var i = 0; i < s2.length; i++) {
		table[0][i] = 0;
	}

	// Populate table using LCS algorithm found at https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
	for (var i = 1; i < s1.length; i++) {
		for (var j = 1; j < s2.length; j++) {
			if (s1.charAt(i) == s2.charAt(j)) {
				table[i][j] = table[i - 1][j - 1] + 1;
			} else {
				table[i][j] = Math.max(table[i][j - 1], table[i - 1][j]);
			}
		}
	}

	// Print table
//	for (var i = 0; i < s1.length; i++) {
//		var line = "";
  //              for (var j = 0; j < s2.length; j++) {
    //                    line += table[i][j] + " ";
      //          }
	//	console.log(line);
        //}

	// Print diff
	function getDiff(i, j) {
		if (i > 0 && j > 0 && s1[i] == s2[j]) {
			return getDiff(i - 1, j - 1) + s1[i];
		}
		else if (j > 0 && (i == 0 || table[i][j - 1] >= table[i - 1][j])) {
			return getDiff(i, j - 1) + "+" + s2[j];
		}
		else if (i > 0 && (j == 0 || table[i - 1][j] >= table[i][j - 1])) {
			return getDiff(i - 1, j) + "-" + s1[i];
		}
		else {
			return "";
		}
	}

	return getDiff(s1.length - 1, s2.length - 1)	
}

string1 = "What is the name"
string2 = "What is your name"

var diff = diff(string1, string2);

console.log(diff);
