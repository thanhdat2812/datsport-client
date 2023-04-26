import { useState, useEffect, useRef } from "react";
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
import { postsActions } from "../../redux/postActions";
import {
  selectLoading,
  selectSuccess,
  selectError,
  selectDataPosts,
} from "../../redux/postSlice";
import JoditEditor from "jodit-react";

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
import imageApi from "../../api/img";
import uploadIcon from "../../assets/images/Upload-PNG-Image-File.png";

const schema = yup.object().shape({
  posts_title: yup.string().required("Posts title cannot be empty!"),
  posts_content: yup.string().required("Posts content cannot be empty!"),
  posts_image: yup.string().required("Posts image cannot be empty!"),
  posts_status: yup
    .mixed()
    .notOneOf([""], "Invalid posts status selected!")
    .required("Posts status cannot be empty!"),
});

function Modals(args) {
  const dispatch = useDispatch();
  const postsId = useSelector(selectId);
  const actionName = useSelector(selectActionName);
  const actionSubmit = useSelector(selectActionSubmit);
  const isOpen = useSelector(selectIsOpen);

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);
  const dataPosts = useSelector(selectDataPosts);
  const [imageReview, setImageReview] = useState(uploadIcon);
  const [content, setContent] = useState("");

  const editor = useRef(null);

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
        const payloadCreate = {
          ...data,
          posts_create_date: getDateTime(),
          posts_create_user: "Admin",
          posts_update_date: getDateTime(),
          posts_update_user: "Admin",
        };

        dispatch(postsActions.create(payloadCreate));
        break;
      case "edit":

        const payloadUpdate = {
          ...data,
          posts_id: postsId,
          posts_create_date: getDateTime(),
          posts_create_user: "Admin",
          posts_update_date: getDateTime(),
          posts_update_user: "Admin",
        };

        dispatch(postsActions.update(payloadUpdate));
        dispatch(updateForm());
        break;
      default:
    }
  };

  function getDateTime() {
    const now = new Date();
    return now.toISOString().replace("Z", "+00:00");
  }

  // get category detail
  useEffect(() => {
    if (actionName === "edit") dispatch(postsActions.getSingle(postsId));
  }, [actionName]);


  useEffect(() => {
    if (success && actionName !== "edit") {
      toggle();
    }

    if (success && actionName === "edit") {
      setValue("posts_title", dataPosts.posts_title);
      setValue("posts_content", dataPosts.posts_content);
      setContent(dataPosts.posts_content);
      setValue("posts_image", dataPosts.posts_image);
      setImageReview( dataPosts.posts_image);
      setValue("posts_status", dataPosts.posts_status);
    }
  }, [loading, success, error]);

  // const [modal, setModal] = useState(isOpen);
  // const toggle = () => setModal(!modal);
  const toggle = () => {
    setValue("posts_title", "");
    setValue("posts_content", "");
    setValue("posts_image", "");
    setValue("posts_status", "");
    dispatch(closeModal());
  };

  // handle change event of input file
  const onChangeFile = (imageIndex) => async (event) => {
    const imageUrl = event.target.files[0];
    await imageApi
      .uploadImage(imageUrl)
      .then((res) => {
        const resImg = res.data.data.display_url;
        setImageReview(resImg);

        setValue("posts_image", resImg);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formPosts = (
    <>
      <div>
        <Label for="posts_titleInput" className="form-label">
          Posts Title
        </Label>
        <input
          type="text"
          className="form-control"
          id="posts_titleInput"
          placeholder="Enter posts title"
          name="posts_title"
          {...register("posts_title")}
        />

        <p className="text-danger">{errors?.posts_title?.message}</p>
      </div>
      <FormGroup className="mt-2">
        <Label for="brandSelect">Posts content</Label>
        <br />
        <input name="posts_content" {...register("posts_content")} hidden />
        <JoditEditor
          ref={editor}
          tabIndex={1}
          value={content}
          onBlur={(newContent) => {
            setValue("posts_content", newContent);
          }}
        />

        <p className="text-danger">{errors?.posts_content?.message}</p>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Image</Label>
        <input
          hidden
          type="text"
          name="posts_image"
          {...register("posts_image")}
        />
        <br />
        <img src={imageReview} width={"100px"} />
        <br />
        <br />
        <input
          id="productImage1"
          type="file"
          accept="image/*"
          multiple
          onChange={onChangeFile()}
        />
        <p className="text-danger">{errors?.posts_image?.message}</p>
      </FormGroup>

      <FormGroup className="mt-2">
        <Label for="posts_statusSelect">Posts Status</Label>
        <select
          className="form-select"
          id="posts_statusSelect"
          name="posts_status"
          type="select"
          {...register("posts_status")}
        >
          <option value={1}>On</option>
          <option value={0}>Off</option>
        </select>
        <p className="text-danger">{errors?.posts_status?.message}</p>
      </FormGroup>
    </>
  );

  if (actionName === "create") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
          <ModalHeader toggle={toggle}>Add New Posts</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>{formPosts}</ModalBody>
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
          <ModalHeader toggle={toggle}>Update posts</ModalHeader>
          <ModalBody>{formPosts}</ModalBody>
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
