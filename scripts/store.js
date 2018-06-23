'use strict';
/* global $, cuid, item bookmarkList*/


const store =  (function(){

/*  Declare bookmark variables */

  let testBookmark =[{id: cuid(), name: 'Google', url: 'google.com', description: 'Google Search Engine', rating: 3, expanded: false}];
  let bookmarks = [];
  let filteredRating = 0;
  let filteredList = [];
  let alreadyAdded = false; 
  
  /* Event Handlers*/
  
  //handleAddBookmarkButton - takes the add button event and makes the add bookmark box visible, while making itself hidden
  function handleAddBookmarkButton(){
    $('.add-bookmark').on('click', function (){
      $('#add-bookmark-form').show();
      $('.add-bookmark').hide();
    });
  }
  /*
  handleAddBookmarkSubmission - takes the sumbit button event, runs addBookmark & filterByRating,  and makes 
  the add bookmark box invisible, while making the add bookmark button visible
*/
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
 
      $('.add-bookmark').show();
      $('#add-bookmark-form').hide();
      alreadyAdded = true;
      filterByRating(filteredRating);

      bookmarkList.render(bookmarks);
      bindListeners();
    });
  }

  
  //handleExpand - takes the event of the user clicking on the bookmark & runs expandBookmark & filterByRating

  function handleExpand(){
    $('.bookmark-item').on ('click', function (e){
      const id = getItemIdFromElement(e.currentTarget);

      setExpandedFor(id);
      filterByRating(filteredRating);
    
    });
  }
  //handleRatingFilter - takes the event of the rating dropdown menu  & runs filterByRating 

  function handleRatingFilter(){

    $('.filterRating').click(function (){
      
      filteredRating = parseInt($('.star-rating').val());

      filterByRating(filteredRating);

    });

  }
  //handleRemoveBookmark - takes the event of the remove bookmark button, runs removeBookmark & filterByRating 

  function handleRemoveBookmark() {
    $('.remove-bookmark').click( event => {
      const id = getItemIdFromElement(event.currentTarget);
      removeBookmark(id);
      filterByRating(filteredRating);

    });
  }

  /* Handle data storage for event handlers*/
  
  /*addBookmark - takes in a name, url, description, and rating, then validates them and pushes them to the 
  bookmarks list
  */
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

  //getItemIdFromElement - finds the id of the closest bookmark to an item (event target)
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

 
  /*
  setExpandedFor - finding the selected bookmark by id, changing its expanded status, and returns the expanded 
  status of selected bookmark
  */
  function setExpandedFor(selectedId){
    const selectedBookmark = bookmarks.find (function(bookmark){
      if (bookmark.id ===selectedId){
        bookmark.expanded = !bookmark.expanded;
        return true;
      }
    });
    bookmarkList.render(bookmarks);
    bindListeners();

  }
  
  //removeBookmark - finding the selected bookmark by id, and removes it from the bookmark list
  function removeBookmark(selectedId){
    const list = [];
    for (let i=0; i <bookmarks.length; i++){
      if (bookmarks[i].id !== selectedId){
        list.push(bookmarks[i]);
      }
    }
    bookmarks = list;
 
    bookmarkList.render(bookmarks);
    bindListeners();
  }

  /*
  filterByRating - takes in a number between 0 and 5, and only shows the bookmarks with a rating greater
  than or equal to that number
  */
  function filterByRating(rating){
    filteredRating = rating;
    filteredList = bookmarks.filter(item => item.rating >= filteredRating);
    bookmarkList.render(filteredList);
    bindListeners();
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

  return { bookmarks:bookmarks, filter: filteredList, removeBookmark, filterByRating, bindListeners };
})();