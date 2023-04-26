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
  brand_name: yup.string().required("Brand name cannot be empty!"),
  brand_status: yup
    .mixed()
    .notOneOf([""], "Invalid brand status selected!")
    .required("Brand status cannot be empty!"),
});

function Modals(args) {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectId);
  const actionName = useSelector(selectActionName);
  const isOpen = useSelector(selectIsOpen);

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);
  const dataBrand = useSelector(selectDataBrand);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // const onSubmit = (data) => {
  //   const newData = { ...data, id: userDetail.id };
  //   dispatch(updateProfile(newData));
  // };

  // Set defaulValue
  useEffect(() => {
    // setValue("email", userDetail.email);
    // setValue("userfullname", userDetail.userfullname);
    // setValue("gender", userDetail.gender);
    // setValue("address", userDetail.address);
    // setValue("phone", userDetail.phone);
  }, []);

  const onSubmit = (data) => {
    switch (actionName) {
      case "create":
        dispatch(brandActions.create(data));
        break;
      case "edit":
        dispatch(brandActions.update(data));
        dispatch(updateForm());
        break;
      default:
    }
  };

  // get category detail
  useEffect(() => {
    if (actionName === "edit") dispatch(brandActions.getSingle(categoryId));
  }, [actionName]);


  useEffect(() => {
    if (success && actionName !== "edit") {
      toggle();
    }

    if (success && actionName === "edit") {
      setValue("brand_id", dataBrand.brand_id);
      setValue("brand_name", dataBrand.brand_name);
      setValue("brand_status", dataBrand.brand_status);
    }
  }, [loading, success, error]);

  // const [modal, setModal] = useState(isOpen);
  // const toggle = () => setModal(!modal);
  const toggle = () => {
    setValue("brand_id", "");
    setValue("brand_name", "");
    setValue("brand_status", "");
    dispatch(closeModal());
  };

  const formBrand = (
    <>
      <div>
        <Label for="brand_nameInput" className="form-label">
          Brand Name
        </Label>
        <input
          type="text"
          className="form-control"
          id="brandNameInput"
          placeholder="Enter Brand name"
          name="brand_name"
          {...register("brand_name")}
        />

        <p className="text-danger">{errors?.brand_name?.message}</p>
      </div>

      <FormGroup className="mt-2">
        <Label for="brandStatusSelect">Brand Status</Label>
        <select
          className="form-select"
          id="brandStatusSelect"
          name="brand_status"
          type="select"
          {...register("brand_status")}
        >
          <option value={1}>On</option>
          <option value={0}>Off</option>
        </select>
        <p className="text-danger">{errors?.brand_status?.message}</p>

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
          <ModalHeader toggle={toggle}>Update Brand</ModalHeader>
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
