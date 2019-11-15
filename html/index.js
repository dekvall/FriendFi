
//var div = document.getElementById('plot');

//document.getElementById("body").setAttribute("align", "center");

var width = 1000
var height = 700
var border = 3
var bordercolor = "black"

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
                   
var myimage = svg.append('image')
    .attr('xlink:href', 'https://i.imgur.com/LgaU8H8.png')
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
    .attr("cx", 30)
    .attr("cy", 30)
    .attr("r", 2)
    .style("fill", "red");