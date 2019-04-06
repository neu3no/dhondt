var view = view || {};
view = (function(exports, context){
	var config = {
		parties: {},
		target_inputs: "#inputs",
		template_votes: "template#votes",
		storage: "bak"
	};
	
	var events = {};

	var id_map = {};

	function save(){
		localStorage.setItem(config.storage, JSON.stringify(read_values()));
	}

	function restore(){
		var values = JSON.parse(localStorage.getItem(config.storage) || "{}");
		set_values(values);
	}

	function element_from_party(party){
		var target_element = context.querySelector(config.target_inputs);
		return target_element.querySelector("#"+id_map[party]);
	}
	
	function fill_input(element, id, name, ro=false){
		element.querySelector("label.votes").innerText = name;
		element.querySelector("label.votes").setAttribute("for", id);
		element.querySelector("input.votes").setAttribute("id", id);
		if (ro) {
			element.querySelector("input.votes").setAttribute("readonly", true);
		}

		element.querySelector("input.votes").addEventListener("input", on_change);
	}
	
	function init_inputs(){
		var target_element = context.querySelector(config.target_inputs);
		
		Object
			.keys(config.parties)
			.forEach(function(key){
				var party_name = config.parties[key];
				var element = clone(config.template_votes, target_element);
				id_map[key] = element.id;
				fill_input(element, key, party_name);
			})
		;
		var element = clone(config.template_votes, target_element);
		fill_input(element, "sum", "Summe", true); // ToDo: make sum a class
	}

	function set_values(values){
		var target_element = context.querySelector(config.target_inputs);
		return Object
			.keys(config.parties)
			.forEach(function(key){
				var element = context.querySelector("input#"+key);
				element.value = values[key] || 0;
			},{})
		;
	}
	exports.set_values = set_values;

	function read_values(){
		var target_element = context.querySelector(config.target_inputs);
		return Object
			.keys(config.parties)
			.reduce(function(p, key){
				var element = context.querySelector("input#"+key);
				p[key]= Number(element.value);
				return p;
			},{})
		;
	}
	exports.read_values = read_values;

	function set_seats(values){
		Object
			.keys(config.parties)
			.forEach(function(key){
				var element = element_from_party(key);
				element.querySelector("input.seats").value = values[key] || 0;
			})
		;
	}
	exports.set_seats = set_seats;

	function set_sum(value){
		context.querySelector("input#sum").value=value; // ToDo: make sum a class
	}

	function get_sum(){
		var values = read_values();
		return Object
			.keys(values)
			.reduce(function(p, c){
				return p + Number(values[c]);
			},0)
		;
	}
	
	function on_change(e){
		var values = read_values();
		var sum = get_sum();

		values["sum"] = sum;

		if (events.hasOwnProperty("change")) {
			events["change"].forEach(function(func){
				func(values);
			});
		}
		
		save();
		set_sum(sum);
	}
	
	function listen_change(func){
		if (!events.hasOwnProperty("change")) {
			events["change"] = [];
		}
		
		events["change"].push(func);
		on_change({});
	}
	exports.listen_change = listen_change;
	
	function init({
		parties : parties
	} = {}){
		config["parties"] = parties;
		init_inputs();
		restore();
	}
	exports.init = init;
	
	return exports;
})({}, document);
