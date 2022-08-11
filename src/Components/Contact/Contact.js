import { useRef } from 'react';
import styles from './Contact.module.css';
import emailjs from '@emailjs/browser';

const Contact = () => {

    const form = useRef();

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const sendEmail = (e) => {
        e.preventDefault();
        let target = e.target;
        let name = target.name.value;
        let email = target.email.value;
        let message = target.email.value;

        if (name == '' || email == '' || message == '') {
            alert('Hay campos incompletos');

            return;
        }

        if (validateEmail(email)) {
            emailjs.sendForm('service_5wdohco', 'template_79kck89', form.current, 'jbaqcmYR0pfEweOpg')
                .then((result) => {
                    target.name.value = '';
                    target.email.value = '';
                    target.message.value = '';
                    target.name.focus();
                    alert('Enviado correctamente');

                }, (error) => {
                    alert('Hubo un error al enviar');
                });
        } else {
            alert('Invalid Email');
            return;
        }

    };

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>Get in touch</h3>
                <form ref={form} onSubmit={sendEmail} className={styles.formContact} >
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        className={styles.formContact__input} />
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        className={styles.formContact__input} />
                    <textarea
                        name="message"
                        placeholder='Message'
                        className={styles.formContact__textarea} />
                    <input
                        type="submit"
                        value="Send"
                        className={styles.formContact__submit} />
                </form>
            </div>

        </>
    )
}
export default Contact