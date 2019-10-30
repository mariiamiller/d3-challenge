// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare"

// function used for updating x-scale var upon click on axis label
function xScale(healthData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.8,
      d3.max(healthData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

  // function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  // function renderText(circlesText, newXScale, chosenXaxis) {

  //   circlesText.transition()
  //     .duration(1000)
  //     .attr("dx", d => newXScale(d[chosenXAxis]));
  
  //   return circlesText;
  // }

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "poverty") {
      var label = "Poverty (%):";
    }
    else if (chosenXAxis === "age") {
      var label = "Age (Median):";
    }
    else {
        var label = "Household Income (Median):"
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

  
    return circlesGroup;
  }
  
// function used for updating y-scale var upon click on axis label
function yScale(healthData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d[chosenYAxis]) * 0.8,
      d3.max(healthData, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);

  return yLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
//??????????????????????
//   // function used for updating circles group with a transition to
// // new circles
function renderYCircles(circlesGroup, newYScale, chosenYaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }
  function renderYText(circlesText, newYScale, chosenYaxis) {

    circlesText.transition()
      .duration(1000)
      .attr("dy", d => newYScale(d[chosenYAxis]));
  
    return circlesText;
  }
//????????????????????????????????????????????
// function used for updating circles group with new tooltip
function updateToolTipY(chosenYAxis, circlesGroup) {

    if (chosenYAxis === "healthcare") {
      var label = "Lacks Healthcare (%):";
    }
    else if (chosenYAxis === "smokes") {
      var label = "Smokes (%):";
    }
    else {
        var label = "Obese: (%):"
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>${label} ${d[chosenYAxis]}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }
  




  // Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(err, healthData) {
//).then(function(healthData) {
//, function(err, healthData) {
    if (err) throw err;
    console.log(healthData);
    function getAbbr(item) {
      return item.abbr; 
    }
    console.log(healthData.map(getAbbr));
    // parse data
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income = +data.income;
      data.obesity = +data.obesity;
      data.smokes = +data.smokes;
      data.healthcare = +data.healthcare;
    });
  
    // xLinearScale function above csv import
    var xLinearScale = xScale(healthData, chosenXAxis);
  
    // Create y scale function
    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(healthData, d => d.healthcare)])
    //   .range([height, 0]);

    var yLinearScale = yScale(healthData, chosenYAxis);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // append y axis
    var yAxis = chartGroup.append("g")

    //???????????????????????

    .classed("y-axis", true)
    //.attr("transform", `translate(0, ${width})`)
    .call(leftAxis);

  
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append("circle")
      
      .attr("cx", d => xLinearScale(d[chosenXAxis]))

      //???????????????????
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("r", 15)
      .attr("stroke","black")
      .attr("fill", "grey")
      .attr("opacity", ".6");

      //???????????????????????LABELS - SHOWS ALL BUT DOESNT MOVE
      // .select("text")
      // .data(healthData)
      // .enter()
      // .append("text")
      // .text(data => data.abbr)
      // .attr("class", "stateText")
      // .attr("dx", d => xLinearScale(d[chosenXAxis]))
      // .attr("dy", d => yLinearScale(d[chosenYAxis]));

      //???????????????????????LABELS-SHOWS ONLY HALF
      // var circlesText = chartGroup.selectAll("text")
      // .data(healthData)
      // .enter()
      // .append("text")
      // .text(data => data.abbr)
      // .attr('font-size',8)
      // .attr("dx", d => xLinearScale(d[chosenXAxis])-5)
      // .attr("dy", d => yLinearScale(d[chosenYAxis])+2);

  
    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width /2}, ${height + 20})`);
  
    var povertyLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("Poverty (%)");
  
    var ageLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age") // value to grab for event listener
      .classed("inactive", true)
      .text("Age (Median)");


    var incomeLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "income") // value to grab for event listener
      .classed("inactive", true)
      .text("Household Income (Median)");

  
    // // append y axis
    // chartGroup.append("text")
    //   .attr("transform", "rotate(-90)")
      // .attr("y", 0 - margin.left)
      // .attr("x", 0 - (height / 2))
    //   .attr("dy", "1em")
    //   .classed("axis-text", true)
    //   .text("Lacks Healthcare (%)");

    // Create group for  2 y- axis labels
    var labelsGroupY = chartGroup.append("g")
      // .attr("transform", `translate(${width /2}, ${height + 20})`);
      .attr("transform", "rotate(-90)")

  
    var healthcareLabel = labelsGroupY.append("text")
    //.attr("y", 0 - margin.left)?????????????????
    .attr("y",0-40)
    .attr("dy", "1em")

    .attr("x", 0 - (height / 2))
      .attr("value", "healthcare") // value to grab for event listener
      .classed("active", true)
      .text("Lacks Healthcare (%)");
  
    var smokesLabel = labelsGroupY.append("text")
    //.attr("y", 0 - margin.left)
    .attr("y",0-60)
    .attr("dy", "1em")
    .attr("x", 0 - (height / 2))
      .attr("value", "smokes") // value to grab for event listener
      .classed("inactive", true)
      .text("Smokes (%)");


    var obesityLabel = labelsGroupY.append("text")
   // .attr("y", 0 - margin.left)
   .attr("y",0-80)
   .attr("dy", "1em")
    .attr("x", 0 - (height / 2))
      .attr("value", "obesity") // value to grab for event listener
      .classed("inactive", true)
      .text("Obese (%)");

  
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
//??????????????????? for y
    // // updateToolTip function above csv import
    // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
    labelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
  
          // replaces chosenXAxis with value
          chosenXAxis = value;
  
          console.log(chosenXAxis)
  
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(healthData, chosenXAxis);
  
          // updates x axis with transition
          xAxis = renderAxes(xLinearScale, xAxis);
  
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
          //circlesText = renderText(circlesText, xLinearScale, chosenXAxis);
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
          // changes classes to change bold text
          if (chosenXAxis === "poverty") {
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);

          }
          else if (chosenXAxis === "age") {
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
          }
          else {
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", true)
            .classed("inactive", false); 

          }
        }
      });
      // y axis labels event listener
    labelsGroupY.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        console.log(chosenYAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(healthData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
        //circlesText = renderYText(circlesText, yLinearScale, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTipY(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "healthcare") {
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true);

        }
        else if (chosenYAxis === "smokes") {
          healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", true)
          .classed("inactive", false);
        obesityLabel
          .classed("active", false)
          .classed("inactive", true);
        }
        else {
          healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
          smokesLabel
          .classed("active", false)
          .classed("inactive", true);
        obesityLabel
          .classed("active", true)
          .classed("inactive", false); 

        }
      }
    });





  });
  