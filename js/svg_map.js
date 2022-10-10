jQuery(function(){
            // The svg
            const width = window.innerWidth * 0.7;
            const height = window.innerHeight * 0.6;
            const svg = d3.select("svg");
    
            // Map and projection
            let projection
    
            // .scale(400) //scale：設定地圖縮放倍率
            // .translate([width / 4, height / 1.5]);
            let geoGenerator
    
            //d3.geoPath：將投影資料轉換為 path 的路徑
    
            let path
    
            d3.json("https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/taiwan.geojson"
            ).then(function (data) {
    
                projection = d3
                    .geoMercator()
                    .fitExtent([[0, 0], [width, height],], data)
                    //.scale(200) //scale：設定地圖縮放倍率
                    //.translate([width / 4, height/2]);
    
    
                geoGenerator = d3.geoPath().projection(projection);
    
                // Draw the map
                svg
                    .append("g")
                    .selectAll("path")
                    .data(data.features)
                    .enter()
                    .append('g')
                    .attr("class", function (d) { return d.properties.name; })    
                    .attr("data-city",function (d) { return d.properties.name;})   
                    .on("click",hadleMouseClick)            
                    .append("path")
                    .attr("fill", "#212026")
                    .attr("d", geoGenerator)
                    .style("stroke", "#fff")
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", function (d, i) {
                        d3.select(this).transition().duration(300).attr("fill", "#212026");
                        d3.selectAll("text")
                            .transition()
                            .delay(function (d, i) { return 100; })
                            .text("");
                    });
    
            });
    
    
            function handleMouseOver(e, d) {
                //let centroid = geoGenerator.centroid(d);
    
                // svg
                //     .append("text")
                //     .text(d.properties.name)
                //     .style("font-size", 30)
                //     .style("font-weight", "bold")
                //     .style("display", "inline")
                //     .attr("transform", "translate(" + centroid + ")")
                //     .style("fill", "black")
                //     .transition()
                //     .delay(function (d, i) { return 100; });
                //d3.select(this).style('scale','1.5')
    
                d3.select(this).transition().duration(300).attr("fill", "yellow");
            }

            function hadleMouseClick(e , d){    
                const CityName = d3.select(this).attr("data-city");            
                d3.select('#City_Wrap').style('display','flex')
            }
})