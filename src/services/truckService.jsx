export const getAllTrucks = () => {
    return fetch(`http://localhost:8088/trucks`).then((res) => res.json())
}

export const getAllLoadsWithTrucks = () =>{
    return fetch(`http://localhost:8088/loads?_expand=truck&_expand=user`)
    .then((res) => res.json())
}

export const getTruckById = (id) => {
    return fetch(`http://localhost:8088/trucks/${id}`)
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
