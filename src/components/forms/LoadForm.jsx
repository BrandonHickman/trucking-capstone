import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../services/userService.jsx"
import { createLoad } from "../../services/loadService.jsx"
import "./Form.css"

export const CreateLoad = ({ currentUser }) => {
    const [pickup, setPickup] = useState("")
    const [dropoff, setDropoff] = useState("")
    const [users, setUsers] = useState([])
    const [assignedUserId, setAssignedUserId] = useState(currentUser?.id || "")

    const navigate = useNavigate()

    useEffect(() => {
        getAllUsers().then((fetchedUsers) => {
            setUsers(fetchedUsers)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const newLoad = {
            pickup,
            dropoff,
            userId: assignedUserId
        }

        createLoad(newLoad)
        .then(() => {
            navigate("/loads")
        })
        .catch((error) => {
            console.error("Failed to create load:", error)
        })
    }

    return (
        <div className="form-container">
            <h2>Create New Load</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Pickup Location:
                    <input
                    type="text"
                    value={pickup}
                    onChange={(event) => setPickup(event.target.value)}
                    required
                    />
                </label>

                <label>
                    Dropoff Location:
                    <input
                    type="text"
                    value={dropoff}
                    onChange={(event) => setDropoff(event.target.value)}
                    required
                    />
                </label>

                <label>
                    Assign to Dispatcher
                    <select
                    value={assignedUserId}
                    onChange={(event) => setAssignedUserId(parseInt(event.target.value))}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                            {user.name} {user.id === currentUser.id ? "(You)" : ""} 
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">Create Load</button>
            </form>
        </div>
    )
}