import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitaliseLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      // articles : this.articles,   ab av k liye hm in articles ko nhi use kr rhe blki componentDidMount se api se hi manga rhe isliye isko comment kr diya.
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitaliseLetter(this.props.category)}-NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log("parsed Data: ", parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews() 
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews() 
  };

  handleNextClick = async () => {
    // if (!(
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) ){
    this.setState({
      //club v kr skte the dono setState ko.
      page: this.state.page + 1,
    });
    this.updateNews() 
  };

  //line no 62-66 for handing search query and adding the search functionality.
  async componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      await this.updateNews();
    }
  }

  //  0587cabe379d4a5a9060fcba0379020a   --------> my api key

  fetchMoreData = async () => {
    this.setState({page: this.state.page+1})
    // page set kr diye ab hmlog updateNews wala jo functionCall function bnaye the usko yhan laayenge aur usme articles ko concatenatekr denge. 
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log("parsed Data: ", parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  // infinite scroll k just phle wala code h
  // render(){
  //   return (
  //     <div className="container my-3">
  //       <h1 className="text-center">NewsMonkey - Top {this.capitaliseLetter(this.props.category)} Headlines</h1>
  //       <div className = "text-center">{this.state.loading && <Spinner/>}</div>
  //       <div className="row">
  //         {!this.state.loading && this.state.articles.map((element) => {
  //           return (
  //             <div className="col-md-4" key={element.url}>
  //               <NewsItem
  //                 title={element.title ? element.title : ""}
  //                 description={element.description ? element.description : ""}
  //                 imageUrl={element.urlToImage}
  //                 newsUrl={element.url}
  //                 author={element.author}
  //                 publishedAt={element.publishedAt}
  //                 source = {element.source.name}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>

  //       <div className="container my-3 d-flex justify-content-between">
  //         <button
  //           disabled={this.state.page <= 1}
  //           type="button"
  //           className="btn btn-dark"
  //           onClick={this.handlePrevClick}
  //         > &larr; Previous</button>
  //         <button
  //           disabled={
  //             this.state.page + 1 >
  //             Math.ceil(this.state.totalResults / this.props.pageSize)
  //           }
  //           type="button"
  //           className="btn btn-dark"
  //           onClick={this.handleNextClick}
  //         >Next &rarr;</button>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <>
        <h2 className="text-center" style={{marginTop : '80px'}}>
          NewsMonkey - Top {this.capitaliseLetter(this.props.category)}{" "}
          Headlines
        </h2>
        <div className = "text-center">{this.state.loading && <Spinner/>}</div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* next aur prev ki to jrurat ni ab hme isliye comment. */}
        {/* <div className="container my-3 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
        </>
    );
  }
}
