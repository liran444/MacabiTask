import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "../form/form";

const ResponsiveDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="formHeader"
        >
          {props.errorMessage
            ? "Error!"
            : "Add a User"}
          <hr />
        </DialogTitle>
        <DialogContent>
          {props.errorMessage ? (
            props.errorMessage
          ) : (
            <Form onClose={() => props.onClose()} />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => props.onClose()}
            color="primary"
          >
            Close
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog;
