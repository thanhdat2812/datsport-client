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
  Row,
  Col,
} from "reactstrap";
// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../redux/productActions";
import { categoryActions } from "../../redux/categoryActions";
import { brandActions } from "../../redux/brandActions";
import JoditEditor from "jodit-react";

import {
  selectLoading,
  selectSuccess,
  selectError,
  selectDataProduct,
} from "../../redux/productSlice";

import {
  selectIsOpen,
  closeModal,
  selectId,
  selectActionName,
  updateForm,
} from "../../redux/modalSlice";
import ContentModalDel from "../components/contentModalDel";
import imageApi from "../../api/img";
import uploadIcon from "../../assets/images/Upload-PNG-Image-File.png";

const schema = yup.object().shape({
  productName: yup.string().required("product name cannot be empty!"),
  categoryId: yup
    .mixed()
    .notOneOf(["0"], "Invalid category selected!")
    .required("Category status cannot be empty!"),
  brandId: yup
    .mixed()
    .notOneOf(["0"], "Invalid brand selected!")
    .required("Brand status cannot be empty!"),
  productPrice: yup.string().required("Price cannot be empty!"),
  productQuantity: yup.string().required("Quantity cannot be empty!"),
  productImage1: yup.string().required("Please upload a file image 1"),
  productHot: yup
    .mixed()
    .notOneOf([""], "Invalid product hot selected!")
    .required("Product hot must be either 'Hot' or 'Normal'!"),
  productStatus: yup
    .mixed()
    .notOneOf([""], "Invalid product status selected!")
    .required("Product status must be either 'On' or 'Off'!"),
});

