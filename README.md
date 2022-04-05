# Getting Started



# Structure

Let's run through the folders:

```
public
src
└── lib
└── pages
└── views
└── app.js
└── constants.js
index.html
```

- `public` this contains the static files that can be used by `index.html` file
- `src` this contains all of the JavaScript code
  - `lib` this folder provides utility functions.
  - `pages` this folder contains functions that handle user interactions. You can also see it as the code that processes and updates the data or DOM
    it also contains code that links up the handler code to the DOM.
  - `views` this contains code to define what the DOM will look like. They will create the DOM element and give it back.
  - `app.js` this file is the initialisation code.
  
# Goal

- [x] (must have) The app shows the most popular cryptocurrencies’ name, price, BTC rank, market cap, volume 24h, change 30m, change 1h, change 6h, change 12h, change 24h, change 7d, change 30d, change 1y, ath price, ath price percentage. For now, I am planning to show 9 currencies.
- [x] (must have) A user can click a cryptocurrency to look for details in another webpage 
- [x] (must have) In the navbar, the app shows 5 of the currencies with only the prices(USD). They are going to refresh every 30 seconds.
- [x] (must have) Besides the coins in the navbar, the user can see the last update time (UTC or local).
- [ ] (should have) When the user clicks the currency on the table, he/she can see the graphics of that coin. By default, it is going to show 1d change. With the 6h, 12h, 24h, 7d, 30d, 1y choices the user can see the graphics of that period.
- [ ] (should have) Crypto Exchange
- [ ] (should have) Price alert
- [ ] (should have) Showing currency more than 9
- [ ] (could have) Search function for currencies other than already shown
