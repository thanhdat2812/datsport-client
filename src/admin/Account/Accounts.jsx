import Modals from "./modal";

// redux
import { useSelector, useDispatch } from "react-redux";
import { listAccounts } from "../../redux/accountSlice";

import { openModal, closeModal } from "../../redux/modalSlice";
import { useEffect } from "react";
import BreadCrumb from "../../component/Common/BreadCrumb";

function Accounts(args) {
  const dispatch = useDispatch();

  const { accounts, currentAccount, status, error } = useSelector(
    (state) => state.account
  );
  useEffect(() => {
    //Get active category
    dispatch(listAccounts());
  }, [dispatch]);

  //   const toggle = () => setModal(!modal);
  const handleCreateNew = () => {
    const payload = { id: "", actionName: "create" };
    dispatch(openModal(payload));
  };

  const handleEdit = (username) => {
    const payload = { id: username, actionName: "edit" };
    dispatch(openModal(payload));
  };

  const handleRemove = () => {
    const payload = { id: 27, actionName: "delete" };
    dispatch(openModal(payload));
  };

  const accountStatus = ["Disabled", "Enable"];

  return (
    <>
      <BreadCrumb pageTitle={"Admin"} title={"Accounts"} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Account List</h4>
            </div>
            <div className="card-body">
              <div id="customerList">
               

                <div className="table-responsive table-card  mb-1">
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                    <thead className="table-light">
                      <tr>
                        <th>Account</th>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {accounts.map((account, index) => (
                        <tr key={index}>
                          <td className="id" style={{ display: "none" }}>
                            <a
                              href="javascript:void(0);"
                              className="fw-medium link-primary"
                            >
                              {account.id}
                            </a>
                          </td>
                          <td className="customer_name">{account.username}</td>
                          <td className="customer_name">
                            {account.userfullname}
                          </td>
                          <td className="customer_name">{account.email}</td>
                          <td className="customer_name">{account.phone}</td>
                          <td className="customer_name">{account.address}</td>
                          <td className="status">
                            <span
                              className={`badge badge-soft-${
                                account.status === 1 ? "success" : "danger"
                              } text-uppercase`}
                            >
                              {accountStatus[account.status]}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <div className="edit">
                                <button
                                  className="btn btn-sm btn-success edit-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() => handleEdit(account.username)}
                                >
                                  Change status
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

export default Accounts;
