/**
 * Created by david on 10.03.17.
 */
import React from "react";
import {NewsSourceEntryList} from './NewsSource';
import {NewsArticleList, NewsArticle} from './NewsArticle';
import {Main, SideBar} from './BodyParts';
import {AddSourceDlg} from './Dialogs';
import keydown, { Keys } from 'react-keydown';
const shell = window.require('electron').shell;

export class Body extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            newsSources: props.newsSources,
            currentSource: props.currentSource,
            currentArticles: props.currentArticles,
            currentArticle: props.currentArticle,
        };

        this.handleNewsSourceChange = this.handleNewsSourceChange.bind(this);
        this.loadNewsSource = this.loadNewsSource.bind(this);
        this.handleArticleChange = this.handleArticleChange.bind(this);
        this.loadNextArticle = this.loadNewsSource.bind(this);
        this.loadPreviousArticle = this.loadPreviousArticle.bind(this);
        this.onAddSource = this.onAddSource.bind(this);
        this.addSource = this.addSource.bind(this);
    }

    handleNewsSourceChange(source){
        return (e) => this.loadNewsSource(source);
    }

    loadNewsSource(source) {
        this.props.store.getArticles(source.id).then(
            (articles) => {
                console.log(articles);
                console.log(source.id);
                this.setState({
                    currentSource: source,
                    currentArticle: articles[0],
                    currentArticles: articles
                })
            });

    }

    handleArticleChange(article){
        return (e) => {
            article.read = true;
            this.props.store.readNewsArticle(article.id).then(()=>{
                this.setState({
                    currentArticle: article
                })
            })

        }
    }

    @keydown( 'right' )
    loadNextArticle(){
        let n = this.state.currentArticles.indexOf(this.state.currentArticle);
        if(n+1 < this.state.currentArticles.length) {
            let currentArticle = this.state.currentArticles[++n];
            this.props.store.readNewsArticle(currentArticle.id).then(()=>{
                currentArticle.read = true;
                this.setState({currentArticle: currentArticle});
            })
        }
    }

    @keydown('left')
    loadPreviousArticle(){
        let n = this.state.currentArticles.indexOf(this.state.currentArticle);
        if(n > 0) {
            let currentArticle = this.state.currentArticles[--n];
            this.props.store.readNewsArticle(currentArticle.id).then(()=>{
                currentArticle.read = true;
                this.setState({currentArticle: currentArticle});
            })
        }

    }

    onAddSource(e){
        let title = document.getElementById('source-title').value;
        let url = document.getElementById('source-url').value;
        this.props.loader.loadFeed(title, url, this);
        document.getElementById("addSourceDlg").close();
    }

    addSource(source_name, e){
        this.setState({newsSources: [], currentArticle: []});
        if(source_name === "heise") {
            console.log("add heise");
            this.props.loader.loadFeed('heise online', 'https://www.heise.de/newsticker/heise-atom.xml',
                this
            );
        } else if(source_name === "golem") {
            this.props.loader.loadFeed('Golem', 'http://rss.golem.de/rss.php?feed=ATOM1.0',
                this);
        }
    }

    render(){
        let article = this.state.currentArticle;
        return (
        <div onKeyPress={this.state.onKeyPress} className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">

            <SideBar entries={this.state.newsSources}
                     currentEntry={this.state.currentSource}
                     handleNewsSourceChange={this.handleNewsSourceChange}/>


            <NewsArticleList entries={this.state.currentArticles}
                             currentArticle={this.state.currentArticle}
                             handleArticleChange={this.handleArticleChange}/>

            <Main article={article} addSource={this.addSource} />

            <button id="next-article-btn" onClick={(e) => shell.openExternal(this.state.currentArticle.id)}
                    className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i className="material-icons">link</i>
            </button>
            <AddSourceDlg onAddSource={this.onAddSource} loader={this.props.loader}/>

        </div>
        )
    }

}