import React from 'react';

class FirstStep extends React.Component {
	render() {
		return (
			<div className="col-sm-12 col-lg-12 mt-2">
				<button type="button" className="btn btn-outline-success mb-4 mt-3"><i className="fa fa-arrow-left"></i> Back to list</button>
				<h4 className="mb-4">New Learner Contact</h4>
				<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label htmlFor="firstname">First Name</label>
							<input type="text" className="form-control" name='firstname' placeholder="Enter First Name" onChange={this.props.handleChange} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label htmlFor="lastname">Last Name</label>
							<input type="text" className="form-control" name='lastname' placeholder="Enter Last Name" onChange={this.props.handleChange} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label htmlFor="firstname">Cell Phone</label>
							<input type="number" className="form-control" name='phone' placeholder="+279554977213" onChange={this.props.handleChange} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label htmlFor="lastname">Email</label>
							<input type="text" className="form-control" name='email' placeholder="Enter email" onChange={this.props.handleChange} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className="form-group">
							<label htmlFor="firstname" className='classlabel'>Class Name</label>
							<select className="classnames-options" name="className">
								<option>1</option>
								<option>2</option>
								<option>3</option>
							</select>
							<button className="btn btn-outline-secondary ml-3"><i className="fa fa-refresh"></i></button>
							<a className="ml-2" href="#">New Class</a>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<a href="#">New Class</a>
					</div>
				</div>
			</div>
		)
	}
}

export default FirstStep;