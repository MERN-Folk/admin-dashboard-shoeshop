import React, { useState, useEffect } from "react";
// import Header from "../Header";
// import Sidebar from "../sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPerson, updatePerson } from "../../redux/features/personSlice";
import Loading from "../../components/LoadingError/Loading";
import {
  // createCpro,
  getCpros,
  // deleteCpro,
  // updateCpro,
} from "../../redux/features/cproSlice";

const initialState = {
  cFname: "",
  nAge: "",
  cPro: "",
  cAddress: "",
  cRec: "",
  cSup: "",
};

const AddEditPreson = () => {
  const { cpros } = useSelector((state) => ({ ...state.cpro }));
  const [personData, setPersonData] = useState(initialState);
  const { error, loading, staffPersons } = useSelector((state) => ({
    ...state.person,
  }));
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cFname, nAge, cPro, cAddress, dDate, cRec, cSup } = personData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singlePerson = staffPersons.find((person) => person._id === id);
      // console.log("singlePerson", singlePerson);
      setPersonData({ ...singlePerson });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(getCpros());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(cFname, nAge, cAddress)
    if (cFname) {
      const updatedPersonData = { ...personData, name: staff?.result?.name };
      if (!id) {
        dispatch(createPerson({ updatedPersonData, navigate, toast }));
      } else {
        dispatch(updatePerson({ id, updatedPersonData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPersonData({ ...personData, [name]: value });
  };

  const handleClear = () => {
    setPersonData({
      cFname: "",
      nAge: "",
      cPro: "",
      cAddress: "",
      cRec: "",
      cSup: "",
    });
  };

  return (
    <>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">
            {id ? "Update Person" : "Add Person"}
          </h4>
          {loading && <Loading />}
          <form onSubmit={handleSubmit} noValidate>
            {/* <form noValidate> */}
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Enter FullName"
                type="text"
                value={cFname}
                name="cFname"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Enter Age"
                type="text"
                value={nAge}
                name="nAge"
              />
            </div>
            <div className="mb-3">
              <select 
              onChange={onInputChange}
              className="form-control" 
              value={cPro} 
              name="cPro">
                <option value="-----">-----</option>
                {cpros.map((item,index) => (
                  <option key={index} value={item.pname}>{item.pname}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Enter Address"
                type="text"
                value={cAddress}
                name="cAddress"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Enter Date"
                type="date"
                value={dDate}
                name="dDate"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Enter Rec"
                type="text"
                value={cRec}
                name="cRec"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={onInputChange}
                className="form-control"
                placeholder="Enter Sup"
                type="text"
                value={cSup}
                name="cSup"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary w-100 mb-2">
                {id ? "Update" : "Submit"}
              </button>
              <button className="btn btn-danger w-100" onClick={handleClear}>
                Clear
              </button>
              <hr />
              <Link to="/skw301_home">
                <p className="text-center mt-3">Back To Skw301 Dashboard</p>
              </Link>
              {/* {loading && <Loading />} */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditPreson;
