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

const play = (array, synth) => {
  for (let i = 0; i < array.length; i++) {
    setTimeout(function () {
      synth.triggerAttackRelease(array[i][1], 0.1);
    }, array[i][0]);
  }
};

const processPerformance = (array) => {
  let subtractMe = array[0][0];
  let relativeArray = array;
  for (let i = 0; i < array.length; i++) {
    relativeArray[i][0] -= subtractMe;
  }
  return relativeArray;
};

export { sendHttpRequest, play, processPerformance };
