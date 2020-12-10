var Handlebars = require('handlebars');

Handlebars.registerHelper('formatDate', function(dateString) {
    return new Handlebars.SafeString(
        moment(dateString).format("MMM DD, YYYY").toUpperCase()
    );
});