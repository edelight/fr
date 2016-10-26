# fr
> tiniest string formatting library

[![Build Status](https://travis-ci.org/edelight/fr.svg?branch=master)](https://travis-ci.org/edelight/fr)

### Installation:

Install from npm:

```sh
$ npm install fr --save
```

### Usage:

#### Index based token replacement:

```js
// All examples return 'Hello World!'
fr('Hello {0}!', 'World');
fr('{0} {1}!', 'Hello', 'World');
fr('{0} {2}!', 'Hello', 'zalgo', 'World');
fr('{0} {2}!', 'Hello', { hecomes: 'zalgo' }, 'World');
fr('{1} {0}{2}', 'World', 'Hello', '!');
fr('{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}', 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!');
fr('{0}{1}{2}{2}{3}{4}{5}{6}{7}{8}{9}{10}', 'H', 'e', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!');

```

#### Empty index uses 0:

```js
fr('Hello {}!', 'World');
fr('Hello {}{1}', 'World', '!');
```

#### String tokens and access of nested object properties:

```js
fr('{greeting} World!', { greeting: 'Hello' });
fr('{0:greeting} World!', { greeting: 'Hello' });
fr('{0:data:greeting} World!', { data: { greeting: 'Hello' }});
fr('{data:greeting} World!', { data: { greeting: 'Hello' }});
fr('{1:data:greeting}{2}{0}!', 'World', { data: { greeting: 'Hello' }} , ' ');
fr('{1:data:greeting} {0:thing}!', { thing: 'World' }, { data: { greeting: 'Hello' }});
```

#### Unknown tokens will not be replaced:

```js
var intermediate =  fr('{greeting} {thing}!', {greeting: 'Hello'});
fr(intermediate, {thing: 'World'});
```

#### Precompiling:

```js
var fn1 = fr('Hello {}!');
var fn2 = fr('Hello {}{1}')
var fn3 = fr('Hello {thing}{punctuation}');
fn1('World');
fn2('World', '!');
fn3({ thing: 'World', punctuation: '!' });
```


### License
MIT © [Frederik Ring](http://www.frederikring.com)
