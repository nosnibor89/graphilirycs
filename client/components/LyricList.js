import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

    handleLike(id) {
        console.log(id);
        this.props.mutate({
            variables: { id },
        });
    }

    renderLyrics() {
        const { lyrics } = this.props;
        return lyrics.map(lyric => {
            return (
                <li key={lyric.id} className="collection-item">
                    {lyric.content}
                    <div className="vote-box">
                        <i className="material-icons" onClick={() => this.handleLike(lyric.id)}>thumb_up</i>
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