$(document).ready(function () {
  $("html").css("overflow-x", "initial");
  buttonValidation();
  const textContainer = $("#main-text-container");

  if (window.matchMedia("(max-width: 767px)").matches) {
    textContainer.prepend("<h2>Kristoffer Tølbøll</h2>");
    console.log("is mobile");
  } else {
    textContainer.prepend(
      "<h1 style='font-size: 5rem'>Kristoffer Tølbøll</h1>"
    );
    console.log("is desktop");
  }
});

let validations = {
  name: false,
  email: false,
  message: false,
};
$("#special-button").click(function () {
  console.log("click");
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#reservation").offset().top,
    },
    1500
  );
});

$("#year").text(new Date().getFullYear());

$("#name").blur(function () {
  const name = $("#name").val();
  console.log("name is " + name);
  if (name.length < 1) {
    $("#name-error").css({ display: "block" });
    validations.name = false;
  } else {
    $("#name-error").css({ display: "none" });
    validations.name = true;
  }
  buttonValidation();
});

$("#email").blur(function () {
  console.log();
  const email = $("#email").val();
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(regexEmail)) {
    $("#email-error").css({ display: "block" });
    validations.email = false;
  } else {
    $("#email-error").css({ display: "none" });
    validations.email = true;
  }
  buttonValidation();
});

$("#websiteUrl").blur(function () {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regexWebsite = new RegExp(expression);
  const websiteUrl = $("#websiteUrl").val();
  if (!websiteUrl.match(regexWebsite) && websiteUrl !== "") {
    $("#website-error").css({ display: "block" });
    validations.website = false;
  } else {
    $("#website-error").css({ display: "none" });
    validations.website = true;
  }
  buttonValidation();
});

$("#message").blur(function () {
  const message = $("#message").val();

  console.log(message.length);
  if (message.length < 10) {
    $("#message-error").css({ display: "block" });
    validations.message = false;
  } else {
    $("#message-error").css({ display: "none" });
    validations.message = true;
  }
  buttonValidation();
});

function buttonValidation() {
  if (Object.values(validations).includes(false)) {
    console.log("invalid");
    console.log(validations);
    $("#submit-button").attr("disabled", true);
    $("#submit-button").css({ backgroundColor: "grey", opacity: 0.5 });
  } else {
    console.log("valid");
    $("#submit-button").attr("disabled", false);
    $("#submit-button").css({ backgroundColor: "", opacity: 1 });
  }
}

$("form").submit(function (e) {
  // Stop the form submitting
  e.preventDefault();
  // Get the form data
  //TODO make implementation for website and phone
  const formData = {
    name: $("#name").val(),
    email: $("#email").val(),
    message: $("#message").val(),
  };
  console.log(formData);
  $.ajax({
    url: "https://website-backend-kristoffer.herokuapp.com/contact-request",
    type: "POST",
    data: JSON.stringify(formData),
    processData: false,
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      swal("Success!", "Your message has been sent!", "success");
    },
    error: function (error) {
      console.error(error);
    },
  });
});