function Modals(args) {
  const dispatch = useDispatch();
  const productId = useSelector(selectId);
  const actionName = useSelector(selectActionName);
  const isOpen = useSelector(selectIsOpen);

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);
  const dataProduct = useSelector(selectDataProduct);

  const categoryData = useSelector((state) => state.category.dataAllCategory);
  const brandData = useSelector((state) => state.brand.dataAllBrand);
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const [imageReview, setImageReview] = useState([
    uploadIcon,
    uploadIcon,
    uploadIcon,
    uploadIcon,
    uploadIcon,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // Set defaulValue
  useEffect(() => {
    // setValue("email", userDetail.email);
    // setValue("userfullname", userDetail.userfullname);
    // setValue("gender", userDetail.gender);
    // setValue("address", userDetail.address);
    // setValue("phone", userDetail.phone);
  }, []);

  const config = {
    readonly: false,
    height: 400,
  };
  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    // setContent(editorContent);
    setValue("productDetail", editorContent);
  };

  const onSubmit = (data) => {

    switch (actionName) {
      case "create":
        const payloadCreate = {
          ...data,
          productCreateDate: getDateTime(),
          productCreateUser: "Admin",
          productUpdateDate: getDateTime(),
          productUpdateUser: "Admin",
        };

        dispatch(productActions.create(payloadCreate));
        break;
      case "edit":
        const payloadUpdate = {
          ...data,
          productId: productId,
          productCreateDate: getDateTime(),
          productCreateUser: "Admin",
          productUpdateDate: getDateTime(),
          productUpdateUser: "Admin",
        };
        dispatch(productActions.update(payloadUpdate));
        dispatch(updateForm());
        break;
      default:
    }
  };

  function getDateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  // get category detail
  useEffect(() => {
    if (actionName === "create") {
      dispatch(categoryActions.getAll(1));
      dispatch(brandActions.getAll(1));
    }

    if (actionName === "edit") {
      dispatch(categoryActions.getAll(1));
      dispatch(brandActions.getAll(1));
      dispatch(productActions.getSingle(productId));
    }
  }, [actionName]);

  // useEffect(() => {
  //   console.log("dataProduct: ", dataProduct);
  // }, [dataProduct]);

  const [categorySelected, setCategorySelected] = useState(0);
  const [brandSelected, setBrandSelected] = useState(0);
  const [productHotSelected, setProductHotSelected] = useState(0);
  const [productStatusSeleted, setProductStatusSeleted] = useState("");

  useEffect(() => {
    if (success && actionName !== "edit") {
      toggle();
    }

    if (
      success &&
      actionName === "edit" &&
      dataProduct.category &&
      dataProduct.brand
    ) {
      setValue("productName", dataProduct.productName);
      setValue("productDescription", dataProduct.productDescription);
      setContent(dataProduct.productDescription);

      setValue("productPrice", dataProduct.productPrice);
      setValue("productQuantity", dataProduct.productQuantity);

      setValue("categoryId", dataProduct.category.categoryId);
      setValue("brandId", dataProduct.brand.brandId);

      setValue("productImage1", dataProduct.productImage1);
      setValue("productImage2", dataProduct.productImage2);
      setValue("productImage3", dataProduct.productImage3);
      setValue("productImage4", dataProduct.productImage4);
      setValue("productImage5", dataProduct.productImage5);

      setImageReview([
        dataProduct.productImage1 || uploadIcon,
        dataProduct.productImage2 || uploadIcon,
        dataProduct.productImage3 || uploadIcon,
        dataProduct.productImage4 || uploadIcon,
        dataProduct.productImage5 || uploadIcon,
      ]);

      setValue("productHot", dataProduct.productHot);
      setValue("productStatus", dataProduct.productStatus);

      setCategorySelected(dataProduct.category.categoryId);
      setBrandSelected(dataProduct.brand.brandId);

      setProductHotSelected(dataProduct.productHot);
      setProductStatusSeleted(dataProduct.productStatus);
    }
  }, [loading, success, error]);


  // const [modal, setModal] = useState(isOpen);
  // const toggle = () => setModal(!modal);
  const toggle = () => {
    setValue("productName", "");
    setValue("productDescription", "");
    setValue("productPrice", "");
    setValue("productQuantity", "");

    setValue("productImage1", "");
    setValue("productImage2", "");
    setValue("productImage3", "");
    setValue("productImage4", "");
    setValue("productImage5", "");

    setValue("productHot", "");
    setValue("productStatus", "");
    setCategorySelected(0);
    setBrandSelected(0);
    dispatch(closeModal());
  };

  // handle change event of input file
  const onChangeFile = (imageIndex) => async (event) => {
    const imageUrl = event.target.files[0];
    await imageApi
      .uploadImage(imageUrl)
      .then((res) => {
        const newImage = res.data.data.display_url;
        const updatedImageReview = [...imageReview]; // create a copy of the array
        updatedImageReview[imageIndex] = newImage; // update the third element with the new image
        setImageReview(updatedImageReview); // set the updated array as the new state

        setValue(`productImage${imageIndex + 1}`, newImage);
        // console.log("res img: ", res.data.data.display_url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formCategory = (
    <>
      <div>
        <Label for="productNameInput" className="form-label">
          Product Name
        </Label>
        <input
          type="text"
          className="form-control"
          id="productNameInput"
          placeholder="Enter Product name..."
          name="productName"
          {...register("productName")}
        />

        <p className="text-danger">{errors?.productName?.message}</p>
      </div>
      <FormGroup className="mt-2">
        <Label for="categorySelect">Category</Label>
        <select
          className="form-select"
          id="categorySelect"
          name="categoryId"
          type="select"
          {...register("categoryId")}
        >
          <option value={0}>Choose Category</option>
          {categoryData &&
            categoryData.map((category, index) => (
              <option
                value={category.categoryId}
                selected={category.categoryId === categorySelected}
              >
                {category.categoryName}
              </option>
            ))}
        </select>
        <p className="text-danger">{errors?.categoryId?.message}</p>
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="brandSelect">Brand</Label>
        <select
          className="form-select"
          id="brandSelect"
          name="brandId"
          type="select"
          {...register("brandId")}
        >
          <option value={0}>Choose Brand</option>
          {brandData &&
            brandData.map((brand, index) => (
              <option
                value={brand.brand_id}
                selected={brand.brand_id === brandSelected}
              >
                {brand.brand_name}
              </option>
            ))}
        </select>
        <p className="text-danger">{errors?.brandId?.message}</p>
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="brandSelect">Description</Label>
        <br />
        <input
          name="productDescription"
          {...register("productDescription")}
          hidden
        />
        <JoditEditor
          ref={editor}
          tabIndex={1}
          value={content}
          onBlur={(newContent) => {
            setValue("productDescription", newContent);
          }}
        />
      </FormGroup>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="price">Price</Label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="productPrice"
              {...register("productPrice")}
            />
            <p className="text-danger">{errors?.productPrice?.message}</p>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="quantity">Quantity</Label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="productQuantity"
              {...register("productQuantity")}
            />
            <p className="text-danger">{errors?.productQuantity?.message}</p>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleFile">Product image 1</Label>
            <input
              type="text"
              name="productImage1"
              {...register("productImage1")}
              hidden
            />
            <br />
            <img src={imageReview[0]} width={"100px"} />
            <br />
            <br />
            <input
              id="productImage1"
              type="file"
              accept="image/*"
              multiple
              onChange={onChangeFile(0)}
            />
            <p className="text-danger">{errors?.productImage1?.message}</p>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            {" "}
            <Label for="exampleFile">Product image 2</Label>
            <input
              type="text"
              name="productImage2"
              {...register("productImage2")}
              hidden
            />
            <br />
            <img src={imageReview[1]} width={"100px"} />
            <br />
            <br />
            <input
              id="productImage2"
              type="file"
              accept="image/*"
              multiple
              onChange={onChangeFile(1)}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleFile">Product image 3</Label>
            <input
              type="text"
              name="productImage3"
              {...register("productImage3")}
              hidden
            />
            <br />
            <img src={imageReview[2]} width={"100px"} />
            <br />
            <br />
            <input
              id="productImage3"
              type="file"
              accept="image/*"
              multiple
              onChange={onChangeFile(2)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleFile">Product image 4</Label>
            <input
              type="text"
              name="productImage4"
              {...register("productImage4")}
              hidden
            />
            <br />
            <img src={imageReview[3]} width={"100px"} />
            <br />
            <br />
            <input
              id="productImage4"
              type="file"
              accept="image/*"
              multiple
              onChange={onChangeFile(3)}
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label for="exampleFile">Product image 5</Label>
        <input
          type="text"
          name="productImage5"
          {...register("productImage5")}
          hidden
        />
        <br />
        <img src={imageReview[4]} width={"100px"} />
        <br />
        <br />
        <input
          id="productImage5"
          type="file"
          accept="image/*"
          multiple
          onChange={onChangeFile(4)}
        />
      </FormGroup>

      <FormGroup className="mt-2">
        <Label for="productHotSelect">Product Hot</Label>
        <select
          className="form-select"
          id="productHotSelect"
          name="productHot"
          type="select"
          {...register("productHot")}
        >
          <option
            value={true}
            selected={dataProduct.productHot === productHotSelected}
          >
            Hot
          </option>
          <option
            value={false}
            selected={dataProduct.productHot === productHotSelected}
          >
            Normal
          </option>
        </select>
        <p className="text-danger">{errors?.productHot?.message}</p>
      </FormGroup>

      <FormGroup className="mt-2">
        <Label for="productStatusSelect">Status</Label>
        <select
          className="form-select"
          id="productStatusSelect"
          name="productStatus"
          type="select"
          {...register("productStatus")}
        >
          <option
            value={1}
            selected={dataProduct.productHot === productStatusSeleted}
          >
            On
          </option>
          <option
            value={0}
            selected={dataProduct.productHot === productStatusSeleted}
          >
            Off
          </option>
        </select>
        <p className="text-danger">{errors?.productStatus?.message}</p>
      </FormGroup>
    </>
  );

  if (actionName === "create") {
    return (
      <>
        <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
          <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
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
          <ModalHeader toggle={toggle}>Update Product</ModalHeader>
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
  }
}

export default Modals;
