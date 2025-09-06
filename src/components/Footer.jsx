import '../../public/css/FileFooter.css'
import Example from './Email';

export default function Footer() {
  return (
    <>
      <Example />

      <div className="my-footer">
        <footer className="footer-bottom">
          <div className="footer-columns-container">
            <div className="footer-col contact-col">
              <h3>Contact</h3>
              <ul>
                <li><i className="fas fa-home"></i> 2/45 Tower Street, New York, USA</li>
                <li><i className="fas fa-phone"></i> 0012 678 8899</li>
                <li><i className="fas fa-envelope"></i> contact@organie.com</li>
                <li><i className="fas fa-globe"></i> <a href="http://www.organiestore.com" target="_blank">www.organiestore.com</a></li>
              </ul>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-col info-col">
              <h3>Information</h3>
              <ul>
                <li><a href="#">New Products</a></li>
                <li><a href="#">Top Sellers</a></li>
                <li><a href="#">Our Blog</a></li>
                <li><a href="#">About Our Shop</a></li>
                <li><a href="#">Secure Shopping</a></li>
              </ul>
            </div>
            <div className="footer-col account-col">
              <h3>My Account</h3>
              <ul>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Personal Information</a></li>
                <li><a href="#">Addresses</a></li>
                <li><a href="#">Discount</a></li>
                <li><a href="#">Orders History</a></li>
              </ul>
            </div>
            <div className="footer-col instagram-col">
              <h3>Photo in Instagram</h3>
              <div className="instagram-grid">
                <img src="./img/103488860_2308395562789507_2609505307234646225_n.jpg" alt="Instagram Image 1" />
                <img src="./img/19960-avocado-salad-VAT-001-4x3-64241afdc3b04d00a9372e1573eac6f7.jpg" alt="Instagram Image 2" />
                <img src="./img/3aeeee1d04b16f5ab613337aca0721e7.jpg" alt="Instagram Image 3" />
                <img src="./img/acai-bowl-1.jpg" alt="Instagram Image 4" />
                <img src="./img/banner-2021-04-16T110729.441.jpg" alt="Instagram Image 5" />
                <img src="./img/images.jpg" alt="Instagram Image 6" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}


