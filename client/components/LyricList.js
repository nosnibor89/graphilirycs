import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

    handleLike(id, likes) {
        console.log(id);
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1,
                }
            }
        });
    }

    renderLyrics() {
        const { lyrics } = this.props;
        return lyrics.map(lyric => {
            return (
                <li key={lyric.id} className="collection-item">
                    {lyric.content}
                    <div className="vote-box">
                        <i className="material-icons" onClick={() => this.handleLike(lyric.id, lyric.likes)}>thumb_up</i>
                        {lyric.likes}
                    </div>
                </li>
            );
        });
    }

    render(){
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

const mutation = gql`
mutation LikeLyric($id:ID){
    likeLyric(id:$id){
      id
      content
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);