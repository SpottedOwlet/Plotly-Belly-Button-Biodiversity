<h2> <p align=center>Plotly-Belly-Button-Biodiversity </p></h2>

<h3><p> Background & Purpose: </p></h3>

This project is based on exploration and documentation of bacterial species found in human belly buttons. The main motive behind this study is to look for the bacterial species that has an ability to synthesize protein to taste like beef. The dashboard is built to visualize and analyze the data for each belly button sample.

<h3><p> Resources: </p></h3>

Data Source: samples.json

Software: javascript, HTML, CSS, CSS-Bootstrap

<h3><p> Analysis Overview: </p></h3>

The data from multiple samples has been collected into samples.json file. All the data is stored in the form of arrays of dictionaries. The javascript is used along with html to extract the data and display it in the form of a dashboard. All the sample ids are populated in the form of a dropdown menu at the top of the webpage. Then, the data for each selected belly button sample is extracted from the sample file and is passed into variables which in turn are used to make trace objects for horizontal bar chart, bubble chart & gauge chart.

<h3> Horizontal Bar Chart </h3>
 
The horizontal bar chart represents the top 10 strains of bacteria found in the respective samples. More information about the bacterial species being represented on the bar chart can be found on hovering on a bar in the bar chart.


<h3> Bubble Chart </h3>

Bubble chart represents the data of bacterial species and magnitude their presence in a different manner. The bigger the bubble for a specie, greater is the magnitude of it's presence in that sample and in turn in that belly button. Bubble also provides more information about the bacteria upon hovering on a bubble.


<h3> Gauge Chart </h3>

The data was also collected from the research participants for belly button washing frequency. This data is represented with the gauge chart on the dashboard.

<h2><p align = center> Results </p></h2>

<kbd> 
  <img width="674" alt="Screen Shot 2022-01-17 at 10 19 24 PM" src="https://user-images.githubusercontent.com/90424752/149882472-175e5531-439b-42f1-b1d3-3d9e5a82a81b.png">
  
</kbd>



