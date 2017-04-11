$(document).ready(() => {
  $('#address_search').on('click', (event) => { 
    event.preventDefault()
    let streetAddress = $('input[name=apartment]').val()
    $.ajax({
      url: '/apartments/find',
      method: 'GET',
      data: {"street_address": streetAddress}
    })
    .done(response => {
      response()
    }) 
    .fail((error) => {
      $('.modal').modal()
    })
  })
}) 
