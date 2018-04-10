/**
 * Created by david on 08.03.17.
 */

'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import {Body} from './Body';
import {DataStorage} from './Storage';
import {Loader} from "./Loader";
//import Worker from "workerjs";
require('../node_modules/material-design-lite/material.js');

console.log("Create DataStorage");
let store = new DataStorage();


// create/init storage
console.log("Create/Load storage");
let loader = new Loader(store);

console.log("Load data and render body");
loadData(renderBody);

/*let worker = new Worker('/home/david/Playground/Noar/src/Worker.js', true);

worker.onmessage = (e) =>{
    console.log(e)
};
*/


function updateContent(){
    try {
        loader.updateFeeds().then((d) => console.log("Updated!"));
    } catch (e) {
        console.log(e);
    }
    setTimeout(updateContent, 5*60*1000);
}

updateContent();

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
