'use strict';
/* global $, cuid, item bookmarkList*/


const bookmark =  (function(){

/*  Declare bookmark variables */

  let bookmarks = [];
  let testObj = {id: cuid(), name: 'testBookmark', url:'https://www.google.com/', description: 'test description', rating: 4, expanded: false};
  let filteredRating = 0;
  let filteredList = [];
  
  /* Event Handlers*/
  function handleAddBookmarkButton(){
    //console.log('`handleAddBookmarkClicked` ran');
    $('.add-bookmark').on('click', function (){
      //console.log ('receiving add button clicks');
      $('#add-bookmark-form').show();
      // bookmarkList.render();
    });
  }

  function handleAddBookmarkSubmission (){
    $('#add-bookmark-form').submit (function (event){
      event.preventDefault();
      const newBookmarkName = $('.js-new-bookmark-name').val();
      const newBookmarkURL = $('.js-new-bookmark-url').val();
      const newBookmarkDescription = $('.js-new-bookmark-description').val();
      const newBookarkRating = $('.js-new-bookmark-description').val();

      addBookmark(newBookmarkName, newBookmarkURL, newBookmarkDescription, newBookarkRating);
      bookmarkList.render();
      bookmark.bindListeners();

    });
  }

  function handleExpand(){
    $('.bookmark-item').on ('click', function (e){
      const id = getItemIdFromElement(e.currentTarget);

      setExpandedFor(id);

    
    });
  }

  function handleRatingFilter(){
    console.log('`handleStarRatingDropdown` ran');

    $('.filterRating').click(function (){
      
      console.log($('.star-rating').val());
      filteredRating = parseInt($('.star-rating').val());
      console.log(filteredRating);

      filterByRating(filteredRating);

    });

  }

  function handleRemoveBookmark() {
    $('.remove-bookmark').click( event => {
    // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      removeBookmark(id);

    });
  }

  function handleViewBookmark(){
    //console.log('`handleVisitSiteClicked` ran');

  }


  /* Handle data storage for event handlers*/
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
    if (!item.validateRating(rating)){
      throw new TypeError('Must enter a valid rating (1-5).');
    }

    
    bookmarks.push({id: cuid(), name: name, url: url, description: description, rating: rating, expanded: false});

    console.log(bookmarks);
    //console.log('addBookmark ran successfully');
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }


  function setExpandedFor(selectedId){
    //Finding the selected bookmark by id, changing its expanded status, and returns the expanded status of selected bookmark
    let selectedBookmark = bookmarks.find (function(bookmark){
      if (bookmark.id ===selectedId){
        bookmark.expanded = !bookmark.expanded;
        return true;
      }

    });
   

    // bookmarks.$('.expandedContainer').toggle();    
    bookmarkList.render();
    bookmark.bindListeners();

  }
  
  function removeBookmark(selectedId){
    console.log(selectedId);
    let filteredArray = bookmarks.filter(function (item) {
      return item.id !== selectedId;
    });

    console.log(filteredArray);
    bookmarks = filteredArray;
    console.log(bookmarks);
    
    bookmarkList.render();
    bookmark.bindListeners();

  }

  function filterByRating(rating){
    console.log('`filterByRating` ran');
    filteredRating = rating;
    console.log(bookmarks);

    filteredList = bookmarks.filter(item => item.rating >= filteredRating);
    console.log(filteredList);
    bookmarkList.render();
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

  /* Bind listenrs*/
  function bindListeners() {
    //console.log('`bindListeners` ran');

    handleAddBookmarkButton();
    handleAddBookmarkSubmission();
    handleExpand();
    handleRatingFilter();
    handleRemoveBookmark();
    handleViewBookmark();
  }

  return { bookmarks:bookmarks, filter: filteredList, addBookmark, removeBookmark, filterByRating, editBookmark, bindListeners };
})();