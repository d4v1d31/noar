/**
 * Created by david on 08.03.17.
 */
require('../css/main.less');
require('../../node_modules/material-design-lite/material.js');

'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import {Body} from './Body';
import {DataStorage} from './Storage';
import {Loader} from "./Loader";


// create/init storage
let store = new DataStorage();

let loader = new Loader(store);
// load example data
loader.loadFeed('heise online', 'https://www.heise.de/newsticker/heise-atom.xml');
loader.loadFeed('Golem', 'https://rss.golem.de/rss.php?feed=ATOM1.0');


loader.updateFeeds();
setInterval(loader.updateFeeds, 5*60*1000);


// load sources
(store.getNewsSources()).then(
    (sources) => {

        let currentSource =  sources[0];
        let newsSources = sources;

        // load articles
        store.getArticles(currentSource.id).then((currentArticles) => {

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
        })
    }
);


