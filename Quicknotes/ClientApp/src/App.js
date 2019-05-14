import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/header';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import About from './components/pages/About';
import './styles/app.css';
import axios from 'axios';

export default class App extends Component {
    static displayName = App.name;
    state = {
        notes: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => this.setState({ notes: res.data }));
    }

    markComplete = (id) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === id) {
                    note.completed = !note.completed
                }
                return note;
            })
        });
    }

    deleteNote = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({ notes: [...this.state.notes.filter(note => note.id !== id)] }));

        
    }

    addNote = (title) => {
        axios.post("https://jsonplaceholder.typicode.com/todos", {
            title,
            completed: false
        })
            .then(res => this.setState({notes: [...this.state.notes, res.data]}));
    }

  render () {
      return (
          <Router>
            <div className="App">
              <div className="container">
                <Header />
                <Route exact path="/" render={props => (
                    <React.Fragment>
                        <AddNote addNote={this.addNote} />
                        <Notes notes={this.state.notes}
                            markComplete={this.markComplete}
                            deleteNote={this.deleteNote} />
                    </React.Fragment>
                )} />
                <Route path="/about" component={About} />
              </div>
            </div>
          </Router>
    );
  }
}
