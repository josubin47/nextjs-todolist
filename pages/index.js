import Head from "next/head";
import Layout, { siteTitle } from "components/Layout/Layout";
import utilStyles from "styles/utils.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          샘플 페이지
          <Link href="posts/FirstPage">
            <a>링크 이동 테스트</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
