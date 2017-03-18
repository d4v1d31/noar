/**
 * Created by david on 10.03.17.
 */
import {data} from './ExampleData';
import Dexie from 'dexie';

export class DataStorage {
    VERSION = 1;
    constructor(){
        this.db = new Dexie("noar14");

        this.db.version(this.VERSION).stores({
            articles: 'id, title, summary, updated, content, sourceId, read',
            newsSources: 'id, title, feed_title, url'
        });
    }

    addNewsSource(source){
        return this.db.newsSources.put({
            'id': source.id,
            'title': source.title,
            'feed_title': source.feed_title,
            'url': source.url
        });
    }

    addNewsArticle(article){
        return this.db.article.get(article.id, a => {
            if(a) {
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

    getNewsSources(){
        return(this.db.newsSources.toArray());
    }

    getArticles(sourceId){
        return(this.db.articles.where('sourceId').equals(sourceId).toArray())
    }


}

