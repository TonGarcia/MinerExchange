// Alerts & Notifications Helpers
if(!helper) var helper = {};
helper.alert = function(text, icon, colorType, from, align) {
    $.notify({
        icon: icon,
        message: text

    }, {
        type: colorType,
        timer: 4000,
        placement: {
            from: from,
            align: align
        }
    });
};