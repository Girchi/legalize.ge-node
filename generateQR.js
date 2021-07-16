import QRCode from 'qrcode'

import fetch from 'node-fetch';

async function fetchUsers() {
  const response = await fetch('http://127.0.0.1:3000/assets/js/users.json');
  const users = await response.json()
  return users.data
}

async function generateQRs(){
  let users = await fetchUsers()


  for(let i = 0; i< users.length; i++){
    QRCode.toFile(`generate/QRs/${i}-UserQr.png`, `http://127.0.0.1:3000/user/${users[i].ge.id}`, {
      color: {
        dark: '#000000',  // Blue dots
        light: '#0000' // Transparent background
      }
    }, function (err) {
      if (err) throw err
      console.log('done')
    })
  }

}

generateQRs() 