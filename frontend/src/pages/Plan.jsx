import React from 'react';
import './Plan.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function PlanPage() {
	const showRecipes = () => {};

	return (
		<div>
			<Table bordered>
				<thead>
					<tr>
						<th></th>
						<th>Breakfast</th>
						<th>Lunch</th>
						<th>Diner</th>
						<th>Dessert</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<span className="bold">Monday</span>
						</td>
						<td>
							<Button onClick={showRecipes}>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span className="bold">Tuesday</span>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span className="bold">Wednesday</span>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span className="bold">Thursday</span>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span className="bold">Friday</span>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span className="bold">Saturday</span>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span className="bold">Sunday</span>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
						<td>
							<Button>+</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default PlanPage;
