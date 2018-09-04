import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends Component {

    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    handleTitle(e) {
        const title = e.currentTarget.value
        this.setState({
            title,
        });
    }

    handleCreate(e) {
        e.preventDefault();
        console.log(this.props)
        this.props.mutate({
            variables: {
                title: this.state.title,
            },
            refetchQueries: [{ query }]
            // refetchQueries: [{ query: query, variables: someVariable}] // Large version
        })
        .then((data) => {
            console.log("From mutation:", data);
            hashHistory.push('/');
            // this.props.router.push('/');
        })
        // .catch((err) => {})
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create new song</h3>
                <form onSubmit={(e) => this.handleCreate(e)}>
                    <label>Song Title:</label>
                    <input type="text" onChange={(e) => this.handleTitle(e)} value={this.state.title} />
                    <button type="submit" className="btn">Create Song</button>
                </form>
            </div>
        );
    }


}

const mutation = gql`
mutation AddSong($title: String){
    addSong(title:$title){
      id
      title
    }
}
`;

export default graphql(mutation)(SongCreate);;