const ENDPOINT = `http://localhost:8080`;
// Memilih elemen DOM
const el = (selector) => document.querySelector(selector);
const [
  todoNav,
  searchNav,
  HomeNav,
  navProfile,
  searchcon,
  displayProfile,
  containerblog,
  Todolist,
  btnPrivate,
  btnPublic,
  addtodo,
  Close,
  SideBarTodo,
  editProfile,
  sidebareditprof,
  postNav,
  absolute,
  uploadImgPost,
  ClosePost,
  imgUploadPost,
  uploadimgtext,
  containerPost,
  btnPost,
  navigasi,
  loginsign,
  profileimgpost,
  ppname,
  imgmodalpost,
  ppmodal,
  namemodal,
  usertextpost,
  comments,
  btnComment,
  inputtodo,
  BtnTodo,
  yourtodolist,
] = [
  ".todo-nav",
  ".search-nav",
  ".Home-nav",
  ".navProfile",
  ".center",
  ".display-profile",
  ".container-blog",
  ".Todo-list",
  ".btn-private",
  ".btn-public",
  ".add-todo",
  ".close",
  ".sidebar-todo",
  ".edit-profile",
  ".sidebar-editprof",
  ".post-nav",
  ".absolute",
  ".upload-img-post",
  ".close-post",
  ".img-upload-post",
  ".upload-img-text",
  ".container-post",
  ".btn-post",
  ".navigasi",
  ".login-sign",
  ".profile-img-post",
  "#pp-name",
  ".img-modal-post",
  "#pp-modal",
  ".name-modal",
  ".user-text-post",
  "#comments",
  "#btn-comment",
  ".inputtodo",
  ".btn-submit-todo",
  ".cuki",
].map((selector) => el(selector));

// loading
let loading = false;


if (!loading) {
  document.querySelector(".blog").innerHTML = `
  <div class="conimage">
  <div class="profile-con-inBlog">
      <div src=""  class="profile-sekeleton"></div>
      <div class="col">

          <h5 class="name-sekeleton"></h5>
          <p class="bio-sekeleton"></p>
      </div>
  </div>
  <div class="blog-sekeleton" ></div>
<div class="content-tulis-and-like">
  <div class="com-like-waktu">
      <div class="com-like-sekeleton">
      </div>
      <p class="time-sekeleton"></p>
      <p class="time-sekeleton"></p>
  </div>
  <div class="tulis">
      <h6 class="text-content-sekeleton"></h6>
  </div>
</div>
</div>
</div>

<div class="conimage">
  <div class="profile-con-inBlog">
      <div src=""  class="profile-sekeleton"></div>
      <div class="col">

          <h5 class="name-sekeleton"></h5>
          <p class="bio-sekeleton"></p>
      </div>
  </div>
  <div class="blog-sekeleton" ></div>
<div class="content-tulis-and-like">
  <div class="com-like-waktu">
      <div class="com-like-sekeleton">
      </div>
      <p class="time-sekeleton"></p>
      <p class="time-sekeleton"></p>
  </div>
  <div class="tulis">
      <h6 class="text-content-sekeleton"></h6>
  </div>
</div>
</div>
</div>
`;
}

// class active untuk navigasi
const all_nav_link = document.querySelectorAll(".nav-coy");
navigasi.addEventListener("click", (e) => {
  if (
    e.target.className == "Home-nav nav-coy" ||
    "search-nav nav-coy" ||
    "todo-nav nav-coy" ||
    "post-nav nav-coy" ||
    "navProfile nav-coy"
  ) {
    all_nav_link.forEach((el) => {
      if (el.classList.contains("ontap")) {
        el.classList.remove("ontap");
      }
    });
    e.target.classList.add("ontap");
  }
});

const token = localStorage.getItem("token");

const closePost = document.querySelectorAll(".close-post");
// Menambahkan event listener ke elemen searchNav dan menampilkan/menyembunyikan searchcon
searchNav.addEventListener("click", () => {
  if (token) {
    searchcon.classList.toggle("active");
  } else {
    loginsign.style.display = "flex";
    containerblog.style.display = "none";
    Todolist.style.display = "none";
  }
});

// Menambahkan event listener ke elemen dokumen dan mengecek apakah user mengklik di luar elemen searchNav dan searchcon untuk menutup searchcon
document.addEventListener("click", (e) => {
  if (![searchNav, searchcon].some((el) => el.contains(e.target))) {
    searchcon.classList.remove("active");
  }
});

