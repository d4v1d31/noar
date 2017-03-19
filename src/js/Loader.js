/**
 * Created by david on 10.03.17.
 */

var $;
$ = require('jquery');

const feedType = {
    ATOM: 'ATOM',
    RSS2: 'RSS2',
    RSS1: 'RSS1',
    RDF: 'RDF'
};

export class Loader {

    constructor(store){
        this.store = store;
        this.updateFeeds = this.updateFeeds.bind(this);
        this.loadContent = this.loadContent.bind(this);
    }

    static detectFeedType(data){
        // <feed xmlns="http://www.w3.org/2005/Atom">

        if ($(data).find('feed[xmlns="http://www.w3.org/2005/Atom"]')) {
            return feedType.ATOM;
        } else {
            return null;
        }

    }

    loadFeed(title, url, refresh){
        $.get(url, (data) => {
            //console.log(data);
            let source;
            // detect type of feed
            let ft = Loader.detectFeedType(data);
            switch (ft){
                case feedType.ATOM : {
                    source = this.loadAtom(title, url, data);
                    break;
                }
                case feedType.RDF : {
                    console.log("RDF not supported yet...");
                    break;
                }
                case feedType.RSS2 : {
                    console.log("RSS2 not supported yet...");
                    break;
                }
                case feedType.RSS1 : {
                    console.log("RSS1 not supported yet...");
                    break;
                }
                default : {
                    console.error("Unknown feed type..." + ft);
                }
            }

            if(refresh) refresh(source);
        }, 'xml');
    }

    loadAtom(title, url, data){
        let newsSource = {};
        // parse feed metadata
        let feed = $(data).find('feed');
        //console.log(data);
        //console.log($(data));
        newsSource.title = title;
        newsSource.feed_title = feed.children("title").first().text();
        newsSource.url = url;
        newsSource.id = feed.children("id").first().text();
        newsSource.updated = feed.children("updated").first().text();
        let articles = [];

        // parse entries
        let lc = this.loadContent;
        feed.find("entry").each(function () { // or "item" or whatever suits your feed
            let el = $(this);
            if(el.children('title').text()) {
                let id = el.children('id').text();
                articles.push({
                    title: el.children('title').text(),
                    link: el.children('link').attr('href'),
                    id: id,
                    updated: el.children('updated').text(),
                    summary: el.children('summary').text(),

                });
            }

        });
        this.store.addNewsSource(newsSource).then((id) =>{
            for (let article of articles){
                article.sourceId = id;
                this.loadContent(article.id, (content)=>{
                    article.content = content;
                    this.store.addNewsArticle(article);
                });
            }
        });
        // save data to database
        //console.log(newsSource);
        //console.log(articles);
        return newsSource;

    }

    loadContent(id, save){
        $.get(id, (data) => {

            data = $($.parseHTML($.trim(data)));
            //console.log($(data));
            let title = data.find("h1").text();
            let content = [];
            data.find('p, h2').each(function () { // or "item" or whatever suits your feed
                let p = $(this);
                content.push([p.prop("tagName"),p.text()]);
            });
            //console.log(content);
            if(save) save(content);
        }, 'html');
    }

    updateFeeds(){
        this.store.getNewsSources().then(
            (sources) => {
                sources.map((s) => this.loadFeed(s.title, s.url))
            });
        console.log("Feeds updated...");
    }

}