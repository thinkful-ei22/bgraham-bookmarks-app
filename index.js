'use strict';
/* global */

const bookmarks = [];


function addBookmark (){
  console.log('`addBookmark` ran');
}

function expandBookmark(){
  console.log('`expandBookmark` ran');

}

function removeBookmark(){
  console.log('`removeBookmark` ran');

}

function filterByRating(){
  console.log('`filterByRating` ran');

}

function editBookmark(){
  console.log('`editBookmark` ran');

}

function handleAddBookmarkClicked(){
  console.log('`handleAddBookmarkClicked` ran');

  //renderBookmarks();
}

function handleStarRatingDropdown(){
  console.log('`handleStarRatingDropdown` ran');

  //renderBookmarks();
}

function handleVisitSiteClicked(){
  console.log('`handleVisitSiteClicked` ran');

  //renderBookmarks();
}

function renderBookmarks(){
  console.log('`renderBookmarks` ran');

  addBookmark();
  expandBookmark();
  removeBookmark();
  filterByRating();
  editBookmark();
  handleAddBookmarkClicked();
  handleStarRatingDropdown();
  handleVisitSiteClicked();
}

$(function () {

  renderBookmarks();
});