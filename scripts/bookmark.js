'use strict';
/* global $ */

//bookmarkList IIFE, creates the dynamic html for the bookmark app and renders it
const bookmarkList = (function () {
  
//generateBookmarkElement - generates the html for each bookmark
  function generateBookmarkElement(bookmark){
    let itemTitle = `<span class="bookmark-item">${bookmark.name}</span>`;
    let expandButton = '<button class="expand-bookmark"> <span class="button-label" role="expand-bookmark">Expand/Collapse</span> </button>';
    let itemRating = '';
    let expanded = bookmark.expanded ? 'expanded' : ' ';
    let itemExpandedBox = `
    <div class="expandedContainer">
    <p class="bookmark-item-description"><i>- ${bookmark.description}</i></p>
  <div class="expanded-footer">
    <a href="https://${bookmark.url}" id="bookmark-url">Visit Site</a>
    <button class="remove-bookmark">
    <span class="button-label" role="remove-bookmark">Remove Bookmark</span>
    </button>
    </div>
    </div>
    `;
    const bookmarkRating = parseInt(bookmark.rating);


    if (bookmarkRating ===1){
      itemRating = `<i>Rating: </i> <span class="bookmark-rating">
      <span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span>
      </span>`;
    }
    else if (bookmarkRating ===2){
      itemRating = `<i>Rating: </i><span class="bookmark-rating">
      <span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span>
      </span>`;
    }
    else if (bookmarkRating ===3){
      itemRating = `<i>Rating: </i><span class="bookmark-rating">
      <span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span>
      </span>`;
    }
    else if (bookmarkRating ===4){
      itemRating = `<i>Rating: </i><span class="bookmark-rating">
      <span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span>
      </span>`;
    }
    else if (bookmarkRating ===5){
      itemRating = `<i>Rating: </i><span class="bookmark-rating">
      <span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span>
      </span>`;
      

    }

    return `
    <li class="bookmark-element js-item-element ${expanded}" data-item-id="${bookmark.id}"> 
        ${itemTitle}
        ${expandButton}
        ${itemRating}
        ${itemExpandedBox}
    </li>`;
 
  }

  //generateBookmarkString - takes the HTML of each bookmark element and creates a long string 
  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  //render -  makes the bookmarks and all the buttons on the page visible
  function render(list) {
    const bookmarkListItemsString = generateBookmarkString(list);
    $('.js-bookmarks').html(bookmarkListItemsString);
  }
  return {render};
})();