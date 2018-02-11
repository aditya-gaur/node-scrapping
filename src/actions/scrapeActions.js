import axios from 'axios';

const scrapeDataSuccess = data => ({
  type: 'FETCH_SCRAPE_DATA',
  payload: data
})

export const scrapeData = () => (dispatch) => (
  axios.get('/scrape')
    .then((response) => {
      dispatch(scrapeDataSuccess(response.data.data))
    })
    .catch((err) => {
      console.log('err', err);
    })
);

export default scrapeData;