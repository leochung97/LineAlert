const rawTSData = require("./trainstation_info.json");

const trainnameparser = () => {
    let TSData = [];
    let TSDataArr = Object.values(rawTSData);
    TSDataArr.map((station) => {
        if (station.borough === "M") {
            TSData.push(station.stop_name)
        }
    } )
    return TSData
}

console.dir(trainnameparser(), {depth: null, colors: true, maxArrayLength: null});