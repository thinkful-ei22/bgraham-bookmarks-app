'use strict';
/* global $ store */
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bgraham452';
  const getBookmarks = callback => {
  
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmark= function(bookmarkObj, callback){
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(bookmarkObj),
      success: callback,
      error: function (err) {
        console.log(err);
      }
    });
  };

  const updateBookmark = function (id, updateData, callback){
    console.log('`updateItem` ran');
    let itemURL = `${BASE_URL}/bookmarks/${id}`;
    console.log(itemURL);
    $.ajax({
      url: itemURL,
      method: 'PATCH',
      contentType: 'application/json',
      
      dataType: 'json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

  const deleteBookmark = function (selectedBookmark, callback){
    let itemURL = `${BASE_URL}/bookmarks/${selectedBookmark.id}`;
    
    $.ajax({
      url: itemURL,
      method: 'DELETE',
      contentType: 'application/json',
      dataType:'json',
      data: JSON.stringify(selectedBookmark),
      success: callback,
    });
  };
  return {
    getBookmarks, createBookmark, updateBookmark, deleteBookmark
  };

}());

