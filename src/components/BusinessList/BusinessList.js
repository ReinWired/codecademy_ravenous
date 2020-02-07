import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
	render() {
		return (
			<div className="BusinessList">
				{Array.isArray(this.props.businessList) && this.props.businessList.map( business => <Business business={business} key={business.id} /> )}
			</div>
		);
	}
};

export default BusinessList;