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

async function verifyPassword(post_id, post_attempt) {
  const requestBody = {
    id: post_id,
    attempt: post_attempt,
  };
  let response = await sendHttpRequest(
    "POST",
    `http://localhost:8080/auth/`,
    requestBody
  );
  return response;
}

const play = (array, synth) => {
  for (let i = 0; i < array.length; i++) {
    setTimeout(function () {
      synth.triggerAttackRelease(array[i][1], 0.1);
    }, array[i][0]);
  }
};

function saveNote() {
  const requestBody = {
    title: "I said",
    content: "Flip flop flooba dooba bop",
    prompt: [[0, "G4"]],
    password: [[0, "D4"]],
  };
  sendHttpRequest(
    "POST",
    "http://localhost:8080/noteboard",
    requestBody
  ).then((response) => console.log(response, requestBody));
}

const processPerformance = (array) => {
  let subtractMe = array[0][0];
  let relativeArray = array;
  for (let i = 0; i < array.length; i++) {
    relativeArray[i][0] -= subtractMe;
  }
  return relativeArray;
};

export {
  getNotes,
  sendHttpRequest,
  verifyPassword,
  play,
  processPerformance,
  saveNote,
};
