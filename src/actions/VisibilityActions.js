export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_END = 'SHOW_END';
export const SHOW_IMPORTANCE = 'SHOW_IMPORTANCE';

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter,
  });
  
  export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_IMPORTANCE: 'SHOW_IMPORTANCE',
  };