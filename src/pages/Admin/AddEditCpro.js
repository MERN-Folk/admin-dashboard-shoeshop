import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Switch, Select, Tag } from "antd";
import { toast } from "react-toastify";
import {
  createCpro,
  getCpros,
  deleteCpro,
  updateCpro,
} from "../../redux/features/cproSlice";
import Loading from "../../components/LoadingError/Loading";
// import { getCpros,deleteCpro } from "../../redux/features/cproSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const initialState = {
  nId_cpro: "",
  pname: "",
};

const AddEditCpro = () => {
  // const [last_nId_cpro, setLast_nid_cpro] = useState("")
  const [cproData, setCproData] = useState(initialState);
  const { cpros, staffCpros, error, loading } = useSelector((state) => ({
    ...state.cpro,
  }));
  // console.log('cpros', cpros)
  const last = ({...cpros.at(-1)}.nId_cpro)
  const next = String(last + 1)
  // console.log( next)
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { nId_cpro, pname } = cproData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleCpro = cpros.find((cpros) => cpros._id === id);
      // console.log(singleCpro);
      setCproData({ ...singleCpro });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(getCpros());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(cFname, nAge, cAddress)
    if (nId_cpro && pname) {
      const updatedCproData = { ...cproData, name: staff?.result?.name };
      if (!id) {
        dispatch(createCpro({ updatedCproData, navigate, toast }));
        // window.location.reload();
      } else {
        dispatch(updateCpro({ id, updatedCproData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCproData({ ...cproData, [name]: value });
  };

  const handleClear = () => {
    setCproData({ nId_cpro: "", pname: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this cpro ?")) {
      dispatch(deleteCpro({ id, toast }));
    }
  };

  const columns = [
    {
      title: "รหัส",
      dataIndex: "nId_cpro",
      key: "nId_cpro",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.nId_cpro - b.nId_cpro,
    },
    {
      title: "เตี่ยนฉวนซือ",
      dataIndex: "pname",
      key: "pname",
    },
    {
      title: "Actions",
      render: (item) => (
        <>
          <span
            className="btn btn-sm float-right"
            onClick={() => handleDelete(item._id)}
          >
            <DeleteOutlined className="text-danger" />
          </span>
          <Link to={`/editCpro/${item._id}`}>
            <span
              className="btn btn-sm float-right"
              // onClick={() => showModal(item._id)}
            >
              <EditOutlined className="text-warning" />
            </span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header mb-2">
            <h2 className="content-title">Manage Cpro</h2>
          </div>
          <div className="row">
            <div
              className="card shadow col-md-3"
              // style={{ maxWidth: "380px", marginTop: "100px" }}
            >
              <div className="card-body">
                <h4 className="card-title mb-4 text-center">
                  {id ? "Update Cpro" : "Add Cpro"}
                </h4>
                {loading && <Loading />}
                <form onSubmit={handleSubmit} noValidate>
                  {/* <form noValidate> */}
                  <div className="mb-3">
                    <h6>{next}</h6>
                    <input
                      onChange={onInputChange}
                      className="form-control"
                      placeholder="nId_cpro"
                      type="number"
                      value={nId_cpro}
                      name="nId_cpro"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={onInputChange}
                      className="form-control"
                      placeholder="Name"
                      type="text"
                      value={pname}
                      name="pname"
                    />
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-primary w-100 mb-2">
                      {id ? "Update" : "Submit"}
                    </button>
                    {/* <button
                      className="btn btn-danger w-100"
                      onClick={handleClear}
                    >
                      Clear
                    </button> */}
                    {/* <hr />
                    <Link to="/skw301_home">
                      <p className="text-center mt-3">
                        Back To Skw301 Dashboard
                      </p>
                    </Link> */}
                    {/* {loading && <Loading />} */}
                  </div>
                </form>
              </div>
            </div>
            <div className="card shadow col-md-9">
              <div className="card-body">
                <h4 className="card-title mb-4 text-center">Cpro Detail</h4>
                <div className="mb-3">
                  <Table
                    columns={columns}
                    dataSource={cpros}
                    rowKey="_id"
                    // style={{ padding: '0 50px' }}
                    size="small"
                    // pagination={{
                    //   defaultPageSize: 5,
                    //   onChange: (pageNum) => {
                    //     setCurrentPage(pageNum);
                    //   },
                    //   current: currentPage,
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddEditCpro;
