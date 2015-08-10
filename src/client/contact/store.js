import * as actions from './actions';
import {register} from '../lib/dispatcher';
import {contactCursor} from '../state';
import Message from './message';

export const dispatchToken = register(({action, data}) => {

  switch (action) {

    case actions.submitContactFormSuccess:
      contactCursor(contact => {
        return contact.updateIn(['message'], new Message, message => {
          return message
            .set('text', 'Your email has been sent.')
            .set('error', false);
        });
      });
      break;

    case actions.submitContactFormError:
      contactCursor(contact => {
        return contact.updateIn(['message'], new Message, message => {
          return message
            .set('text', data.message)
            .set('error', true);
        });
      });
      break;

  }

});
