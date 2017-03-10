/**
 * Created by david on 10.03.17.
 */
import * as React from "react";
import {NewsSourceEntryList} from './NewsSource';
import {NewsArticleList, NewsArticle} from './NewsArticle';

export class Body extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            newsSources:     props.newsSources,
            currentSource:   props.currentSource,
            currentArticles: props.currentArticles,
            currentArticle:  props.currentArticle,
        };
        this.handleNewsSourceChange = this.handleNewsSourceChange.bind(this);
        this.loadNewsSource = this.loadNewsSource.bind(this);
        this.handleArticleChange = this.handleArticleChange.bind(this);
    }

    handleNewsSourceChange(source){
        return (e) => this.loadNewsSource(source);
    }

    loadNewsSource(source) {
        this.props.store.getArticles(source.id).then(
            (articles) => {
                this.setState({
                    currentSource: source,
                    currentArticle: articles[0],
                    currentArticles: articles
                })
            });
    }


    handleArticleChange(article) {
        return (e) => this.setState({
            currentArticle: article
        })
    }

    render(){
        let article = this.state.currentArticle;
        return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <aside className="mdl-layout__drawer">
                <span className="mdl-layout-title"> Feeds </span>
                <NewsSourceEntryList entries={this.state.newsSources}
                                     currentEntry={this.state.currentSource}
                                     handleNewsSourceChange={this.handleNewsSourceChange}/>
            </aside>
            <div className="article-list">
                <NewsArticleList entries={this.state.currentArticles}
                                 currentArticle={this.state.currentArticle}
                                 handleArticleChange={this.handleArticleChange}/>
            </div>
            <main className="content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                        <NewsArticle title={article.title}
                                     summary={article.summary}
                                     img={article.img}
                                     content={article.content}/>
                    </div>
                </div>
            </main>
            <button id="prev-article-btn"
                    className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i className="material-icons">navigate_before</i>
            </button>
            <button id="next-article-btn"
                    className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i className="material-icons">navigate_next</i>
            </button>
        </div>
        )
    }
}