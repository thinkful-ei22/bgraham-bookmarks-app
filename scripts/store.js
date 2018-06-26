'use strict';
/* global $, cuid, item bookmarkList,  api*/


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
    $('#add-bookmark-button').on('click', function (){
      $('#add-bookmark-form').show();
      $('#add-bookmark-button').hide();
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
      let newBookmarkRating = $('#star-rating:checked').val();
     
      $('.js-new-bookmark-name').val('');
      $('.js-new-bookmark-url').val('');
      $('.js-new-bookmark-description').val('');

     
      addBookmark(newBookmarkName, newBookmarkURL, newBookmarkDescription, newBookmarkRating);
 
      $('#add-bookmark-button').show();
      $('#add-bookmark-form').hide();
      alreadyAdded = true;
      filterByRating(filteredRating);

    });
  }

  
  //handleExpand - takes the event of the user clicking on the bookmark & runs expandBookmark & filterByRating

  function handleExpand(){
    console.log('handleexpand');
    $('.bookmarks-list').on ('click', '.expand-bookmark', function (e){
     
      const id = getItemIdFromElement(e.currentTarget);
      setExpandedFor(id);
      filterByRating(filteredRating);
    
    });
  }
  //handleRatingFilter - takes the event of the rating dropdown menu  & runs filterByRating 

  function handleRatingFilter(){

    $('#add-filter-buttons').on('click', '.filter-rating-button', function(){
      console.log('filter running');
      filteredRating = parseInt($('.star-rating').val());

      filterByRating(filteredRating);

    });

  }
  //handleRemoveBookmark - takes the event of the remove bookmark button, runs removeBookmark & filterByRating 

  function handleRemoveBookmark() {
    $('.bookmarks-list').on('click', '.remove-bookmark',(function(event) {
      console.log('remove handler running');

      const id = getItemIdFromElement(event.currentTarget);
      removeBookmark(id);
      filterByRating(filteredRating);

    }));
  }

  /* Handle data storage for event handlers*/
  
  /*addBookmark - takes in a name, url, description, and rating, then validates them and pushes them to the 
  bookmarks list
  */
  function addBookmark (name, url, description, rating){
  
   
    

    
   
    let newestBookmarkObj ={
      title: name,
      url,
      desc: description,
      rating: Number(rating),
    };
    console.log(newestBookmarkObj);
    api.createBookmark(newestBookmarkObj, function() {
      addSingleBookmark(newestBookmarkObj);
      bookmarkList.render();
      
    });

  }

  function addSingleBookmark(bookmark){
    bookmark.expanded = false;
    bookmarks.push(bookmark);
    filterByRating(filteredRating);
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
      }
    });
    bookmarkList.render(bookmarks);

  }
  
  //removeBookmark - finding the selected bookmark by id, and removes it from the bookmark list
  function removeBookmark(selectedId){
    bookmarks.forEach(function (bookmark, index) {
      if (bookmark.id === selectedId){
        api.deleteBookmark(bookmark, function() {
          bookmarks.splice(index, 1);
          bookmarkList.render();
        });
      }
    });
  
  }

  /*
  filterByRating - takes in a number between 0 and 5, and only shows the bookmarks with a rating greater
  than or equal to that number
  */
  function filterByRating(rating){
    filteredList = bookmarks.filter(item => item.rating >= rating);
    bookmarkList.render(filteredList);
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

  return { bookmarks:bookmarks, filter: filteredList, addSingleBookmark, removeBookmark, filterByRating, bindListeners };
})();