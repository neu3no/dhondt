var dhondt = dhondt || {};
dhondt = (function(exports){
	var config = {
		seats: -1,
		parties: {}
	};
	
	function init({
		seats : seats,
		parties : parties
	} = {}){
		config["seats"] = seats;
		config["parties"] = parties;
	}
	exports.init = init;

	function make_table(votes) {
		return Object
			.keys(config.parties)
			.reduce(function(p, key){
				return []
					.concat(p, 
						(new Array(config.seats))
							.fill(0)
							.map(function(val, idx){
								return { 
									"val": votes[key] / (idx+1),
									"key": key
								};
							})
					)
				;
			},[])
		;
	}

	function count_seats(table){
		if (table.length < config.seats) {
			throw "something went wront, number of seats does not match table length";
		}
		else {
			var ret = Object
				.keys(config.parties)
				.reduce(function(val, party){
					val[party] = 0;
					return val;
				},{})
			;
			for (var i=0; i<config.seats; i++){
				var value = table[i];
				ret[value.key] += 1;
			}
			return ret;
		}
	}

	function run(votes){
		var table = make_table(votes);
		
		table = table.sort(function(x,y){
			return y.val - x.val
		});

		return count_seats(table);
	}
	exports.run = run;
	
	return exports;
})(dhondt);

