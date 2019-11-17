
var liveData;

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



var width = 1000
var height = 600
var border = 3
var bordercolor = "black"

// var reader = new FileReader();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
                   
var myimage = svg.append('image')
    .attr('xlink:href', 'https://i.imgur.com/368Jy2g.jpg')
    .attr('width', width)
    .attr('height', height)

var borderPath = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);



var circle = svg.append("circle")
    .attr("class","point")
    .attr("cx", 10)
    .attr("cy", 20)
    .attr("r", 2)
    .style("fill", "red");

    svg.selectAll("point").remove()
// function updateData() {


var myVar = setInterval(updateData, 1000);

var theta = -27 * 0.0174532925 // 30 degrees
//updateData()
function updateData() {
    
    
    $.get("http://192.168.1.152/data_feed", function(data){
        //console.log("hejhopp");
        liveData = JSON.parse(data)


        
        svg.selectAll(".point").remove()
        var i = 0;
        for (i = 0; i < liveData.length; i++) {
            if (liveData[i].floor == 1){
                // console.log(liveData[i].latitude)
                // console.log(liveData[i].longitude)
                // console.log(liveData[i].x)
                // console.log(liveData[i].y)
                c = "red"
                //if (liveData[i].tracked == "1"){
                //    c = "blue"
                //}
                var circle = svg.append("circle")
                    .attr("class","point")
                    .attr("cx", (liveData[i].x * Math.cos(theta) + liveData[i].y * Math.sin(theta))*2 - 10)
                    .attr("cy", (-liveData[i].x * Math.sin(theta) + liveData[i].y * Math.cos(theta))*1-55)
                    .attr("r", 2)
                    .style("fill", c);
            }
        }
        
    });

    d3.selectAll(".compass").remove()
    //d3.selectAll(".arrowline").remove();
    //d3.selectAll(".arrCirk").remove();

    draw_compass(50)
    $.get("http://192.168.1.152/flask/compass", function(data){
        draw_compass(data)
    });
}



    
