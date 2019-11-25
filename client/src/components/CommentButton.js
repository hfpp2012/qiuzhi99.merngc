import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MyPopup from "../utils/MyPopup";

function CommentButton({ post: { id, commentCount } }) {
  return (
    <MyPopup content="Comment on post">
      <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
        <Button color="blue" basic>
          <Icon name="comment" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

export default CommentButton;
