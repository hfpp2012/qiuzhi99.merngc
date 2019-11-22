import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hook";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/grahpql";

function PostForm() {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: ""
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(
      proxy,
      {
        data: { createPost }
      }
    ) {
      values.body = "";

      const { getPosts } = proxy.readQuery({ query: FETCH_POSTS_QUERY });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: getPosts.concat(createPost) }
      });
    },
    variables: values
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            value={values.body}
            name="body"
            error={error ? true : false}
            onChange={onChange}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">{error.graphQLErrors[0].message}</ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
