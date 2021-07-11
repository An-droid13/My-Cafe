/* eslint-env browser */
// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')




update.addEventListener('click', _ => {
  fetch('/orders', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'Accepted'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })

})




deleteButton.addEventListener('click', _ => {
    fetch('/orders', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Accepted'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No orders to delete') {
          messageDiv.textContent = 'No orders to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })