import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {

    constructor(props) {
        super(props);

        this.state = { content: '' };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        this.setState({ content: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props)
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content,
            },
        })
        .then((data) => {
            console.log("From lyric mutation:", data);
            this.setState({content: ''});
        });

    }


    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add a lyric</label>
                <input type="text" onChange={this.handleInput} value={this.state.content}/>
                <button type="submit" className="btn">Add lyric</button>
            </form>
        )
    }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID){
    addLyricToSong(content: $content, songId: $songId ){
      id
      lyrics{
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);