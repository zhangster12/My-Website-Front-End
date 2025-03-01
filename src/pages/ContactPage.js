//import Axios from 'axios';
import React, { Component } from 'react';
import validator from 'validator';
import emailjs from '@emailjs/browser';

// CSS import statements
import '../css/App.css';
import '../css/ContactPage.css';

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            nameError: '',
            emailError: '',
            subjectError: '',
            messageError: '',
            disabled: false,
            emailSent: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.setState({
                disabled: true,
                emailSent: null
            });
            //Axios.post(`${process.env.REACT_APP_API_CONTACT_URL}`, this.state)
            emailjs.sendForm(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`, this.state.current, `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`)
                .then(res => {
                    if(res) {
                        this.setState({
                            emailSent: true
                        });
                    } else {
                        console.log('Message was not sent.');
                        this.setState({
                            disabled: false,
                            emailSent: false
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        disabled: false,
                        emailSent: false
                    });
                })
        }
    }

    validate = () => {
        let nameError, emailError, subjectError, messageError = '';

        console.log(validator.isInt(this.state.name))

        if (!this.state.name) {
            nameError = 'Name is required.';
        } else if (!validator.isLength(this.state.name, {min: 2}) || validator.isInt(this.state.name)) {
            nameError = 'Name is invalid.'
        }

        if (!this.state.email) {
            emailError = 'Email is required.';
        } else if (!validator.isEmail(this.state.email)) {
            emailError = 'Email is invalid.'
        }

        if (!this.state.subject) {
            subjectError = 'Subject is required.';
        } else if (!validator.isLength(this.state.subject, {min: 2}) || validator.isInt(this.state.subject)) {
            subjectError = 'Subject is invalid.'
        }

        if (!this.state.message) {
            messageError = 'Message is required.';
        } else if (!validator.isLength(this.state.message, {min: 2}) || validator.isInt(this.state.message)) {
            messageError = 'Message is invalid.'
        }

        if (nameError || emailError || subjectError || messageError) {
            this.setState({nameError, emailError, subjectError, messageError});
            return false;
        }

        this.setState({nameError, emailError, subjectError, messageError});
        return true;
    }

    render() {
        return(       
            <form className='contact-form' ref={this.state} onSubmit={this.handleSubmit} noValidate>
                <div className='page-header'>Let's talk.</div>
                <div className='instr'>
                    The form is broken at the moment, so please email <a className='email' href='mailto: zhangster12@gmail.com' rel='noopener noreferrer' target='_blank'>zhangster12@gmail.com</a>.
                    {/*Please fill out the form or contact <a className='email' href='mailto: zhangster12@gmail.com' rel='noopener noreferrer' target='_blank'>zhangster12@gmail.com</a>.*/}
                </div>
                {/*<div className='instruct'>Fields marked with a <span className='red'>*</span> are required.</div>
                <div className='form-item'>
                    <label htmlFor="name">Name <span className='red'>*</span></label>
                    <input
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <div className='red'>{this.state.nameError}</div>
                </div>
                <div className='form-item'>
                    <label htmlFor='email'>Email <span className='red'>*</span></label>
                    <input type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <div className='red'>{this.state.emailError}</div>
                </div>
                <div className='form-item'>
                    <label htmlFor='subject'>Subject <span className='red'>*</span></label>
                    <input
                        type='text'
                        name='subject'
                        value={this.state.subject}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <div className='red'>{this.state.subjectError}</div>
                </div>
                <div className='form-item'>
                    <label htmlFor='message'>Message <span className='red'>*</span></label>
                    <textarea
                        name='message'
                        rows='10'
                        value={this.state.message}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <div className='red'>{this.state.messageError}</div>
                </div>
                <button className='btn' type='submit' disabled={this.state.disabled}>Submit</button>
                {this.state.emailSent === true && <span className='green' id='message'>Message has been sent. Please refresh to sent another message.</span>}
                {this.state.emailSent === false && <span className='red' id='message'>Message was not sent.</span>}
                */}
            </form>
        )
    }
}

export default Contact;