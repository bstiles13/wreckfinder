import React, { Fragment } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import './ConfirmationModal.scss';

export const ConfirmationModal = ({
  children,
  className,
  header,
  onConfirm,
  onCancel,
  modalOpen,
  size = 'small'
}) => (
  <Fragment>
    <Modal
      className={`confirmation-modal ${className}`}
      open={modalOpen}
      onClose={onCancel}
      centered={false}
      size={size}
    >
      <Modal.Header className='confirmation-modal-header'>{header || 'Confirm'}</Modal.Header>
      <Modal.Content className='confirmation-modal-content'>{children}</Modal.Content>
      <Modal.Actions>
        <Button
          className='button-secondary confirmation-modal-cancel-button'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className='button-primary confirmation-modal-proceed-button'
          onClick={onConfirm}
        >
          Proceed
        </Button>
      </Modal.Actions>
    </Modal>
  </Fragment>
);
