import React from "react";
import {NewsArticleList, NewsArticle} from './NewsArticle';
import {NewsSourceEntryList} from "./NewsSource"

export class Main extends React.Component {
    constructor(props){
        super(props);
    }
    render() {

        let content;

        console.log(this.props.article);
        if(this.props.article !== undefined) {
            content = <NewsArticle title={this.props.article.title}
                                                                summary={this.props.article.summary}
                                                                img={this.props.article.img}
                                                                content={this.props.article.content}
                                                                id={this.props.article.id}/>

        } else {
            content = <h2>Willkommen...</h2>
        }


        return (
            <main className="content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                        {content}
                    </div>
                </div>
            </main>
        )
    }
}

export class SideBar extends React.Component {
    constructor (props){
        super(props);
    }

    render() {
        return (
        <aside className="mdl-layout__drawer">
            <span className="mdl-layout-title"> Feeds </span>
            <NewsSourceEntryList entries={this.props.entries}
                                 currentEntry={this.props.currentEntry}
                                 handleNewsSourceChange={this.props.handleNewsSourceChange}/>
        </aside>
        )
    }
}