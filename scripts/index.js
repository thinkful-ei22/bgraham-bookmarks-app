'use strict';
/* global $ , bookmarkList, store  */

// eslint-disable-next-line no-unused-vars

//DOM ready - renders the bookmarks and adds listeners to the correct bookmark elements
$().ready(function() {
  bookmarkList.render(store.bookmarks);
  store.bindListeners();
});