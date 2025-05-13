export const getAllLoads = () => {
  return fetch("http://localhost:8088/loads").then((res) => res.json());
};

export const getLoadById = (id) => {
  return fetch(`http://localhost:8088/loads/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

export const getAllLoadsWithDispatchers = () => {
  return fetch(`http://localhost:8088/loads?_expand=user`).then((res) =>
    res.json()
  );
};

export const deleteLoadById = (id) => {
  return fetch(`http://localhost:8088/loads/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const createLoad = (newLoad) => {
  return fetch(`http://localhost:8088/loads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLoad),
  }).then((res) => res.json());
};
