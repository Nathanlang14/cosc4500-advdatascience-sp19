/**
 * Liam Fruzyna
 * COSC 4500
 * Intro Tech Skills Demo
 * https://mail929.github.io/cosc4500-advdatascience-sp19/intro-techskills-demo/Fruzyna-Liam-005927138.html
 */

/**
 * 1. Using Javascript/D3, create 2 arrays of random, count data within the domain (1-10). Sample size of each array should be 10.
 */
var data1 = []
var data2 = []
for(var i = 0; i < 10; i++)
{
    data1.push(Math.floor(Math.random()*10+1))
    data2.push(Math.floor(Math.random()*10+1))
}

/**
 * 2. Calculate mean, median, mode, and standard deviation of each array and print them on the html with formatting.
 */
// returns the mode of a data set
function mode(data)
{
    var modeMap = []
    var max = data[0]
    var maxCount = 1
    for(var i = 0; i < data.length; i++)
    {
        var d = data[i]
        if(modeMap[d] == null)
        {
            modeMap[d] = 1
        }
        else
        {
            modeMap[d]++
        }
        if(modeMap[d] > maxCount)
        {
            max = d
            maxCount = modeMap[d]
        }
    }
    return max
}
// produces required data
labels = ["Data", "Mean", "Median", "Mode", "Standard Deviation"]
stats1 = [data1, d3.mean(data1), d3.median(data1), mode(data1), d3.deviation(data1)]
stats2 = [data2, d3.mean(data2), d3.median(data2), mode(data2), d3.deviation(data2)]

// displays required data
for(var i = 0; i < labels.length; i++)
{
    var row = d3.select("#mme").append("tr")
    row.append("th").text(labels[i])
    row.append("td").text(stats1[i])
    row.append("td").text(stats2[i])
    console.log(labels[i])
    console.log(stats1[i])
    console.log(stats2[i])
}

/**
 * 3. Use these 2 arrays to define a x-axis and y-axis.
 */
// defines bounds of chart
var margin = {top: 20, right: 15, bottom: 60, left: 60}
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom;

// defines data for chart
var x = d3.scaleLinear().domain([0, d3.max(data1)]).range([0, width])
var y = d3.scaleLinear().domain([0, d3.max(data2)]).range([height, 0])

// defines chart
var chart = d3.select("body").append("svg:svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom)
var main = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("width", width).attr("height", height).attr("class", "main")

// builds axes
var xAxis = d3.axisBottom(x)
main.append("g").attr("transform", "translate(0," + height + ")").attr("class", "main axis date").call(xAxis)
var yAxis = d3.axisLeft(y)
main.append("g").attr("transform", "translate(0,0)").attr("class", "main axis date").call(yAxis)

/**
 * 4. Build a svg-based scatterplot based on the random count data generated in 1.
 */
// combine data into an easier to use form
var data = new Array(10)
for(var i = 0; i < 10; i++)
{
    data[i] = [data1[i], data2[i]]
}

// plots points
var g = main.append("svg:g")
var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
var points = g.selectAll("scatter-dots").data(data).enter().append("svg:circle").attr("cx", function(d,i) {
    return x(d[0])
}).attr("cy", function(d) {
    return y(d[1])
}).attr("r", 8)

/**
 * 5. If I hover over any data point in said scatterplot, I should be able to see both data points.
 */
points.on("mouseover", function(d) {
    div.transition().duration(200).style("opacity", "0.9")
    div.html("(" + d[0] + "," + d[1] + ")")
}).on("mouseout", function(d) {
    div.transition().duration(500).style("opacity", 0)
})

/**
 * 6. Your axes should be named appropriately. Since it's random data, come up with the most innovative names that you can think of.
 */
main.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x))
main.append("text").attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")").style("text-anchor", "middle").text("\"Random\" Data 1")
main.append("g").call(d3.axisLeft(y))
main.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - (height/2)).attr("dy", "1em").style("text-anchor", "middle").text("\"Random\" Data 2")