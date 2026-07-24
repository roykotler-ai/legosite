(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var bricks = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduced){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, i){
        if(entry.isIntersecting){
          var el = entry.target;
          var delay = Array.prototype.indexOf.call(bricks, el) % 3 * 90;
          setTimeout(function(){ el.classList.add('is-visible'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: .2 });
    bricks.forEach(function(b){ io.observe(b); });
  } else {
    bricks.forEach(function(b){ b.classList.add('is-visible'); });
  }

  var toast = document.querySelector('.toast');
  var toastTimer;
  document.querySelectorAll('.brick:not(.brick--ghost)').forEach(function(b){
    b.addEventListener('click', function(){
      var cat = b.getAttribute('data-cat');
      toast.textContent = 'התמונות של "' + cat + '" יתווספו בקרוב';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2600);
    });
  });
})();
