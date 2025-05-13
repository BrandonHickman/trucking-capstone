import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getLoadById } from "../../services/loadService.jsx"

export const LoadDetails = () => {
    const { loadId } = useParams()
    const [load, setLoad] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getLoadById(loadId)
        .then((data) => {
            setLoad(data)
        })
        .catch((error) => {
            console.error("Error fetching load details", error)
        })
    }, [loadId])

    return (
        <div className="loads-container">
            <div className="loads-header">
            <h2>Load Details</h2>
        </div>
        <div className="load-details-card"
        onClick={() => navigate("/loads")}
        style={{ cursor: "pointer" }}
        >
            <h2>Load Details</h2>
            <p><strong>Pickup:</strong> {load?.pickup}</p>
            <p><strong>Dropoff:</strong> {load?.dropoff}</p>
            <p><strong>Dispatcher:</strong> {load?.user?.name || "Unassigned"}</p>
            <p><strong>Status:</strong> {load?.statusId}</p>           
        </div>
        </div>
    )
}