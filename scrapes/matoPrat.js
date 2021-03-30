const axios = require('axios').default;
const $ = require('cheerio');

module.exports = {
    getMenu: function() {
        return axios
            .get('http://www.matoprat.nu/veckans-lunch')
            .then(function(html) {
                let matOprat = [];
                let days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

                for(let i = 0; i < 5; i++) {
                    matOprat.push({
                        day: days[i],
                        items: [
                            $(`.panel-widget-style-for-8-0-${i}-0 p:nth-of-type(1)`, html.data).text(),
                            $(`.panel-widget-style-for-8-0-${i}-0 p:nth-of-type(2)`, html.data).text()
                        ]
                    })
                }
                //console.log(matOprat);
                return matOprat;
            })
    } 
}