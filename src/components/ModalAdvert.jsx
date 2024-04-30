"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault(post) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    if (post) {
      try {
        await axios.delete(`http://localhost:3001/api/posts/${id}`, {
          data: { username: user?.username },
        });
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>¿Estas seguro de que quieres borrar este post?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
