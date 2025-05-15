export const getAllTrucks = () => {
    return fetch(`http://localhost:8088/trucks`).then((res) => res.json())
}