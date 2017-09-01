// REACT
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// STYLES
import styles from '../../styles/styles.scss'

export default () => (
	<Container fluid={true} className={styles["tl-nav-container"]}>
		<Row style={{ height: '100%', justifyContent: 'center', margin: 0}}>
			<Col sm={7} md={7} className={styles["tl-nav-brand"]}>
				<h2 className={styles["tl-nav-header"]}>
					Cognitive Asset Library
				</h2>
			</Col>
			<Col sm={5} md={5} className={styles["tl-nav-right"]}>
			  <Link to={`/`} className={styles["tl-nav-button-border"]} kind='secondary'>Home</Link>
			  <Link to={`/`} className={styles["tl-nav-button-border"]} kind='secondary'>Engage Us</Link>
			  <Link to={`/about`} className={styles["tl-nav-button-border"]} kind='secondary'>About Us</Link>
			  <Link to={`/publish`} className={styles["tl-nav-button"]} kind='secondary'>Publish</Link>
			</Col>
		</Row>
	</Container>
)
