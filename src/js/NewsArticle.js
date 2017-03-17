/**
 * Created by david on 09.03.17.
 */
import * as React from "react";
export class NewsArticle extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <article className="article">
            <img src={this.props.img}/>
            <h3>{this.props.title}</h3>
            <strong>{this.props.summary}</strong>
            <p>{this.props.content}</p>
        </article>
        )
    }
}

export class NewsArticleEntry extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleArticleChange(e);
    }

    render(){
        let classes = "mdl-list__item mdl-list__item--three-line";
        if(this.props.hadRead) classes += " read";
        return(
            <li onClick={(e) => this.handleClick(e)}
                className={this.props.isActive ? classes + " active" : classes}>
                <span className="mdl-list__item-primary-content">
                    <span>{this.props.title}</span>
                </span>
                <span className="mdl-list__item-secondary-content">
                    <span className="mdl-list__item-secondary-info">{this.props.updated}</span>
                    <a className="mdl-list__item-secondary-action" href="#">
                        <i className="material-icons">star</i>
                    </a>
                </span>
            </li>
        )
    }
}

export class NewsArticleList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ul className="demo-list-three mdl-list">
                {this.props.entries.map((entry) =>
                    <NewsArticleEntry key={entry.id}
                                      title={entry.title}
                                      teaser={entry.teaser}
                                      updated={entry.updated}
                                      hadRead = {entry.read}
                                      isActive={entry === this.props.currentArticle}
                                      handleArticleChange={this.props.handleArticleChange(entry)}/>)}
            </ul>
        )
    }
}