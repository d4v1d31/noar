/**
 * Created by david on 08.03.17.
 */
require('../css/main.less');

'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import {data} from './ExampleData'; // load example data
import {Body} from './Body';
import {DataStorage} from './Storage';
import {Loader} from "./Loader";


// create/init storage
let store = new DataStorage();

let loader = new Loader(store);
loader.loadFeed('heise online', 'https://www.heise.de/newsticker/heise-atom.xml');
//loader.loadFeed('Golem', 'https://rss.golem.de/rss.php?feed=ATOM1.0');

// fill db with example data
/*for(let source of data.news){
    store.addNewsSource(source).then((id) =>{
        for (let article of source.articles){
            article.sourceId = id;
            store.addNewsArticle(article);
        }
    })
}*/




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
                      store={store}/>,
                document.querySelector("#root")
            );
        })
    });


