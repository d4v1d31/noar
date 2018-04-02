/**
 * Created by david on 08.03.17.
 */
import {WelcomeScreen} from "./BodyParts";

require('../node_modules/material-design-lite/material.js');
import Readability from '../lib/readability/Readability';


'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import {Body} from './Body';
import {DataStorage} from './Storage';
import {Loader} from "./Loader";

import {JSDOM} from 'jsdom';


// var loc = "https://www.heise.de/newsticker/meldung/Duerre-in-Saskatchewan-Stromzaehler-fangen-Feuer-3793755.html";

// JSDOM.fromURL("https://www.heise.de/newsticker/meldung/Duerre-in-Saskatchewan-Stromzaehler-fangen-Feuer-3793755.html", {})
   // .then(dom => {
    //   console.log(dom.window.document);
     //   var uri = {
    //        spec: "https://www.heise.de/newsticker/meldung/Duerre-in-Saskatchewan-Stromzaehler-fangen-Feuer-3793755.html",
    //        host: "www.heise.de",
//      prePath: "https://www.heise.de",
  //          scheme: "https",
    //        pathBase: 'https://www.heise.de/newsticker/meldung/'
      //  };

     //   var article = new Readability(uri, dom.window.document).parse();
     //   console.log(article);
   // });


let store = new DataStorage();
//Loader.loadArticleContent(
//    'https://www.heise.de/newsticker/meldung/Duerre-in-Saskatchewan-Stromzaehler-fangen-Feuer-3793755.html',
//    (img, content) => {
//        store.addNewsArticle({
//          'id': 'https://www.heise.de/newsticker/meldung/Duerre-in-Saskatchewan-Stromzaehler-fangen-Feuer-3793755.html',
      //    'title': 'sometitle',
    //      'summary': 'sumsum',
  //        'updated': new Date(),
//          'content': content,
//          'sourceId': 'heise.de'

//        }).then((a, b) => {
//                console.log(a);
//                console.log(b);
//                console.log(img);
//                console.log(content);
//                console.log(content.length);
//            }
//        ).catch(ex => console.log(ex));
//    });

// create/init storage
let loader = new Loader(store);

loadData(renderBody);

// load example data
//loader.loadFeed('heise online', 'https://www.heise.de/newsticker/heise-atom.xml');
//loader.loadFeed('Golem', 'http://rss.golem.de/rss.php?feed=ATOM1.0');


loader.updateFeeds();
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
