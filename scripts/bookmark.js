'use strict';
/* global $ */

const bookmarkList = (function () {
  

  function generateBookmarkElement(bookmark){
    console.log(bookmark.url);
    let itemTitle = `<span class="bookmark-item">${bookmark.name}</span>`;
    let itemRating = `<span class="bookmark-rating">${bookmark.rating}</span>`;
    let expanded = bookmark.expanded ? 'expanded' : ' ';
    let itemExpandedBox = `
    <div class="expandedContainer">
    <p class="bookmark-item-description">${bookmark.description}</p>
   <a href="https://${bookmark.url}" id="bookmark-url">Visit Site</a>
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

  function render(list) {
    // Filter item list if store prop is true by item.checked === false    
    const bookmarkListItemsString = generateBookmarkString(list);
    $('.js-bookmarks').html(bookmarkListItemsString);
    console.log('full list ran');

    
   
    // render the shopping list in the DOM
    //console.log('`render` ran');
  
    // // insert that HTML into the DOM
  }
  
  

  return {render};
})();