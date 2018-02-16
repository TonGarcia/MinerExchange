$(document).on('turbolinks:load', function() {
    var flags = $('.flag');
    for(var f in flags) {
        if(isNaN(f)) break;
        var flag = $(flags[f]);
        const classes = /\s[a-z][a-z]/.exec(flag.attr('class'));
        if(Array.isArray(classes)) {
            const country = classes[0].trim();
            flag.attr('onclick', 'localize("'+ country +'")');
        }
    }
});

function localize(country) {
    window.location.href = '/locale/change/' + country;
}