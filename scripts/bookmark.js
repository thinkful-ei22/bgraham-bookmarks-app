'use strict';
/* global $, store, bookmark */

const bookmarkList = (function () {

  function generateBookmarkElement(bookmark){
    let itemTitle = `<span class="bookmark-item bookmark-item_expanded">${bookmark.name}</span>`;
    let itemRating = `<span class="bookmark-rating">${bookmark.rating}</span>`;
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
    <li class="js-item-element" data-item-id="${bookmark.id}">
      ${itemTitle}
      <div class="bookmark-item-controls">
        <button class="bookmark-item-expand js-item-expand">
          <span class="button-label">Expand</span>
        </button>
        ${itemExpandedBox}
        ${itemRating}
      </div>
    </li>`;
 
  }

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    let bookmarks = bookmark.bookmarks;
   
   
    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarkListItemsString = generateBookmarkString(bookmarks);
  
    // // insert that HTML into the DOM
    $('.js-bookmarks').html(bookmarkListItemsString);
  }
  
  

  return {render};
})();