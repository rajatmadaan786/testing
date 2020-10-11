import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

import Header from '../Header';

import FirstStep from '../FormSteps/firstStep';
import SecondStep from '../FormSteps/secondStep';
import ThirdStep from '../FormSteps/thirdStep';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.step1Validator = this.step1Validator.bind(this);
	}

	handleChange(e) {
		let user = this.state.user;
		user[e.target.name] = e.target.value;
		this.setState({ user })
	}

	step1Validator() {
		let user = this.state.user;
		if (!user.firstname || !user.lastname || !user.phone || !user.email) {
			return false;
		} else {
			return true;
		}
	}

	onFormSubmit() {
		console.log('hi');
	}

	onChange = (currentNode, selectedNodes) => {
		console.log('onChange::', currentNode, selectedNodes)
	}
	onAction = (node, action) => {
		console.log('onAction::', action, node)
	}
	onNodeToggle = currentNode => {
		console.log('onNodeToggle::', currentNode)
	}

	render() {
		let user = window.localStorage.getItem('user');

		return (
			<>
				<div className="container-fluid p-0">
					<Header/>
					{
						(user)?
							<div className="col-lg-9 mt-4 mb-4 offset-lg-1">
								<StepProgressBar
									startingStep={0}
									onSubmit={this.onFormSubmit}
									steps={[
										{
											label: 'Learner & Parents Info',
											name: 'step 1',
											content: <FirstStep handleChange={this.handleChange} />,
											validator: this.step1Validator
										},
										{
											label: 'Group Allocation',
											name: 'step 2',
											content: <SecondStep onChange={this.onChange} onAction={this.onAction} onNodeToggle={this.onNodeToggle} />,
											validator: this.step2Validator
										},
										{
											label: 'Invitation',
											name: 'step 3',
											content: <ThirdStep />,
											validator: this.step3Validator
										}
									]}
								/>
							</div>
						:
						false
					}
				</div>
			</>
		);
	}
}

export default Home;
