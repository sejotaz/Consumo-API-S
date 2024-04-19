
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(res => res.json())
  .then(data => {

    const tableBody = document.getElementById('bodyTable')

    data.slice(0, 10).forEach(item =>  {
      const row = document.createElement('tr')

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.albumId}</td>
        <td>${item.title}</td>
        <td><img src="${item.url}" width="100px" height="100px" /></td>
        
      `

      tableBody.appendChild(row)
    })
  })