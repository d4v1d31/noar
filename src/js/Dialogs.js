import * as React from "react";

export class AddSourceDlg extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        /*let input = document.createElement('input');
        input.className = "mdl-textfield__input";
        input.id = "sample1";
        let label = document.createElement('label');
        label.className = "mdl-textfield__label";
        label.htmlFor = "sample1";
        let input_container = document.createElement('div');
        input.className= "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
        input_container.appendChild(input);
        input_container.appendChild(label);

         /*   <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="sample1"/>
            <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
        </div>);*/
        //componentHandler.upgradeElement(input_container);

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
                <button type="button" className="mdl-button" >add</button>
                <button type="button" className="mdl-button close" onClick={(e)=> document.getElementById("addSourceDlg").close()}>close</button>
            </div>
        </dialog>)
    }
}
/*
var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});*/