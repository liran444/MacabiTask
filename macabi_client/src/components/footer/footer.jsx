import React from "react";
import "./footer.css";

const Footer = () => {
    let owner = "Liran Dekamhi";
    let currentYear = new Date().getFullYear();

    return (
        <div>
            <div className="topFooter"></div>
            <p className="footer">
                &copy; Copyrights reservered to {owner} - {currentYear}
            </p>
        </div>
    );
}

export default Footer;