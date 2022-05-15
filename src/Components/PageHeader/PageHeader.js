import React from "react";
import { NavLink } from "react-router-dom";

import "./PageHeader.css"

function PageHeader() {
  return(
    <div className="header_background">
      <div className="header">
        <h1 className="header_title">GIVEAWAY HUNTER</h1>
        <div className="header_link_block">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'header_active_link' : 'header_link')} >Find Giveaways</NavLink>
          <NavLink to="/info" className={({ isActive }) => (isActive ? 'header_active_link' : 'header_link')} >About Website</NavLink>
        </div>
      </div>
    </div>
  )
}

export default PageHeader;