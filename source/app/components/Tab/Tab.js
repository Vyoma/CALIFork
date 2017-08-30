// REACT
import React from 'react';

// STYLES
import styles from '../../styles/styles.scss'

export default ({ activeTabIndex, tabIndex, tabValue, handleSelectTab }) => {

	const tabClassName = tabIndex === activeTabIndex ? styles[`tab active`] : styles[`tab default`]; 

	const _handleSelectTab = () => {
		handleSelectTab(tabIndex, tabValue)
	}

	return (
		<button className={tabClassName} onClick={_handleSelectTab}>{tabValue}</button>
	)
}