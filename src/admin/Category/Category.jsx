import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Modals from "./modal";

// redux
import { useSelector, useDispatch } from "react-redux";
import { categoryActions } from "../../redux/categoryActions";

import { openModal, closeModal } from "../../redux/modalSlice";
import { useEffect } from "react";
import BreadCrumb from "../../component/Common/BreadCrumb";

function Category(args) {
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.category.dataAllCategory);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    //Get active category
    dispatch(categoryActions.getAll(-1));
  }, [dispatch]);

  useEffect(() => {
    setIsLoad(true);
  }, [allCategory]);

  const [modal, setModal] = useState(false);

  //   const toggle = () => setModal(!modal);
  const handleCreateNew = () => {
    const payload = { id: "", actionName: "create" };
    dispatch(openModal(payload));
  };

  const handleEdit = (id) => {
    const payload = { id: id, actionName: "edit" };
    dispatch(openModal(payload));
  };

  const handleRemove = () => {
    const payload = { id: 27, actionName: "delete" };
    dispatch(openModal(payload));
  };

  const statusCategory = ["Disabled", "Enable"];

  return (
    <>
      <BreadCrumb pageTitle={"Admin"} title={"Categories"} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Category List</h4>
            </div>

            <div className="card-body">
              <div id="customerList">
                <div className="row g-4 mb-3">
                  <div className="col-sm-auto">
                    <div>
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        data-bs-toggle="modal"
                        id="create-btn"
                        data-bs-target="#showModal"
                        onClick={handleCreateNew}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="table-responsive table-card mt-3 mb-1">
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                    <thead className="table-light">
                      <tr>
                        <th className="sort" data-sort="categoryName">
                          Category Name
                        </th>
                        <th className="sort" data-sort="CategoryStatus">
                          Category Status
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {allCategory.map((category, index) => (
                        <tr key={index}>
                          <td className="id" style={{ display: "none" }}>
                            <a
                              href="javascript:void(0);"
                              className="fw-medium link-primary"
                            >
                              {category.categoryId}
                            </a>
                          </td>
                          <td className="customer_name">
                            {category.categoryName}
                          </td>
                          <td className="status">
                            <span
                              className={`badge badge-soft-${
                                category.categoryStatus === 1
                                  ? "success"
                                  : "danger"
                              } text-uppercase`}
                            >
                              {statusCategory[category.categoryStatus]}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <div className="edit">
                                <button
                                  className="btn btn-sm btn-success edit-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() =>
                                    handleEdit(category.categoryId)
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <div className="pagination-wrap hstack gap-2">
                    <a className="page-item pagination-prev disabled" href="#">
                      Previous
                    </a>
                    <ul className="pagination listjs-pagination mb-0"></ul>
                    <a className="page-item pagination-next" href="#">
                      Next
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modals />
    </>
  );
}

export default Category;
