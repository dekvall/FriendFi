
//var div = document.getElementById('plot');
var jsondata = 
[
    {
        x:600,
        y:30
    },
    {
        x:20,
        y:30
    },
    {
        x:400,
        y:200
    },
    {
        x:300,
        y:90
    },
    {
        x:90,
        y:60
    },
    {
        x:150,
        y:450
    },
    {
        x:940,
        y:30
    },
    {
        x:60,
        y:60
    }

]

var liveData;

document.getElementById("heatmapContainerWrapper").setAttribute("align", "center");


var width = 1000
var height = 700
var border = 3
var bordercolor = "black"

// var reader = new FileReader();

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

// var circle = svg.append("circle")
//     .attr("cx", 30)
//     .attr("cy", 30)
//     .attr("r", 2)
//     .style("fill", "red");


// function updateData() {

//     // Get the data again
//     var newX = 200 
//     var newY = 200

//     // Select the section we want to apply our changes to
//     var svg = d3.select("body")

//     // Make the changes
//     svg.select("circle")   // change the line
//         .attr("cx", 100)
//         .attr("cy", 50)
//         .attr("r", 2)
//         .style("fill", "red");  



var heatmap = h337.create({
    container: document.getElementById('heatmapContainer'),
    maxOpacity: 0.5,
    radius: 50,
    blur: .90,
    width:width,
    height: height,
    align: "center",
    // backgroundColor with alpha so you can see through it
    backgroundColor: 'rgba(255, 255, 255, 0)'
});
var heatmapContainer = document.getElementById('heatmapContainerWrapper');

// var nuConfig = {
//     radius: 10,
//     maxOpacity: .5,
//     minOpacity: 0,
//     blur: .75
//   };

// heatmapInstance.configure(nuConfig);

for (i = 0; i < jsondata.length; i++) {
    heatmap.addData({ x: jsondata[i].x, y: jsondata[i].y, value: 1 });
  }

//heatmap.addData({ x: 100, y: 301, value: 1 });
//heatmap.addData({ x: 120, y: 301, value: 1 });
//heatmap.addData({ x: 130, y: 301, value: 1 });
//heatmap.addData({ x: 140, y: 301, value: 1 });
//heatmap.addData({ x: 150, y: 301, value: 1 });
//heatmap.addData({ x: 160, y: 301, value: 1 });
//heatmap.addData({ x: 170, y: 301, value: 1 });
//heatmap.addData({ x: 180, y: 301, value: 1 });
//heatmap.addData({ x: 200, y: 301, value: 1 });
//heatmap.addData({ x: 210, y: 301, value: 1 });
//
//heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
//    // we need preventDefault for the touchmove
//    e.preventDefault();
//    var x = e.layerX;
//    var y = e.layerY;
//    if (e.touches) {
//    x = e.touches[0].pageX;
//    y = e.touches[0].pageY;
//    console.log(x)
//    }
//    
//    heatmap.addData({ x: x, y: y, value: 1 });
//};
//heatmapContainer.onclick = function(e) {
//    var x = e.layerX;
//    var y = e.layerY;
//    heatmap.addData({ x: x, y: y, value: 1 });
//};
    
$.get("/data_feed", function(data){
    //console.log("hej");
    console.log(data.length)
    liveData = JSON.parse(data)

    var i = 0;
    for (i = 0; i < liveData.length; i++) {
        heatmap.addData({ x: liveData[i].x, y: liveData[i].y, value: 1 });
    }
    heatmap.repaint()
});
    
