
'use strict';
import {Loader} from "./Loader";
import {DataStorage} from "./Storage";


console.log("Start Worker");
let store = new DataStorage();

console.log("Create/Load storage");
let loader = new Loader(store);

function updateNews(){
    try {
        loader.updateFeeds();
        postMessage("Updated!");
    } catch (e) {
        postMessage(e);
    }
}

function cleanOld(){

}

function run (){
    postMessage("Start Worker");
    updateNews();

    setTimeout("run()", 50000)
}

run();