/* jslint esnext: true, noyield: true */
require('co-mocha');

var moko = require('moko'),
    expect = require('expect.js'),
    slug = require('../');

describe('moko-slug', function() {
  var Article;

  describe('simple attributes', function() {
    before(function() {
      Article = moko('Article').attr('title').attr('slug');
      Article.use(slug('title'));
    });
    it('works on instantiation', function*() {
      var post = yield new Article({title: 'Some title'});
      expect(post.slug).to.be('some-title');
    });
    it('works on change', function*() {
      var post = yield new Article({title: 'Some title'});
      post.title = 'another title';
      expect(post.slug).to.be('another-title');
    });
  });

  describe('format strings', function() {
    before(function() {
      Article = moko('Article').attr('title').attr('author');
      Article.use(slug(['title', 'author'], ':title by :author'));
    });

    it('works on instantiation', function*() {
      var post = yield new Article({title: 'cool article', author: 'bob'});
      expect(post.slug).to.be('cool-article-by-bob');
    });

    it('works on change', function*() {
      var post = yield new Article({title: 'cool article', author: 'bob'});
      post.author = 'steve';
      expect(post.slug).to.be('cool-article-by-steve');
    });
  });

  describe('format functions', function() {
    before(function() {
      Article = moko('Article').attr('title').attr('author');
      Article.use(slug(['title', 'author'], function(article) {
        if(article.author) return article.title + ' by ' + article.author;
        return article.title;
      }));
    });
    it('works on instantiation', function*() {
      var post = yield new Article({title: 'some title'});
      expect(post.slug).to.be('some-title');
    });
    it('works on change', function*() {
      var post = yield new Article();
      post.title = 'some title';
      expect(post.slug).to.be('some-title');
      post.author = 'Ryan';
      expect(post.slug).to.be('some-title-by-ryan');
    });
  });
});
