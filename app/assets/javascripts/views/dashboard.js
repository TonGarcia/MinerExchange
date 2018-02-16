demo['initVectorMap'] = function() {
    $('#worldMap').vectorMap({
        map: 'world_mill_en',
        backgroundColor: "transparent",
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#e4e4e4',
                "fill-opacity": 0.9,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 0
            }
        },

        series: {
            regions: [{
                values: mapData,
                scale: ["#00a7c8","#00dff7"], //scale: ["#AAAAAA","#444444"],
                normalizeFunction: 'polynomial'
            }]
        }
    });
};