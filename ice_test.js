// VERSION=3
// SAR data substitution for clouded Sentinel-2 images V1.0.0
// Twitter: Pierre Markuse (@pierre_markuse)
// CC BY 4.0 International - https://creativecommons.org/licenses/by/4.0/


function setup() {
    return {
	input: [
	    {
		datasource: "S2L1C",
		bands: ["B02", "B03", "B04", "B08"],
		units: ["REFLECTANCE", "REFLECTANCE", "REFLECTANCE","REFLECTANCE"],
		mosaicking: "ORBIT"
	    },
	    {
		datasource: "S1GRD",
		bands: ["VV", "VH"],
		units: ["LINEAR_POWER", "LINEAR_POWER"],
		mosaicking: "ORBIT"
	    },
	],
	output: [
	    { id: "default", bands: 3, sampleType: SampleType.AUTO }
	]
    }
}


function evaluatePixel(samples) {
    var S2L1C = samples.S2L1C[0];
    var S1GRD = samples.S1GRD[0];
    gain=2.5
    sar=toDb(S1GRD.VV)
    // [B08, B04, B03]
    
    
    return {
	//default: [S1.VV * 3.0, S1.VV * 1.1 + S1.VH * 8.75, S1.VH * 1.75]
	
	
	default: [gain*S2L1C.B08+sar, gain*S2L1C.B04+sar, gain*S2L1C.B03+sar]
    }
}

// visualizes decibels from -20 to 0
function toDb(linear) {
    // the following commented out lines are simplified below
    // var log = 10 * Math.log(linear) / Math.LN10
    // var val = Math.max(0, (log + 20) / 20)
    return Math.max(0, Math.log(linear) * 0.21714724095 + 1)
}
