import React from "react";
import keydown from 'react-keydown';

export class AddSourceDlg extends React.Component {
    constructor(props) {
        super(props);
        this.onAdd = this.onAdd.bind(this);
    }

    @keydown('enter')
    onAdd(){
        this.props.onAddSource();
    }


    render(){
        return(
        <dialog id="addSourceDlg" className="mdl-dialog">
            <h4 className="mdl-dialog__title">Add News Source</h4>
            <div className="mdl-dialog__content">
                <form action="#" id="form1">
                    <div id='addSourceTitle' className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="source-title"/>
                        <label className="mdl-textfield__label" htmlFor="source-title">Title</label>
                    </div>
                    <div id='addSourceUrl' className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="source-url"/>
                        <label className="mdl-textfield__label" htmlFor="source-url">URL</label>
                    </div>
                </form>
            </div>
            <div className="mdl-dialog__actions">
                <button type="button" className="mdl-button" onClick={this.props.onAddSource}>add</button>
                <button type="button" className="mdl-button close" onClick={(e)=> document.getElementById("addSourceDlg").close()}>close</button>
            </div>
        </dialog>)
    }
}

