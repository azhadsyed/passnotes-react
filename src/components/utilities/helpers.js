const sendHttpRequest = async (method, url, data) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

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
