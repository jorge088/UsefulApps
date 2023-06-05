import { useRef, useState } from 'react';
import styles from './Contact.module.css';
import emailjs from '@emailjs/browser';
import SideAlert from '../Shared/SideAlert';
// import Footer from '../Shared/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        errors: {
            name: false,
            email: false,
            message: false
        }
    });

    const [sideAlert, setSideAlert] = useState({
        show: false,
        type: '',
        text: ''
    });

    const [isSending, setIsSending] = useState(false)

    const form = useRef();

    const handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        let errorInput = false;

        if (value === "") errorInput = true;
        if (name === "email") errorInput = !validateEmail(value);

        setFormData({
            ...formData,
            [name]: value,
            errors: {
                ...formData.errors,
                [name]: errorInput
            }
        });
    }

    const validateEmail = (email) => {
        return email.match(
            // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const isValid = () => {
        return formData.name !== '' && formData.message !== "" && validateEmail(formData.email)
    }

    const checkFormErrors = () => {
        const error = {
            name: false,
            email: false,
            message: false
        };
        if (formData.name === "") {
            error.name = true;
        }

        if (!validateEmail(formData.email)) {
            error.email = true
        }
        if (formData.message === "") {
            error.message = true
        }
        return error;

    }

    const sendEmail = (e) => {
        e.preventDefault();
        if (isSending) return;

        if (isValid()) {
            setIsSending(true);
            //EMAIL JS API
            emailjs.sendForm('service_5wdohco', 'template_79kck89', form.current, 'jbaqcmYR0pfEweOpg')
                .then((result) => {
                    setSideAlert({
                        show: true,
                        text: "¡Mensaje Enviado!",
                        type: 'succed'
                    })
                    setIsSending(false);
                    setFormData({
                        name: "",
                        email: "",
                        message: "",
                        errors: {
                            name: false,
                            email: false,
                            message: false
                        }
                    });

                }, (error) => {
                    setSideAlert({
                        show: true,
                        text: "¡Error al enviar!",
                        type: 'error'
                    })
                });
        } else {
            let inputsError = checkFormErrors()
            setFormData({
                ...formData,
                errors: inputsError
            })

        }

    };

    const handleCloseSideAlert = () => {
        setSideAlert({
            show: false,
            type: '',
            text: ''
        });
    }

    return (
        <>
            <div className={styles.container}>
                {sideAlert.show &&
                    <SideAlert
                        text={sideAlert.text}
                        type={sideAlert.type}
                        _callback={handleCloseSideAlert}
                    />
                }

                <form ref={form} onSubmit={sendEmail} className={styles.formContact} >
                    <h3 className={styles.title}>Puedes contactarme enviando un mensaje</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder='Nombre'
                        className={`${styles.formContact__input} ${formData.errors.name ? styles.formInputError : ""}`}
                        value={formData.name}
                        onChange={handleChange} />
                    {formData.errors.name && <p className={styles.errorMessage}>Ingrese su nombre.</p>}

                    <input
                        name="email"
                        placeholder='Email'
                        className={`${styles.formContact__input} ${formData.errors.email ? styles.formInputError : ""}`}
                        value={formData.email}
                        onChange={handleChange} />
                    {formData.errors.email && <p className={styles.errorMessage}>Ingrese un email correcto.</p>}

                    <textarea
                        name="message"
                        placeholder='Mensaje'
                        className={`${styles.formContact__textarea} ${formData.errors.message ? styles.formInputError : ""}`}
                        value={formData.message}
                        onChange={handleChange} />
                    {formData.errors.message && <p className={styles.errorMessage}>Ingrese su mensaje</p>}

                    <input
                        type="submit"

                        value={`${isSending ? 'Enviando...' : 'Enviar mensaje'}`}
                        className={styles.formContact__submit} />
                </form>
            </div>
            {/* <Footer /> */}
        </>
    )
}
export default Contact