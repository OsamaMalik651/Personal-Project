//Function to generate alert upon form reset
function onReset() {
  alert("Are you sure you want to reset");
}

function onSubmit() {
  alert("Form Submitted");
}

// Focus function to add hint to the selected field
function focusFunction(x) {
  //gets the id of the input element and inject message as p element
  switch (x.id) {
    case "InputEmail1":
      var p = "<p> Please enter email Address <p/>";
      document.getElementById("InputEmail1").insertAdjacentHTML("afterend", p);
      break;
    case "InputPassword":
      var p = "<p> Please enter password (6-20 characters) <p/>";
      document
        .getElementById("InputPassword")
        .insertAdjacentHTML("afterend", p);
      break;
    case "InputPassword1":
      var p = "<p> Please retype the password <p/>";
      document
        .getElementById("InputPassword1")
        .insertAdjacentHTML("afterend", p);
      break;
    case "InputName":
      var p = "<p> Please enter your full name <p/>";
      document.getElementById("InputName").insertAdjacentHTML("afterend", p);
      break;
    case "InputPhone":
      var p = "<p> Please enter your phone number (Format: xxx-xxx-xxxx) <p/>";
      document.getElementById("InputPhone").insertAdjacentHTML("afterend", p);
      break;
    case "InputAddress":
      var p = "<p> Please enter your address <p/>";
      document.getElementById("InputAddress").insertAdjacentHTML("afterend", p);
      break;
    case "PostalCode":
      var p = "<p> Please enter your Postal Code(Format: A2A-2B2) <p/>";
      document.getElementById("PostalCode").insertAdjacentHTML("afterend", p);
      break;
    case "InputEmailLogin":
      var p = "<p> Please enter email Address. <p/>";
      document
        .getElementById("InputEmailLogin")
        .insertAdjacentHTML("afterend", p);
      break;
    case "InputPasswordLogin":
      var p = "<p> Please enter password (6-20 characters) <p/>";
      document
        .getElementById("InputPasswordLogin")
        .insertAdjacentHTML("afterend", p);
      break;
  }
}

//  Blur function removes the injected element afterwards
function blurFunction(x) {
  //Postal Code Verification
  if (x.id == "PostalCode") {
    x.nextElementSibling.remove();
    var regex =
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    var match = regex.exec(x.value);
    if (match) {
      x.nextElementSibling.remove();
    } else {
      var p = "<p> Please enter your Postal Code in correct format <p/>";
      x.insertAdjacentHTML("afterend", p);
      setTimeout(function myfunction() {
        x.nextElementSibling.remove();
      }, 2000);
    }
  } else x.nextElementSibling.remove();
}
