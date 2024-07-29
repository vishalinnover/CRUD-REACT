import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams();
    const [empData, setEmpData] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmpData(resp);
        }).catch((err) => {
            console.log(err.message);
        });
    }, [empid]);

    return (
        <div>
            <div className="container">
                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Employee Details</h2>
                    </div>
                    <div className="card-body">
                        {empData &&
                            <div>
                                <p><strong>ID:</strong> {empData.id}</p>
                                <p><strong>First Name:</strong> {empData.firstName}</p>
                                <p><strong>Last Name:</strong> {empData.lastName}</p>
                                <p><strong>Date of Birth:</strong> {empData.dateOfBirth}</p>
                                <p><strong>Address:</strong> {empData.address}</p>
                                <p><strong>City:</strong> {empData.city}</p>
                                <p><strong>State:</strong> {empData.state}</p>
                                <p><strong>Gender:</strong> {empData.gender}</p>
                                <Link className="btn btn-danger" to="/">Back to Listing</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpDetail;
