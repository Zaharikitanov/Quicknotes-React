import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddNote extends Component {
    static displayName = AddNote.name;
    state = {
        noteText: ''
    }

    //noteText in the state object must be the same as name="noteText" in the input
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addNote(this.state.noteText);
        this.setState({ noteText:'' });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="addNote">
                <input
                    type="text"
                    name="noteText"
                    placeholder="Add Note ..."
                    value={this.state.text}
                    onChange={this.onChange} />
                <input type="submit" value="Submit" className="addBtn" />
            </form>
            )
    }
}

AddNote.propTypes = {
    addNote: PropTypes.func.isRequired
}