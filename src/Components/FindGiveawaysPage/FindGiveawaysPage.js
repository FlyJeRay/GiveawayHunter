import React, { useEffect, useState } from "react";
import Select from "react-select";
import Parser from "html-react-parser";

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
    instructions: ``,
    open_giveaway_url: '',
    platforms: '',
    status: '',
    type: '',
    title: '',
    id: '1'
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

  const addZeroToNumber = (n) => {
    return n > 9 ? n : "0" + n;
  }

  const cleanTimezoneOffset = (n) => {
    return n / 60 + ':' + addZeroToNumber(n % 60);
  } 

  const cleanDate = (d) => {
    const date = new Date(d);

    const dateToString = `${date.getDate()}.${addZeroToNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
    const timeToString = `${date.getHours()}:${addZeroToNumber(date.getMinutes())}:${addZeroToNumber(date.getSeconds())}`;
    const timezoneToString = `(${cleanTimezoneOffset(date.getTimezoneOffset())} UTC)`

    const str = `${dateToString} ${timeToString} ${timezoneToString}`;

    return str;
  }

  const returnGiveawayDate = (date) => {
    if (isNaN(new Date(date))) {
      return 'not mentioned';
    }
    else {
      return cleanDate(new Date(date));
    }
  }

  function SalesBlock() {
    if (giveaways.length > 0) {
      return <div className="giveaways_list">{
        giveaways.map((giveaway) => {
          return (
          <button className="giveaway_block" key={giveaway.title}>
            <h3>{giveaway.title}</h3>
            <p className="giveaway_description">{giveaway.description}</p>
            <p id={giveaway.id} className="giveaway_instruction">{Parser(giveaway.instructions)}</p>
            <p className="giveaway_description">End Date: { returnGiveawayDate(giveaway.end_date) }</p>
          </button>)
        })
      }</div>
    }
    else {
      return <h2 className="giveaways_nosales_title">Sorry, but there are no giveaways of that type</h2>
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
                className="giveaways_select_dvp"
                placeholder={<div>Sort by Date, Value or Popularity</div>}
                options={selectOptions_dvp} />
      </div>
      <SalesBlock/>
    </div>
  )
}

export default FindGiveawaysPage;