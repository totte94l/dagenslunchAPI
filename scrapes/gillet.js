const axios = require('axios').default;
const $ = require('cheerio');

module.exports = {
    getMenu: function() {
        return axios
        .get('https://gillet6.se/brasseriet/')
        .then(function(html) {
            let gillet = []

            let menuItems = $('.en_dag', html.data)

            for(let i = 0; i < menuItems.length; i++) {
                let day = $('h4', menuItems[i]).text();
                let items = $('p', menuItems[i]).text();
                
                gillet.push({
                    day: day,
                    items: items
                })
            }
            
            return gillet;
        })
    }
}
