// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// app/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery
//= require jquery_ujs

// Frameworks
//= require creative-tim-pro/light_dashboard/jquery-ui.min
//= require creative-tim-pro/light_dashboard/bootstrap.min

// Add-ons
//= require creative-tim-pro/light_dashboard/jquery.validate.min
//= require creative-tim-pro/light_dashboard/moment.min
//= require creative-tim-pro/light_dashboard/bootstrap-datetimepicker
//= require creative-tim-pro/light_dashboard/bootstrap-selectpicker
//= require creative-tim-pro/light_dashboard/bootstrap-checkbox-radio-switch-tags
//= require creative-tim-pro/light_dashboard/chartist.min
//= require creative-tim-pro/light_dashboard/bootstrap-notify
//= require creative-tim-pro/light_dashboard/sweetalert2
//= require creative-tim-pro/light_dashboard/jquery-jvectormap
//= require creative-tim-pro/light_dashboard/jquery.bootstrap.wizard.min
//= require creative-tim-pro/light_dashboard/bootstrap-table
//= require creative-tim-pro/light_dashboard/jquery.datatables

// Theme
//= require creative-tim-pro/light_dashboard/light-bootstrap-dashboard
//= require creative-tim-pro/light_dashboard/demo
//TODO add the others js

// Custom System JS
//= require helpers/popups
//= require helpers/localize
//= require views/dashboard
//= require views/professionals
//= require views/connections

var colors = [
    'info',
    'success',
    'warning',
    'danger'
];

function setup() {
    window_width = $(window).width();
    $sidebar = $('.sidebar');

    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();

    if($('body').hasClass('sidebar-mini')){
        lbd.misc.sidebar_mini_active = true;
    }

    lbd.initSidebarsCheck();

    lbd.initMinimizeSidebar();

    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Init Collapse Areas
    lbd.initCollapseArea();

    // Init Tooltips
    $('[rel="tooltip"]').tooltip();

    // Init Tags Input
    var tagsInputClass = $(".tagsinput");
    if(tagsInputClass.length !== 0){
        tagsInputClass.tagsInput();
    }

    //  Init Bootstrap Select Picker
    var selectpicker = $(".selectpicker");
    if(selectpicker.length !== 0){
        selectpicker.selectpicker();
    }
}


$(document).ready(setup);
$(document).on('page:load', setup);
document.addEventListener('turbolinks:request-start', setup);
document.addEventListener('turbolinks:load', setup);