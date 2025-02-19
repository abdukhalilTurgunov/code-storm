import React from "react";


const API_URL = 'http://127.0.0.1:8000'

export default function Nav({userData}) {
  return (
    <nav className="nav">
      <div className="">
        <a href="#" className="logo">
          <img src="src/assets/img/logo.svg" alt="" />
        </a>
        <ul className="nav_menu">
          <li className="nav_menu-item">
            <a href="/dashboard" className="nav_menu-link">
              <img
                src="src/assets/img/icons/dashboard.svg"
                alt=""
                className="nav_menu-icon"
              />
            </a>
          </li>
          {/* <li className="nav_menu-item">
            <a href="" className="nav_menu-link">
              <img
                src="src/assets/img/icons/calendar.svg"
                alt=""
                className="nav_menu-icon"
              />
            </a>
          </li>
          <li className="nav_menu-item">
            <a href="" className="nav_menu-link">
              <img
                src="src/assets/img/icons/member.svg"
                alt=""
                className="nav_menu-icon"
              />
            </a>
          </li>
          <li className="nav_menu-item">
            <a href="" className="nav_menu-link">
              <img
                src="src/assets/img/icons/notification.svg"
                alt=""
                className="nav_menu-icon"
              />
            </a>
          </li> */}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <a
          href="/profile"
          style={{
            display: "block",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
          }}
        >
          <img
            src={`${API_URL}${userData.member[0].photo}`}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </a>
      </div>
    </nav>
  );
}
