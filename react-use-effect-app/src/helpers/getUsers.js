export const getUsers = async () => {
  const userId = Math.floor(Math.random() * 10) + 1;
  const URL = "https://jsonplaceholder.typicode.com/users/" + userId;

  try {
    const response = await fetch(URL);

    if (!response.ok)
      throw {
        errorStatus: response.status,
        errorText: response.statusText || "Failed Fetch",
      };

    const data = await response.json();

    return { status: true, dataFetch: data };
  } catch (error) {
    // console.log("error", error);
    return { status: false, dataFetch: error };
  }
};
