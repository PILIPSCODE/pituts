// sign up
const ol = (selector) => document.querySelector(selector);
const [
  up,
  nameup,
  emailup,
  pasup,
  repeatpass,
  namein,
  passin,
  inn,
  profileName,
  Bio,
  ppProfile,
  logout,
  Web,
  msgIn,
  msgUp,
  edit_pp_img,
  editNameProfile,
  editBioProfile,
  editWebProfile,
  profile,
  yourcontent,
  titik3,
  clicktitik3,
] = [
  ".up",
  ".name-up",
  ".email-up",
  ".pas-up",
  ".repeat-pass",
  ".name-in",
  ".pass-in",
  ".in",
  ".profile-name",
  ".bio",
  ".pp-profile",
  ".logout",
  ".web",
  ".msg-in",
  ".msg-up",
  ".edit-pp-img",
  ".edit-name-profile",
  ".edit-bio-profile",
  ".edit-web-profile",
  ".profile",
  ".your-content",
  ".titik3",
  ".img-coke"
].map((selector) => ol(selector));

// sign in up
up.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${ENDPOINT}/user/sign`, {
    method: "POST",
    body: JSON.stringify({
      name: nameup.value,
      email: emailup.value,
      password: pasup.value,
      todoispublic:false,
      Ulangpassword: repeatpass.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      if (data.message == "successfuly") {
        animate_signup_in.classList.toggle("animate");
        namein.value = emailup.value;
      } else {
        msgUp.innerHTML = data.message;
      }
    });
});

inn.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`${ENDPOINT}/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email: namein.value,
      password: passin.value,
      Ulangpassword: repeatpass.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.message) {
        localStorage.setItem("token", data.token);
        location.reload();
      } else {
        msgIn.innerHTML = data.message;
      }
    });
});
let profiletod = ''

// profile
const getprofile = async () => {
  const gettoken = localStorage.getItem("token");

 const tokenres =await fetch(`${ENDPOINT}/tokenValid`,{
    method:"POST",
    headers:{
      "token": gettoken
    },
    body:null
  })
 let datarestok = await tokenres.json()
  token = datarestok


if(datarestok){

  fetch(`${ENDPOINT}/profile`, {
    headers: {
      token: gettoken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      profileusers(data);
      profiletod = data
      let name = data.name;
      let bio = data.bio;
      todoget(data.email)
      let image = data.image;
      let web = data.web;
      profileName.innerHTML = name;
      Bio.innerHTML = bio;
      Web.innerHTML = web;
      Web.href = web;
      document.querySelector(".change-pp").src = data.image;
      document.querySelector(".sapaan").innerHTML = name
      
      if (data.image) {
        profile.src = data.image;
      }
      editNameProfile.value = name;
      editBioProfile.value = bio;
      editWebProfile.value = web;
      EditProfile(data);
      if (image == "./img/nologin pic.jpg") {
        ppProfile.src = image;
      } else {
        ppProfile.src = `${ENDPOINT}/${image}`;
      }
    });

  }
  
  const response = await fetch(`${ENDPOINT}/YourPost`);
  const data = await response.json();
  let youcontent = "";
  data
    .filter((data) => {
      if (data.nameofpost == profileuser.name) {
        return data;
      }
      return data.nameofpost === profileuser.name;
    })
    .map((data) => {
      youcontent += mappingpostuserp(data);
    });
  yourcontent.innerHTML = youcontent;

 

  
  
};



getprofile();

edit_pp_img.addEventListener("change", (e) => {
  let path = URL.createObjectURL(e.target.files[0]);
  document.querySelector(".change-pp").src = path;
});
// edit profile
const formedit = document.querySelector(".conEdit-profile");
const EditProfile = (datas) => {
  formedit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", editNameProfile.value);
    formdata.append("email", `${datas.email}`);
    formdata.append("bio", editBioProfile.value);
    formdata.append('imgold',datas.image)
    formdata.append("web", editWebProfile.value);
    if (edit_pp_img.files[0]) {
      formdata.append("image", edit_pp_img.files[0], randomString(20) + ".png");
    }
    fetch(`${ENDPOINT}/upload/${datas.id}`, {
      method: "PUT",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          location.reload();
        }
      })
      .catch((err) => console.log(err));
  });
};

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});

