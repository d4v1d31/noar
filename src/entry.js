/**
 * Created by david on 08.03.17.
 */
import {WelcomeScreen} from "./BodyParts";

require('../node_modules/material-design-lite/material.js');

'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import {Body} from './Body';
import {DataStorage} from './Storage';
import {Loader} from "./Loader";


// create/init storage
let store = new DataStorage();
let loader = new Loader(store);

loadData(renderBody);

// load example data
//loader.loadFeed('heise online', 'https://www.heise.de/newsticker/heise-atom.xml');
//loader.loadFeed('Golem', 'http://rss.golem.de/rss.php?feed=ATOM1.0');


//loader.updateFeeds();
//setInterval(loader.updateFeeds, 5*60*1000);

function loadData(callback){

    // load News Sources
    (store.getNewsSources()).then((sources) => {
        if(sources.length > 0){
            // load Article from first News Source
            let currentSource =  sources[0];
            store.getArticles(currentSource.id).then((currentArticles) => {
                // set first Article to show
                let currentArticle = currentArticles[0];
                callback(sources, currentSource, currentArticles, currentArticle);
            })
        } else {
            // load empty app
            console.log("load empty app");
            callback([], {}, [], {});
        }
    })

}

function renderBody(newsSources, currentSource, currentArticles) {
    // render app
    ReactDOM.render(
        <Body newsSources     = {newsSources}
              currentSource   = {currentSource}
              currentArticles = {currentArticles}
              currentArticle  = {currentArticles[0]}
              store           = {store}
              loader          = {loader}
        />,
        document.querySelector("#root")
    );
    componentHandler.upgradeElement(document.getElementById('addSourceTitle'));
    componentHandler.upgradeElement(document.getElementById('addSourceUrl'));
}
