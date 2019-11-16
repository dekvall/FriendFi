
//var div = document.getElementById('plot');

//document.getElementById("body").setAttribute("align", "center");

var width = 1000
var height = 700
var border = 3
var bordercolor = "black"

var reader = new FileReader();

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


function updateData() {

    // Get the data again
    var newX = 200 
    var newY = 200

    // Select the section we want to apply our changes to
    var svg = d3.select("body")

    // Make the changes
    svg.select("circle")   // change the line
        .attr("cx", 100)
        .attr("cy", 50)
        .attr("r", 2)
        .style("fill", "red");  



    };

//var t=setInterval(updateData,1000);

let socket = new WebSocket("ws://10.84.112.51:5000");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is hakker Erik");
};

socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };