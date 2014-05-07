# moko-slug

  create slugs for moko

## Installation

    npm install moko-slug

## Example

```js
var slug = require('moko-slug');

var Blog = moko('blog')
  .attr('title')
  .attr('content')
  .use(slug('title'))

  var b = yield new Blog();
  b.title= 'A seriously interesting title';
  b.slug;
  // => 'a-seriously-interesting-title'

```

## Multi-Attribute Example

```js
var slug = require('moko-slug');

var Blog = moko('blog')
  .attr('title')
  .attr('author')
  .attr('content')
  .use(slug(['title', 'author'], ':title-by-:author'));

  var b = yield new Blog();
  b.title = 'Some blog post';
  b.slug;
  // => 'some-blog-post-by-'

  b.author = 'Ryan S.';
  b.slug();
  // => 'some-blog-post-by-ryan-s'

```

## Function Based Example

```js
var slug = require('moko-slug');


var Blog = moko('blog')
  .attr('title')
  .attr('author')
  .attr('content');

var getBlogSlug = function(blog) {
  var result = blog.title;
  if(blog.author) {
    result += ' by ' + blog.author;
  }
  return result;
};

  Blog.use(slug(['author', 'title'], getBlogSlug));

  var b = yield new Blog();
  b.title = 'Some blog post';

  b.slug;
  // => 'some-blog-post'

  b.author = 'Ryan S.';
  b.slug;
  // => 'some-blog-post-by-ryan-s'

```


## License

  MIT
