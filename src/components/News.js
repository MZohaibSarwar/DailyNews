import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country:"us",
    category: "sports",
    pageSize: 6
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  }
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
        constructor(props){
            super(props);
            this.state = {
                articles: [],
                loading: false,
                page: 1,
                totalResults: 0,
            }
            document.title = `DailyNews - ${this.capitalizeFirstLetter(this.props.category)}`;
        }

       async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(35);
        let parsData = await data.json();
        this.props.setProgress(75);
        this.setState({articles: parsData.articles, totalResults: parsData.totalResults, loading:false});
        this.props.setProgress(100);
       } 

       async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01549bfd1c49415690876592c5a33352&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsData = await data.json();
        // this.setState({articles: parsData.articles, totalResults: parsData.totalResults, loading:false})
        this.updateNews();
       }

       prevHandeler =async ()=>{
        // console.log("prev")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01549bfd1c49415690876592c5a33352&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsData = await data.json();
        // this.setState({
        //   page: this.state.page - 1,
        //   articles:parsData.articles,
        //   loading:false
        // });

        this.setState({page: this.state.page - 1,})
        this.updateNews();
       }
       nextHandeler = async()=>{
        // console.log("next")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01549bfd1c49415690876592c5a33352&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsData = await data.json();
        // this.setState({
        //   page: this.state.page + 1,
        //   articles:parsData.articles,
        //   loading:false
        // });

        this.setState({page: this.state.page + 1,})
        this.updateNews();
       }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='mb-2'>DailyNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                    return  <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem 
                    title={element.title} 
                    description={element.description} 
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />
                    </div>
                })
            }
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-secondary" onClick={this.prevHandeler}>&larr; Previous</button>
        <button disabled={this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-secondary" onClick={this.nextHandeler}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
