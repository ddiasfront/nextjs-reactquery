// pages/posts.jsx
import axios from "axios";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { gql } from "@apollo/client";
import client from "../apollo-client";

async function getPosts() {
  const { data } = await client.query({
    query: gql`
      query Users {
        users {
          email
          createdAt
          name
          password
          role
        }
      }
    `,
  });

  console.log(data);
  return data;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the "Posts"-page, data will be available immediately either way
  const { data } = useQuery("posts", getPosts);

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  //   const { data: otherData } = useQuery("posts-2", getPosts);

  console.log(data);

  // ...
}

export default Posts;
