'use strict';
/* global $, bookmark */

const bookmarkList = (function () {
  

  function generateBookmarkElement(bookmark){
    let itemTitle = `<span class="bookmark-item">${bookmark.name}</span>`;
    let itemRating = `<span class="bookmark-rating">${bookmark.rating}</span>`;
    let expanded = bookmark.expanded ? 'expanded' : ' ';
    let itemExpandedBox = `
    <div class="expandedContainer">
    <p class="bookmark-item-description">${bookmark.description}</p>
    <button class="visit-bookmark">
    <span class="button-label">Visit Site</span>
    </button>
    <button class="remove-bookmark">
    <span class="button-label">Remove Bookmark</span>
    </button>
    </div>
    `;
    return `
    <li class="js-item-element ${expanded}" data-item-id="${bookmark.id}"> 
        ${itemTitle}
        ${itemExpandedBox}
        ${itemRating}
    </li>`;
 
  }

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function render(initial) {
    // Filter item list if store prop is true by item.checked === false
    let bookmarks = bookmark.bookmarks;
    

    if (bookmark.filteredRating === true) {
      const bookmarkListItemsString = generateBookmarkString(bookmark.filteredList);
      $('.js-bookmarks').html(bookmarkListItemsString);
      console.log('filter ran');
    } 
    else {
      const bookmarkListItemsString = generateBookmarkString(bookmarks);
      $('.js-bookmarks').html(bookmarkListItemsString);
      console.log('full list ran');

    }
   
    // render the shopping list in the DOM
    //console.log('`render` ran');
  
    // // insert that HTML into the DOM
  }
  
  

  return {render};
})();