const express = require('express');
const app = express();

app.use(express.urlencoded({ 
    extended: true 
}));

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/api'));

app.listen(8042);