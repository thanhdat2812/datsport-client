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
import { postsActions } from "../../redux/postActions";

import { openModal, closeModal } from "../../redux/modalSlice";
import { useEffect } from "react";
import BreadCrumb from "../../component/Common/BreadCrumb";

function Category(args) {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.dataAllPosts);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    //Get active category
    dispatch(postsActions.getAll(-1));
  }, [dispatch]);

  useEffect(() => {
    setIsLoad(true);
  }, [allPosts]);

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
    <BreadCrumb pageTitle={"Admin"} title={"Posts"} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Post List</h4>
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
                        <th>Posts Name</th>
                        <th>Posts image</th>
                        <th>Create date</th>
                        <th>Create user</th>
                        <th>Update date</th>
                        <th>Update user</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {allPosts.map((posts, index) => (
                        <tr key={index}>
                          <td className="id" style={{ display: "none" }}>
                            <a
                              href="javascript:void(0);"
                              className="fw-medium link-primary"
                            >
                              {posts.posts_id}
                            </a>
                          </td>
                          <td className="customer_name">{posts.posts_title}</td>
                          <td className="customer_name"><img src={posts.posts_image} width={"20%"}/></td>
                          <td className="customer_name">
                            {posts.posts_create_date && posts.posts_create_date.split("T")[0]}
                          </td>
                          <td className="customer_name">
                            {posts.posts_create_user}
                          </td>
                          <td className="customer_name">
                            {posts.posts_update_date && posts.posts_update_date.split("T")[0]}
                          </td>
                          <td className="customer_name">
                            {posts.posts_update_user}
                          </td>
                          <td className="status">
                            <span
                              className={`badge badge-soft-${
                                posts.posts_status === 1 ? "success" : "danger"
                              } text-uppercase`}
                            >
                              {statusCategory[posts.posts_status]}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <div className="edit">
                                <button
                                  className="btn btn-sm btn-success edit-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() => handleEdit(posts.posts_id)}
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
                      {/* <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#08a88a"
                        style="width:75px;height:75px"
                      ></lord-icon> */}
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
        <ModalBody>
          <div>
            <Label for="labelInput" className="form-label">
              Category Name
            </Label>
            <input className="form-control" id="labelInput" />
          </div>

          <FormGroup className="mt-2">
            <Label for="exampleSelect">Category Status</Label>
            <Input id="exampleSelect" name="select" type="select">
              <option value={0}>Off</option>
              <option value={1}>On</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}

      <Modals />
    </>
  );
}

export default Category;
