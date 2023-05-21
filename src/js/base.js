import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import API from './search';
import Markup from './markup';
const newAPI = new API();
const newMarkup = new Markup();

const form = document.getElementById("search-form");
const dataInput = form.elements.searchQuery;
form.addEventListener("submit", clickSearch);

const loadMoreButton = document.querySelector(".load-more");
loadMoreButton.addEventListener("click", loadMore);

function clickSearch(event) {
    event.preventDefault();
    const value = dataInput.value; 
    if (value === "") {
        clear();
        newAPI.messageEmptyRecvest()
        return
    } else startSearch()
};

async function loadMore() {
    await newAPI.getReqest()
        .then(data => markupCallFunction(data))
        .catch(Error);
        slowScroll();
};

async function startSearch(){
    clear();
    await newAPI.getReqest()
        .then(data => markupCallFunction(data))
        .catch(Error);
};

function markupCallFunction (data) {
    newMarkup.dataMarkup = data;
    newMarkup.getNewsList();
    checkLoadMoreButton();
    new SimpleLightbox('.gallery a', { 
        /* options */ 
        captionsData:'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
    var gallery = $('.gallery a').SimpleLightbox();
    gallery.refresh();
}

function checkLoadMoreButton() {
    if (newAPI.getPage() !== 1) {
        loadMoreButton.classList.remove("hidden");
    } else if (loadMoreButton.classList.contains("hidden")) {
        return
    } else loadMoreButton.classList.add("hidden");
};

function clear() {
    newMarkup.clearNewsList();
    newAPI.resetPage();
    newAPI.dataForAPI = dataInput.value;
    checkLoadMoreButton();
}

function slowScroll() {
    const dir = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    const { height: cardHeight } = dir;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}