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
import { sliderActions } from "../../redux/sliderActions";
import {
  selectLoading,
  selectSuccess,
  selectError,
  selectDataSlider,
} from "../../redux/sliderSlice";

import {
  selectIsOpen,
  openModal,
  closeModal,
  selectId,
  selectActionName,
  updateForm,
} from "../../redux/modalSlice";
import ContentModalDel from "../components/contentModalDel";
import imageApi from "../../api/img";
import uploadIcon from "../../assets/images/Upload-PNG-Image-File.png";

const schema = yup.object().shape({
  slider_name: yup.string().required("Slider name cannot be empty!"),
  slider_status: yup
    .mixed()
    .notOneOf([""], "Invalid status selected!")
    .required("Category status cannot be empty!"),

  slider_image: yup.string().required("Please upload a file image"),
});

function Modals(args) {
  const dispatch = useDispatch();
  const slider_id = useSelector(selectId);
  const actionName = useSelector(selectActionName);
  const isOpen = useSelector(selectIsOpen);

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);
  const dataSlider = useSelector(selectDataSlider);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [imageReview, setImageReview] = useState(uploadIcon);

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
        dispatch(sliderActions.create(data));
        break;
      case "edit":
        // console.log("update...", data);
        const payloadUpdate  = {...data, slider_id: slider_id};
        dispatch(sliderActions.update(payloadUpdate));
        dispatch(updateForm());
        break;
      default:
    }
  };

  // handle change event of input file
  const onChangeFile = () => async (event) => {
    const imageUrl = event.target.files[0];
    await imageApi
      .uploadImage(imageUrl)
      .then((res) => {
        setImageReview(res.data.data.display_url); // set the updated array as the new state
        setValue("slider_image", res.data.data.display_url);
        // console.log("res img: ", res.data.data.display_url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get category detail
  useEffect(() => {
    if (actionName === "edit") dispatch(sliderActions.getSingle(slider_id));
  }, [actionName]);

  useEffect(() => {
    if (success && actionName !== "edit") {
      toggle();
    }

    if (success && actionName === "edit") {
      setValue("slider_name", dataSlider.slider_name);
      setValue("slider_image", dataSlider.slider_image);
      setValue("slider_status", dataSlider.slider_status);

      setImageReview(dataSlider.slider_image || uploadIcon);
    }
  }, [loading, success, error]);

  // const [modal, setModal] = useState(isOpen);
  // const toggle = () => setModal(!modal);
  const toggle = () => {
    setValue("slider_name", "");
    setValue("slider_image", "");
    setValue("slider_status", "");
    dispatch(closeModal());
  };

  const formCategory = (
    <>
      <div>
        <Label for="slider_nameInput" className="form-label">
          Slider Name
        </Label>
        <input
          type="text"
          className="form-control"
          id="slider_nameInput"
          placeholder="Enter slider name..."
          name="slider_name"
          {...register("slider_name")}
        />

        <p className="text-danger">{errors?.slider_name?.message}</p>
      </div>
      <FormGroup className="mt-2">
        <img src="" width="60%" />
        <input type="text" hidden name="slider_name" {...register("slider_image")} />
        <br />
        <img src={imageReview} width={"100px"} />
        <br />
        <br />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onChangeFile()}
        />
        <p className="text-danger">{errors?.slider_image?.message}</p>
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="slider_statusSelect">Status</Label>
        <select
          className="form-select"
          id="slider_statusSelect"
          name="slider_status"
          type="select"
          {...register("slider_status")}
        >
          <option value={1}>On</option>
          <option value={0}>Off</option>
        </select>
        <p className="text-danger">{errors?.slider_status?.message}</p>
      </FormGroup>
    </>
  );

  if (actionName === "create") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
          <ModalHeader toggle={toggle}>Add New Slider</ModalHeader>
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
          <ModalHeader toggle={toggle}>Update Slider</ModalHeader>
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
