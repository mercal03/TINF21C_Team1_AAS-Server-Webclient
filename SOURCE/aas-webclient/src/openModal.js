import React from 'react';
import {Modal, Button} from "react-bootstrap";
import ModalBody from "./modalBody";

class OpenModal extends React.Component {
    state = {
        isOpen: false,
        content: JSON.parse(window.sessionStorage.getItem("shells"))[this.props.index]
    };

    openModal = () => {
        this.setState({
            isOpen: true,
            render: false
        });
    }
    closeModal = () => this.setState({isOpen: false});

    render() {
        return (
            <div>
                <div
                    className="d-flex align-items-center justify-content-center">
                    <Button variant="primary" onClick={this.openModal}>
                        Open Asset
                    </Button>
                </div>
                <Modal show={this.state.isOpen} onHide={this.closeModal}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalBody content={this.state.content}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default OpenModal;