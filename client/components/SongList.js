import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';

class SongList extends Component {

    // componentWillUpdate(nextProps, nextState){
    //     console.log(nextProps);
    //     console.log(nextState)
    // }

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    <Link to={`/songs/${song.id}`}>{song.title}</Link>
                    <i className="material-icons" onClick={() => this.handleDelete(song.id)}>delete</i>
                </li>
            );
        });
    }
    
    handleDelete(id){
        this.props.mutate({
            variables: {
                id,
            },
            // refetchQueries: [{ query }] // This is an alternative for `this.props.data.refetch()` 
                                           // which can be used becuase the query is already associated with the component
        }).then(() => {
            console.log(this.props);
            this.props.data.refetch();
        });
    }

    render() {
        let songs;
        console.log(this.props);
        if (this.props.data.loading) {
            songs = <li>'Loading...'</li>;
        } else {
            songs = this.renderSongs();
        }


        return (
            <div>
                <ul className="collection">
                    {songs}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>

        );
    }
}

 const mutation = gql`
 mutation DeleteSong($id: ID){
    deleteSong(id: $id){
        id
    }
}`;

export default graphql(mutation)(
    graphql(query)(SongList)
);