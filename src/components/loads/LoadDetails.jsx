import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getLoadById } from "../../services/loadService.jsx"
import { getAllStatuses } from "../../services/statusServices.jsx"
import { getAllTrucks } from "../../services/truckService.jsx"

export const LoadDetails = () => {
    const { loadId } = useParams()
    const [load, setLoad] = useState(null)
    const [statuses, setStatuses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([getLoadById(loadId), getAllStatuses(), getAllTrucks()])
        .then(([loadData, statusList, truckList]) => {
            const truck = truckList.find((t) => t.id === loadData.truckId)
            setLoad({ ...loadData, truck })
            setStatuses(statusList)
        })
        .catch((error) => {
            console.error("Error fetching load details", error)
        })
    }, [loadId])

    const statusName = statuses.find((s) => s.id === load?.statusId)?.name || "Unknown"

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
            <p><strong>Truck:</strong> {load.truck ? `${load.truck.make} (${load.truck.plate})` : "No truck assigned"}</p>
            <p><strong>Status:</strong> {statusName}</p>           
        </div>
        </div>
    )
}