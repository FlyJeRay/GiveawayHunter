import React from "react";

import "./InformationPage.css"

function InformationPage() {
  return(
    <div>
      <h1 className="info_title">Information</h1>
      <p className="info_text">This website was made as a Pet Project on React. It is written on HTML+JS+SCSS</p>
      <p className="info_text">It can be used as a tracker of different giveaways in gaming - as example, you can see all current free games in EGS here</p>
      <p className="info_text">The source code of website can be seen on <a href="https://github.com/FlyJeRay/GiveawayHunter">GitHub</a></p>
      <p className="info_text">Color Palette of website can be seen <a href="https://colorhunt.co/palette/112b3c205375f66b0eefefef">here</a></p>
    </div>
  )
}

export default InformationPage;