// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

var height, width, color;
$('#sizePicker').submit(function (event) {
event.preventDefault();
  height = $('#input_height').val();
    width = $('#input_width').val();
  makeGrid(height, width);
})

function makeGrid(row, col){
$('tr').remove();
  for (var i=1; i<=row; i++){
    $('#pixel_canvas').append('<tr id=table' + i + '></tr>');
  for (var j = 1; j<=col; j++){
  $('#table' + i).append('<td></td>');
  }
}
$('td').click(function addColor() {
color = $('#colorPicker').val();
  if($(this).attr('style')) {
    $(this).removeAttr('style')
  } else {
    $(this).attr('style', 'background-color:' + color);
  }
})
}