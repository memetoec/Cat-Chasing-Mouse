var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var minDistance = 50; // minimum distance between box1 and box2
var maxDistance = 300; // maximum distance before box2 moves
var isMovingBox2 = false;

document.addEventListener('mousemove', function(e) {
  var x = e.clientX;
  var y = e.clientY;

  // Move box1 towards the mouse pointer
  var box1CenterX = box1.offsetLeft + (box1.offsetWidth / 2);
  var box1CenterY = box1.offsetTop + (box1.offsetHeight / 2);

  var dx = x - box1CenterX;
  var dy = y - box1CenterY;
  var angle = Math.atan2(dy, dx);
  var speed = 3;
  var vx = speed * Math.cos(angle);
  var vy = speed * Math.sin(angle);

  box1.style.left = (box1.offsetLeft + vx) + 'px';
  box1.style.top = (box1.offsetTop + vy) + 'px';

  // Check if box1 and box2 overlap
  var box1Rect = box1.getBoundingClientRect();
  var box2Rect = box2.getBoundingClientRect();

  var distance = Math.sqrt(Math.pow(box1Rect.left - box2Rect.left, 2) + Math.pow(box1Rect.top - box2Rect.top, 2));

  if (distance < maxDistance) {
    // Move box2 to a random position
    if (!isMovingBox2 && distance < minDistance) {
      isMovingBox2 = true;
      var newBox2X = Math.floor(Math.random() * (window.innerWidth - box2.offsetWidth));
      var newBox2Y = Math.floor(Math.random() * (window.innerHeight - box2.offsetHeight));

      // Make sure the new position does not overlap with box1
      var newBox2Rect = {left: newBox2X, top: newBox2Y, right: newBox2X + box2.offsetWidth, bottom: newBox2Y + box2.offsetHeight};

      while (newBox2Rect.right > box1Rect.left && newBox2Rect.left < box1Rect.right &&
             newBox2Rect.bottom > box1Rect.top && newBox2Rect.top < box1Rect.bottom) {
        newBox2X = Math.floor(Math.random() * (window.innerWidth - box2.offsetWidth));
        newBox2Y = Math.floor(Math.random() * (window.innerHeight - box2.offsetHeight));

        newBox2Rect = {left: newBox2X, top: newBox2Y, right: newBox2X + box2.offsetWidth, bottom: newBox2Y + box2.offsetHeight};
      }

      box2.style.left = newBox2X + 'px';
      box2.style.top = newBox2Y + 'px';
      isMovingBox2 = false;
    }
  }
});
