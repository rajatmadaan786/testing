import React from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

class SecondStep extends React.Component {
	render() {
		const data = {
			label: 'search me',
			value: 'searchme',
			children: [
				{
					label: 'search me too',
					value: 'searchmetoo',
					children: [
						{
							label: 'No one can get me',
							value: 'anonymous',
						},
					],
				},
			],
		}

		return (
			<div className="col-sm-12 col-lg-12 mt-2">
				<div className="row">
					<div className="col-lg-12">
						<div className="form-group">
							<label htmlFor="firstname" className="classlabel">Learner First & Last Name</label>
							<DropdownTreeSelect data={data} onChange={this.props.onChange} onAction={this.props.onAction} onNodeToggle={this.props.onNodeToggle} />
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group">
							<label htmlFor="firstname" className="classlabel ml-2">Parent First & Last Name</label>
							<DropdownTreeSelect data={data} onChange={this.props.onChange} onAction={this.props.onAction} onNodeToggle={this.props.onNodeToggle} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SecondStep;