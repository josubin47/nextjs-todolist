import "styles/global.css";
import { TodolistContextProvider } from "context/todolistContext";

export default function App({ Component, pageProps }) {
  return (
    <TodolistContextProvider>
      <Component {...pageProps} />
    </TodolistContextProvider>
  );
}
