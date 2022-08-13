import { useRef, useState } from 'react';
import styles from './Contact.module.css';
import emailjs from '@emailjs/browser';
import AlertPrincipal from '../Shared/AlertPrincipal';

import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [alertPrincipal, setAlertPrincipal] = useState({ show: false, text: "", icon: null });
    const form = useRef();

    const validateEmail = (email) => {
        return email.match(
            // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const sendEmail = (e) => {
        e.preventDefault();
        let target = e.target;
        let name = target.name.value;
        let email = target.email.value;
        let message = target.email.value;

        if (name === '' || email === '' || message === '') {
            setAlertPrincipal({ show: true, text: "Hay campos incompletos", icon: faCircleXmark })
            return;
        }

        if (validateEmail(email)) {
            emailjs.sendForm('service_5wdohco', 'template_79kck89', form.current, 'jbaqcmYR0pfEweOpg')
                .then((result) => {
                    target.name.value = '';
                    target.email.value = '';
                    target.message.value = '';
                    target.name.focus();
                    setAlertPrincipal({ show: true, text: "El mensaje se envió correctamente", icon: faCheckCircle });
                }, (error) => {
                    setAlertPrincipal({ show: true, text: "Ocurrio un error, mensaje no enviado", icon: faCircleXmark });
                });
        } else {
            setAlertPrincipal({ show: true, text: "Email no valido", icon: faCircleXmark })
            return;
        }

    };
    const closeAlertPrincipal = () => {
        setAlertPrincipal({ show: false })
    }

    return (
        <>
            <div className={styles.container}>
                
                {alertPrincipal.show &&
                    <AlertPrincipal
                        text={alertPrincipal.text}
                        icon={alertPrincipal.icon}
                        closeAlert={closeAlertPrincipal} />
                }

                <h3 className={styles.title}>Contacto</h3>
                <form ref={form} onSubmit={sendEmail} className={styles.formContact} >
                    <input
                        type="text"
                        name="name"
                        placeholder='Nombre'
                        className={styles.formContact__input} />
                    <input
                        name="email"
                        placeholder='Email'
                        className={styles.formContact__input} />
                    <textarea
                        name="message"
                        placeholder='Mensaje'
                        className={styles.formContact__textarea} />
                    <input
                        type="submit"
                        value="Enviar mensaje"
                        className={styles.formContact__submit} />
                </form>
            </div>

        </>
    )
}
export default Contact