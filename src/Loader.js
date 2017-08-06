/**
 * Created by david on 10.03.17.
 */
import * as parse5 from 'parse5';
import * as https from "https";
import * as http from "http";
import * as rssParser from "rss-parser";

export class Loader {

    constructor(store){
        this.store = store;
        this.updateFeeds = this.updateFeeds.bind(this);
        this.loadArticleContent = this.loadArticleContent.bind(this);
    }

    httpGetAsync(theUrl, callback) {
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

            response.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
        });

        request.end();


    }

    loadFeed(title, url , callback){
        let store = this.store;
        rssParser.parseURL(url, function(err, parsed) {

            console.log(parsed);
            let newsSource = {
                title: title,
                feed_title: parsed.feed.title,
                url: url,
                id: parsed.feed.feedUrl
            };

            let articles = [];
            parsed.feed.entries.forEach(function(entry) {
                articles.push({
                    title: entry.title,
                    link: entry.link,
                    id: entry.id,
                    updated: entry.pubDate,
                    summary: entry.contentSnippet,
                });
            });

            store.addNewsSource(newsSource).then((id) =>{
                for (let article of articles){
                    article.sourceId = id;
                    store.addNewsArticle(article);
                }
            });

        })
    }

    loadArticleContent(id, callback){

        return "Some Content";

    /*    $.get(id, (data) => {

            data = $($.parseHTML($.trim(data)));
            let title = data.find("h1").text();
            let content = [];
            data.find('p, h2').each(function () { // or "item" or whatever suits your feed
                let p = $(this);
                content.push([p.prop("tagName"),p.text()]);
            });
            //console.log(content);
            if(save) save(content);
        }, 'html');//*/
    }

    updateFeeds(){
        this.store.getNewsSources().then(
            (sources) => {
                sources.map((s) => this.loadFeed(s.title, s.url))
            });
        console.log("Feeds updated...");
    }

}