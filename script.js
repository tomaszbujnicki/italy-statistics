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

const levelList = document.querySelectorAll(".my-legend ul.legend-labels li span");
levelList.forEach(level =>{
    level.addEventListener("mouseover", (ev)=>{
        level.closest("li").style="background-color: #222222; color:white"
        markerList.forEach(marker => {
            let GDP = marker.dataset.gdp;
            if (getGDPLevel(GDP) == level.getAttribute("value")) {
                marker.style.strokeWidth="4"
            }
        })
    })
    level.addEventListener("mouseout", (ev)=>{
        level.closest("li").style="background-color: white; color:#222222"
        markerList.forEach(marker => {
            let GDP = marker.dataset.gdp;
            if (getGDPLevel(GDP) == level.getAttribute("value")){
                marker.style.strokeWidth="1.5"
            }
        })
    })
})

function getColor(level) {
    
    return  level == 0 ? "url(#gradient0)":
            level == 1 ? "url(#gradient1)":
            level == 2 ? "url(#gradient2)":
            level == 3 ? "url(#gradient3)":
            level == 4 ? "url(#gradient4)":
            level == 5 ? "url(#gradient5)":
            level == 6 ? "url(#gradient6)":
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