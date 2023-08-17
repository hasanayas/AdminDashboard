import React, { useState } from "react";
import { Dashboard, BarChart, Group, ChevronRight } from "@mui/icons-material";

import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import UpdateIcon from "@mui/icons-material/Update";

import { useTranslation } from "react-i18next";

const Sidebar = ({ activePage, onPageChange }) => {
  const { t } = useTranslation();

  // Menu öğelerini tanımla
  const menuItems = [
    { name: "Users", icon: <Group /> },
    { name: "UserActions", icon: <UpdateIcon /> },
    { name: "Kanban", icon: <ViewKanbanIcon /> },
    { name: "Analytics", icon: <BarChart /> },
    { name: "Card", icon: <ViewDayIcon /> },
  ];

  // State tanımlamaları
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Sidebar'ı açma/kapama fonksiyonu
  const handleToggleSidebar = () => {
    setIsSidebarClosed((prevState) => !prevState);
  };

  // Arama kutusuna tıklanınca sidebar'ı kapatma fonksiyonu
  const handleSearchClick = () => {
    setIsSidebarClosed(false);
  };

  // Koyu/normal modu değiştirme fonksiyonu
  const handleToggleMode = () => {
    setIsDarkMode((prevState) => !prevState);
    document.body.classList.toggle("dark", isDarkMode);
  };

  // Arama metnini güncelleme fonksiyonu
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrelenmiş menuItems dizisi
  const filteredMenuItems = menuItems.filter((item) =>
    t(`pages.Sidebar.${item.name}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`sidebar ${isSidebarClosed ? "close" : ""} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <header>
        <div className="image-text">
          <span className="image">
            <img
              src="https://resmim.net/cdn/2023/07/24/SbNzMC.jpg"
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
          </span>
          <div className="text logo-text" style={{ marginLeft: "15px" }}>
            <span className="name" style={{ color: "#695CFE" }}>
              Amethyst
            </span>
            <span className="profession">{t("pages.Sidebar.adminPanel")}</span>
          </div>
        </div>
        <ChevronRight className="toggle" onClick={handleToggleSidebar} />
      </header>
      <div className="menu-bar">
        <div className="menu">
          {/* Arama kutusu */}
          <li className="search-box" onClick={handleSearchClick}>
            <i className="bx bx-search icon"></i>
            <input
              type="text"
              placeholder={t("pages.Sidebar.searchPlaceholder")}
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </li>
          {/* Menü bağlantıları */}
          <ul className="menu-links" style={{ padding: 0 }}>
            {filteredMenuItems.map((item) => (
              <li
                key={item.name}
                className={`nav-link ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => onPageChange(item.name)}
              >
                <a href="#">
                  <span className="icon">{item.icon}</span>
                  <span className="text nav-text">
                    {t(`pages.Sidebar.${item.name}`)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Tema Değiştirme */}
        <div className="bottom-content">
          <li className="mode" onClick={handleToggleMode}>
            <div
              className="sun-moon"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ marginLeft: "15px" }}>
                {isDarkMode ? (
                  <LightModeIcon sx={{ color: "#695cfe" }} />
                ) : (
                  <NightsStayIcon sx={{ color: "white" }} />
                )}
              </div>
              <span className="mode-text text" style={{ marginLeft: "20px" }}>
                {t(
                  isDarkMode
                    ? "pages.Sidebar.lightMode"
                    : "pages.Sidebar.darkMode"
                )}{" "}
                {/* Use the translated value here */}
              </span>
            </div>
            <div className="toggle-switch">
              <span className={`switch ${isDarkMode ? "dark" : ""}`}></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
