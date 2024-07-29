import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { id } = useParams();
    const [empdata, setEmpdata] = useState({});
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [Address, setAddress] = useState("");
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [Gender, setGender] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + id).then((res) => {
            return res.json();
        }).then((data) => {
            setEmpdata(data);
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setDateOfBirth(data.DateOfBirth);
            setAddress(data.Address);
            setCity(data.City);
            setState(data.State);
            setGender(data.Gender);
            setEmail(data.Email);
            setPhone(data.Phone);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { FirstName, LastName, DateOfBirth, Address, City, State, Gender, Email, Phone };

        fetch("http://localhost:8000/employee/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedData)
        }).then((res) => {
            alert('Employee updated successfully.');
            navigate('/');
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Edit Employee</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* Form fields are similar to EmpCreate.js */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input required value={FirstName} onChange={e => setFirstName(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input required value={LastName} onChange={e => setLastName(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" required value={DateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input required value={Address} onChange={e => setAddress(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input required value={City} onChange={e => setCity(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input required value={State} onChange={e => setState(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select required value={Gender} onChange={e => setGender(e.target.value)} className="form-control">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input required value={Email} onChange={e => setEmail(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input required value={Phone} onChange={e => setPhone(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="submit" value="Submit" className="btn btn-success" />
                                            <Link to="/" className="btn btn-danger">Cancel</Link>
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
