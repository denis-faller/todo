import { ImportanceFilters } from '../actions/ImportanceActions';

const importanceFilter = (
  state = ImportanceFilters.SHOW_ALL,
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default importanceFilter;