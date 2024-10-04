export const getAllMemory = async (email: string) => {
  var res = null;
  await fetch(`http://127.0.0.1:8000/api/memory/all?email=${email}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      res = response.memory;
    });
  return res;
};

export const editMemory = async (email: string) => {
  var res = null;
  await fetch(`http://127.0.0.1:8000/api/memory/all?email${email}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      res = response;
    });
  return res;
};

export const deleteMemory = async (email: string, memory_id: string) => {
  var res = null;
  await fetch(`http://127.0.0.1:8000/api/memory/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      memory_id: memory_id,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      res = response.memory;
    });
  return res;
};

export const addMemory = async (email: string) => {
  var res = null;
  await fetch(`http://127.0.0.1:8000/api/memory/all?email${email}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      res = response;
    });
  return res;
};
