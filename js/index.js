

/* ------------------------------------------------------------------------- */
var page = page || {};
page = (function(exports){
	var config = {
		"seats" : 60
	};
	
	function init(){
		var parties = {
			"cdu" : "Christlich Demokratische Union Deutschlands (CDU)",
			"pds" : "DIE LINKE (DIE LINKE)",
			"spd" : "Sozialdemokratische Partei Deutschlands (SPD)",
			"b90" : "BÜNDNIS 90/DIE GRÜNEN (GRÜNE)",
			"dsu" : "Bürgerbewegung PRO CHEMNITZ/Deutsche Soziale Union (PRO CHEMNITZ. DSU)",
			"afd" : "Alternative für Deutschland (AfD)",
			"fdp" : "Freie Demokratische Partei (FDP)",
			"vos" : "Wählervereinigung Volkssolidarität Chemnitz (Vosi)",
			"cfa" : "Piratenpartei Kreisverband Chemnitz (Chemnitz für Alle)",
			"dpa" : "Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative (Die PARTEI)"
		};
		var parties = {
			"pds" : "DIE LINKE",
			"cdu" : "CDU",
			"spd" : "SPD",
			"fdp" : "FDP",
			"b90" : "GRÜNE",
			"dsu" : "PRO CHEMNITZ.DSU",
			"vos" : "Vosi",
			"npd" : "NPD",
			"afd" : "AfD",
			"dpa" : "Die PARTEI",
			"cfa" : "PIRATEN Chemnitz"
		};
		
		dhondt.init({
			"seats" : 60,
			"parties" : parties
		});
		
		view.init({
			"parties" : parties
		});

		view.listen_change(function(v){
			view.set_seats(dhondt.run(v));
		});
		
	}
	
	exports.init = init;
	
	return exports;
})(page);

/* ------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function(){
	page.init();
})
