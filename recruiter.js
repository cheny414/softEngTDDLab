'use strict';

// Object containing starting wages for various 4 year degrees
var degreeSWage = require('./degreeSWage.json');
// File containing some of our utility functions (already written)
var util = require('./util.js');

function bracketFromGPA(gpa) {
	// 4-3.5, 3.49 - 3.0, 2.99 - 2.5
	if (gpa >= 3.5) {
		return 3;
	}
	else if (gpa >= 3.0) {
		return 2;
	}
	else if (gpa >= 2.5) {
		return 1;
	}
	else {
		return 0;
	}
	//some form of bracket number
}


function recruiter(internArr) {

	// Below is just to help show the syntax you need,
	// you'll need to process ALL of the hireables like this one and sort
	for (var index = 0; index < internArr.length; index++) {
		var iname = internArr[index].name;
		var idegr = internArr[index].degree;
		var igpa = internArr[index].gpa;
		var iexp = internArr[index].experiance;
		var iwage, ivalue, ibracket, imetric;

		// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
		idegr = idegr.toLowerCase();
		iwage = degreeSWage[idegr];

		// You should use these functions at some point
		ivalue = util.getValueFromWageAndExp(iwage,iexp);
		ibracket = bracketFromGPA(igpa);

		// Hmm... this doesn't seem to follow the spec - fix it
		imetric = ivalue + ibracket;

		// We really want to add our sorting number "metric" to objects (it really is this easy)
		internArr[index].metric = imetric;
	}

	// and then sort them all (it doesn't return anything, it modifies the array sent)
	util.sortInternObjects(internArr);


	// Output
	// An array of HIREABLE 'intern objects' (in order of most valueable to least valueable)
	// with at least the properties "name", "metric", "degree"
	// You can come up with any number you want for "metric" as long as it corresponds to the spec
	// and people earlier in the array have equal or greater values for "metric" than
	// people further down.

	for (var i = 0; i < internArr.length; i++) {
		var findIndex = degreeSWage.degreenames.indexOf(internArr[i].degree);
		if (findIndex == -1) {
			internArr.splice(i,1);
			i = i - 1;
		}
	}


	return internArr;
};

module.exports = {
	recruiter: recruiter,
	bracketFromGPA: bracketFromGPA
};
