import { Link } from 'react-router-dom'
// page-level CSS is linked globally via index.html

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light py-3 position-relative">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/img/logo/logo.png" alt="Logo" height="50" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center position-absolute top-50 start-50 translate-middle" id="mainNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">HOME</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/product" id="productsDropdown">PRODUCTS</Link>
                <ul className="dropdown-menu">
                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">Fruits & Vegetables</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Fruits</a></li>
                      <li><a className="dropdown-item" href="#">Vegetables</a></li>
                      <li><a className="dropdown-item" href="#">Organic Produce</a></li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">Juices & Dairy</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Organic Juices</a></li>
                      <li><a className="dropdown-item" href="#">Fresh Dairy Products</a></li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">Processed Food</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Snacks</a></li>
                      <li><a className="dropdown-item" href="#">Dried Fruits</a></li>
                      <li><a className="dropdown-item" href="#">Packaged Goods</a></li>
                    </ul>
                  </li>
                  <li><a className="dropdown-item" href="#">Skin Care</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/offers" id="offersDropdown">SPECIAL OFFERS</Link>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Weekly Discounts</a></li>
                  <li><a className="dropdown-item" href="#">Buy 1 Get 1 Free</a></li>
                  <li><a className="dropdown-item" href="#">Seasonal Bundles</a></li>
                  <li><a className="dropdown-item" href="#">Clearance Sale</a></li>
                  <li><a className="dropdown-item" href="#">Gift Vouchers</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="aboutDropdown">ABOUT US</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Our Story</a></li>
                  <li><a className="dropdown-item" href="#">Farming Practices</a></li>
                  <li><a className="dropdown-item" href="#">Meet the Farmers</a></li>
                  <li><a className="dropdown-item" href="#">Quality & Safety Standards</a></li>
                  <li><a className="dropdown-item" href="#">Careers</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/blog" id="blogDropdown">BLOG</Link>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Healthy Eating Tips</a></li>
                  <li><a className="dropdown-item" href="#">Easy Recipes</a></li>
                  <li><a className="dropdown-item" href="#">Seasonal Food Guides</a></li>
                  <li><a className="dropdown-item" href="#">Customer Stories</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">CONTACT</a></li>
            </ul>
          </div>

          <div className="d-flex flex-column align-items-end ms-auto search-cart-container">
            <div className="d-flex align-items-center">
              <div className="search-container d-flex me-3">
                <input className="form-control" type="search" placeholder="Search products..." aria-label="Search" />
                <button className="btn" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <a href="#" className="cart-link position-relative">
                <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem', color: '#2c3e50' }}></i>
                <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
              </a>
            </div>
            <div className="auth-links">
              <a href="#">Login</a> / <a href="#">Register</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


