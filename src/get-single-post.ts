export async function getSinglePost(filename: string) {
  const formData = new FormData();
  formData.append("filename", filename);

  const ipAddress = "10.0.0.216";
  const prefix = "http://";
  const port = "3000";
  const apiRoute = "/get-single-post";
  const fetchUrl = prefix + ipAddress + ":" + port + apiRoute;

  const response = await fetch(fetchUrl, {
    method: "POST",
    // headers: {
    //   //   "Content-Type": "application/json",
    //   //   "Content-Type": "application/x-www-form-urlencoded",
    //   "Content-Type": "multipart/form-data",
    // },
    body: formData,
  });

  const json = (await response.json()) as string;

  console.log("GET SINGLE POST FIRING", json);
  return json;
}
