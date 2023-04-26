import {  useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
} from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector, useDispatch } from "react-redux";
import { categoryActions } from "../../redux/categoryActions";
import {
  selectLoading,
  selectSuccess,
  selectError,
  selectDataCategory,
} from "../../redux/categorySlice";

import {
  selectIsOpen,
  openModal,
  closeModal,
  selectId,
  selectActionName,

  updateForm,
} from "../../redux/modalSlice";
import ContentModalDel from "../components/contentModalDel";

const schema = yup.object().shape({
  categoryName: yup.string().required("Category name cannot be empty!"),
  categoryStatus: yup
    .mixed()
    .notOneOf([""], "Invalid category status selected!")
    .required("Category status cannot be empty!"),
});

function Modals(args) {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectId);
  const actionName = useSelector(selectActionName);

  const isOpen = useSelector(selectIsOpen);

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);
  const dataCategory = useSelector(selectDataCategory);

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
        dispatch(categoryActions.create(data));
        break;
      case "edit":
        dispatch(categoryActions.update(data));
        dispatch(updateForm());
        break;
      default:
    }
  };

  // get category detail
  useEffect(() => {
    if (actionName === "edit") dispatch(categoryActions.getSingle(categoryId));
  }, [actionName]);


  useEffect(() => {
    if (success && actionName !== "edit") {
      toggle();
    }

    if (success && actionName === "edit") {
      setValue("categoryId", dataCategory.categoryId);
      setValue("categoryName", dataCategory.categoryName);
      setValue("categoryStatus", dataCategory.categoryStatus);
    }
  }, [loading, success, error]);

  // const [modal, setModal] = useState(isOpen);
  // const toggle = () => setModal(!modal);
  const toggle = () => {
    setValue("categoryId", "");
    setValue("categoryName", "");
    setValue("categoryStatus", "");
    dispatch(closeModal());
  };


  const formCategory = (
    <>
      <div>
        <Label for="categoryNameInput" className="form-label">
          Category Name
        </Label>
        <input
          type="text"
          className="form-control"
          id="categoryNameInput"
          placeholder="Enter category name"
          name="categoryName"
          {...register("categoryName")}
        />

        <p className="text-danger">{errors?.categoryName?.message}</p>
      </div>

      <FormGroup className="mt-2">
        <Label for="categoryStatusSelect">Category Status</Label>
        <select
          className="form-select"
          id="categoryStatusSelect"
          name="categoryStatus"
          type="select"
          {...register("categoryStatus")}
        >
          <option value={1}>On</option>
          <option value={0}>Off</option>
        </select>
        <p className="text-danger">{errors?.categoryStatus?.message}</p>
      </FormGroup>
    </>
  );

  if (actionName === "create") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
          <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>{formCategory}</ModalBody>
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
          <ModalHeader toggle={toggle}>Update Category</ModalHeader>
          <ModalBody>{formCategory}</ModalBody>
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
