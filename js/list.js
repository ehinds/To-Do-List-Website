$(document).ready(function() {
// SETUP
    
    $('#the-list').html(localStorage.getItem('the-list')); //call the existing list and bring it back on initialize
        
  var count = localStorage.getItem('stored-counter');      //initialize count to previous count stored as string
  JSON.parse(count);                                        //turn string into integer value
        if (count == null)                                  //if count has not been initialized and is null, set to 0
        {
            count = 0;
        }
  var $list, $newList;
  var item = '';                                 // item is an empty string
  $list = $('#the-list');                        // Cache the unordered list
  $newList = $('#newList');              // Cache form to add new items
  $counter = $('#counter');             //Cache for displaying the counter

//LOCAL STORAGE CLEAR
    $('#delete-all').click(function () {
        localStorage.clear();                       //if the delete all key is pressed clear local storage
    });

//COUNTER TRACKER
     function updateCount () {
            $counter.text('(' + count + ')');                              //counter display
  }
  updateCount();   

// ADDING A NEW LIST ITEM INITIALIZE
  $newList.on('submit', function(e) {       // When a new item is submitted
    e.preventDefault();                         // Prevent form being submitted
    var text = $('#individual-list-items').val();           // Get value of text input
      
//ADD MAIN    
    $list.prepend('<tr>' + '<td>' + '<input type = "checkbox"> ' + '<span>' + text + '</span>' + '<label>' + '<a href="#" class="edit">'+ "&nbsp;&nbsp;Edit&nbsp;" + '</a>' + '<a href="#" value = "delete" class = "destroy">' + "&nbsp;&nbsp;Delete&nbsp;" + '</a>' + '</label>' + '</td>' + '</tr>');    // Add item to beginning of the list
      
    count++;                      //incremenet counter for each added item
    updateCount();                //update counter
    localStorage.setItem('stored-counter', JSON.stringify(count));  //update counter as a string in local storage for retrieval
    
    localStorage.setItem('the-list', $('#the-list').html());  //store html file into the local storage
      
    $('#individual-list-items').val('');                   // Empty the text input

});
    
//MARK AS COMPLETED
    $(document).on('change', 'input:checkbox', function () {        //on changing a checkbox input
		if($(this).attr('checked'))                                   //if attribute is checked already
		{
			$(this).removeAttr('checked');                       //remove attribute checked
		} 
		else 
		{
			$(this).attr('checked', 'checked');                  //otherwise check the box
		}

		$(this).parent().toggleClass('completed');                //add the parent to the class "completed" for strikethrough css
        
        localStorage.setItem('the-list', $('#the-list').html());        //update the local storage to make the checks
    });

//DELETE ITEM FROM LIST
    $(document).on('click', '.destroy', function(e) {       
        $(this).closest('td').remove();                 //finds closest li to the destroy button and deletes it for current session
        count--;                                    //decrement counter by one removed
		localStorage.setItem('the-list', $('#the-list').html());      //update local storage to mark the deleted items
        
        updateCount();                                      //update counter
        localStorage.setItem('stored-counter', JSON.stringify(count));       //update counter as a string in local storage for retrieval
    });

//DELETE ALL FROM LIST
    $('#the-list').on('click', '#delete-all', function(e) {
        e.preventDefault();         //need this to prevent the button from behaving as default
        ('#the-list').empty();      //empty the entire list of li
        count = 0;                  //reset counter
        updateCount();              //update counter
        localStorage.setItem('stored-counter', JSON.stringify(count));       //update counter as a string in local storage for retrieval
    });

//EDIT ITEM
    $('#the-list').on('click', '.edit', function () {
        $(this).closest("td").find("span").prop("contenteditable", true).focus();           //focus on item to edit
        return false;
    });

//CANCEL EDIT BUTTON
    $('#the-list').on("keydown", 'span[contenteditable]', function (e) {
    if (e.which === 13 || e.which === 27)     // if enter or escape key is pressed, deselect current edit and save result
        {
            $(this).blur();                                         //deselect the edit
            localStorage.setItem('the-list', $('#the-list').html()); //once changes have been saved by escaping or hitting enter, save to storage
            return false;
        }
    });
});