/**
 * mpaas-sdk.js
 */
describe('mpaas', function(){

 	/**
   * xhr
   */
   describe('xhr', function(){
   	   	beforeEach(function(){
   	   		spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
      		spyOn(XMLHttpRequest.prototype, 'send');
      		spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
 		});

 		it('should open an XMLHttpRequest', function () {
	      mpaas.get('')
	      .success(function (data, xhr) {
	      })
	      .error(function (data, xhr) {
	      })
	      .always(function(data, xhr) {
	      });
	      expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
	    });

	    it('should send and XMLHttpRequest', function () {
	      mpaas.get('')
	      .success(function (data, xhr) {
	      })
	      .error(function (data, xhr) {
	      });
	      expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
	    });

	    it('should set request header', function(){
	       mpaas.get('')
	      .success(function (data, xhr) {
	      })
	      .error(function (data, xhr) {
	      })
	      .always(function(data, xhr){
	      }) ;
	      expect(XMLHttpRequest.prototype.setRequestHeader).toHaveBeenCalled();
	    });
   });


	describe('content-type', function(){
		beforeEach(function(){
	      spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
	    });

	    it('should use "application/x-www-form-urlencoded" as default Content-type', function(){
	      mpaas.get('');

	      expect(XMLHttpRequest.prototype.setRequestHeader)
	          .toHaveBeenCalledWith('Content-type', 'application/json');
	    });

	    it('should set Content-type', function() {
	      mpaas.setContentType('application/json');
	      mpaas.get('');

	      expect(XMLHttpRequest.prototype.setRequestHeader)
	          .toHaveBeenCalledWith('Content-type', 'application/json');
	    });
	});
 	
});