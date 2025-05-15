export const getAllStatuses = () => {
    return fetch(`http://localhost:8088/statuses`).then((res) => res.json())
}

export const updateLoadStatus = (loadId, statusId) => {
    return fetch(`http://localhost:8088/loads/${loadId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ statusId }),
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error("Error updating load status:", error)
    })
}