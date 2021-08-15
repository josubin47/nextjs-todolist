# Next.js 공식 홈페이지 문서를 학습하며 Todolist 만들기

### 사용 기술

- Next.js
- React
- Context API
- Typescript

## Next.js 이론 학습

### Next.js란

React의 SSR(Server Side Rendering)을 쉽게 구현할 수 있게 도와주는 간단한 프레임워크

### 다른 페이지를 만드는 방법

pages 디렉토리 밑에 파일을 만들면 그 파일의 경로가 URL 경로가 된다

### 링크 컴포넌트

a태그를 감싸는 Link 리액트 컴포넌트를 사용한다. Link는 앱 내에서 다른 페이지로 클라이언트 사이드 네비게이션을 할 수 있게 허용해준다.

```jsx
<Link href="posts/FirstPage">
  <a>링크 이동 테스트</a>
</Link>
```

> 클라이언트 사이드 네비게이션 : 페이지 전환이 자바스크립트를 이용해 이루어진다. 브라우저의 기본 네이게이션에 의해 완료되는 것보다 빠르다.

### 자동 코드 스플리팅

Next는 자동의 코드 스플리팅을 하기 때문에 각 페이지는 그 페이지에 필요한 것들만을 불러온다. **_빠른 로딩을 보장한다._**

또한 Next의 프로덕션 빌드에서 Link구성 요소가 브라우저의 뷰포트에 나타날 때마다 Next 는 백그라운드에서 연결된 페이지에 대한 코드를 자동으로 **미리 가져온다(프리페치)**. 링크를 클릭할 때쯤이면 대상 페이지의 코드가 이미 백그라운드에서 로드되고 페이지 전환이 거의 즉각적으로 이루어진다.

👉 **Next.js는 코드 분할, 클라이언트 측 탐색 및 프리페치(프로덕션에서)를 통해 최상의 성능을 위해 애플리케이션을 자동으로 최적화한다.**

### 이미지 삽입

Image 컴포넌트를 사용하면 이미지 크기 조정 및 최적화를 지원해준다.

### 메타데이터 수정

Next에 내장된 Head 컴포넌트를 사용한다. 페이지의 head를 수정할 수 있게 해준다.

### CSS

> CSS 모듈을 사용하기 위해서는 CSS파일 이름은 반드시 'module.css' 로 끝나야 한다.

```jsx
import styles from "./layout.module.css";

<div className={styles.container}></div>;
```

자동으로 고유한 클래스 이름을 생성한다.

Next.js의 코드 분할 기능은 CSS 모듈 에서도 작동한다. 각 페이지에 대해 최소한의 CSS 로드를 보장하기 때문에 결과적으로 번들 크기가 더 작아진다.

CSS 모듈은 빌드시 자바스크립트 번들로부터 추출되고, Next.js에 의해 자동으로 로드되는 .css 파일을 생성한다.

### Global Style

CSS 모듈은 컴포넌트 레벨 스타일에 유용하다. 하지만 모든 페이지에 로드될 CSS를 사용하는 것도 지원한다.

\_app.js 파일을 생성한다. App 컴포넌트는 다른 모든 모든 페이지에서 공통으로 사용할 최상위 레벨 컴포넌트이다.

전역 CSS 파일은 \_app.js 내부에서만 가져올 수 있다. 다른 곳에서는 가져올 수 없음.

> \_app.js는 페이지를 navigating 할 때 state(상태) 유지하는 역할 등을 맡는다.

### 사전 랜더링 (Pre-rendering)

**Next.js의 가장 중요한 개념 중 하나.** 기본적으로 Next.js는 모든 페이지를 미리 랜더링합니다. 즉, 클라이언트 사이드 자바스크립트로 모든 작업을 수행하는 대신 *각 페이지에 대해 미리 HTML을 생성*한다는 의미. 사전 랜더링을 사용하면 더 나은 성능과 SEO(검색엔진 최적화)를 얻을 수 있다.

생성된 각 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 연결된다. 브라우저에서 페이지를 로드하면 해당 자바스크립트 코드가 실행되고 완벽히 상호작용 가능한 페이지를 만들어 낸다. (이 작업을 hydration이라고 부름)

Next.js가 앱을 정적 HTML로 미리 랜더링하여 JavaScript를 실행하지 않고도 앱 UI를 볼 수 있다. 앱이 Next.js가 없는 일반 React.js 앱인 경우 사전 랜더링 이 없으므로 JavaScript를 비활성화하면 앱을 볼 수 없다.

