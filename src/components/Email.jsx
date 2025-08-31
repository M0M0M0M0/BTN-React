import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event bubbling
    e.returnValue = false; // Additional prevention
    setShow(true);
    return false; // Extra prevention
  };

  // No body scroll manipulation to prevent page reset
  // useEffect(() => {
  //   // Removed to prevent page reset issue
  // }, [show]);

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
          <div className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your e-mail" 
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleShow(e);
                  return false;
                }
              }}
            />
            {/* Gắn handleShow vào nút này */}
            <Button 
              type="button" 
              onClick={handleShow}
              style={{ 
                minWidth: '120px',
                transition: 'all 0.3s ease'
              }}
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Modal */}
      {show && (
        <div className="custom-modal-overlay" onClick={handleClose}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <h3>🎉 Successfully Subscribed!</h3>
              <button className="custom-modal-close" onClick={handleClose}>
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h4>Thank you for subscribing to our newsletter!</h4>
                <p>You'll receive the latest updates about:</p>
                <ul>
                  <li>🍃 New organic products</li>
                  <li>🌱 Health & wellness tips</li>
                  <li>📦 Special promotions</li>
                  <li>🏡 Farm news & updates</li>
                </ul>
                <p className="note">Please check your email to confirm your subscription!</p>
              </div>
            </div>
            <div className="custom-modal-footer">
              <Button 
                variant="success" 
                onClick={handleClose}
                style={{ 
                  backgroundColor: '#8cc63f', 
                  borderColor: '#8cc63f',
                  padding: '10px 25px'
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Example;
