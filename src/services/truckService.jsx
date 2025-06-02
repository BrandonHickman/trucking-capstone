export const getAllTrucks = () => {
    return fetch(`http://localhost:8088/trucks`).then((res) => res.json())
}

export const getAllLoadsWithTrucksAndUsers = () => {
  return Promise.all([
    fetch("http://localhost:8088/loads"),
    fetch("http://localhost:8088/users"),
    fetch("http://localhost:8088/trucks"),
  ])
    .then(([loadsRes, usersRes, trucksRes]) => {
      if (!loadsRes.ok || !usersRes.ok || !trucksRes.ok) {
        throw new Error("Failed to fetch data");
      }
      return Promise.all([loadsRes.json(), usersRes.json(), trucksRes.json()]);
    })
    .then(([loads, users, trucks]) => {
      return { loads, users, trucks };
    });
};

export const getTruckById = (id) => {
    return fetch(`http://localhost:8088/trucks/${id}?_expand=user`)
    .then((res) => res.json())
}

export const createTruck = (truckData) => {
  return fetch("http://localhost:8088/trucks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(truckData)
  }).then((res) => res.json());
};
