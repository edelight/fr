"use strict";
function render(string, data) {
    return string.replace(/\{(\d*(\:?[^}\s]+)*?)\}/g, function (s, token) {
        if (/^\d+$/.test(token)) {
            return data[parseInt(token || 0, 10)] || '{' + token + '}';
        }
        var normalized_token = /^\d*:/.test(token) ? token : '0:' + token;
        var access_key;
        var access_chain = normalized_token.split(':');
        var replacement_value = data[access_chain.splice(0, 1)[0] || 0];
        while (access_key = access_chain.splice(0, 1)[0]) {
            replacement_value = replacement_value[access_key];
        }
        return replacement_value || '{' + token + '}';
    });
}
module.exports = function fr(string /*, args...*/) {
    var data = [].slice.call(arguments, 1);
    return data.length
        ? render(string, data)
        : function () {
            var data = [].slice.call(arguments);
            return render(string, data);
        };
};
