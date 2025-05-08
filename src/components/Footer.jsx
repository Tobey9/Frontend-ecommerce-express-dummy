import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="logos">
          <FaXTwitter className="icon" />
          <IoLogoFacebook className="icon" />
          <IoLogoYoutube className="icon" />
          <IoLogoInstagram className="icon" />
        </div>
        <div className="clickable">
          <div>
            <p>Sustainability and Responsibility</p>{" "}
            <p>Modern Slavery Statement</p>
          </div>

          <div>
            <p>Payment Info</p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>Terms and Condition of Sale</p>
          </div>

          <div>
            <p>Declaration of Conformity</p>
            <p>Cookie Policy</p>
            <p>Cookie Preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};
