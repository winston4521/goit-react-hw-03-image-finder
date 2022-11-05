import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '30083810-63203e9bcf6a2f8640f3d2d22';

export const ApiFetch = (searchQuery, page) => {
  return axios.get(
    `${URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
