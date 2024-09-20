import { VisibilityFilters } from '../actions/VisibilityActions';

const importanceFilter = (
  state = VisibilityFilters.SHOW_ALL,
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;