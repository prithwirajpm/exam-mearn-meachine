import React from "react";

function Header() {
  return (
    <div>
      <nav className="w-100 shadow bg-light pt-1 pb-1 text-dark">
        <div className="m-3 ">
          <div className="m-3 d-flex justify-content-between">
            <img
              src="https://assets.stickpng.com/images/6102dc563de48b00044eb5b3.png"
              alt=""
              srcset=""
              style={{ width: "100px" }}
            />
            <h5 className="text-primary mt-3">PRODUCTS</h5>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
