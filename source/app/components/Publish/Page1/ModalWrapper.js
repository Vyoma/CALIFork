// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { Modal, Button } from 'carbon-components-react'

class ModalWrapper extends Component {
  static propTypes = {
    status: PropTypes.string,
    handleClose: PropTypes.func,
    handleOpen: PropTypes.func,
    children: PropTypes.node,
    id: PropTypes.string,
    buttonTriggerText: PropTypes.string,
    modalLabel: PropTypes.string,
    modalHeading: PropTypes.string,
    modalText: PropTypes.string,
    passiveModal: PropTypes.bool,
    withHeader: PropTypes.bool,
    modalBeforeContent: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    handleSubmit: PropTypes.func,
    open: PropTypes.bool
  };

  static defaultProps = {
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
  }

  handleKeyDown = (event) => {
  	const { handleClose, onKeyDown } = this.props; 
  	if (event.which === 27) {
  		handleClose(); 
  		onKeyDown(event); 
  	}
  }

  render() {
    const {
      id,
      buttonTriggerText,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      open,
      ...other
    } = this.props;

    const props = {
      id,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      open,
      onRequestClose: this.props.handleClose,
      onRequestSubmit: this.props.handleSubmit,
    };

    return (
      <div onKeyDown={this.handleKeyDown}>
        <Button onClick={this.props.handleOpen}>{buttonTriggerText}</Button>
        <Modal {...props} {...other}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalWrapper;