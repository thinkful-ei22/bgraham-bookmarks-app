'use strict';
/* global $ , bookmarkList, bookmark  */

// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  bookmarkList.render();
  bookmark.bindListeners();

  console.log('document ready');

});

// console.log(store);
// console.log(foo);

// console.log(Item);
// console.log(foo);