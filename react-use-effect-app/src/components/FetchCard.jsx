import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../helpers/getUsers";
import { getPosts } from "../helpers/getPosts";

export const FetchCard = () => {
  const [userState, setUserState] = useState({});
  const [postsUsers, setPostsUsers] = useState([]);
  const [errorState, setErrorState] = useState(null);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();

      if (!users.status) throw users;

      setUserState(users.dataFetch);
    } catch (error) {
      // console.log(error);
      setErrorState(error);
    }
  };

  const fetchPosts = useCallback(async () => {
    try {
      const posts = await getPosts(userState.id);

      if (!posts.status) throw posts;

      setPostsUsers(posts.dataFetch);
    } catch (error) {
      // console.log(error);
      setErrorState(error);
    }
  }, [userState.id]);

  const handleChangeUser = () => {
    console.log("another users");
    fetchUsers();
  };

  useEffect(() => {
    console.log("fetch users");
    fetchUsers();
  }, []);

  useEffect(() => {
    /* se coloca con ? ya que el userState puede ser undefined y si lo es entonces pregunta si existe o no, si existe entonces tomará el id y si no existe entonces automáticamente sale del if() */
    if (userState?.id) {
      console.log("fetch posts");
      fetchPosts();
    }
  }, [userState, fetchPosts]);

  return (
    <div>
      <h1>Fetch Card</h1>

      {Boolean(userState) && Boolean(postsUsers.length) ? (
        <>
          <h2>User</h2>
          <div style={{ backgroundColor: "#333" }}>
            <p>
              <strong>Name:</strong> {userState.name}
            </p>
            <span>
              <strong>Email:</strong> {userState.email}
            </span>
          </div>

          <h2>Post</h2>
          <ul>
            {postsUsers.map((postElement) => (
              <li
                key={postElement.id}
                style={{ backgroundColor: "#333", marginBottom: "8px" }}
              >
                <span>{postElement.name}</span>
                <span>{postElement.body}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <pre>{JSON.stringify(errorState, null, 3)}</pre>
      )}

      <br />
      <br />
      <button onClick={handleChangeUser}>Another User</button>
    </div>
  );
};
