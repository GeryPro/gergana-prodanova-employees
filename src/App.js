import React, { useState, useEffect } from 'react';
import Header from './Layout/Header';
import Table from './Layout/Table';
import UploadFile from './Layout/UploadFile';
import { processInitialData } from './helpers';

function App() {
	const [initialData, setInitialData] = useState(null);
	const [filteredData, setFilteredData] = useState([]);

	const getEmployeeData = (data) => {
		setInitialData(data);
	};

	useEffect(() => {
		if (initialData) {
			const processedData = processInitialData(initialData);
			console.log(processedData);

			setFilteredData((filteredData) => filteredData.concat(processedData));
		}
	}, [initialData]);

	return (
		<div>
			<Header />
			{!initialData && <UploadFile onChange={getEmployeeData} />}
			{initialData && <Table filteredEmployeeData={filteredData} />}
		</div>
	);
}

export default App;
