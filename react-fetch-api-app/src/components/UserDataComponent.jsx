import { useUserDataFetch } from "../hooks/useUserDataFetch";

const URL = "https://jsonplaceholder.typicode.com/users";

export const UserDataComponent = () => {
  const { userData, isLoading, error, handleCancelRequest } =
    useUserDataFetch(URL);

  return (
    <>
      {error && <p>Error: {error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userData?.map((userElement) => (
            <li key={userElement.id}>{userElement.name}</li>
          ))}
        </ul>
      )}

      <button onClick={handleCancelRequest}>Cancell Request</button>
    </>
  );
};
