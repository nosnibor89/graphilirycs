import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {

    // componentWillUpdate(nextProps, nextState){
    //     console.log(nextProps);
    //     console.log(nextState)
    // }
    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    {song.title}
                </li>
            );
        });
    }

    render() {
        let songs;
        console.log(this.props);
        if (this.props.data.loading){
            songs = <li>'Loading...'</li>;
        }else{
            songs = this.renderSongs();
        }
        

        return (
            <ul className="collection">
                {songs}
            </ul>
        );
    }
}

const query = gql`
{
    songs{
      id
      title
    }
}
`;

export default graphql(query)(SongList);