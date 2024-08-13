export async function saveMarkdownHandler({
  body,
  title,
  slug,
}: {
  title: string;
  body: string;
  slug: string;
}) {
  const formData = new FormData();
  formData.append("markdown", body);
  formData.append("slug", slug);
  formData.append("title", title);

  const ipAddress = "10.0.0.216";
  const prefix = "http://";
  const port = "3000";
  const apiRoute = "/save-post";
  const fetchUrl = prefix + ipAddress + ":" + port + apiRoute;
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch(fetchUrl, {
    method: "POST",
    body: formData,
    // headers: {
    //   //   "Content-Type": "application/json",
    //   //   "Content-Type": "application/x-www-form-urlencoded",
    //   "Content-Type": "multipart/form-data",
    // },
  });
  const json = (await response.json()) as { url: string; title: string };

  return json;
}
