function render(string, data: any[]): string{
	return string.replace(/\{(\d*(\:?[^}\s]+)*?)\}/g, function(s, token){
		if (/^\d+$/.test(token)){
			return data[parseInt(token || 0, 10)] || '{' + token + '}';
		}
		var normalized_token: string = /^\d*:/.test(token) ? token : '0:' + token;
		var access_key: string;
		var access_chain: string[] = normalized_token.split(':');
		var replacement_value: string = data[access_chain.splice(0, 1)[0] || 0];
		while (access_key = access_chain.splice(0, 1)[0]){ /*! eslint-disable-line no-cond-assign */
			replacement_value = replacement_value[access_key];
		}
		return replacement_value || '{' + token + '}';
	});
}

export = function fr(string: string /*, args...*/): Function | string {
	var data: any[] = [].slice.call(arguments, 1);
	return data.length
		? render(string, data)
		: function(/*args...*/){
			var data: any[] = [].slice.call(arguments);
			return render(string, data);
		};
};
