/**
 * Created by david on 10.03.17.
 */
import * as parse5 from 'parse5';
import * as https from "https";
import * as http from "http";
import Parser from "rss-parser";
import {JSDOM} from "jsdom";
import Readability from "../lib/readability/Readability";

class ParserState{
    static p =  0;
    static img = 1;
    static article = 2;
    static article_p = 3;
    static article_footer = 4;
    static idle = 5;

}

export class Loader {

    constructor(store){
        this.store = store;
        this.updateFeeds = this.updateFeeds.bind(this);
//        this.loadArticleContent = this.loadArticleContent.bind(this);
//        this.httpGetAsync = this.httpGetAsync.bind(this)
    }

    static httpGetAsync(theUrl, callback) {
        let parser = document.createElement('a');
        parser.href = theUrl;
        console.log({
            protocol: parser.protocol,
            hostname: parser.hostname,
            port: parser.port,
            path: parser.pathname,
            search: parser.search
        });
        let request;
        if (parser.protocol === 'https:') {
            request = https.request({
                method: 'GET',
                protocol: parser.protocol,
                hostname: parser.hostname,
                port: parser.port,
                path: (parser.pathname).concat(parser.search)
            });
        } else if (parser.protocol === 'http:'){
            request = http.request({
                method: 'GET',
                protocol: parser.protocol,
                hostname: parser.hostname,
                port: parser.port,
                path: (parser.pathname).concat(parser.search)
            });
        }

        request.on('response', (response) => {

            console.log(`STATUS: ${response.statusCode} (${response.statusMessage})`);
            // TODO handle redirects

            response.on('error', (error) => {
                console.log(`ERROR: ${JSON.stringify(error)}`)
            });

            response.on('finish', callback);
        });

        request.end();


    }

    loadFeed(title, url , callback){
        let store = this.store;
        let parser = new Parser();
        parser.parseURL(url, function(err, parsed) {

            console.log(parsed);
            let newsSource = {
                title: title,
                feed_title: parsed.title,
                url: url,
                id: parsed.feedUrl
            };

            let articles = [];
            parsed.items.forEach(function(entry) {
                Loader.loadArticleContent(entry.link, (article) => {
                    articles.push({
                        title: entry.title,
                        link: entry.link,
                        id: entry.id,
                        updated: entry.pubDate,
                        summary: entry.contentSnippet,
                        content: article.content,
                    });
                    store.addNewsSource(newsSource).then((id) =>{
                        for (let article of articles){
                            article.sourceId = id;
                            store.addNewsArticle(article);
                        }
                    });

                })
            });

        })
    }

    static getClass(attr){
        for (let a in attr){
            if(attr[a].hasOwnProperty('name') &&
               attr[a].hasOwnProperty('value') &&
               attr[a].name === 'class'){

                return attr[a].value.trim()
            }
        }
        return null
    }

    static loadArticleContent(url, callback){

        JSDOM.fromURL(url, {})
            .then(dom => {
                var uri = {
                    spec: url,
                    host: "www.heise.de",
                    prePath: "https://www.heise.de",
                    scheme: "https",
                    pathBase: 'https://www.heise.de/newsticker/meldung/'
          };

           var article = new Readability(uri, dom.window.document).parse();
           console.log(article);
           callback(article);
         });
    }

    updateFeeds(){
        this.store.getNewsSources().then(
            (sources) => {
                sources.map((s) => this.loadFeed(s.title, s.url))
            });
        console.log("Feeds updated...");
    }

}