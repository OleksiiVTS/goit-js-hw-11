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
        console.log("value = 0")
        return
    } else ctartSearch()

};

async function loadMore() {
    newAPI.incrementPage()
    console.log(newAPI.getPage())
    await newAPI.getReqest()
        .then(data => {
            
            newMarkup.dataMarkup = data
            newMarkup.getNewsList()
        })
        .catch(Error)
};

async function ctartSearch(){
    clear();
    
    await newAPI.getReqest()
        .then(data => {
            newMarkup.dataMarkup = data
            newMarkup.getNewsList()
            checkLoadMoreButton()
        })
        .catch(Error)
};


function checkLoadMoreButton() {
    if (newAPI.getPage() !== 1) {
        loadMoreButton.classList.remove("hidden");
    } else if (loadMoreButton.classList.contains("hidden")) {
        return
    } else loadMoreButton.classList.add("hidden");
    
};

function clear() {
    console.log("clear");
    checkLoadMoreButton();
    newMarkup.clearNewsList();
    newAPI.resetPage();
    newAPI.dataForAPI = dataInput.value;
}