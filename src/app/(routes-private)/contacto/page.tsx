"use client";
import { FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import classes from "./contacto.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faPinterest, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Page: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_k3mn0fd",
          "template_os86fyp",
          form.current,
          "CuoAJEX6sR5-opZsN"
        )
        .then(
          (result) => {
            window.location.reload();
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.error("Form is not defined.");
    }
  };
  return (
    <div className={classes.contact}>
      <h1 className={classes.contactTitle}>Contacta con nosotros</h1>
      <div className={classes.formData}>
        <div className={classes.formContainer}>
          <form className={classes.contactForm} ref={form} onSubmit={sendEmail}>
            <label className={classes.contactLabel}>Nombre completo</label>
            <input type="text" className={classes.contactInput} name="user_name" />
            <label className={classes.contactLabel}>E-mail</label>
            <input type="email" className={classes.contactInput} name="user_email" />
            <label className={classes.contactLabel}>Mensaje</label>
            <textarea
              name="user_message"
              className={classes.contactInput}
              cols={30}
              rows={3}
            />
            <button type="submit" className={classes.contactBtn}>
              Enviar
            </button>
          </form>
        </div>
        <div className={classes.contactUs}>
          <div className={classes.contactTop}>
            <h3>Contacto</h3>
            <span className={classes.contactMail}>blogreactmongo@gmail.com</span>
            <h3>Dirección</h3>
            <span className={classes.contactMail}>C/ Imaginaria, N/32 </span>
          </div>
          <div className={classes.contactBottom}>
            <Link
              href="https://es-es.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} className="size-6  hover:text-[#1DA1F2]" />
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="size-6  hover:text-[#1DA1F2]" />
            </Link>
            <Link href="https://www.pinterest.es/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faPinterest} className="size-6  hover:text-[#1DA1F2]" />
            </Link>
            <Link href="https://twitter.com/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faXTwitter} className="size-6 hover:text-[#1DA1F2]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
