export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_SCRAPE_DATA":
      state = action.payload;
    default:
      return state;
  }
};
