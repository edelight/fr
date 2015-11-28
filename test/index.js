var test = require('tape');
var fr = require('./../index');

test('basic index-based tokens', function(t){
	t.equal(fr('Hello {0}!', 'World'), 'Hello World!');
	t.equal(fr('{0} {1}!', 'Hello', 'World'), 'Hello World!');
	t.equal(fr('{0} {2}!', 'Hello', 'zalgo', 'World'), 'Hello World!');
	t.equal(fr('{0} {2}!', 'Hello', { hecomes: 'zalgo' }, 'World'), 'Hello World!');
	t.equal(fr('{1} {0}{2}', 'World', 'Hello', '!'), 'Hello World!');
	t.equal(fr('{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}', 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!'), 'Hello World!');
	t.equal(fr('{0}{1}{2}{2}{3}{4}{5}{6}{7}{8}{9}{10}', 'H', 'e', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!'), 'Hello World!');
	t.end();
});

test('no index uses 0', function(t){
	t.equal(fr('Hello {}!', 'World'), 'Hello World!');
	t.equal(fr('Hello {}{1}', 'World', '!'), 'Hello World!');
	t.end();
});

test('braces in text', function(t){
	t.equal(fr('This "{" is called a curly {0}.', 'brace'), 'This "{" is called a curly brace.');
	t.end();
});

test('object access', function(t){
	t.equal(fr('{0:greeting} World!', { greeting: 'Hello' }), 'Hello World!');
	t.equal(fr('{:greeting} World!', { greeting: 'Hello' }), 'Hello World!');
	t.equal(fr('{0:data:greeting} World!', { data: { greeting: 'Hello' }}), 'Hello World!');
	t.equal(fr('{:data:greeting} World!', { data: { greeting: 'Hello' }}), 'Hello World!');
	t.equal(fr('{1:data:greeting} {0}!', 'World', { data: { greeting: 'Hello' }}), 'Hello World!');
	t.equal(fr('{1:data:greeting}{2}{0}!', 'World', { data: { greeting: 'Hello' }} , ' '), 'Hello World!');
	t.equal(fr('{1:data:greeting} {0:thing}!', { thing: 'World' }, { data: { greeting: 'Hello' }}), 'Hello World!');
	t.end();
});
