import React from "react";

const Footer = () => {
  const auth = localStorage.getItem("user");

  if (!auth) {
    return null;
  }

  return (
    <div>
      <footer className="bg-dark text-white p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Company Name</h5>
              <p>Some information about the company.</p>
            </div>
            <div className="col-md-6">
              <h5>Contact Us</h5>
              <address>
                123 Main St
                <br />
                City, State, Zip
                <br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
