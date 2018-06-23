'use strict';
/* global $, cuid, item bookmarkList*/


const store =  (function(){

/*  Declare bookmark variables */

  let bookmarks = [];
  let filteredRating = 0;
  let filteredList = [];
  let alreadyAdded = false; 
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
    alreadyAdded = false;
    $('#add-bookmark-form').submit (function (event){
      event.preventDefault();
      let newBookmarkName = $('.js-new-bookmark-name').val();
      let newBookmarkURL = $('.js-new-bookmark-url').val();
      let newBookmarkDescription = $('.js-new-bookmark-description').val();
      let newBookarkRating = $('#star-rating:checked').val();

      $('.js-new-bookmark-name').val('');
      $('.js-new-bookmark-url').val('');
      $('.js-new-bookmark-description').val('');

      addBookmark(newBookmarkName, newBookmarkURL, newBookmarkDescription, newBookarkRating);
 

      $('#add-bookmark-form').hide();
      alreadyAdded = true;
      filterByRating(filteredRating);

      bookmarkList.render(bookmarks);
      bindListeners();
    });
  }

  function handleExpand(){
    $('.bookmark-item').on ('click', function (e){
      const id = getItemIdFromElement(e.currentTarget);

      setExpandedFor(id);
      filterByRating(filteredRating);
    
    });
  }

  function handleRatingFilter(){
    //console.log('`handleStarRatingDropdown` ran');

    $('.filterRating').click(function (){
      
      //console.log($('.star-rating').val());
      filteredRating = parseInt($('.star-rating').val());
      //console.log(filteredRating);

      filterByRating(filteredRating);

    });

  }

  function handleRemoveBookmark() {
    $('.remove-bookmark').click( event => {
    // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      removeBookmark(id);
      filterByRating(filteredRating);

    });
  }




  /* Handle data storage for event handlers*/
  function addBookmark (name, url, description, rating){
  

    if (!item.validateName(name)){
      alert('Must enter a valid name.');
      throw new TypeError('Must enter a valid name.');

    }
   

    if (!item.validateURL(url)){
      alert('Must enter a valid url.');
      throw new TypeError('Must enter a valid url.');
    }
   
    if (!item.validateRating(rating)){
      alert('Must enter a valid rating (1-5).');
      throw new TypeError('Must enter a valid rating (1-5).');
    }
    bookmarks.push({id: cuid(), name: name, url: url, description: description, rating: rating, expanded: false});

  }


  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

 

  function setExpandedFor(selectedId){
    //Finding the selected bookmark by id, changing its expanded status, and returns the expanded status of selected bookmark
    const selectedBookmark = bookmarks.find (function(bookmark){
      if (bookmark.id ===selectedId){
        bookmark.expanded = !bookmark.expanded;
        return true;
      }

    });
   

    // bookmarks.$('.expandedContainer').toggle();    
    bookmarkList.render(bookmarks);
    bindListeners();

  }
  
  function removeBookmark(selectedId){
    console.log(selectedId);
    const list = [];
    //console.log(list);
    for (let i=0; i <bookmarks.length; i++){
      //console.log(bookmarks[i].id);
      if (bookmarks[i].id !== selectedId){
        list.push(bookmarks[i]);
        //console.log('after pushing a bookmark, the list is: ',list);
      }
    }
    bookmarks = list;
 
    bookmarkList.render(bookmarks);
    bindListeners();
  }

  function filterByRating(rating){
    filteredRating = rating;

    filteredList = bookmarks.filter(item => item.rating >= filteredRating);
    bookmarkList.render(filteredList);
    bindListeners();
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
    if(!alreadyAdded){
      handleAddBookmarkButton();
      handleAddBookmarkSubmission();
    }
    handleExpand();
    handleRatingFilter();
    handleRemoveBookmark();
  }

  return { bookmarks:bookmarks, filter: filteredList, removeBookmark, filterByRating, editBookmark, bindListeners };
})();