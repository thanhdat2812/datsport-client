import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector, useDispatch } from "react-redux";
import { brandActions } from "../../redux/brandActions";
import {
  updateAccountStatus,
  getAccountByUsername,
  listAccounts,
  resetSuccess
} from "../../redux/accountSlice";
import {
  selectLoading,
  selectSuccess,
  selectError,
  selectDataBrand,
} from "../../redux/brandSlice";

import {
  selectIsOpen,
  openModal,
  closeModal,
  selectId,
  selectActionName,
  selectActionSubmit,
  updateForm,
} from "../../redux/modalSlice";
import ContentModalDel from "../components/contentModalDel";

const schema = yup.object().shape({
  username: yup.mixed().required("Username cannot be empty"),
  status: yup
    .mixed()
    .notOneOf([""], "Invalid status!")
    .required("Please select account status!"),
});

function Modals(args) {
  const dispatch = useDispatch();
  const username = useSelector(selectId);
  const actionName = useSelector(selectActionName);
  const isOpen = useSelector(selectIsOpen);

  // const loading = useSelector(selectLoading);
  // const success = useSelector(selectSuccess);
  // const error = useSelector(selectError);
  // const dataBrand = useSelector(selectDataBrand);
  const { success, loading, currentAccount } = useSelector(
    (state) => state.account
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    switch (actionName) {
      case "create":
        dispatch(brandActions.create(data));
        break;
      case "edit":
        dispatch(updateAccountStatus(data));
        dispatch(resetSuccess());
        dispatch(updateForm());
        break;
      default:
    }
  };

  useEffect(() => {
    if (success && !loading) dispatch(listAccounts());
  }, [success, loading]);

  // get account detail
  useEffect(() => {
    if (actionName === "edit") dispatch(getAccountByUsername(username));
  }, [actionName]);

  useEffect(() => {
    if (success && actionName !== "edit") {
      toggle();
    }

    if (success && actionName === "edit") {
      setValue("username", currentAccount.username);
      setValue("status", currentAccount.status);
    }
  }, [loading, success]);

  const toggle = () => {
    dispatch(closeModal());
  };

  const formBrand = (
    <>
      <div>
        <Label for="brand_nameInput" className="form-label">
          <p> Account:{currentAccount?.username}</p>

          <p> Fullname:{currentAccount?.userfullname}</p>

          <p> Email : {currentAccount?.email}</p>
        </Label>
        <input
          type="text"
          className="form-control"
          id="brandNameInput"
          hidden
          placeholder="Enter Brand name"
          name="username"
          {...register("username")}
        />
      </div>
      <label className="form-label"></label>

      <FormGroup className="mt-2">
        <Label for="brandStatusSelect">Status</Label>
        <select
          className="form-select"
          id="brandStatusSelect"
          name="status"
          type="select"
          {...register("status")}
        >
          <option value={1}>On</option>
          <option value={0}>Off</option>
        </select>
      </FormGroup>
    </>
  );

  if (actionName === "create") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
          <ModalHeader toggle={toggle}>Add New Brand</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>{formBrand}</ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-success">
                {loading && (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {loading || "Add"}
              </button>
              <Button color="secondary" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  } else if (actionName === "edit") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
          <ModalHeader toggle={toggle}>Update Account Status</ModalHeader>
          <ModalBody>{formBrand}</ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalFooter>
              <button type="submit" className="btn btn-success">
                Update
              </button>
              <Button color="secondary" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  } else if (actionName === "delete") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <ContentModalDel
                content={
                  <>
                    <h4>Are you Sure ?</h4>
                    <p className="text-muted mx-4 mb-0">
                      Are you Sure You want to Remove this Record ?
                    </p>
                  </>
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={toggle}>
                Close
              </Button>
              <button type="submit" className="btn btn-danger">
                Yes, Delete it!
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  }
}

export default Modals;
