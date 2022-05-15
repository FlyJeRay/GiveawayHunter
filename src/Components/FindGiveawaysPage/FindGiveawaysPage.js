import React, { useEffect, useState } from "react";
import Select from "react-select";

import "./FindGiveawaysPage.css"
import api_data from "../../api-data"

function FindGiveawaysPage() {
  const [fetchParams, setFetchParams] = useState({
    platform: 'pc',
    type: 'game',
    'sort-by': 'popularity'
  });

  const [giveaways, setGiveaways] = useState([{
    description: '',
    end_date: '',
    image: '',
    instructions: '',
    open_giveaway_url: '',
    platforms: '',
    status: '',
    type: '',
    title: ''
  }]);

  useEffect(() => {
    pullGiveaways();
  }, [fetchParams]);

  const selectOptions_platform = [
    { value: 'pc', label: 'All PC stores'},
    { value: 'steam', label: 'Steam'},
    { value: 'epic-games-store', label: 'Epic Games Store'},
    { value: 'ubisoft', label: 'Ubisoft'},
    { value: 'gog', label: 'GOG'},
    { value: 'itchio', label: 'itch.io'},
    { value: 'ps4', label: 'PlayStation 4'},
    { value: 'ps5', label: 'PlayStation 5'},
    { value: 'xbox-one', label: 'Xbox One'},
    { value: 'xbox-series-xs', label: 'Xbox Series X|S'},
    { value: 'switch', label: 'Nintendo Switch'},
    { value: 'android', label: 'Android'},
    { value: 'ios', label: 'iOS'},
    { value: 'vr', label: 'VR'},
    { value: 'battlenet', label: 'Battle.Net'},
    { value: 'origin', label: 'Origin'},
    { value: 'drm-free', label: 'DRM Free'},
    { value: 'xbox-360', label: 'Xbox 360'},
  ]

  const selectOptions_type = [
    { value: 'game', label: 'Game'},
    { value: 'loot', label: 'Loot'},
    { value: 'beta', label: 'Beta'},
  ]

  const selectOptions_dvp = [
    { value: 'date', label: 'Date'},
    { value: 'value', label: 'Value'},
    { value: 'popularity', label: 'Popularity'},
  ]

  const fetchOptions = {
    url: 'https://gamerpower.p.rapidapi.com/api/giveaways',
    params: fetchParams,
    headers: {
      'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com',
      'X-RapidAPI-Key': api_data.apikey
    }
  };

  const pullGiveaways = async () => {
    const fetchURL = `${fetchOptions.url}?platform=${fetchOptions.params.platform}&type=${fetchOptions.params.type}&sort-by=${fetchOptions.params["sort-by"]}`
    const data = await fetch(fetchURL, fetchOptions);
    const json = await data.json();
    setGiveaways(json);
    console.log(json);
  }

  const changePlatformSort = (event) => {
    setFetchParams({
      platform: event.value,
      type: fetchParams.type,
      'sort-by': fetchParams['sort-by']
    })
  }

  const changeTypeSort = (event) => {
    setFetchParams({
      platform: fetchParams.platform,
      type: event.value,
      'sort-by': fetchParams['sort-by']
    })
  }

  const changeDVPSort = (event) => {
    setFetchParams({
      platform: fetchParams.platform,
      type: fetchParams.type,
      'sort-by': event.value
    })
  }

  function SalesBlock() {
    if (giveaways.length > 0) {
      return <div>{
        giveaways.map((giveaway) => {
          return (<h3 className="giveaway_product_title" key={giveaway.title}>{giveaway.title}</h3>)
        })
      }</div>
    }
    else {
      return <h2>Sorry, but there are no giveaways</h2>
    }
  }

  return(
    <div>
      <h1 className="giveaways_title">Giveaways</h1>
      <div className="giveaways_select_block">
        <Select onChange={changePlatformSort}
                className="giveaways_select" 
                placeholder={<div>Sort by Platforms</div>} 
                options={selectOptions_platform} />
        
        <Select onChange={changeTypeSort}
                className="giveaways_select"
                placeholder={<div>Sort by Giveaway Type</div>}
                options={selectOptions_type} />

        <Select onChange={changeDVPSort}
                className="giveaways_select"
                placeholder={<div>Sort by Date, Value or Popularity</div>}
                options={selectOptions_dvp} />
      </div>
      <SalesBlock/>
    </div>
  )
}

export default FindGiveawaysPage;