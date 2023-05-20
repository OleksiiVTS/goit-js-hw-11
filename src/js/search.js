import axios from "axios";

const API_KEY = "36502661-e8ee83efff2e99e0261d33261";
const URL = "https://pixabay.com/api/";
const quantityPage = 10;

const options = new URLSearchParams({
    per_page: quantityPage,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
}).toString() 


export default class API {
    constructor() {
       this.page = 1;
       this.dataForAPI = "";
    }

    async getReqest() {
        const {data} = await axios.get(`${URL}?key=${API_KEY}&q=${this.dataForAPI}&page=${this.page}&${options}`)
        // console.log(data.hits.length)
        if (data.hits.length >= quantityPage) {
            this.incrementPage();
        } 
        return data.hits
    }

    getPage(){
        return this.page;
    }

    resetPage() {
        this.page = 1;
    }
    
    incrementPage() {
        this.page += 1;
    }

};
