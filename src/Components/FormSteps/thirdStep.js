import React from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

class ThirdStep extends React.Component {
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
			<div className="col-sm-12 col-md-8 offset-md-3 mt-2">
				<div className="row">
					<div className="col-lg-9">
						<div className="form-group">
							<label htmlFor="firstname">Send invitation to:</label>
							<DropdownTreeSelect data={data} onChange={this.props.onChange} onAction={this.props.onAction} onNodeToggle={this.props.onNodeToggle} />
						</div>
					</div>
					<div className="col-lg-9">
						<div className="form-group">
							<textarea style={{ width: '100%', height: '150px', border: '1px solid #ccc' }} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ThirdStep;