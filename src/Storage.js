/**
 * Created by david on 10.03.17.
 */
import Dexie from 'dexie';

export class DataStorage {
    VERSION = 1;
    constructor(){
        this.db = new Dexie("noar8");

        this.db.version(this.VERSION).stores({
            articles: 'id, title, summary, updated, content, sourceId, read',
            newsSources: 'id, title, feed_title, url'
        });
    }

    addNewsSource(source){
        return  this.db.newsSources.get(source.id, s  => {
            console.log(s);
            if  (s === undefined) {
                return this.db.newsSources.put({
                    'id': source.id,
                    'title': source.title,
                    'feed_title': source.feed_title,
                    'url': source.url
                })
            } else  {
                return  this.db.newsSources.update(s.id, {
                    'feed_title': source.feed_title
                })
            }
        });

    }

    addNewsArticle(article){
        return this.db.articles.get(article.id, a => {
            if(a !== undefined) {
                return this.db.articles.update(a.id, {
                    'id': article.id,
                    'title': article.title,
                    'summary': article.summary,
                    'updated': article.updated,
                    'content': article.content,
                    'sourceId': article.sourceId
                })
            } else {
                return this.db.articles.put({
                    'id': article.id,
                    'title': article.title,
                    'summary': article.summary,
                    'updated': article.updated,
                    'content': article.content,
                    'sourceId': article.sourceId,
                    'read': false
                })
            }
        });
    }

    readNewsArticle(id){
        return this.db.articles.update(id, {read: true});
    }

    existsArticle(article_id){
        return(this.db.articles.get(article_id))
    }

    getNewsSources(){
        console.log("load newsSources");
        console.log(this.db.newsSources.toArray());
        return(this.db.newsSources.toArray());
    }

    getArticles(sourceId){
        return(this.db.articles.where('sourceId').equals(sourceId).reverse().sortBy('updated'))
    }

}

