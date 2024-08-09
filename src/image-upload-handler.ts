export async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const ipAddress = "10.0.0.216";
  const prefix = "http://";
  const port = "3000";
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch(
    prefix + ipAddress + ":" + port + "/uploads/new",
    {
      method: "POST",
      body: formData,
    }
  );
  const json = (await response.json()) as { url: string };
  return json.url;
}