👉 최소한의 자바스크립트를 이용한 랜더링을 하고 이후에는 차차 자바스크립트 파일들을 받아와 클라이언트 측에서 자바스크립트를 해석하는, 즉 CSR과 비슷한 방식으로 진행. **처음엔 SSR, 이후엔 CSR 방식.**

### 두 가지 형태의 사전 랜더링

1. 정적 생성
2. 서버 사이드 랜더링

둘의 차이는 페이지에 대한 HTML을 _생성할 때_ 있다.

- 정적 생성은 _빌드 시_ HTML을 생성한다. 사전 랜더링 된 HTML은 각 요청에서 재사용된다.
- 서버 사이드 랜더링은 _각 요청마다_ HTML을 생성한다.

중요한 것은, Next.js가 각 페이지를 위해 **어떤 사전 랜더링 형태를 사용할 것인지 선택하게 해준다는 것**. 대부분의 페이지에 정적 생성을 사용하고 나머지 페이지에 서버 사이드 랜더링을 사용하여 "하이브리드" Next.js 앱을 만들 수 있다.

### 어떤 사전 랜더링 방법을 선택해야 할까

**데이터 유무와 관계없이 가능하면 정적 생성 추천**. CDN 서버에서 페이지를 한 번 빌드하고 제공할 수 있기 때문에 매 요청마다 HTML을 생성하는 것(서버 사이드 랜더링)보다 훨씬 빠르다.

"**사용자의 요청 전에** 페이지를 미리 랜더링할 수 있을까?"에 대한 답이 "예"라면 정적 생성을 선택해야 하고, "아니오"라면 정적 생성은 좋은 선택이 아니다.

_페이지가 자주 업데이트 된 데이터를 보여주고. 매 요청마다 페이지 콘텐츠가 변경될 수 있고, 모든 요청에 대해 데이터를 최신 상태로 유지해야 한다면 서버 사이드 랜더링을 사용한다_ 속도는 느려지지만 미리 랜더링된 페이지는 항상 최신 상태로 유지된다. 혹은 사전 랜더링을 건너뛰고 클라이언트 측 자바스크립트를 사용하여 자주 업데이트 되는 데이터를 채울 수 있다.

> SSR 대신 SWR (CSR React Hook)을 사용하는 방법도 있다.

### [데이터 가져오기](https://nextjs.org/docs/basic-features/data-fetching)

일부 페이지는 사전 랜더링을 위해 외부 데이터를 가져와야 한다. 데이터 종속성을 가지고 있어 사전 랜더링 시 데이터부터 해결 필요.

1. 페이지 **콘텐츠**가 외부 데이터에 의존할 경우
2. 페이지 **경로**가 외부 데이터에 의존할 경우

사전 랜더링을 위해 데이터를 가져오는 데 사용할 수 있는 세 가지 고유한 함수.

- getStaticProps(정적 생성) : 빌드 시 데이터를 가져온다.
- getStaticPaths(정적 생성) : 데이터를 기반으로 페이지를 미리 랜더링하는 동적 경로 를 지정한다.
- getServerSideProps(서버 측 랜더링) : 각 요청마다 데이터를 가져온다.

### [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) (정적 생성)

Next.js 에서 페이지 컴포넌트를 내보낼 때, 'getStaticProps' 라는 'async' 함수도 내보낼 수 있다. 이걸 사용하면 getStaticProps가 프로덕션에서 빌드 시 실행되고, 함수 안에 외부 데이터를 가져오고 페이지의 props로 전달할 수 있다.

context는 동적 라우팅을 위한 params, 미리보기 정보 그리고 locale 정보를 가진다.

```jsx
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

😃 **특징**

1. 한번 빌드되고 나면 정적으로 움직이지 않는다.
2. 빌드 시 리디렉션은 현재 허용되지 않는다. Next.js 9.5 버전부터는 redirects 키 아래 next.config.js에서 리다이렉션 목록을 만들 수 있다.
3. getStaticProps 안에서 서버 코드를 직접 작성할 수 있다. 하지만 안에서 [API 경로](https://nextjs.org/docs/api-routes/introduction)를 호출하기 위해 fetch()를 사용해서는 안 된다. 외부 API 가져오는 건 괜찮음.

```jsx
// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

1. 서버 사이드에서만 작동된다. _클라이언트 사이드에서 절대로 실행되지 않는다._ bundle.js에도 없기 때문에 직접 데이터베이스 쿼리와 같은 코드를 작성 할 수 있다. 하지만 브라우저용 document 등의 DOM API는 사용 할 수 없다.
2. 빌드시 실행되기 때문에 HTML을 생성할때 HTTP 헤더와 같이 요청시에만 사용할 수 있는 데이터를 수신하지 않는다.
3. 타입스크립트 사용시 GetStaticProps를 사용하여 타입 지정이 가능하다.

