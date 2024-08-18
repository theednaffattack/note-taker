export async function getListOfPosts() {
  const ipAddress = "10.0.0.216";
  const prefix = "http://";
  const port = "3000";
  const apiRoute = "/get-posts";
  const fetchUrl = prefix + ipAddress + ":" + port + apiRoute;

  const response = await fetch(fetchUrl, {
    method: "GET",
    // headers: {
    //   //   "Content-Type": "application/json",
    //   //   "Content-Type": "application/x-www-form-urlencoded",
    //   "Content-Type": "multipart/form-data",
    // },
  });

  const json = (await response.json()) as string[];

  return json;
}
