import * as actions from '../actionTypes';

export const handleChange = ({ name, value }) => (
  {
    type: actions.HANDLE_CHANGE_FORM,
    name,
    value,
  });
export const handleSubmitForm = () => (
  {
    type: actions.SUBMIT_FORM,
  });
export const resetForm = () => (
  {
    type: actions.RESET_FORM,
  });
