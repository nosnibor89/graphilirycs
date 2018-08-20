import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {

    // componentWillUpdate(nextProps, nextState){
    //     console.log(nextProps);
    //     console.log(nextState)
    // }

    render() {
        console.log(this.props);
        return (
            <div>
                SongList
            </div>
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