```jsx
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
};
```

1. 개발 모드에서, 'getStaticProps' 는 각 요청마다 실행된다.
2. 페이지에서만 내보낼 수 있다. 페이지가 랜더링 되기 전에 필요한 모든 데이터가 있어야하기 때문. 또한 export async function getStaticProps() {} 의 형태로만 사용이 가능하며 props로는 활용이 불가능하다.
3. Next 9.4 이상은 [미리보기 모드](https://nextjs.org/docs/advanced-features/preview-mode) 지원.

### [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) (정적 생성)

동적 경로를 사용하는 페이지에서 getStaticPaths라는 async 함수를 내보내면 Next.js는 getStaticPaths에서 지정한 모든 경로를 정적으로 사전 랜더링한다.

동적 경로 매개 변수가 있는 페이지에서 getStaticProps를 사용하는 경우 getStaticPaths를 사용해야 한다.

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // See the "paths" section below
    ],
    fallback: true or false // See the "fallback" section below
  };
}
```

**paths** (필수값) : 미리 랜더링할 경로를 결정.

**fallback** (필수값)

- false : getStaticPath 가 반환하지 않는 모든 경로는 404 페이지. 사전 랜더링할 경로가 적고 새 페이지가 자주 추가되지 않는 경우 유용하다. _데이터 소스에 항목을 더 추가하고 새 페이지를 랜더링해야 하는 경우 다시 빌드해야 한다._
- true : getStaticPath로부터 리턴되는 경로는 빌드 시 getStaticProps를 거쳐 HTML로 랜더링 된다. **빌드 시 생성되지 않은 경로는 404 페이지를 생성하지 않는다. 대신 페이지의 fallback 버전(대체 페이지)을 제공.** 백그라운드에서 Next.js는 요청된 경로 HTML 및 JSON을 정적으로 생성한다. 여기에는 getStaticProps 실행이 포함된다. 완료되면 브라우저는 생성된 경로에 대한 JSON을 수신하고 페이지를 자동으로 랜더링하는데 사용한다. 사용자 관점에서 페이지는 대체 페이지에서 전체 페이지로 교체된다. 동시에 Next.js는 이 경로를 미리 랜더링 된 페이지 목록에 추가한다.
- blocking : getStaticPaths에서 반환하지 않은 경로는 SSR과 동일한 HTML이 생성되기를 기다린다. 이후 요청을 위해 캐시되어 경로당 한번만 발생한다. 빌드 시 생성되지 않은 경로는 404 페이지를 생성하지 않는다. 대신 Next.js는 첫 번째 요청에서 SSR을 수행하고 생성된 HTML을 반환한다. 완료되면 브라우저는 생성된 경로에 대한 HTML을 수신한다. 사용자의 관점에서 "브라우저가 페이지를 요청하는 중"에서 "전체 페이지가 로드됨"으로 전환된다. 로딩/폴백 상태의 플래시다 없다. 동시에 이 경로를 사전 랜더링된 페이지 목록에 추가한다. 동일한 경로에 대한 후속 요청은 빌드 시 사전 랜더링된 다른 페이지와 마찬가지로 생성된 페이지를 제공한다.

🤔 **_fallback true가 유용한 경우는 언제일까?_**

데이터에 의존하는 정적 페이지가 매우 많은 경우. 모든 페이지를 사전 랜더링하고 싶지만 빌드에 시간이 오래 걸리기 때문에 작은 단위로 일부 페이지만 정적으로 생성하고 나머지는 fallback true를 사용하여 생성한다. 누군가가 아직 생성되지 않은 페이지를 요청하면 사용자는 로딩 표시기가 있는 페이지를 보게 된다. 잠시 후 getStaticProps가 완료되고 요청한 페이지가 랜더링 된다. 이후 동일한 페이지를 요청하는 모든 사람은 정적으로 사전 랜더링된 페이지를 받게 된다. 이를 통해 사용자는 빠른 빌드와 정적 생성의 이점을 유지하면서 항상 빠른 경험을 할 수 있다.

> fallback true로 생성된 페이지는 업데이트 되지 않는다.

😃 특징

1. getServerSideProps와 함께 사용할 수 없다.
2. 서버 측에서 빌드 시에만 싱행된다.
3. 타입스크립트 타입은 GetStaticPaths.

```jsx
import { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
};
```

1. 개발 모드에서는 각 요청마다 실행되고 프로덕션에서는 빌드시 실행된다.
2. 페이지에서만 내보낼 수 있다. 페이지가 랜더링 되기 전에 필요한 모든 데이터가 있어야하기 때문. 또한 export async function getStaticPaths() {} 의 형태로만 사용이 가능하며 props로는 활용이 불가능하다.

### [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) (SSR)

getServerSideProps는 요청시 호출된다. 페이지를 요청하면 getServerSideProps가 실행되고 반횐된 props로 페이지가 사전 랜더링된다. SSR은 정적 생성보다 느릴 수밖에 없다는 점 유의.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

😃 특징

1. 요청시 데이터가 반드시 있어야 하는 페이지를 사전 랜더링하는 경우에만 사용한다.
2. 서버 사이드에서만 작동된다. _클라이언트 사이드에서 절대로 실행되지 않는다._ bundle.js에도 없기 때문에 직접 데이터베이스 쿼리와 같은 코드를 작성 할 수 있다. 하지만 브라우저용 document 등의 DOM API는 사용 할 수 없다.
3. getServerSideProps 안에서 서버 코드를 직접 작성할 수 있다. 하지만 안에서 [API 경로](https://nextjs.org/docs/api-routes/introduction)를 호출하기 위해 fetch()를 사용해서는 안 된다. 외부 API 가져오는 건 괜찮음.
4. 타입스크립트 사용시 GetServerSideProps를 사용하여 타입 지정이 가능하다.

```jsx
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
};
```

1. 페이지에서만 export 가능.
2. 페이지에서만 내보낼 수 있다. 페이지가 랜더링 되기 전에 필요한 모든 데이터가 있어야하기 때문. 또한 export async function getServerSideProps() {} 의 형태로만 사용이 가능하며 props로는 활용이 불가능하다.

### [클라이언트 측에서 데이터 가져오기](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)

페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 미리 렌더링할 필요가 없는 경우 클라이언트 측에서 데이터를 가져올 수 있다.

1. 먼저 데이터가 없는 형태의 페이지를 랜더링한다. 페이지의 일부는 정적 생성을 사용하여 미리 랜더링할 수 있다. 누락된 데이터에 대한 로드 상태를 표시할 수 있다.
2. 클라이언트 측에서 데이터를 가져와 준비가 되면 표시한다.

👉 SEO와 관련이 없는 비공개 사용자별 페이지에 적합하다. (대시보드 등)

### [동적 라우팅](https://nextjs.org/docs/routing/dynamic-routes)

[ ... ] 형식의 페이지는 동적 페이지이다. 글로 설명 불가.. 코드와 문서 참고.

> 포괄 라우팅? useRouter?

> pages/categories/[id].js. 구현 → ID가 지정된 특정 게시물을 가져오려면 `getStaticProps`를 사용하고 가능한 모든 블로그 게시물을 가져오려면 `getStaticPaths`를 사용

### [API 경로](https://nextjs.org/docs/api-routes/introduction)

API 라우트는 앱 내에 API 엔드 포인트를 만들도록 해준다.

'pages/api/\*'

```jsx
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

