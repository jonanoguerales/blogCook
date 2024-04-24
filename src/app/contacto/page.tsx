import "./contacto.css";
export default function Page() {
  return (
    <div className="contact">
      <h1 className="contactTitle">Contacta con nosotros</h1>
      <div className="formData">
        <div className="formContainer">
          <form className="contactForm" /*ref={form} onSubmit={sendEmail}*/>
            <label className="contactLabel">Nombre completo</label>
            <input type="text" className="contactInput" name="user_name" />
            <label className="contactLabel">E-mail</label>
            <input type="email" className="contactInput" name="user_email" />
            <label className="contactLabel">Mensaje</label>
            <textarea
              name="user_message"
              className="contactInput"
              cols={30}
              rows={3}
            />
            <button type="submit" className="contactBtn">
              Enviar
            </button>
          </form>
        </div>
        <div className="contactUs">
          <div className="contactTop">
            <h3>Contacto</h3>
            <span className="contactMail">blogreactmongo@gmail.com</span>
            <h3>Dirección</h3>
            <span className="contactMail">C/ Imaginaria, N/32 </span>
          </div>
          <div className="contactBottom">
            <a href="www.facebook.com" target="_blank">
              <i className="topIcon fab fa-facebook-square" />
            </a>
            <a href="www.instagram.com" target="_blank">
              <i className="topIcon fab fa-instagram-square" />
            </a>
            <a href="www.pinterest.com" target="_blank">
              <i className="topIcon fab fa-pinterest-square" />
            </a>
            <a href="www.twitter.com" target="_blank">
              <i className="topIcon fab fa-twitter-square" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
