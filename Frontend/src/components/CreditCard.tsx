import React from "react";
import "../styles/CreditCard.css";

function CreditCard({ card_number, name, valid_thru }) {
  // const card_number = "1234 5678 9012 3456";
  // const name = "SHREYAS SOLANKI";
  // const valid_thru = "12/26";
  const cvv=477
  const bank_name = "ICICI BANK";

  return (
    <div className="container">
      <div className="card-body ">
        <div className="card-top-row">
          <p className="space-mono-bold bank-name m-2">{bank_name}</p>
          <div className="mastercard-logo-mini">
             <div className="mastercard-logo"></div>
          </div>
        </div>

        {/* Chip */}
        <div className="row">
          <div className="chip mx-3 my-3 col-sm-2"></div>
        </div>

        {/* Card Number */}
        <div className="card-number-row">
          <p className="space-mono-bold">{card_number}</p>
        </div>

        {/* Holder Name and Expiration Date */}
        <div className="card-bottom-row">
          <div className="name-and-expiry">
            <p className="label space-mono-regular">Card Holder</p>
            <p className="space-mono-regular name">{name}</p>
          </div>
          <div className="name-and-expiry expiry">
            <p className="label space-mono-regular">Valid Thru</p>
            <p className="space-mono-regular name">{valid_thru}</p>
          </div>
        </div>
      </div>
      {/* Card on flip */}
      <div className="card-body-flip">
          <div className="row">
            <div className="col-sm-10"></div>
            <div className="col-sm-2">
              <label htmlFor="cvv">{cvv}</label>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CreditCard;
