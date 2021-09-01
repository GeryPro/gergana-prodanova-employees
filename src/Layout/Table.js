import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import classes from './Table.module.css';

const Table = ({ filteredEmployeeData }) => {
	const [dataToDisplay, setDataToDisplay] = useState([]);
	const projectsToDisplay = dataToDisplay.length > 0;

	useEffect(() => {
		setDataToDisplay((dataToDisplay) =>
			dataToDisplay.concat(filteredEmployeeData).flat()
		);
	}, [filteredEmployeeData]);

	useEffect(() => {
		if (projectsToDisplay) {
			console.table(dataToDisplay);
		}
	}, [dataToDisplay, projectsToDisplay]);

	let dataArr;

	if (projectsToDisplay) {
		dataArr = dataToDisplay.map((project) => {
			return {
				col1: project.EmployeeID_1,
				col2: project.EmployeeID_2,
				col3: project.ProjectID,
				col4: project.DaysWorked,
			};
		});
	} else {
		dataArr = [
			{
				col1: '',
				col2: '',
				col3: '',
			},
		];
	}

	const data = React.useMemo(() => dataArr, [dataArr]);

	const columns = React.useMemo(
		() =>
			['Employee ID #1', 'Employee ID #2', 'Project ID', 'Days worked'].map(
				(columnName, i) => {
					return {
						Header: columnName,
						accessor: `col${i + 1}`,
					};
				}
			),
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<section className={classes['table-section']}>
			{!projectsToDisplay && (
				<p className={classes['no-projects']}>
					Sorry, there are no shared projects, that can be displayed.
				</p>
			)}
			{projectsToDisplay && (
				<table {...getTableProps()} className={classes.table}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps()}
										className={classes['table-header']}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												className={classes['table-cell']}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</section>
	);
};

export default Table;
