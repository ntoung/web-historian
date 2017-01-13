var app = {
  
  server: 'http://127.0.0.1:3000/classes/messages/',

  init: function() {
    console.log('app initialized');
    // Cache jQuery selectors
    app.$form = $('form');
    app.$input = app.$form.find('input[name="url"]');

    // Add listeners
    // app.$form.on('submit', () => app.handleSubmit(event));
    app.$form.on('submit', app.handleSubmit);
    // app.$form.on('submit', function(event) {
      
    //   console.log(event);
    //   console.log(event.target.childNodes[1].value === "hello");
    //   // console.log(event.target.childNodes.input.value);
    //   // console.log(app.$form.val());
    //   event.preventDefault();
    // });
  },

  handleSubmit: function(event) {
    var url = app.$input.val();
    console.log('handling submit of: ' + url);
    
    // SEND A GET REQUEST:
      //if we throw an error, send a post request, and redirect to loading.html
      //else we have the page, so redirect there.


    // Alternativley, we could send a POST REQUEST:


    
    // prevent page from refreshing
    app.$input.val('');
    event.preventDefault();
    
  }
};



/************************

1. Added jquery (still should organize?);
2. put the listener on form, rather than on input
3. prevent default
4. got the correct value...

**********************/