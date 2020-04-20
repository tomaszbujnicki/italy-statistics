const toolip = document.createElement("div")
toolip.className = "map-tooltip"
document.body.appendChild(toolip)

const markerList = document.querySelectorAll(".land")
markerList.forEach(marker => {
    let GDP = marker.dataset.gdp;
    population = marker.dataset.population;
    marker.addEventListener("mouseover", (ev)=>{
        toolip.innerHTML=`  <h2 class="map-tooltip__h2">${marker.getAttribute("title")}</h2>
                            <div class="map-tooltip__flex"><span class="map-tooltip__label">Population: </span>${population}</div>
                            <div class="map-tooltip__flex"><span class="map-tooltip__label">GDP per capita: </span>€ ${GDP}</div>`
    })
    marker.addEventListener("mousemove", (ev)=>{
        toolip.style=`left: ${ev.clientX+30}px; top: ${ev.clientY-30}px;display:block`
    })
    marker.addEventListener("mouseout", (ev)=>{
        toolip.style=`display:none`
    })
    marker.style = "fill:"+ getColor(getGDPLevel(GDP))
})

function getColor(level) {
    
    return  level == 0 ? "#eacc00" :
            level == 1 ? "#eaee55" :
            level == 2 ? "#eaff87" :
            level == 3 ? "rgb(100, 200, 0)" :
            level == 4 ? "rgb(60, 160, 0)" :
            level == 5 ? "rgb(40, 110, 0)" :
            level == 6 ? "rgb(0, 70, 0)" :
                         "gray"
}

function getGDPLevel(GDP) {
    
    GDP = parseInt(GDP.replace(",", ""))

    if (GDP >= 38000) return 6;
    if (GDP >= 35000) return 5;
    if (GDP >= 32000) return 4;
	if (GDP >= 29000) return 3;
    if (GDP >= 24000) return 2;
    if (GDP >= 20000) return 1;
                      return 0;
}