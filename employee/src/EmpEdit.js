import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();
    const [empData, setEmpData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        gender: ""
    });
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmpData(resp);
        }).catch((err) => {
            console.log(err.message);
        });
    }, [empid]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/employee/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empData)
        }).then((res) => {
            alert('Saved successfully.');
            navigate('/');
        }).catch((err) => {
            console.log(err.message);
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpData(prevData => ({ ...prevData, [name]: value }));
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                name="firstName"
                                                value={empData.firstName}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                name="lastName"
                                                value={empData.lastName}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={empData.dateOfBirth}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input
                                                name="address"
                                                value={empData.address}
                                                onChange={handleChange}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                name="city"
                                                value={empData.city}
                                                onChange={handleChange}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input
                                                name="state"
                                                value={empData.state}
                                                onChange={handleChange}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select
                                                name="gender"
                                                value={empData.gender}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmpEdit;