/* 
 * The MIT License
 *
 * Copyright 2017 Robert Rohm&lt;r.rohm@aeonium-systems.de&gt;.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* global expect, jasmine, await */
/* esversion 9 */

describe('ae-ultraslim-router Test Suite', function () {
  it('runs specs.', function () {
    expect(true).toBe(true);
  });
});

describe('ae-ultraslim-router', function () {
  var router;

  beforeEach(function () {
    router = æ.router();
    console.log = function () {}; // override standard logger
  });

  it('is a function', function () {
    expect(æ).toBeDefined();
    expect(æ.router).toBeDefined();
    expect(typeof æ.router).toBe('function');
  });

  describe('on (routeURL, handler)', function () {
    var url = 'first';
    var handler = function () {};

    beforeEach(function () {
      router.routes = {};
    });

    it('throws when handler is not a function', function () {
      expect(function () {
        router.on(url, 'not a function');
      }).toThrowError('Handler needs to be a function.');
    });

    it('registers a simple url and a handler function', function () {
      router.on(url, handler);
      expect(router.routes[url]).toBeDefined();
      expect(router.routes[url]).toBe(handler);
      expect(router.routes).toEqual(jasmine.objectContaining({first: handler}));
    });

    it('registers parameterized urls', function () {
      var url2 = 'first/:id';
      router.on(url, handler);
      router.on(url2, handler);

      expect(router.routes[url]).toBeDefined();
      expect(router.routes[url2]).toBeDefined();
      expect(router.routes[url2]).toBe(handler);
    });
  });


  describe('navigate (routeURL)', function () {
    var urlRoot = '/';
    var urlSimple = 'first';
    var urlParams1 = 'second/:id';
    var urlParams2 = 'third/:id/:name';
    var urlParams3 = '/third/:id/:name';
    var handler1 = jasmine.createSpy('handler1');
    var handler2 = jasmine.createSpy('handler2');
    var handler3 = jasmine.createSpy('handler3');
    var handler4 = jasmine.createSpy('handler4');
    var handler5 = jasmine.createSpy('handler5');

    beforeEach(function () {
      router.routes = {};
      router.on(urlSimple, handler1);
      router.on(urlParams1, handler2);
      router.on(urlParams2, handler3);
      router.on(urlParams3, handler3);
    });

    it('throws if a route cannot be matched - and there is no default route and not error handler.', function () {
      expect(function () {
        router.navigate('non-existing');
      }).toThrowError();
    });
    
    it('falls back to a default route.', function () {
      router.onError(handler4);
      router.default(handler5);
      const result = await router.navigate('foo');
      expect(handler5).toHaveBeenCalled();
      expect(handler4).not.toHaveBeenCalled();
    });
    it('maps an emtpy route to the "/" slash route.', function () {
      router.on(urlRoot, handler1);
      const result = await router.navigate('');
      expect(handler1).toHaveBeenCalled();
    });

    it('falls back to the "404" route if the route cannot be matched and error handler is provided.', function () {
      router.onError(handler4);
      const result = await router.navigate('foo');
      expect(handler4).toHaveBeenCalled();
    });

    it('looks up simple URLs and calls handler', function () {
      const result = await router.navigate(urlSimple);
      expect(handler1).toHaveBeenCalled();
    });

    it('looks up parameterized URLs and calls handler', function () {
      const result = await router.navigate(urlParams1);
      expect(handler2).toHaveBeenCalled();
    });

    it('looks up parameterized URLs with param values and calls handler', function () {
      const result = await router.navigate('second/2');
      expect(handler2).toHaveBeenCalled();
    });

    it('passes parameters to the handler', function () {
      const result = await router.navigate('second/2');
      expect(handler2).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledWith({params: {id: '2'}});
    });

    it('passes more than one parameters to the handler', function () {
      const result = await router.navigate('third/2/foo');
      expect(handler3).toHaveBeenCalled();
      expect(handler3).toHaveBeenCalledWith({params: {id: '2', name: 'foo'}});
    });

    it('handles URLs starting with a /', function () {
      const result = await router.navigate('/third/2/foo');
      expect(handler3).toHaveBeenCalled();
      expect(handler3).toHaveBeenCalledWith({params: {id: '2', name: 'foo'}});
    });

  });
});
