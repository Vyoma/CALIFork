// REACT
import React from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { TableRow, TableData, TextInput, Button } from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

const AssetContributorInput = ({ name, role, email, handleInput, handleAdd }) => (
	<TableRow>
	  <TableData>
	    <TextInput
	      value={name}
	      labelText=''
	      placeholder='Name'
	      id='name'
	      style={{margin:5}}
	      onChange={handleInput}
	    />
	  </TableData>
	  <TableData>
	    <TextInput
	      value={role}
	      labelText=''
	      placeholder='Role'
	      id='role'
	      style={{margin:5}}
	      onChange={handleInput}
	      />
	  </TableData>
	  <TableData>
	    <TextInput
	      value={email}
	      labelText=''
	      placeholder='Email Address'
	      id='email'
	      style={{margin:5}}
	      onChange={handleInput}
	      />
	  </TableData>
	  <TableData>
	    <Button
	      kind='ghost'
	      icon='add'
	      iconDescription='Add'
	      onClick={handleAdd}
	    />
	  </TableData>
	</TableRow>
)

export default AssetContributorInput