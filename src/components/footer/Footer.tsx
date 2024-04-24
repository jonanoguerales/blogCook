import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="footer mx-auto max-w-screen-3xl">
      <div className="footerInfo">
        <h2>Copyright © | 2024 - Blog[Cook]</h2>
      </div>
      <div className="footerIcons">
        <Link
          href="https://es-es.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} className="icon-footer size-6 " />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="icon-footer size-6 " />
        </Link>
        <Link href="https://www.pinterest.es/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faPinterest} className="icon-footer size-6 " />
        </Link>
        <Link href="https://twitter.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faXTwitter} className="icon-footer size-6 " />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
