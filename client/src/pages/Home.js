import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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
        id
        username
        createdAt
        body
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(data);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}

export default Home;
