import Layout from "components/Layout/Layout";
import { getAllPostIds, getPostData } from "lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { IParams } from "pages/index";

export default function PostPage({ postData }) {
  return (
    <Layout home>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const postData = getPostData(id);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
