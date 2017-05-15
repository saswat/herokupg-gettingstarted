const cool = require('cool-ascii-faces');
const express = require('express');
const pg = require('pg');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(`${__dirname}/public`));

// views is directory for all template files
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/cool', (request, response) => {
  response.send(cool());
});

app.get('/db', (request, response) => {
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    client.query('SELECT * FROM test_table', (err2, result) => {
      done();
      if (err2) {
        console.error(err); response.send(`Error ${err}`);
      } else {
        response.render('pages/db', { results: result.rows });
      }
    });
  });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
