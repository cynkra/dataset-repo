import React from 'react';
import Component from '../common/component.react';
import {focusInvalidField} from '../lib/validation';
import {submitContactForm} from './actions';
import Message from '../app/message';

require('./contactForm.styl');

export default class ContactForm extends Component {

  static propTypes = {
    message: React.PropTypes.instanceOf(Message).isRequired
  }

  onSubmit(e) {
    e.preventDefault();

    const values = {
      email: e.target['email'].value,
      message: e.target['message'].value
    };

    submitContactForm(values)
      .then(() => this.resetForm())
      .catch(focusInvalidField(this));
  }

  resetForm() {
    this.refs.email.getDOMNode().value = '';
    this.refs.message.getDOMNode().value = '';
  }

  renderMessage(message) {
    return message.error
      ? (
        <div className='ContactForm-error'>{message.text}</div>
      )
      : (
        <div className='ContactForm-success'>{message.text}</div>
      );
  }

  render() {
    return (
      <div className='ContactForm'>
        <div className='ContactForm-half'>
          <h3>Typo, suggestion, complain?</h3>
          <form action='' method='post' onSubmit={::this.onSubmit}>
            {this.props.message.text
              ? this.renderMessage(this.props.message)
              : null
            }
            <label htmlFor='ContactForm-email'>Email:</label>
            <input
              className='ContactForm-input'
              id='ContactForm-email'
              name='email'
              placeholder='email@example.com'
              ref='email'
              type='email'
            />

            <label htmlFor='ContactForm-message'>Message:</label>
            <textarea
              className='ContactForm-input'
              id='ContactForm-message'
              name='message'
              placeholder='Your message ...'
              ref='message'
            ></textarea>

            <button
              className='ContactForm-button'
              name='submit'
              type='submit'
            >Send</button>
          </form>
        </div>
        <div className='ContactForm-half'>
          <address>
          <strong>Christoph Sax</strong><br />
          Founder and partner at cynkra<br />
          Zürich, Switzerland<br />

          <div className='sep' />

          <strong>Kirill Müller</strong><br />
          Founder and partner at cynkra<br />
          Zürich, Switzerland<br />
          </address>
        </div>
      </div>
    );
  }

}