function mappingpostuserp(e) {
  return `
    <img src="${e.image}" data-text="${e.postText}" data-pp="${e.pp}" data-name="${e.nameofpost}" data-image="${e.image}" data-filter="${e.filter}" data-id="${e._id}" class="img-content-profile" width="200">`;
}

// modal-post-profile
yourcontent.addEventListener("click", (e) => {
  const userinfor = {
    image: e.target.dataset.image,
    filter: e.target.dataset.filter,
    name: e.target.dataset.name,
    pp: e.target.dataset.pp,
    text: e.target.dataset.text,
    id:e.target.dataset.id
  };
  if (e.target.className == "img-content-profile") {
    pengdisplayan(userinfor);
    infoacc.style.display = "none"
    hapuspostfun(userinfor)
    displayComments(userinfor)
    btnComment.addEventListener("click", (e) => {
      Commentos(userinfor);
    });
  }
});

clicktitik3.addEventListener('click',(e) => {
    if(e.target.className == "bi bi-three-dots-vertical"){
        titik3.classList.toggle("muncul")
       
    }
})


// todolist

 

const mun = document.querySelectorAll('.mun')

const todoget = async(data) => {
  const rescok = await fetch(`${ENDPOINT}/todo-list`);
  
  const datatodo = await rescok.json();
  let todoString = "";
  datatodo
  .filter((res) => {
      if (res.email == data ) {
        return res;
      }
      return res.email === data;
    })
    .map((data) => {
      
      todoString += tohtmltodo(data)
    });
    yourtodolist.innerHTML = todoString
    
    datatodo.map((datas) => {
      if(datas.email == data){
        if(datas.ismain == true){
           let main = document.querySelector('.yourmaintodo')
           main.innerHTML = datas.postText
           document.querySelector('.yourmaintodo').id = datas.isfinish
           checkbox.dataset.id=datas._id
           setTimeout(() => {

             hapusketika24jam(datas._id)
           },2400000)
           mainTodo.style.display = 'none'
           mun.forEach((mun) => {
            mun.style.display = 'block'
           })
const che = document.querySelector('.yourmaintodo')
           if(che.id == "true"){
            checkbox.checked = true
           }
        }
      }
    })

  
  }  
todoget()



const mainTodo = document.querySelector('.main-todo')
mainTodo.addEventListener('keyup',function(e){
  if (e.keyCode === 13) {
    e.preventDefault();
    sendFormData();
  }
})

const hapusketika24jam = (id) => {

  fetch(`${ENDPOINT}/todo-list/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      body:null
    }).then(getprofile())
}
const sendFormData = () => {
  if (mainTodo.value !== "") {
    fetch(`${ENDPOINT}/todo-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameofpost: profileuser.name,
        bio: profileuser.bio,
        pp: profileuser.image,
        postText: mainTodo.value, 
        email: profileuser.email,
        ismain:true
      }),
    }).then(() => {
      mainTodo.value = "";
      
      getprofile()
    });
  }
}
// const todopub = (data,str) => {
// return`<div class="conimage">
// <div class="profile-con-inBlog">
//     <img src="${data.image}"  class="profile-inBlog">
//     <div class="col">

//         <h5>${data.name}</h5>
//         <p>${data.bio}</p>
//     </div>
// </div>

// <div class="todo-text">
//     <div class="kotak">
        
//     </div>
//     <div class="list">
//        ${str.map((res) => {
//          return`<div class="todo">
//          <h5>${res.postText}</h5>  
//             <input type="checkbox"/>
//              </div>`
//        })}
//    </div>
   
// </div>
// <div class="content-tulis-and-like">
// <div class="com-like-waktu">
//     <div class="com-like">
//         <i class="bi bi-heart-fill"></i>
//     </div>
// </div>
// </div>
// </div>`
// }







const gambarrandom = async() => {
  fetch(`${ENDPOINT}/random-image`).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  }).then(data => {
    const imageUrl = URL.createObjectURL(data);
    const Todolist = document.querySelector('.Todo-list')

    Todolist.style.backgroundImage = `url(${imageUrl})`
  })


}

gambarrandom()


function setCursorPosition(event, input) {
  var rect = input.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var len = input.value.length;
  var pos = Math.round((len * x) / rect.width);
  input.selectionStart = input.selectionEnd = pos;
}