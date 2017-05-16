$(document).ready(() => {
  $('#create-address').click(( event ) => {
    event.preventDefault()
    let streetAddress = $('input[name=apartment]').val();
    $.ajax({
      url: '/apartments',
      method: 'POST',
      data: {'apartment': {'street_address': streetAddress}}
    })
    .done(response => {
      response()
    })
  })
})

