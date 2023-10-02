export const getPosts = async (userId) => {
  const URL = `https://jsonplaceholder.typicode.com/post/${userId}/comments`;

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
