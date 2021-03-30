const axios = require('axios').default;
const $ = require('cheerio');

module.exports = {
    getMenu: function() {
        return axios
        .get('https://lillagömman.se/lunchbuffe/')
        .then(function(html) {
            let lillagomman = []

            let dayItems = $('.lunch-day-content', html.data)
            let dayNames = $('.menu_header', html.data); 

            for(let i = 0; i < dayNames.length; i++) {
                let day = $('h3', dayNames[i]).text();
                let items = $('.td_title', dayItems[i]).text();
                
                lillagomman.push({
                    day: day,
                    items: items
                })
            }
            
            return lillagomman;
        })
    }
}
