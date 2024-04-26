import React from "react";
import "./sidebardash.css";
import lunita from "./lunita.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faPaperclip,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"; // El icono o iconos a utilizar
import Link from "next/link";
import Image from "next/image";

const SidebarDash = () => {
  return (
    <div className="sidebarDash">
      <div className="topDash">
        <div className="lunita">
          <Image src={lunita} alt="icono luna" width={40} height={40} />
        </div>
        <span className="logo">Dashbo</span>
      </div>
      <div className="center">
        <ul>
          <Link
            href="/dashboard"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <li>
              <FontAwesomeIcon icon={faChartLine} className="leftpa" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link
            href="/tablePosts"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <li>
              <FontAwesomeIcon icon={faPaperclip} className="leftpa" />
              <span>Posts</span>
            </li>
          </Link>
          <Link
            href="/tableUsers"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <li>
              <FontAwesomeIcon icon={faUsers} className="leftpa" />
              <span>Usuarios</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <ul>
          <li>
            <Link href="/" style={{ textDecoration: "none" }}>
              <button>Salir</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDash;
