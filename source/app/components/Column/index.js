// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Col } from 'react-grid-system'

export default class ColumnSSR extends Component {
	render() {
		let { children, xs, sm, md, lg, xl, size, offset } = this.props; 
		let columnDefaultSize = md || size || sm || lg || xs || xl || 12; 
		xs = xs || columnDefaultSize; 
		sm = sm || columnDefaultSize; 
		md = md || columnDefaultSize;
		lg = lg || columnDefaultSize; 
		xl = xl || columnDefaultSize; 

		return (
			<Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} offset={offset}>
				{children}
			</Col>
		)
	}
}