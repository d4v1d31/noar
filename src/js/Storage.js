/**
 * Created by david on 10.03.17.
 */
import {data} from './ExampleData';
import Dexie from 'dexie';

export class DataStorage {
    VERSION = 1;
    constructor(){
        this.db = new Dexie("noar12");
        this.db.version(this.VERSION).stores({
            articles: 'id, title, summary, updated, content, sourceId',
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
        return this.db.articles.put({
            'id': article.id,
            'title': article.title,
            'summary': article.summary,
            'updated': article.updated,
            'content': article.content,
            'sourceId': article.sourceId
        });
    }

    getNewsSources(){
        return(this.db.newsSources.toArray());
    }

    getArticles(sourceId){
        return(this.db.articles.where('sourceId').equals(sourceId).toArray())
    }


}

