import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'; // Ensure the path is correct

const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    }
    
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }
    
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                fetchEmployees(); // Refresh the list after deletion
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const fetchEmployees = () => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
            setFilteredData(resp); // Initialize the filtered data
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        fetchEmployees();
    }, [])

    useEffect(() => {
        // Filter data based on search query
        if (searchQuery) {
            setFilteredData(empdata.filter(item => 
                item.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Phone.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredData(empdata);
        }
    }, [searchQuery, empdata]);

    return (
        <div className="container">
            <div className="header">
                <h1>Employee Details</h1>
            </div>
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/employee/create" className="btn btn-warning">CREATE(+)</Link>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td><strong>ID</strong></td>
                                <td><strong>First Name</strong></td>
                                <td><strong>Last Name</strong></td>
                                <td><strong>Date of Birth</strong></td>
                                <td><strong>Address</strong></td>
                                <td><strong>City</strong></td>
                                <td><strong>State</strong></td>
                                <td><strong>Gender</strong></td>
                                <td><strong>Email</strong></td>
                                <td><strong>Phone</strong></td>
                                <td><strong>Action</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.FirstName}</td>
                                    <td>{item.LastName}</td>
                                    <td>{item.DateOfBirth}</td>
                                    <td>{item.Address}</td>
                                    <td>{item.City}</td>
                                    <td>{item.State}</td>
                                    <td>{item.Gender}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Phone}</td>
                                    <td>
                                        <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">READ</a>
                                        <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">UPDATE</a>
                                        <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">DELETE</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;
