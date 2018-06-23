'use strict';
/* global cuid */
//const foo = 'bar';

const item = (function(){
  
  const validateName  = function(name){
    if (name === '' ){
      return false;
    }
    else {
      return true;
    }
  };

  const validateURL = function (url){
    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    return regexp.test(url);
  };
  
  const validateRating = function (rating){
    
    // const rating = parseInt(ratingString);
    // console.log(typeof rating);

    if (typeof rating === 'undefined'){
      return false;
    }
    if ((rating > 5) || (rating < 0)){
      return false;
    }
    else {
      return true;
    }
  };

  const create = function(name){
    return {
      id: cuid(),
      name: name,
      checked: false,
    };
  };
  return  {
    validateName, create, validateURL, validateRating
  };
}());