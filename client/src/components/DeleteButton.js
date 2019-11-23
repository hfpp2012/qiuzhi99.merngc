import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/grahpql";

function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      const { getPosts } = proxy.readQuery({ query: FETCH_POSTS_QUERY });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: getPosts.filter(p => p.id !== postId) }
      });

      if (callback) callback();
    },
    variables: { postId }
  });

  return (
    <>
      <Button
        onClick={() => setConfirmOpen(true)}
        as="div"
        color="red"
        floated="right"
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
