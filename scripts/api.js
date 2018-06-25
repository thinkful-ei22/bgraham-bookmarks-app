'use strict';
/* global $ store */
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brandon';
  const getBookmarks= callback => {
  
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
    const item = store.bookmarks[0];
    console.log(item);
    console.log('current name: ' + item.name);
    console.log('new name: ' + item.name);
  
  };

  const createBookmark= function(bookmarkObj, callback){
    const newBookmark = bookmarkObj;
    const myJSONitem = JSON.stringify(newBookmark);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: myJSONitem,
      success: callback
    });
  };

  const updateBookmark = function (id, updateData, callback){
    console.log('`updateItem` ran');
    let itemURL = `${BASE_URL}/bookmarks/:${id}`;
    console.log(itemURL);
    $.ajax({
      url: itemURL,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

  return {
    getBookmarks, createBookmark, updateBookmark
  };
}());

