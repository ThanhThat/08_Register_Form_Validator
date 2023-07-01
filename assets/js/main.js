const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$("#form-register").addEventListener("submit", registerHandle);

// lowerCase
$("#username").addEventListener("input", function () {
  this.value = this.value.toLowerCase().trim();
});
// lowerCase
$("#email").addEventListener("input", function () {
  this.value = this.value.toLowerCase().trim();
});

function registerHandle(e) {
  e.preventDefault();

  const formData = {};

  const username = $("#username").value;
  const email = $("#email").value;
  const password = $("#password").value.trim();
  const password2 = $("#password2").value.trim();

  const isFormValid = validator(
    [username, email, password, password2],
    ["Username", "Email", "Password", "Confirm Password"]
  );

  if (
    isFormValid.email &&
    isFormValid.username &&
    isFormValid.password &&
    isFormValid.password2
  ) {
    setTimeout(() => {
      alert("Bạn đã đăng ký thành công!");
    }, 500);
  }
}

function validator(paramList, labelList) {
  let result = {
    username: false,
    email: false,
    password: false,
    password2: false,
  };
  paramList.forEach((param, index) => {
    if (param === "") {
      $(`.form-control:nth-child(${index + 1})`).classList.add("error");
      $(
        `.form-control:nth-child(${index + 1}) > small`
      ).textContent = `${labelList[index]} is required`;
    } else {
      if (labelList[index] === "Username") {
        $(`.form-control:nth-child(${index + 1})`).classList.add("success");
        $(`.form-control:nth-child(${index + 1})`).classList.remove("error");
        $(`.form-control:nth-child(${index + 1}) > small`).textContent = ``;

        result.username = true;
      }

      if (labelList[index] === "Email") {
        if (validateEmail(param)) {
          $(`.form-control:nth-child(${index + 1})`).classList.remove("error");
          $(`.form-control:nth-child(${index + 1})`).classList.add("success");
          $(`.form-control:nth-child(${index + 1}) > small`).textContent = ``;

          result.email = true;
        } else {
          result.email = false;
          $(`.form-control:nth-child(${index + 1})`).classList.add("error");
          $(
            `.form-control:nth-child(${index + 1}) > small`
          ).textContent = `Invalid email. Example: example@example.com`;
        }
      }

      if (labelList[index] === "Password") {
        if (!checkMinLength(param, 6)) {
          $(`.form-control:nth-child(${index + 1})`).classList.add("error");
          $(
            `.form-control:nth-child(${index + 1}) > small`
          ).textContent = `Passwords must be at least 6 characters`;
          result.password = false;
        } else {
          $(`.form-control:nth-child(${index + 1})`).classList.add("success");
          $(`.form-control:nth-child(${index + 1})`).classList.remove("error");
          $(`.form-control:nth-child(${index + 1}) > small`).textContent = ``;
          result.password = true;
        }
      }

      if (labelList[index] === "Confirm Password") {
        if (checkConfirmed(paramList[index - 1], param)) {
          $(`.form-control:nth-child(${index + 1})`).classList.add("success");
          $(`.form-control:nth-child(${index + 1})`).classList.remove("error");
          $(`.form-control:nth-child(${index + 1}) > small`).textContent = ``;
          result.password2 = true;
        } else {
          $(`.form-control:nth-child(${index + 1})`).classList.add("error");
          $(
            `.form-control:nth-child(${index + 1}) > small`
          ).textContent = `Password do not match`;
          result.password2 = false;
        }
      }
    }
  });

  return result;
}

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
}

function checkMinLength(value, min) {
  if (value.length < min) {
    return false;
  } else return true;
}

function checkConfirmed(val1, val2) {
  if (val1.trim() === val2.trim()) {
    return true;
  }
  return false;
}
