// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
const proReady = function() {
    if(location.href.indexOf('professionals') < 0) return;

    $('input, textarea').keyup(function(event){
        // Get the input value
        const input = $(event.target);
        const value = input.val();

        // if(!value) return;

        // Get the input target (model object attr)
        const name = input.attr('name');
        const attr = name.match(/\[(.*)\]/)[1];

        // Set it filled value to the view element
        $('#'+attr).html(value);
    });
};

$(document).ready(proReady);
$(document).on('page:load', proReady);