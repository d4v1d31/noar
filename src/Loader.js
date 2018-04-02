/**
 * Created by david on 10.03.17.
 */
import * as parse5 from 'parse5';
import * as https from "https";
import * as http from "http";
import * as rssParser from "rss-parser";

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

        let state = ParserState.idle;
        let path = [];
        let content = [];
        const parser = new parse5.SAXParser();
        let bad_tags = [
            "link", "meta", 'br'
        ];

        parser.on("startTag", (name, attr, selfClosing) => {
            //console.log(attr);
            let className = this.getClass(attr);
            if(className !== null) {
                path.push(name + '[' + className + ']');
            } else {
                path.push(name)
            }
            switch (state) {
                case ParserState.idle: {
                    switch (name) {
                        case "p"       : if (!selfClosing) state = ParserState.p; break;
                        case "article" : if (!selfClosing) state = ParserState.article
                    }
                    break
                }

                case ParserState.article: {
                    switch (name) {
                        case "p": if (!selfClosing) state = ParserState.article_p;
                    }
                    break
                }
            }
            if(selfClosing || (bad_tags.indexOf(name) >=0)){
                path.pop()
            }

        });

        parser.on("text", (text) => {
            switch (state) {
                case ParserState.p         : if (text.trim() !== '') {
                    content.push({
                        path: path.reduce((s1,s2) => s1+'/'+s2),
                        text: text.trim(),
                        show: true
                    });

                } break;
                case ParserState.article_p : if(text.trim() !== '')  {
                     content.push({
                        path: path.reduce((s1,s2) => s1+'/'+s2),
                        text: text.trim(),
                        show: true
                    });
                }
            }
        });

        parser.on("endTag", (name) => {
            path.pop();
            switch (state) {
                case ParserState.p: {
                    switch (name) {
                        case "p": state = ParserState.idle;
                    }
                    break
                }
                case ParserState.article: {
                    switch (name) {
                        case "article": state = ParserState.idle;
                    }
                    break
                }
                case ParserState.article_p: {
                    switch (name) {
                        case "p": state = ParserState.article;
                    }

                }
            }
        });

        https.get(url, res => {
            res.pipe(parser, {end: false});
            res.on('end', () => callback(null, content));

        });

        /*this.httpGetAsync(url, (chunk) => {
            console.log(`BODY: ${chunk}`);
            // Do some parsing
            // ...
            let imageUrl = '';
            let content = 'none content';
            callback(imageUrl, content);

        });


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