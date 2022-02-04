import { PostReference } from "./apiClient.types";

class MockApiClient {
  // 'postReference' mocks a call to the API to post a reference. It fails randomly.
  public postReference = async (data: PostReference) => {
    console.log("Posted Reference - ", data);
    return new Promise((resolve, reject) => {
      const random = Math.floor(Math.random() * 3);
      setTimeout(
        () => (random !== 0 ? resolve(data) : reject("Network Error")),
        1000
      );
    });
  };
}

export { MockApiClient };
