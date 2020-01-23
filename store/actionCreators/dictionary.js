import * as actions from '../actionTypes';

export const getCategories = () => (
  {
    type: actions.GET_CATEGORIES,
  });

export const getCategoriesSuccess = data => (
  {
    type: actions.GET_CATEGORIES_SUCCESS,
    data,
  });
