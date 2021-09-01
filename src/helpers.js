export const processInitialData = (initialDataSet) => {
	const projectIDs = [];
	let allSharedProjects = [];
	let filteredSharedProjects = [];

	initialDataSet.forEach((object) => projectIDs.push(object['ProjectID']));

	const findDuplicates = (arr) =>
		arr.filter((item, index) => arr.indexOf(item) !== index);

	const sharedProjectIDs = [...new Set(findDuplicates(projectIDs))];

	for (let projectID of sharedProjectIDs) {
		const newFilteredArray = initialDataSet.filter(
			(employee) => employee.ProjectID === projectID
		);

		allSharedProjects = allSharedProjects.concat(newFilteredArray);
	}

	for (let projectID of sharedProjectIDs) {
		let mutualStartDate;
		let mutualEndDate;
		const sharedProject = {};
		const today = new Date();

		const teammates = allSharedProjects.filter(
			(employee) => employee.ProjectID === projectID
		);

		if (teammates[0].DateTo === 'NULL') teammates[0].DateTo = today;
		if (teammates[1].DateTo === 'NULL') teammates[1].DateTo = today;

		const colleagueOneParsedStartDate = new Date(teammates[0].DateFrom);
		const colleagueTwoParsedStartDate = new Date(teammates[1].DateFrom);
		const colleagueOneParsedEndDate = new Date(teammates[0].DateTo);
		const colleagueTwoParsedEndDate = new Date(teammates[1].DateTo);

		if (
			colleagueOneParsedStartDate > colleagueTwoParsedEndDate ||
			colleagueTwoParsedStartDate > colleagueOneParsedEndDate
		) {
			return [];
		} else {
			if (colleagueOneParsedStartDate > colleagueTwoParsedStartDate) {
				mutualStartDate = colleagueOneParsedStartDate;
			} else {
				mutualStartDate = colleagueTwoParsedStartDate;
			}

			if (colleagueOneParsedEndDate > colleagueTwoParsedEndDate) {
				mutualEndDate = colleagueTwoParsedEndDate;
			} else {
				mutualEndDate = colleagueOneParsedEndDate;
			}

			const daysWorked = Math.floor(
				Math.abs((mutualEndDate - mutualStartDate) / (1000 * 3600 * 24))
			);

			sharedProject.EmployeeID_1 = teammates[0].EmpID;
			sharedProject.EmployeeID_2 = teammates[1].EmpID;
			sharedProject.ProjectID = projectID;
			sharedProject.DaysWorked = daysWorked;
		}

		filteredSharedProjects.push(sharedProject);
	}

	return filteredSharedProjects;
};
