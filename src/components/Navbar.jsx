// import React from "react";

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <img
            src='./doc.png'
            alt=''
            width='30'
            height='30'
            className='d-inline-block align-text-top'
          />
          <p className='d-inline-block align-text-top ms-2'>Doc Generator</p>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <button type='button' className='btn btn-primary ms-auto me-4'>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
