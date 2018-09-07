import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { Link } from 'react-router';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {

    render() {
        const { song, loading } = this.props.data;

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>

                <LyricCreate id={song.id}/>
            </div>
        )
    }
}

// const query = gql`
// query getSong($id: ID!){
//     song(id: $id){
//         id
//         title
//         lyrics{
//             content
//         }
//     }
// }
// `



export default graphql(query, {
    options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);