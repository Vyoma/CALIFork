// REACT
import React from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { Select, SelectItem } from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

const SelectArtifactType = ({ type, invalid, handleChangeType }) => {
	if (invalid) {
		type = 'invalid'
	}

	// NOTE: The empty string will be used as the placeholder select item
	return (
		<Select className='some-class' labelText='Artifact Type' id='select-1' value={type} onChange={handleChangeType}>
		  <SelectItem
		    disabled
		    hidden
		    value=''
		    text='Select Artifact Type'
		   />
		   <SelectItem
		     disabled
		     hidden
		     value='invalid'
		     text='Artifact Type is Required'
		    />
		  <SelectItem value='Contracts' text='Contracts' />
		  <SelectItem value='Business Use Case' text='Business Use Case' />
		  <SelectItem value='Whitepaper' text='Whitepaper' />
		  <SelectItem value='Client Presentation' text='Client Presentation' />
		  <SelectItem value='Project Management' text='Project Management' />
		  <SelectItem value='Architecture' text='Architecture' />
		  <SelectItem value='Design' text='Design Materials' />
		  <SelectItem value='Development' text='Dev Materials' />
		  <SelectItem value='Code Repo' text='Code Repo' /> {/* Link */}
		  <SelectItem value='Testing' text='Testing Materials' />
		  <SelectItem value='Demo Video Link' text='Demo Video Link'/> {/* Link */}
		  <SelectItem value='Reference Website' text='Reference Website'/> {/* Link */}
		  <SelectItem value='Other' text='Other' />
		</Select>
	)
}

export default SelectArtifactType