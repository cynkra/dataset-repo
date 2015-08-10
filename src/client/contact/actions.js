import {dispatch, dispatchAsync} from '../lib/dispatcher';
import {sendContact} from '../../services/contact/fetcher';
import resolver from '../../lib/resolver';

export function submitContactForm(values: Object) {
  const promise = (resolve) => {
    sendContact(values)
      .then(() => {
        submitContactFormSuccess();
        resolve();
      });
  };
  return dispatchAsync(submitContactForm, resolver.resolve(promise));
}

export function submitContactFormSuccess() {
  dispatch(submitContactFormSuccess);
}
