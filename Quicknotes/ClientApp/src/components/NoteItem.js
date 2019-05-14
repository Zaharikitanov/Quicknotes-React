import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NoteItem extends Component {
    static displayName = NoteItem.name;

    getStyle = () => {
        return this.props.note.completed ? 'isCompleted' : 'notCompleted';
    }

    completedNote = () => {
        return this.props.note.completed ? 'checked' : '';
    }

    render() {
        const { id, title } = this.props.note;

        return (
            <div className={'note ' + this.getStyle()}>
                <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} checked={this.completedNote()}/> {' '}
                {title}
                <button onClick={this.props.deleteNote.bind(this, id)} className="deleteNote">x</button> 
            </div> 
            )
    }
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
}
