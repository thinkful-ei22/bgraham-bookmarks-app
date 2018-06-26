'use strict';
/* global $ , bookmarkList, store api */

// eslint-disable-next-line no-unused-vars

//DOM ready - renders the bookmarks and adds listeners to the correct bookmark elements
$(document).ready(function() {
  api.getBookmarks(function (bookmarks){
    // store.bookmarks = bookmarks;
    bookmarks.forEach(element => {
      store.addSingleBookmark(element);
    
    });
    console.log('loaded!');
    bookmarkList.render(store.bookmarks);
    store.bindListeners();

  });
});