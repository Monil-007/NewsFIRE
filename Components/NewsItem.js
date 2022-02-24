import React from 'react';

const NewsItem = (props) => {
    let { title, desc, imageUrl, newsurl, author, time, source } = props;
    return (
        <div>
            <div class="card my-3" style={{ width: "18rem", border: "2px solid black" }}>
                <img src={imageUrl ? imageUrl : "N2.jpg"} class="card-img-top" alt={`Sorry, Image for this news is unavailable!!`} />
                <div class="card-body">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1 }}>
                        {source ? source : "unknown"}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    <h5 class="card-title">{title ? title : "Sorry,cant get title for this news"}</h5>
                    <p class="card-text">{desc ? desc : "Sorry,No Description available for this news!!"}</p>
                    <p class="card-text"><small class="text-primary" >Last updated by {author ? author : "unknown"} on {new Date(time).toUTCString()}</small></p>
                    <a href={newsurl ? newsurl : `https://www.cnbctv18.com/world/russia-ukraine-conflict-live-news-updates-nato-vladimir-putin-invasion-us-joe-biden-volodymyr-zelenskyy-ceasefire-12539382.htm`} target="_blank" class="btn btn-success">Detailed news</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