// Menambahkan event listener ke elemen HomeNav untuk menampilkan blog dan menyembunyikan todolist dan displayProfile
HomeNav.addEventListener("click", () => {
  [
    containerblog,
    Todolist,
    displayProfile,
    sidebareditprof,
    absolute,
    loginsign,
  ].forEach((el) => (el.style.display = "none"));
  containerblog.style.display = "block";
});

// Menambahkan event listener ke elemen todoNav untuk menampilkan todolist dan menyembunyikan blog dan displayProfile
todoNav.addEventListener("click", () => {
  [
    containerblog,
    Todolist,
    displayProfile,
    sidebareditprof,
    absolute,
    loginsign,
  ].forEach((el) => (el.style.display = "none"));
  Todolist.style.display = "block";
});

// Menambahkan event listener ke elemen navProfile untuk menampilkan displayProfile dan menyembunyikan blog dan todolist

navProfile.addEventListener("click", () => {
  [containerblog, Todolist, displayProfile, sidebareditprof, absolute].forEach(
    (el) => (el.style.display = "none")
  );
  iflogin();
});
const iflogin = () => {
  if (token) {
    displayProfile.style.display = "block";
  } else {
    loginsign.style.display = "flex";
  }
};

// side bar todo
addtodo.addEventListener("click", () => {
  SideBarTodo.classList.toggle("active-side-todo");
});

Close.addEventListener("click", () => {
  SideBarTodo.classList.remove("active-side-todo");
});

// btn private-public todo

btnPrivate.addEventListener("click", () => {
  [btnPrivate, btnPublic].forEach((e) => (e.style.background = "none"));
  btnPrivate.style.background = "#10F5CC";
});
btnPublic.addEventListener("click", () => {
  [btnPrivate, btnPublic].forEach((e) => (e.style.background = "none"));
  btnPublic.style.background = "#10F5CC";
});

editProfile.addEventListener("click", () => {
  [containerblog, Todolist, displayProfile, absolute].forEach(
    (el) => (el.style.display = "none")
  );
  sidebareditprof.style.display = "flex";
});

postNav.addEventListener("click", () => {
  [Todolist, displayProfile, loginsign].forEach(
    (el) => (el.style.display = "none")
  );

  if (token) {
    absolute.style.display = "flex";
    containerblog.style.display = "block";
  } else {
    loginsign.style.display = "flex";
    containerblog.style.display = "none";
  }
});

let cropper;
uploadImgPost.addEventListener("change", async function (e) {
  let path = URL.createObjectURL(e.target.files[0]);
  imgUploadPost.src = path;

  uploadimgtext.style.display = "flex";
  containerPost.style.display = "none";
});

let profileuser;
const profileusers = (data) => {
  profileuser = data;
  ppname.innerHTML = data.name;
  profileimgpost.src = data.image;
};

absolute.addEventListener("submit", (e) => {
  e.preventDefault();

  //  cropper
  // let canvas = cropper.getCroppedCanvas({
  //   width: 500,
  //  height:500,
  // }).toDataURL()

  // var bleb = dataURItoBlob(canvas);

  const input_post = document.querySelector(".input-post");

  const fromdata = new FormData();
  fromdata.append("postText", input_post.value);
  fromdata.append("bio", profileuser.bio);
  fromdata.append("pp", profileuser.image);
  fromdata.append("email", profileuser.email);
  fromdata.set("nameofpost", profileuser.name);
  fromdata.append("image", uploadImgPost.files[0], randomString(20) + ".png");
  fetch(`${ENDPOINT}/YourPost`, {
    method: "POST",
    body: fromdata,
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    })
    .catch((err) => console.log(err));
});

closePost.forEach((e) => {
  e.addEventListener("click", () => {
    window.location = "";
  });
});

// <- get method for map content-Blog -> \\

const blog = document.querySelector(".blog");

const mappContentBlog = async () => {
  let respon = await fetch(`${ENDPOINT}/YourPost`);

  let data = await respon.json();
  let el = "";
  data.map((e) => {
    el += innerContentBlog(e);
    loading = true;
  });
  blog.innerHTML = el;
};

blog.addEventListener("click", (e) => {
  const userinfor = {
    image: e.target.parentElement.dataset.image,
    filter: e.target.parentElement.dataset.filter,
    name: e.target.parentElement.dataset.name,
    pp: e.target.parentElement.dataset.pp,
    text: e.target.parentElement.dataset.text,
    id: e.target.parentElement.dataset.id,
  };
  displayComments(userinfor);

  if (e.target.className == "bi bi-chat-right-fill") {
    pengdisplayan(userinfor);
    hapuspostfun(userinfor);
    btnComment.addEventListener("click", (e) => {
      Commentos(userinfor);
    });
  }
});

