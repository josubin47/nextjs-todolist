import Head from "next/head";
import Layout from "components/Layout/Layout";
import Todolist from "pages/todolist/Todolist";
import utilStyles from "styles/utils.module.css";
import Link from "next/link";
import { getSortedPostsData } from "lib/posts";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function HomePage({ allPostsData }) {
  return (
    <Layout home>
      <Head>Next.js 학습</Head>
      <main className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Todolist />
        {/* <ul className={utilStyles.list}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul> */}
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData: IParams[] = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
