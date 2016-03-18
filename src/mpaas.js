/**
   * mPaaS SDK to pull data from IoT app, HTML web app
   * Support AMD, CommonJS, and regular Script
   *
   * Credit to ToddMotto Atomic library for the module design pattern.
   * Usage:
      mpaas.get('/endpoint')
        .success(function (data, xhr) {
      })
      .error(function (data, xhr) {

      })
      .always(function (data, xhr) {

      });
   */

(function(root, factory){
  if (typeof define === 'function' && define.amd){
    define(factory);
  } else if (typeof exports === 'object'){
    module.exports = factory;
  } else {
    root.mpaas = factory(root);
  }
})(this, function(root){

  'use strict';

  var exports = {};

  /**
   * The base URL for the API
   * http or https depending on the site, defaulting to http: if other.
   *
   * @property _base_url
   * @private
   * @type string
   */
  var _baseUrl;
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    _baseUrl = "http://jsonplaceholder.typicode.com/todos";
  } else{
    _baseUrl = "http://jsonplaceholder.typicode.com/todos";
  } 

  /**
   * Parse method to format response data
   *
   * @property req
   * @private
   * @request object
   */
  var _parse = function(req){
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e){
      result = req.responseText;
    }

    return [result, req];
  };

  /**
   * get/set Header content type
   *
   * @property req
   * @private
   * @request object
   */
  var _config = {
    contentType: 'application/x-www-form-urlencoded'
  };

  /**
   * Define Ajax request and perform callback 
   *
   * @property type: GET/POST/PUT/DELETE
   * @private
   * @string
   *
   * @property url: endpoint
   * @private
   * @string
   *
   * @property data: data to be sent
   * @private
   * @json object
   */
  var _xhr = function(type, url, data){
    var methods = {
      success: function(){},
      error: function(){},
      always: function(){}
    };
    var XHR = root.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');

    //open request
    request.open(type, url, true);

    //set Header
    request.setRequestHeader('Content-Type', _config.contentType);

    request.onreadystatechange = function(){
      var req;
      if (request.readyState === 4){
        req = _parse(request);
        if (request.status >= 200 && request.status <300){
          methods.success.apply(methods, req);
        } else {
          methods.error.apply(methods, req);
        }
        methods.always.apply(methods, req);
      }
    };

    //send data
    request.send(data);

    var atomXHR = {
      success: function(callback){
        methods.success = callback;
        return atomXHR;
      },
      error: function(callback){
        methods.error = callback;
        return atomXHR;
      },
      always: function(callback){
        methods.always = callback;
        return atomXHR;
      }
    };

    return atomXHR;
  };


  //export API

  /**
   * Push data from any app to mPaaS storage for analytics
   *
   * @param
   * @private
   * @json object
   */
  exports.push = function(param){
    return _xhr('POST', _baseUrl, param);
  };

  exports.get = function(){
    return _xhr('GET', _baseUrl);
  };

  /**
   * Set header content type
   *
   * @contentType
   * @private
   * @string
   */
  exports.setContentType = function(contentType){
    _config.contentType = contentType;
  };

  return exports;

});