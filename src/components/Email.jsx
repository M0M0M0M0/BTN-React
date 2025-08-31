import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="footer-content">
          <div className="footer-text">
            <h2>
              Subscribe To Our <br /> Newsletter
            </h2>
          </div>
          <div className="footer-form">
            <input type="email" placeholder="Enter your e-mail" />
            {/* Gắn handleShow vào nút này */}
            <Button type="button" onClick={handleShow}>
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for Subscribing!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo 🎉 You are now subscribed to our newsletter!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
