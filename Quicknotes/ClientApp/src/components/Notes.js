import React, { Component } from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

export default class Notes extends Component {
    static displayName = Notes.name;

    render() {
        return this.props.notes.map((note) => (
            <NoteItem key={note.id} note={note} markComplete={this.props.markComplete}
                deleteNote={this.props.deleteNote} />
        ))
    }
}

Notes.propTypes = {
    notes: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
}