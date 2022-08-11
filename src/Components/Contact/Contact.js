import { useRef } from 'react';
import styles from './Contact.module.css';
import emailjs from '@emailjs/browser';

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_5wdohco', 'template_79kck89', form.current, 'jbaqcmYR0pfEweOpg')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            <div className={styles.container}>
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
                        className={styles.formContact__textarea}/>
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