import React from "react";
import {NewsArticleList, NewsArticle} from './NewsArticle';
import {NewsSourceEntryList} from "./NewsSource"

export class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    addSource(source_name, e){
        this.props.addSource(source_name, e)
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
            content = <div>
                        <h2>Willkommen...</h2>
                        Es sind noch keine News Feed abonniert. Folgende können wir dir empfehlen:
                        <button onClick={this.addSource.bind(this, "heise")}>
                            Heise
                        </button>
                        <button onClick={this.addSource.bind(this, "golem")}>
                            Golem
                        </button>
                      </div>
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