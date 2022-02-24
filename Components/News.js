
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import Spinnerr from './Spinner';
import PropTypes from 'prop-types';
//import InfiniteScroll from 'react-infinite-scroll-component';


const NewsComponent = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        console.log("Next button was clicked!!" + page);
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc&page=${page}&pageSize=${props.pageSize}`;
        //let url = 'https://newsapi.org/v2/everything?q=tesla&from=2022-01-18&sortBy=publishedAt&category={this.props.category}&category={this.props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc';
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40)
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, []);


    const handleNextClick = async function () {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
        //     alert("There are'nt any more latest news for now!!");
        // }
        // console.log("Next button was clicked!!" + this.state.page)
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category={this.props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // //let url = 'https://newsapi.org/v2/everything?q=tesla&from=2022-01-18&sortBy=publishedAt&category={this.props.category}&category={this.props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc';
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({

        //     articles: parsedData.articles,
        //     loading: false
        // })
        setPage(page + 1);
        updateNews();
    }
    const handlePrevClick = async function () {
        // console.log("Prev is clicked!!")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category={this.props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState(
        //     {
        //         page: this.state.page - 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     }
        // );
        setPage(page - 1);
        updateNews();
    }
    // fetchMoreData = async function () {

    // }

    const fetchMoreData = async () => {

        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc&page=${page}&pageSize=${props.pageSize}`;
        //let url = 'https://newsapi.org/v2/everything?q=tesla&from=2022-01-18&sortBy=publishedAt&category={this.props.category}&category={this.props.category}&apikey=ccf4a4692a654746a700d4e3af6628fc';
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
    return (
        <div>
            <div className='container my-3'>
                <div className='text-center' style={{ fontSize: "45px", color: "red" }} >Trending Hot News</div>
                {loading && <Spinnerr />}
                {/* <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinnerr />}
                > */}
                {
                    <div className='row'>
                        {articles.map((ele) => {
                            return (
                                <div className='col-md-4' key={ele.url}>
                                    <NewsItem title={ele.title} desc={ele.description} imageUrl={ele.urlToImage} newsurl={ele.url} author={ele.author} time={ele.publishedAt} source={ele.source.name} />
                                </div>);
                        })}
                    </div>
                }
                {/* </InfiniteScroll> */}

            </div>
            <div className='container d-flex justify-content-between'>
                <button type="button" disabled={page <= 1} className="bnt btn-secondary" onClick={handlePrevClick}>Previous</button>
                <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-secondary" onClick={handleNextClick}>Next</button>
            </div>
        </div >
    )
}


NewsComponent.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

NewsComponent.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}
export default NewsComponent
