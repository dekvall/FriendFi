
var liveData;




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
    
    
    $.get("http://130.233.85.210/data_feed", function(data){
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

    //$.get("http://127.0.0.1:8080", function(data){
    //    console.log(data)
    //});
}



    
