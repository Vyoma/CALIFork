// REACT
import React from 'react';

// STYLES
import styles from '../../styles/styles.scss'

export default ({ activeTabIndex, tabIndex, tabValue, handleSelectTab }) => {

	const tabClassName = tabIndex === activeTabIndex ? `tab-active` : `tab`; 
	console.log(tabClassName)
	const _handleSelectTab = () => {
		handleSelectTab(tabIndex, tabValue)
	}

	return (
		<button className={styles[tabClassName]} onClick={_handleSelectTab}>{tabValue}</button>
	)
}