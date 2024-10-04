export const queryLLM = async (
  messages: string,
  email: string,
  model: string
) => {
  var res = null;
  await fetch(`http://127.0.0.1:8000/api/chat/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      messages: messages,
      email: email,
      model: model,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((response) => {
        let arr = response.response[0]
        res = arr[1]
    });
  return res;
};
