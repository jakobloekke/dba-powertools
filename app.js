
/**
 * Module dependencies.
 */

var express = require('express')
  , nodeio = require('node.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes
app.get('/', function(req, res){
    res.sendfile("public/index.html");
});

app.get('/item/:keyword', function(req,res){
    var keyword = req.params.keyword,
        url = 'http://www.dba.dk/soeg/?soeg=' + keyword;

    nodeio.scrape(function() {
        this.getHtml(url, function(err, $) {

            var data = {
                    //listings: $('.listing'),
                    prices: []
                };

            // Extract all prices from search results
            $('td[title=Pris]').each(function(listing) {
                var raw_price = listing.text,
                    cleaned_price = parseFloat(raw_price.replace("Kr. ", "").replace(".", ""));

                data.prices.push(cleaned_price);
            });

            data.median_price = median(data.prices);
            data.average_price = average(data.prices);

            res.json(data);
        });
    });
});

function median(values) {
    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

function average(values) {
    var sum = 0;
    for(var i = 0; i < values.length; i++){
        sum += parseInt(values[i]);
    }

    return Math.floor(sum/values.length);
}






app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
