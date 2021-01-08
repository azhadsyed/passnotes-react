function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send(JSON.stringify(data));
  });
}

async function getNotes() {
  let response = await sendHttpRequest(
    "GET",
    "http://localhost:8080/noteboard"
  );
  return response;
}

export { getNotes };
