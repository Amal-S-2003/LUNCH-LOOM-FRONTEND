import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <div className="bg-gray-800 p-6 text-gray-300">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="logo d-flex items-center ">
            <img src={assets.logo} className="w-12 h-12" alt="" />
            <h1 className="text-white text-2xl font-bold">LUNCH-LOOM</h1>
          </div>
          {/* About Section */}
          <div>
            <h2 className="text-white text-lg font-bold mb-3">About Us</h2>
            <p className="text-sm">
              Lunch-Loom is your one-stop destination for delicious meals and
              hassle-free food management. We bring the best to your table!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white text-lg font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Menu
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-white text-lg font-bold mb-3">Contact Us</h2>
            <p className="text-sm">123 Food Street, Flavor Town, India</p>
            <p className="text-sm">Phone: +91 98765 43210</p>
            <p className="text-sm">Email: support@lunchloom.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-600 pt-4 text-center text-sm">
          <p>&copy; 2025 Lunch-Loom. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
