import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(null);
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
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
            setFilteredData(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (empdata) {
            setFilteredData(
                empdata.filter(item =>
                    item.firstName.toLowerCase().includes(query) ||
                    item.lastName.toLowerCase().includes(query) ||
                    item.address.toLowerCase().includes(query) ||
                    item.city.toLowerCase().includes(query) ||
                    item.state.toLowerCase().includes(query)
                )
            );
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>EMPLOYEE LISTING</h2>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name, Address, City, or State"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-warning">CREATE(+)</Link>
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
                                <td><strong>Action</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData &&
                                filteredData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.dateOfBirth}</td>
                                        <td>{item.address}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">READ</a>
                                            <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">UPDATE</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">DELETE</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;
