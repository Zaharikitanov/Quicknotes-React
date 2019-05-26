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
        //axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')        
        axios.get('https://localhost:44307/api/data')
            .then(res => this.setState({ notes: res.data.Notes }));
    }

    markComplete = (Id) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.Id === Id) {
                    note.IsCompleted = !note.IsCompleted
                }
                return note;
            })
        });
    }

    deleteNote = (Id) => {
        //axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${Id}`)
            .then(res => this.setState({ notes: [...this.state.notes.filter(note => note.Id !== Id)] }));

        
    }

    addNote = (Text) => {
        axios.post("https://localhost:44307/api/data", {
            Text,
            IsCompleted: false
        })
            .then(res => this.setState({notes: [...this.state.notes, res.data.Notes]}));
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
