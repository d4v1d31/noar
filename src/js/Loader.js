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
    }

    static detectFeedType(data){
        // <feed xmlns="http://www.w3.org/2005/Atom">

        if ($(data).find('feed[xmlns="http://www.w3.org/2005/Atom"]')) {
            return feedType.ATOM;
        } else {
            return null;
        }

    }

    loadFeed(title, url){
        $.get(url, (data) => {
            // detect type of feed
            let ft = Loader.detectFeedType(data);
            switch (ft){
                case feedType.ATOM : {
                    this.loadAtom(title, url, data);
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
        });
    }

    loadAtom(title, url, data){
        let newsSource = {};
        // parse feed metadata
        let feed = $(data).find("feed");
        newsSource.title = title;
        newsSource.feed_title = feed.children("title").text();
        newsSource.url = url;
        newsSource.id = feed.children("id").text();
        newsSource.updated = feed.children("updated").text();
        let articles = [];

        // parse entries
        feed.children("entry").each(function () { // or "item" or whatever suits your feed
            let el = $(this);
            articles.push({
                title:   el.children('title').text(),
                link:    el.children('link').attr('href'),
                id:      el.children('id').text(),
                updated: el.children('updated').text(),
                summary: el.children('summary').text(),
                content: el.children('content').text()
            });

        });

        // save data to database
        console.log(newsSource);
        console.log(articles);

        this.store.addNewsSource(newsSource).then((id) =>{
            for (let article of articles){
                article.sourceId = id;
                this.store.addNewsArticle(article);
            }
        })

    }

}