let coek = "";
console.log(coek);
const displayComments = async (e) => {
  const res = await fetch(`${ENDPOINT}/comments`);
  const data = await res.json();
  let datacomm = "";
  data
    .filter((resp) => {
      if (resp.filter == e.filter) {
        return resp;
      }
      return resp.filter === e.filter;
    })
    .map((data) => {
      datacomm += commentshtml(data);
    });
  document.querySelector(".map-comment").innerHTML = datacomm;

  const resp = await data.filter((resp) => {
    if (resp.filter == e.filter) {
      return resp;
    }
    return resp.filter === e.filter;
  });
  coek = resp.length += 1;
};
const Commentos = async (userinfor) => {
  const res = await fetch(`${ENDPOINT}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: userinfor.filter,
      nameofcomment: profileuser.name,
      ppofcomment: profileuser.image,
      comment: comments.value,
      email: profileuser.email,
    }),
  }).then(() => {
    displayComments(userinfor);
    fetch(`${ENDPOINT}/putcommmany/${userinfor.filter}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentar: `${coek}`,
      }),
    });
    console.log(coek);
    comments.value = "";
  });
};

const pengdisplayan = (userinfor) => {
  const modalPost = document.querySelector(".modal-post");
  if (profileuser.name == userinfor.name) {
    const hapuspost = document.createElement("h3");
    hapuspost.textContent = "Hapus Post";
    hapuspost.classList.add("hapus-post");
    titik3.appendChild(hapuspost);

    const editPost = document.createElement("h3");
    editPost.textContent = "Edit Post";
    titik3.appendChild(editPost);
  }

  modalPost.style.display = "flex";
  imgmodalpost.src = userinfor.image;
  ppmodal.src = userinfor.pp;
  namemodal.innerHTML = userinfor.name;
  usertextpost.innerHTML = userinfor.text;
};
const innerContentBlog = (e) => {
  return `
  <div class="conimage">
          <div class="profile-con-inBlog">
              <img src="${e.pp}"  class="profile-inBlog">
              <div class="col">

                  <h5>${e.nameofpost}</h5>
                  <p>${e.bio}</p>
              </div>
          </div>
          <img src="${ENDPOINT}/${e.image}" class="img-blog" >
      <div class="content-tulis-and-like">
          <div class="com-like-waktu">
              <div class="com-like" data-id="${e._id}" data-text="${e.postText}" data-pp="${e.pp}" data-name="${e.nameofpost}" data-image="${e.image}" data-filter="${e.filter}">
                  <i class="bi bi-heart-fill"></i>
                  <i class="bi bi-chat-right-fill"><span>${e.comments}</span></i>
              </div>
              <p>${e.date}</p>
              <p>${e.time}</p>
          </div>
          <div class="tulis">
              <h6>${e.postText}</h6>
          </div>
      </div>
  </div>`;
};

const commentshtml = (e) => {
  return `  <div class="comments-user-post">
  <img src="${e.ppofcomment}">
  <div class="text-comm">
      <p><span>${e.nameofcomment}</span>,${e.comment}</p>
      <h6>${e.date}</h6>
  </div>
</div>`;
};

mappContentBlog();

const hapuspost = document.querySelector(".hapus-post");

const hapuspostfun = (data) => {
  titik3.addEventListener("click", (e) => {
    console.log(data);
    if (e.target.className == "hapus-post") {
      fetch(`${ENDPOINT}/YourPost/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: `${data.image}`,
          filter: data.filter,
        }),
      }).then(location.reload());
    }
  });
};

function dataURItoBlob(dataURI) {
  var byteString;

  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

const randomString = (oi) => {
  let random = "";
  let characther =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < oi; i++) {
    random += characther.charAt(Math.floor(Math.random() * characther.length));
  }
  return random;
};

const animate_signup_in = document.querySelector(".animate-signup-in");
const route_signup_sign = document.querySelectorAll(".route-signup-sign");

route_signup_sign.forEach((el) => {
  el.addEventListener("click", () => {
    animate_signup_in.classList.toggle("animate");
  });
});

// todo list

BtnTodo.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputtodo.value !== "") {
    fetch(`${ENDPOINT}/todo-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameofpost: profileuser.name,
        bio: profileuser.bio,
        pp: profileuser.image,
        postText: inputtodo.value, 
        email: profileuser.email,
      }),
    }).then(() => {
      inputtodo.value = "";
      getprofile()
    });
  }
});


