import Header from "./components/Header";
import Post from "./components/Post";
import PostProvider from "./context/PostContext";

function App() {
  return (
    <div className="max-w-3xl bg-white mt-5 p-2 rounded-3xl flex flex-col gap-3">
      <PostProvider>
        <Header />
        <Post />
      </PostProvider>
    </div>
  );
}

export default App;
