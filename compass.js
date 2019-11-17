 
 var list = []

function draw_compass( angle) {
    var rad = angle * 0.0174532925
    var w = 100;
    var h = 100;
    var c = "#b20000";
    var svg = d3.select("#compassWrapper")
        .append("svg")
        .attr("class","compass")
        .attr("width", w)
        .attr("height", h);


    var circle = svg.append("circle")
        .attr("class","arrCirk")
        .attr("cx", 50)
        .attr("cy", 50)
        .attr("r", 48)
        .style("stroke", "#000066")
        .style("stroke-width", 3)
        .style("fill", "white");
    
    var line = svg.append("line")
        .attr("class","arrowline")
        .attr("x1", 50 + 42 * Math.cos(rad))
        .attr("y1", 50 + 42 * Math.sin(rad))
        .attr("x2", 50 - 44 * Math.cos(rad))
        .attr("y2", 50 - 44 * Math.sin(rad))          
        .attr("stroke-width", 1)
        .attr("stroke", c)
        .attr("marker-end", "url(#triangle)");

    var mark = svg.append("svg:defs").append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", c);
    return svg;
}

function rem_compass(svg) {
    console.log("remove")
    svg.selectAll(".arrowline").remove();
    svg.selectAll(".arrCirk").remove();
    // svg.selectAll("svg:defs").remove();
}




//var svg = draw_compass(165)

// intId = setInterval(function(){rotatearrow(svg)}, 500);

//rem_compass(svg)
//console.log(svg)
function rotatearrow(svg){
    //console.log(svg)
    // d3.selectAll(".compass").remove()
    //d3.selectAll(".arrowline").remove();
    //d3.selectAll(".arrCirk").remove();

    draw_compass(50)
    $.get("http://130.233.85.210/flask/compass", function(data){
        draw_compass(data)
    });
    
    
}


