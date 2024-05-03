"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function DialogDefault({ id }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/post/${id}`);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={handleOpen}
        className="singlePostIcon"
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Borrar Post</DialogHeader>
        <DialogBody className="text-xl">
          ¿Estas seguro de que quieres borrar este post?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleDelete}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
