import { useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const latestPost = api.post.getLatest.useQuery();

  return (
    <>
      <h1>Create T3 App (Pages Router)</h1>

      <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>

      {latestPost.data ? (
        <p>Your most recent post: {latestPost.data.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </>
  );
}

function CreatePost() {
  const [name, setName] = useState("");

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSettled: () => void utils.invalidate(),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" disabled={createPost.isLoading}>
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
