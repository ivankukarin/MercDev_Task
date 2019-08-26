let elemEmail = document.querySelector('.email-form-input');
let elemPassword = document.querySelector('.password-form-input');
let btnLogin = document.querySelector('#btnLogin');
let btnLogout = document.querySelector('#btnLogout');
let menuAuthoriz = document.querySelector('.authoriz');
let wrongPassword = menuAuthoriz.querySelector('.incorrect-password');
let profile = document.querySelector('.profile');
let profileAvater = profile.querySelector('.profile-avatar');
let profileName = profile.querySelector('.profile-name');
const url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login'

const gotCorretPassword = () => {
  menuAuthoriz.classList.add('hide');
  profile.classList.add('unhide');
};

const logout = () => {
  menuAuthoriz.classList.remove('hide');
  profile.classList.remove('unhide');
};

const setNameAvatar = (name = 'Nikola Tesla', avatar = 'img/avatar_default.jpg') => {
  profileName.textContent = name;
  profileAvater.src = avatar;

};

// btnLogin.addEventListener('submit', (evt)=>{
//   evt.preventDefault();
//   
//   let xhr = new XMLHttpRequest();
//   xhr.open('POST', 'https://us-central1-mercdev-academy.cloudfunctions.net/login');
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.onreadystatechange = handleFunc;

//   function handleFunc (){
//     if (xhr.readyState === 4 && xhr.status === 200){
//       console.log(xhr.responseText)
//     }
//   }
// })


btnLogin.addEventListener('click', (evt)=>{
  evt.preventDefault();
  let inputEmail = elemEmail.value;
  let inputPassword = elemPassword.value;

  let user = {
    "email": inputEmail,
    "password": inputPassword
  };

  console.log('Поехали!')
  fetch(url, {  
    method: 'post',  
    headers: {  
      'Content-Type': 'application/json;charset=UTF-8'
       
    },  
    body: JSON.stringify(user)  
  })
  .then(response => response.json(),)  
  .then(function (data) {  
    console.log('Request succeeded with JSON response', data);
    let accountName = data.name;
    let accountAvatar = data.photoUrl;
    console.log(accountName);

    setNameAvatar (accountName, accountAvatar);

    gotCorretPassword(); 
  })  
  .catch(function (error) {  
    console.log('Request failed', error);  
  });

  // let result = await response.json();
  // console.log(result.message)
})

btnLogout.addEventListener('click', (evt)=>{
  elemEmail.value = '';
  elemPassword.value = '';
  setNameAvatar();
  logout();
});