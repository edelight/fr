function render(string, data){
	return string.replace(/\{(\d*(\:?[^}\s]+)*?)\}/g, function(s, token){
		if (/^\d+$/.test(token)){
			return data[parseInt(token || 0, 10)] || '{' + token + '}';
		}
		var normalizedToken = /^\d*:/.test(token) ? token : '0:' + token;
		var access_key;
		var access_chain = normalizedToken.split(':');
		var replacement_value = data[access_chain.splice(0, 1)[0] || 0];
		while (access_key = access_chain.splice(0, 1)[0]){ //eslint-disable-line no-cond-assign
			replacement_value = replacement_value[access_key];
		}
		return replacement_value || '{' + token + '}';
	});
}

module.exports = function fr(string/*, args...*/){
	var data = [].slice.call(arguments, 1);
	return data.length
		? render(string, data)
		: function(/*args...*/){
			var data = [].slice.call(arguments);
			return render(string, data);
		};
};
