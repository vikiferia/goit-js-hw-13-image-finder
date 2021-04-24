
import ImageApiService from './fetchAPI.js';
import photoCard  from '../templates/photo.hbs';

import { onOpenModal } from './modal';

const formSearch = document.querySelector('#search-form');
const imageContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const noResult = document.querySelector('.no-result');

formSearch.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
imageContainer.addEventListener('click', onOpenModal);

const imageApiService = new ImageApiService();

async function onSearch(event) {
  event.preventDefault();

  try {
    noResult.classList.add('is-hidden');
    const inputSearch = event.currentTarget.elements.query.value;
    imageApiService.query = inputSearch;

    loadMoreBtn.classList.add('is-hidden');

    imageApiService.resetPage();
    clearImageContainer();
    const response = await imageApiService.fetchImages();

    if (response.length === 0) {
      noResult.classList.remove('is-hidden');
    } else if (response.length > 0) {
      appendImageMarkup(response);
      loadMoreBtn.classList.remove('is-hidden');
    }
    if (response.length < 12) {
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log('Ошибка');
  }
}

async function onLoadMore() {
  try {
    const response = await imageApiService.fetchImages();
    console.log(response);

    appendImageMarkup(response);
    
  } catch (error) {
    console.log('Ошибка');
  }
}

function appendImageMarkup(articles) {
  imageContainer.insertAdjacentHTML('beforeend', photoCard(articles));
}

function clearImageContainer() {
  imageContainer.innerHTML = '';
}

