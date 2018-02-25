
import NewsCard from '../NewsCard/NewsCard';
import React from 'react';

class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = {news : null};
  }

  componentDidMount() {
    this.loadMoreNews();
  }




  loadMoreNews() {
    const news_url = 'http://' + window.location.hostname + ':3000' + '/news';
    const request = new Request(news_url,{method : 'GET'});

    fetch(request)
      .then(res => res.json())
      .then(fetched_news_list =>{
        this.setState({
          news : this.state.news ? this.state.news.concat(news) : news;
        });
      });
  }


  renderNews() {
      const news_card_list = this.state.news.map((one_news) => {
        return (
          <a className = 'list-group-item' key = {one_news.digest}  href = '#' >
            <NewsCard news = {one_news}/>
          </a>
          );
      });

      return( 
        <div className = "container-fluid">
          <div calssName = "list-group">
              {news_card_list}
          </div>
        </div>

      )

  }


  render() {
    if(this.state.news) {
      return(
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return(
        <div id = 'msg-app-loading'>
        Loading....
        </div>
      )
    }
  }
}

export default NewsPanel;