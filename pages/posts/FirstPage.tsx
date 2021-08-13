import Link from "next/link";
import Head from "next/head";
import Layout from "components/Layout/Layout";

export default function FirstPage() {
  return (
    <Layout home>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Layout>
  );
}
