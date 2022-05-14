class News {
  constructor(URI, refs) {
    this.URI = URI;
    this.refs = refs;
    this.totalPages = null;
    this.currentPage = 1;
    this.searchValue = null;
  }

  //стрелка, чтобы не менялся контекст вызова в коллбеке addEventListeners
  fetchNews = () => {
    const currentURI =
      this.URI + `&page=${this.currentPage}&q=${this.searchValue}`;
    fetch(currentURI, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.totalPages = Number(data.response.pages);
        this.generatePagination();
        this.generateMarkup(data.response.results);
      })
      .catch(this.errMarkup);
  };

  generateMarkup(newsArr) {
    console.log(newsArr);
    this.refs.list.innerHTML = "";
    const collectionNews = newsArr.map((item) => this.generateNewsItem(item));
    this.refs.list.append(...collectionNews);
  }

  generateNewsItem(item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const span = document.createElement("span");
    a.href = item.webUrl;
    a.target = "_blank";
    a.textContent = item.webTitle;
    span.textContent = item.webPublicationDate;
    li.append(a, span);
    return li;
  }

  generatePagination() {
    this.refs.input.value = this.currentPage;
    this.refs.span.innerText = " of " + (this.totalPages - 1);
  }

  errMarkup(error) {
    console.error(error);
  }

  parseURI() {}

  checkPageNumber(number) {
    return number > 0 && number < this.totalPages;
  }

  onPrevBtnClick = () => {
    if (this.checkPageNumber(this.currentPage - 1)) {
      this.currentPage -= 1;
      this.fetchNews();
    }
  };

  onNextBtnClick = () => {
    if (this.checkPageNumber(this.currentPage + 1)) {
      this.currentPage += 1;
      this.fetchNews();
    }
  };

  onInputChange = (evt) => {
    const inputNumber = Number(evt.target.value);
    if (this.checkPageNumber(inputNumber)) {
      this.currentPage = inputNumber;
      this.fetchNews();
    }
    evt.target.value = this.currentPage;
  };

  onSearch = (event) => {
    event.preventDefault();
    this.searchValue = event.target.elements.text.value.toLowerCase();
    this.fetchNews();
  };

  loadListeners() {
    window.addEventListener("load", this.fetchNews);
    this.refs.backBtn.addEventListener("click", this.onPrevBtnClick);
    this.refs.forwardBtn.addEventListener("click", this.onNextBtnClick);
    this.refs.input.addEventListener("input", this.onInputChange);
    //debounce needed
  }

  init() {
    this.loadListeners();
    // this.fetchNews();
  }
}

const API_KEY = "45b62a26-0cc6-454c-a13d-5073590b770b";
let URI = `https://content.guardianapis.com/search?&q=covid&api-key=${API_KEY}`;

const refs = {
  list: document.querySelector(".news-list"),
  input: document.querySelector(".page-num"),
  span: document.querySelector(".total-pages"),
  backBtn: document.querySelector(".back"),
  forwardBtn: document.querySelector(".fwd"),
};

new News(URI, refs).init();

// {response: {…}}response: currentPage: 2orderBy: "relevance"pageSize: 10pages: 5651results: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]startIndex: 11status: "ok"total: 56508userTier: "developer"[[Prototype]]: Object[[Prototype]]: Object
