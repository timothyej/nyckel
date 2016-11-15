export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export function setSearchTerm(term) {
  return {
    type: SET_SEARCH_TERM,
    term
  };
}
