import React, { useEffect } from "react";

import "./FindGiveawaysPage.css"
import api_data from "../../api-data"

function FindGiveawaysPage() {
  const options = {
    method: 'GET',
    url: 'https://gamerpower.p.rapidapi.com/api/giveaways',
    params: {platform: 'pc'},
    headers: {
      'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com',
      'X-RapidAPI-Key': api_data.apikey
    }
  };

  const pullGiveaways = async () => {
    const data = await fetch(options.url, options);
    console.log(data);
    const json = await data.json();
    console.log(json);
  }

  pullGiveaways();

  return(
    <h1 className="giveaways_title">Giveaways</h1>
  )
}

export default FindGiveawaysPage;