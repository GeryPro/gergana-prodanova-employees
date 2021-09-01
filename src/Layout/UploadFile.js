import React, { useState, useEffect } from 'react';
import classes from './UploadFile.module.css';

const UploadFile = (props) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [employeeData, setEmployeeData] = useState([]);

	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const onFileUpload = (e) => {
		e.preventDefault();
		if (
			(selectedFile && selectedFile.type !== 'text/plain') ||
			employeeData.length === 0
		) {
			alert('Please select a text file to upload.');
		}

		if (employeeData.length > 0) {
			props.onChange(employeeData);
			setEmployeeData([]);
		}
	};

	useEffect(() => {
		if (selectedFile && selectedFile.type === 'text/plain') {
			const reader = new FileReader();
			reader.onload = () => {
				const rawText = reader.result;
				const data = rawText.split('\r\n');
				const th = data[0].split(', ');

				for (let i = 0; i < data.length; i++) {
					const employee = {};
					let tr;
					if (i < data.length - 1) {
						tr = data[i + 1].split(', ');
						for (let j = 0; j < tr.length; j++) {
							employee[th[j]] = tr[j];
						}

						setEmployeeData((prevState) => [...prevState, employee]);
					}
				}
			};
			reader.readAsText(selectedFile);
		}
	}, [selectedFile]);

	return (
		<section className={classes.summary}>
			<h3>Please select a file to upload</h3>
			<div>
				<label className={classes['custom-file-upload']}>
					<input type='file' onChange={onFileChange} />
					Upload File
				</label>
				<button onClick={onFileUpload}>Upload!</button>
			</div>
		</section>
	);
};

export default UploadFile;
