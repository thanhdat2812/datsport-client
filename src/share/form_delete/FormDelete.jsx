import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconProduct from "../../assets/images/iconProduct.png";
export default function DeleteForm({
  isOpen,
  handleClose,
  handleDeleteProduct,
}) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="uppercase font-semibold"
        >
          Are you sure delete product?
        </DialogTitle>
        <DialogContent>
          <img src={IconProduct} alt="" className="h-52 w-full object-cover" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDeleteProduct}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
