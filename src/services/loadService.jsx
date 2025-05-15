export const getAllLoads = () => {
  return fetch("http://localhost:8088/loads").then((res) => res.json());
};

export const getLoadById = (id) => {
  return fetch(`http://localhost:8088/loads/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

export const updateLoad = (id, loadData) =>
  fetch(`http://localhost:8088/loads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loadData)
  }).then((res) => res.json());

export const getAllLoadsWithDispatchers = () => {
  return Promise.all([
    fetch("http://localhost:8088/loads"),
    fetch("http://localhost:8088/users")
  ])
    .then(([loadsRes, usersRes]) => {
      if (!loadsRes.ok || !usersRes.ok) {
        throw new Error("Failed to fetch loads or users");
      }
      return Promise.all([loadsRes.json(), usersRes.json()]);
    })
    .then(([loads, users]) => {
      const expandedLoads = loads.map((load) => {
        const user = users.find((u) => u.id === load.userId);
        return { ...load, user: user || null };
      });
      return expandedLoads;
    });
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

export const claimLoad = (loadId, userId) => {
  return fetch(`http://localhost:8088/loads/${loadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      statusId: 2
    })
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to claim load")
      return res.json()
  })
}

export const markLoadAsComplete = (loadId) => {
  return fetch(`http://localhost:8088/loads/${loadId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ statusId: 3 })
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to mark load as complete")
      return res.json()
  })
}