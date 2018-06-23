'use strict';
/* global $ , bookmarkList, store  */

// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  bookmarkList.render(store.bookmarks);
  store.bindListeners();

  console.log('document ready');

});

// console.log(store);
// console.log(foo);

// console.log(Item);
// console.log(foo);