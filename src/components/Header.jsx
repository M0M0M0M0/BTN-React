import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import RippleButton from './RippleButton'
import RippleLink from './RippleLink'
import RippleAnchor from './RippleAnchor'
// page-level CSS is linked globally via index.html

export default function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState([]);
  const searchRef = useRef(null);

  // Load products from JSON file
  useEffect(() => {
    fetch('./json/products.json')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length >= 2) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        handleResultClick(searchResults[0]); // Select first result
      } else if (searchTerm.length >= 2) {
        // Perform search action
        console.log('Searching for:', searchTerm);
        setShowResults(false);
      }
    }
  };

  // Handle search result click
  const handleResultClick = (product) => {
    setSearchTerm(product.name);
    setShowResults(false);
    // Navigate to product page or add to cart
    console.log('Selected product:', product);
  };

  // Handle category navigation
  const handleCategoryClick = (category, event) => {
    // Remove focus from clicked element to prevent stuck hover effect
    if (event && event.target) {
      event.target.blur();
    }
    
    // Check if it's an offers category
    const offersCategories = ['weekly', 'bogo', 'bundles', 'clearance', 'seasonal', 'gift'];
    if (offersCategories.includes(category)) {
      navigate(`/offers?category=${category}`);
    } else {
      navigate(`/product?category=${category}`);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light py-3 position-relative">
        <div className="container-fluid">
          <RippleLink className="navbar-brand" to="/">
            <img src="./img/logo/logo.png" alt="Logo" height="50" />
          </RippleLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center position-absolute top-50 start-50 translate-middle" id="mainNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <RippleLink className="nav-link" to="/">HOME</RippleLink>
              </li>
              <li className="nav-item dropdown">
                <RippleLink className="nav-link dropdown-toggle" to="/product" id="productsDropdown">PRODUCTS</RippleLink>
                <ul className="dropdown-menu">
                  <li className="dropdown-submenu">
                    <RippleAnchor className="dropdown-item dropdown-toggle" href="#">Fruits & Vegetables</RippleAnchor>
                    <ul className="dropdown-menu">
                      <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('fruits', e); }}>Fruits</RippleAnchor></li>
                      <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('vegetables', e); }}>Vegetables</RippleAnchor></li>
                      <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('all', e); }}>Organic Produce</RippleAnchor></li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <RippleAnchor className="dropdown-item dropdown-toggle" href="#">Juices & Dairy</RippleAnchor>
                    <ul className="dropdown-menu">
                      <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('juice', e); }}>Organic Juices</RippleAnchor></li>
                      <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('dairy', e); }}>Fresh Dairy Products</RippleAnchor></li>
                    </ul>
                  </li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('processed-food', e); }}>Processed Food</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('skin-care', e); }}>Skin Care</RippleAnchor></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <RippleLink className="nav-link dropdown-toggle" to="/offers" id="offersDropdown">SPECIAL OFFERS</RippleLink>
                <ul className="dropdown-menu">
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('weekly', e); }}>Weekly Discounts</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('bogo', e); }}>Buy 1 Get 1 Free</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('seasonal', e); }}>Seasonal Bundles</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('clearance', e); }}>Clearance Sale</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('gift', e); }}>Gift Vouchers</RippleAnchor></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <RippleAnchor className="nav-link dropdown-toggle" href="#" id="aboutDropdown">ABOUT US</RippleAnchor>
                <ul className="dropdown-menu">
                  <li><RippleAnchor className="dropdown-item" href="#">Our Story</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#">Farming Practices</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#">Meet the Farmers</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#">Quality & Safety Standards</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#">Careers</RippleAnchor></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <RippleLink className="nav-link dropdown-toggle" to="/blog" id="blogDropdown">BLOG</RippleLink>
                <ul className="dropdown-menu">
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/blog?category=tips'); }}>Healthy Eating Tips</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/blog?category=recipes'); }}>Easy Recipes</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/blog?category=guides'); }}>Seasonal Food Guides</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/blog?category=stories'); }}>Customer Stories</RippleAnchor></li>
                </ul>
              </li>
              <li className="nav-item"><RippleAnchor className="nav-link" href="#">CONTACT</RippleAnchor></li>
            </ul>
          </div>

          <div className="d-flex flex-column align-items-end ms-auto search-cart-container">
            <div className="d-flex align-items-center position-relative" ref={searchRef}>
              <div className="search-container position-relative me-3">
                <input 
                  className="form-control" 
                  type="search" 
                  placeholder="Search products..." 
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
                <RippleButton 
                  className="btn search-btn position-absolute" 
                  type="button"
                  onClick={() => {
                    if (searchResults.length > 0) {
                      handleResultClick(searchResults[0]);
                    } else if (searchTerm.length >= 2) {
                      console.log('Searching for:', searchTerm);
                      setShowResults(false);
                    }
                  }}
                >
                  <i className="fas fa-search"></i>
                </RippleButton>
              </div>
              
              {/* Search Results Dropdown - Tách riêng khỏi search container */}
              {showResults && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(product)}
                    >
                           <div className="search-result-image">
                          <img 
                            src={`/images/organic-img/${product.name.toLowerCase().replace(/\s+/g,'-')}.jpg`} 
                            alt={product.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="image-placeholder"
                            style={{
                              display: 'none',
                              width: '100%',
                              height: '100%',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '6px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: '#6c757d'
                            }}
                          >
                            {product.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      <div className="search-result-info">
                        <div className="search-result-name">{product.name}</div>
                        <div className="search-result-category">{product.category}</div>
                        <div className="search-result-price">{product.price} / {product.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results Message - Tách riêng khỏi search container */}
              {showResults && searchResults.length === 0 && searchTerm.length >= 2 && (
                <div className="search-results-dropdown">
                  <div className="no-results">No products found</div>
                </div>
              )}
              <RippleAnchor href="#" className="cart-link position-relative">
                <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem', color: 'rgb(222, 223, 224)' }}></i>
                <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill">3</span>
              </RippleAnchor>
            </div>
            <div className="auth-links">
              <RippleAnchor href="#">Login</RippleAnchor> / <RippleAnchor href="#">Register</RippleAnchor>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


