import Head from "next/head";
import Layout, { siteTitle } from "components/Layout/Layout";
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
      <Head>...</Head>
      <section className={utilStyles.headingMd}>...</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
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
