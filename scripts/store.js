'use strict';
/* global $, cuid, item */


const bookmark =  (function(){

  const bookmarks = [{id: cuid(), name: 'testBookmark', url:'https://www.google.com/', description: 'test description', rating: 4, expanded: true}];
  let hideLowerRatedItems = false;
  let filteredRating =0;
  let expanded = false;

  function addBookmark (name, url, description, rating){
    console.log('`addBookmark` running');

    console.log('testing addBookmark');
    // console.log ('the item name is ' , item.validateName(name));
    
    // console.log('the item url is ', item.validateURL(url));

    if (!item.validateName(name)){
      throw new TypeError('Must enter a valid name.');
    }
    else {
      console.log('The name is valid');
    }

    if (!item.validateURL(url)){
      throw new TypeError('Must enter a valid url.');
    }
    else {
      console.log('The url is valid');
    }
    rating = 2;
    if (!item.validateRating(rating)){
      throw new TypeError('Must enter a valid rating (0-5).');
    }

    
    bookmarks.push({id: cuid(), name: name, url: url, description: description, rating: rating, expanded: expanded});

    //console.log(bookmarks);
    console.log('addBookmark ran successfully');
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }


  function expandBookmark(){
    console.log('`expandBookmark` ran');
    bookmarks.expanded = true;
    bookmark.render();
    
  }
  function removeBookmark(selectedId){
    //console.log('`removeBookmark` ran');
    let filteredArray = this.bookmarks.filter(function (bookmarks) {
      return bookmarks.id !== selectedId;
    });
    console.log(filteredArray);
    this.bookmarks = filteredArray;
  }

  function filterByRating(rating){
    console.log('`filterByRating` ran');
    filteredRating = rating;
    hideLowerRatedItems = true;
    bookmarks.filter(item => item.rating >= filteredRating);
    bookmark.render();
  }

  function editBookmark(name, url, description, rating){
    //console.log('`editBookmark` ran');

    if (item.validateName(name)){
      bookmarks.name = name;
    }
    if (item.validateURL(url)){
      bookmarks.url = url;
    }
    if(item.validateRating(rating)){
      bookmarks.rating = rating;
    }

  }

  function handleAddBookmarkClicked(){
    //console.log('`handleAddBookmarkClicked` ran');

  //renderBookmarks();
  }

  function handleStarRatingDropdown(){
    //console.log('`handleStarRatingDropdown` ran');

  //renderBookmarks();
  }

  function handleVisitSiteClicked(){
    //console.log('`handleVisitSiteClicked` ran');

  //renderBookmarks();
  }

 

  function bindListeners() {
    console.log('`bindListeners` ran');

    handleAddBookmarkClicked();
    handleStarRatingDropdown();
    handleVisitSiteClicked();
  }

  return { bookmarks:bookmarks, addBookmark, expandBookmark, removeBookmark, filterByRating, editBookmark, bindListeners };
})();