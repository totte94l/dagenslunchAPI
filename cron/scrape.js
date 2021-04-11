require('dotenv').config()

// Restauranger
const lillaGomman = require('../scrapes/lillaGomman')
const matoPrat = require ('../scrapes/matoPrat')
const gillet = require('../scrapes/gillet')

var cron = require('node-cron')
var db = require('../lib/db')


// Körs varje timme
// cron.schedule('0 0 */1 * * *', () => {

/* 
    Detta är väl ingen toppenlösning, går att köra när det inte är allt för många
    restauranger. Måste göras om när hjärnan funkar.
 */

// Cronjobb som körs var 10'e sekund
cron.schedule('*/10 * * * * *', () => {
    db.getConnection((err, conn) => {
        gillet.getMenu().then((menu) => {
            // Clears table before we update it because data may differ
            conn.query('DELETE FROM gillet', () => {
                console.log("hej");
                menu.forEach((e, i) => {
                    try {
                        conn.query(`INSERT INTO gillet (day, item) VALUES ('${e.day}', '${e.items}')`, () => {
                            console.log('%cAdded entrys to gillet', "color: red");
    
                            // När alla rätter blivit inlagda lägger vi tillbaka DB-kopplingen
                            // i poolen.
                            if(i == menu.length-1) {
                                console.log(menu.length + " == " + i);
                                conn.release();
                            }
                        })
    
                    } catch(e) {
                        console.log("BAJS!" + e);
                    }
                })
            });
        })

        matoPrat.getMenu().then((menu) => {
            // Clears table before we update it because data may differ
            conn.query('DELETE FROM matoprat', () => {
                menu.forEach((e, i) => {
                    try {
                        conn.query(`INSERT INTO matoprat (day, item) VALUES ('${e.day}', '${e.items}')`, () => {
                            console.log('Added entrys to matoprat');
    
                            if(i == menu.length-1) {
                                console.log(menu.length + " == " + i);
                                conn.release();
                            }
                        })
    
                    } catch(e) {
                        console.log("BAJS!" + e);
                    }
                })
            });
        })

        lillaGomman.getMenu().then((menu) => {
            // Clears table before we update it because data may differ
            conn.query('DELETE FROM lillagomman', () => {
                menu.forEach((e, i) => {
                    try {
                        conn.query(`INSERT INTO lillagomman (day, item) VALUES ('${e.day}', '${e.items}')`, () => {
                            console.log('Added entrys to lillagomman');
    
                            if(i == menu.length-1) {
                                console.log(menu.length + " == " + i);
                                conn.release();
                            }
                        })
    
                    } catch(e) {
                        console.log("BAJS!" + e);
                    }
                })
            });
        })
    })
});

module.exports = cron;