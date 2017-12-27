function coloredDiff(s1, s2) {
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

	for (var j = 0; j < s2.length; j++) {
		table[0][j] = 0;
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

	// Trace back through table to get diff
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

string1 = "What is name"
string2 = "What is your name"

var diff = coloredDiff(string1, string2);

console.log(diff);

module.exports = {
	diff: coloredDiff
}
