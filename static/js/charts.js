function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    let allSamples = data.samples;
    //console.log(allSamples);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let selectedSamples = allSamples.filter(sampleObj => sampleObj.id == sample);
    //console.log(selectedSamples);
    //  5. Create a variable that holds the first sample in the array.\
    let selectedSample = selectedSamples[0];

    // // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = selectedSample.otu_ids;
    let sample_values = selectedSample.sample_values;
    let otu_labels = selectedSample.otu_labels;
    
    // // 7. Create the yticks for the bar chart.
    // // Hint: Get the the top 10 otu_ids and map them in descending order  
    // //  so the otu_ids with the most bacteria are last.
    let otuIds = selectedSample.otu_ids.slice(0,10).reverse();
    let otuLabels = selectedSample.otu_labels.slice(0,10).reverse();
    let sampleValues = selectedSample.sample_values.slice(0,10).reverse();

    // //let yticks = 

    // // 8. Create the trace for the bar chart. 
    let Trace = {
      x: sampleValues,
      y: otuIds.map(otuId => "OTU " + otuId + " "),
      type: "bar",
      orientation: "h",
      text: otuLabels
    };
    let barData = [Trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Values"},
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar",barData,barLayout);

    // 1. Create the trace for the bubble chart.
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker:{
        size: sample_values,
        color: otu_ids,
        colorscale: "Electric"
      }
    };
    let bubbleData = [bubbleTrace];

    // 2. Create the layout for the bubble chart.
    let bubbleLayout = {
      hovermode: 'closest',
      title: "Bacteria Cultures per Sample",
      xaxis: {title: "OTU ID"},
      margin: {t:30}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble",bubbleData,bubbleLayout);

    // Initial steps for Gauge Chart

    // 1. Create a variable that filters the metadata array for 
    //the object with the desired sample number.
    let metadataSamples = data.metadata;

    // 2. Create a variable that holds the first sample in the metadata array.
    let metadataSample = metadataSamples.filter(sampleObj => sampleObj.id == sample)
    
    // 3. Create a variable that holds washing frequency
    let wFrequency = metadataSample[0].wfreq;

    // 4. Create the trace for the gauge chart.
    let gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wFrequency,
      title: "Belly Button Washing Frequency<br><span style='font-size:0.75em'>Scrubs per Week</span>",
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { visible: true, range: [0, 10], dtick: '2' },
        bar: {color: "black"},
        steps: [
          {range: [0, 2], color: "red"},
          {range: [2, 4], color: "orange"},
          {range: [4, 6], color: "yellow"},
          {range: [6, 8], color: "#7fff00"},
          {range: [8, 10], color: "green"}
        ]
    
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    let gaugeLayout = { 
      width: 400,
      height: 325,
      margin: { t: 80, r: 40, l: 50, b: 25 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);
  });
};
