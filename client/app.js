

var IMAGE_WIDTH = 878
var IMAGE_HEIGHT = 375
var IMAGE_RATIO = IMAGE_HEIGHT / IMAGE_WIDTH

var MAX_WIDTH = 600
var MIN_WIDTH = 200

var ITEMS = []

function getNewImageDimensions() {
  var randomWidth = MIN_WIDTH + Math.round(Math.random() * (MAX_WIDTH - MIN_WIDTH))
  var randomHeight = Math.round(IMAGE_RATIO * randomWidth)
  return {
    width: randomWidth,
    height: randomHeight
  }
}

function loadItems(done) {
  $.getJSON('/v1/items', done)
}

function saveItems(done) {
  $.post('/v1/items', JSON.stringify(ITEMS), done, 'json')
}

function resetItems() {
  ITEMS = []
  saveItems(function(response) {
    $('.logo').remove()
  })
}

function addItem(x, y) {
  var size = getNewImageDimensions()
  var data = {
    x: x,
    y: y,
    width: size.width,
    height: size.height
  }
  ITEMS.push(data)
  saveItems(function(response) {
    renderItem(data, true)
  })
}

function renderItem(item, animate) {
  var holder = document.getElementById('holder')
  var elem = document.createElement('div')
  $(elem).addClass('logo')
  $(elem).css({
    left: item.x - (item.width/2) + 'px',
    top: item.y - (item.height/2) + 'px',
    width: item.width + 'px',
    height: item.height + 'px'
  })
  if(animate){
    $(elem).addClass('animated tada')
  }
  holder.appendChild(elem)
}

function renderInitialItems() {
  loadItems(function(items) {
    ITEMS = items
    $('#preloader').hide()
    items.forEach(function(item) {
      renderItem(item, false)
    })
  })
}

function handleClick(e){
  var offset = $(this).offset();
  var x = e.pageX - offset.left;
  var y = e.pageY - offset.top;
  addItem(x, y)
}

$(function(){
  renderInitialItems()
  $('#holder').click(handleClick)
})