❗'getStaticProps' 나 'getStaticPaths' 에서 API 라우트를 가져와서는 안 된다. → 직접 서버 코드 작성

❓그럼 언제 쓸까? 들어오는 데이터를 DB에 저장할 때 직접 저장하는 코드 작성 (form input POST 요청할 때), 타사 API와 안전하게 통신, CMS에서 초안 콘텐츠 미리보기

### [API 미들웨어](https://nextjs.org/docs/api-routes/api-middlewares)

### [Next.js에 타입스크립트 적용하기](https://nextjs.org/docs/basic-features/typescript#pages)

### [데이터 가져오기를 위한 React Hooks : SWR](https://swr.vercel.app/ko)

## 참고

Next.js 시작하기 공식 문서 : [https://nextjs.org/learn/basics/create-nextjs-app](https://nextjs.org/learn/basics/create-nextjs-app)

번역 참고 : [https://velog.io/@wolverine/번역-Next.js-시작하기-1.-Create-a-Next.js-App](https://velog.io/@wolverine/%EB%B2%88%EC%97%AD-Next.js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-1.-Create-a-Next.js-App)

번역 참고 : [https://kimsangyeon.github.io/javascript/nextjs/2021/04/02/nextjs-data-fetching.html](https://kimsangyeon.github.io/javascript/nextjs/2021/04/02/nextjs-data-fetching.html)

Next.js 공식 문서 : [https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started)
