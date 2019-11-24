import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image, Card } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
  const postId = props.match.params.postId;

  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  function deleteButtonCallback() {
    props.history.push("/");
  }

  if (loading) {
    return <p>loading post...</p>;
  } else {
    const { getPost } = data;
    const {
      id,
      likes,
      likeCount,
      username,
      body,
      createdAt,
      commentCount,
      comments
    } = getPost;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              size="small"
              float="right"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentButton post={{ id, commentCount }} />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deleteButtonCallback} />
                )}
              </Card.Content>
            </Card>
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        id
        body
        createdAt
      }
    }
  }
`;

export default SinglePost;