const tohtmltodo = (e) => {
  return `
<div class="todo" data-id="${e._id}">
  <h5 class="finish" id="${e.isfinish}">${e.postText}</h5>  
  <i class="bi bi-pencil mrgn-left-5" ></i>
  <i class="bi bi-trash-fill"></i>
</div>
  `;
};

// delete N edit
yourtodolist.addEventListener('click',(e) => {
  e.preventDefault()
  const id = e.target.parentElement.dataset.id
  const finish = e.target.id
  const btnEdittodo = e.target.className == 'bi bi-pencil mrgn-left-5'
  const btnhspustodo = e.target.className == 'bi bi-trash-fill'
  const isfinish = e.target.className == 'finish'
  if(btnhspustodo){
    fetch(`${ENDPOINT}/todo-list/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      body:null
    }).then(getprofile())
  }

  if(btnEdittodo){
   const h5el = e.target.previousElementSibling
   const textareaElement = document.createElement('input');
   textareaElement.classList.add('input-pasmode-edit')
   textareaElement.value = h5el.textContent;


   h5el.replaceWith(textareaElement);
 

   const btnedit = e.target
   const btndelete = e.target.nextElementSibling
   btndelete.style.display =" none"
   const button = document.createElement('button')
   button.classList.add('bi-pencil')


   btnedit.replaceWith(button)
   button.addEventListener('click',() => {
    fetch(`${ENDPOINT}/todo-list/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        postText:textareaElement.value
      })
    }).then(() =>{
      textareaElement.replaceWith(h5el)
      h5el.textContent =  textareaElement
      button.replaceWith(btnedit)
      btndelete.style.display ="block"
      getprofile()
    })
   })
  }

  
  
  if(isfinish){
    
    let isfinishs = finish == "false" ? "true" : "false"
    fetch(`${ENDPOINT}/todo-list/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        isfinish:isfinishs
      })
    }).then(() => {
      getprofile()
    })

  }

})
















// async function image_to_base64(file) {
//   let result_base64 = await new Promise((resolve) => {
//       let fileReader = new FileReader();
//       fileReader.onload = (e) => resolve(fileReader.result);
//       fileReader.onerror = (error) => {
//           console.log(error)
//           alert('An Error occurred please try again, File might be corrupt');
//       };
//       fileReader.readAsDataURL(file);
//   });
//   return result_base64;
// }

// async function process_image(file, min_image_size = 300) {
//   const res = await image_to_base64(file);
//   if (res) {
//       const old_size = calc_image_size(res);
//       if (old_size > min_image_size) {
//           const resized = await reduce_image_file_size(res);
//           const new_size = calc_image_size(resized)
//           console.log('new_size=> ', new_size, 'KB');
//           console.log('old_size=> ', old_size, 'KB');
//           return resized;
//       } else {
//           console.log('image already small enough')
//           return res;
//       }

//   } else {
//       console.log('return err')
//       return null;
//   }
// }

// async function reduce_image_file_size(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
//   let resized_base64 = await new Promise((resolve) => {
//       let img = new Image()
//       img.src = base64Str
//       img.onload = () => {
//           let canvas = document.createElement('canvas')
//           let width = img.width
//           let height = img.height

//           if (width > height) {
//               if (width > MAX_WIDTH) {
//                   height *= MAX_WIDTH / width
//                   width = MAX_WIDTH
//               }
//           } else {
//               if (height > MAX_HEIGHT) {
//                   width *= MAX_HEIGHT / height
//                   height = MAX_HEIGHT
//               }
//           }
//           canvas.width = width
//           canvas.height = height
//           let ctx = canvas.getContext('2d')
//           ctx.drawImage(img, 0, 0, width, height)
//           resolve(canvas.toDataURL()) // this will return base64 image results after resize
//       }
//   });
//   return resized_base64;
// }

// function calc_image_size(image) {
//   let y = 1;
//   if (image.endsWith('==')) {
//       y = 2
//   }
//   const x_size = (image.length * (3 / 4)) - y
//   return Math.round(x_size / 1024)
// }

// cropper = new Cropper(imgUploadPost);
// let source = process_image(e.target.files[0]);

// const res = await image_to_base64(e.target.files[0])
//   console.log(path)
//   if (res) {
//       const path = await reduce_image_file_size(res);
//       console.log(path)
//       var blob = dataURItoBlob(path);
//       var objectURL = URL.createObjectURL(blob);

//       btnPosting(objectURL);
//   } else {
//       console.log('return err')
//   }
