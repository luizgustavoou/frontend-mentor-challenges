/**
 * Check if the value is not empty
 * @param {string} value
 */
function requiredValidation(value) {
  return value != null && value.trim() !== "";
}

/**
 * @param {number} length
 * @param {string} value
 * @returns
 */
function minLengthValidation(length, value) {
  return value.length >= length;
}

/**
 *
 * @param {string} length
 * @param {number} value
 * @returns
 */
function maxLengthValidation(length, value) {
  return value.length <= length;
}

// /**
//  *
//  * @param {string} identifier
//  * @param {string} key
//  * @returns {boolean}
//  */
// function checkIfAttributeExist(identifier, key) {
//   const attr = $(identifier).attr(key);

//   return typeof attr !== "undefined" && attr !== false;
// }

/**
 *
 * @param {any} node
 * @param {string} key
 * @returns {boolean}
 */
function checkIfAttributeExist(node, key) {
  const attr = node.attr(key);

  return typeof attr !== "undefined" && attr !== false;
}

/**
 * Validate the email
 * @param {string} email
 * @returns {boolean}
 */
function emailValidation(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 *
 * @param {string} phone
 * @returns {boolean}
 */
function phoneValidation(phone) {
  // Expressão regular para validar o formato (XX)YYYYY-ZZZZ
  var regex = /^\(\d{2}\)\d{5}-\d{4}$/;

  return regex.test(phone);
}

/**
 * Validate the form
 * @param {Object} form
 * @returns {boolean}
 */
function validateForm() {
  let valid = true;

  $("form .form-step.active")
    .find("input")
    .each(function (index) {
      const $input = $(this);
      const $formItem = $input.closest(".form-item"); // Presumindo que o .form-item é o contêiner do input
      const inputType = $input.attr("type");

      if (inputType === "radio" || inputType === "checkbox") {
        const radioGroupName = $input.attr("name");
        const $radioGroup = $(`input[name='${radioGroupName}']`);
        if (
          $radioGroup.filter(":checked").length === 0 &&
          checkIfAttributeExist($input, "data-is-required")
        ) {
          $formItem.addClass("invalid");
          $formItem.find(".form-message").text("Please select your plan");
          valid = false;
          return;
        } else {
          $formItem.removeClass("invalid");
          $formItem.find(".form-message").text("");
        }
      } else {
        if (checkIfAttributeExist($input, "data-is-required")) {
          if (!requiredValidation($input.val())) {
            $formItem.addClass("invalid");
            $formItem.find(".form-message").text("Field is required ");
            valid = false;
            return;
          } else {
            $formItem.removeClass("invalid");
            $formItem.find(".form-message").text("");
          }
        }

        if (checkIfAttributeExist($input, "data-max")) {
          const maxLength = $input.attr("data-max");

          if (!maxLengthValidation(maxLength, $input.val())) {
            $formItem.addClass("invalid");
            $formItem.find(".form-message").text("Max length is " + maxLength);
            valid = false;
            return;
          } else {
            $formItem.removeClass("invalid");
            $formItem.find(".form-message").text("");
          }
        }

        if (checkIfAttributeExist($input, "data-min")) {
          const minLength = $input.attr("data-min");

          if (!minLengthValidation(minLength, $input.val())) {
            $formItem.addClass("invalid");
            $formItem.find(".form-message").text("Min length is " + minLength);
            valid = false;
            return;
          } else {
            $formItem.removeClass("invalid");
            $formItem.find(".form-message").text("");
          }
        }

        if (checkIfAttributeExist($input, "data-is-email")) {
          if (!emailValidation($input.val())) {
            $formItem.addClass("invalid");
            $formItem.find(".form-message").text("Invalid e-mail");
            valid = false;
            return;
          } else {
            $formItem.removeClass("invalid");
            $formItem.find(".form-message").text("");
          }
        }

        if (checkIfAttributeExist($input, "data-is-phone")) {
          if (!phoneValidation($input.val())) {
            $formItem.addClass("invalid");
            $formItem.find(".form-message").text("Invalid phone number");
            valid = false;
            return;
          } else {
            $formItem.removeClass("invalid");
            $formItem.find(".form-message").text("");
          }
        }
      }
    });

  return valid;
}

/**
 * Next form step
 * @returns {void}
 */
function nextFormStep() {
  if (formStep >= lengthFormStep - 1) return;

  formStep = (formStep + 1) % lengthFormStep;
}

/**
 * Back form step
 * @returns {void}
 */
function backFormStep() {
  if (formStep < 1) return;

  formStep = (formStep - 1) % lengthFormStep;
}

/**
 * Update the form step
 * @returns {void}
 */
function updateFormStep() {
  $form.find(".form-step").each(function (index) {
    if (index == formStep) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });

  $(".step").each(function (index) {
    if (index == formStep) {
      $(this).addClass("filled");
    } else {
      $(this).removeClass("filled");
    }
  });
}

/**
 * Update the button actions
 * @returns {void}
 */
function updateButtonActions() {
  if (formStep > 0) {
    $backButton.css("display", "block");
  } else {
    $backButton.css("display", "none");
  }

  if (formStep < lengthFormStep - 1) {
    $nextButton.css("display", "block");
  } else {
    $nextButton.css("display", "none");
  }
}

function updateForm() {
  updateFormStep();
  updateButtonActions();
}

/**
 * Populate the plans
 */
function populatePlans() {
  const radioContainer = document.querySelector(".radio-container");

  plans.forEach(plan => {
    // <label class="radio-item">
    //   <input type="radio" id="arcade" name="plan" value="arcade" data-is-required>
    //   <img src="./assets/images/icon-arcade.svg" class="icon-type" />
    //   <span class="plan-type">Arcade</span>
    //   <span class="text-muted">$9/mo</span>
    // </label>

    const label = document.createElement("label");

    label.classList.add("radio-item");

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", plan.value);
    input.setAttribute("name", "plan");
    input.setAttribute("value", plan.value);
    input.setAttribute("data-is-required", "");

    const img = document.createElement("img");
    img.setAttribute("src", plan.iconUrl);
    img.classList.add("icon-type");

    const planType = document.createElement("span");
    planType.classList.add("plan-type");
    planType.textContent = plan.title;

    const price = document.createElement("span");
    price.classList.add("text-muted");
    price.textContent = `$${plan.priceMonth}/mo`;

    label.appendChild(input);
    label.appendChild(img);
    label.appendChild(planType);
    label.appendChild(price);

    radioContainer.appendChild(label);
  })
}

/**
 * Populate the addons
 */
function populateAddons() {
  // <label class="checkbox-item">
  //   <div class="container">
  //     <input class="checkmark" type="checkbox" id="online-service" name="addon" value="online-service" data-is-required>
  //     <span class="checkmark"></span>
  //   </div>

  //   <div class="addon-info">
  //     <span class="addon-type">Online service</span>
  //     <span class="text-muted">Access to multiplayer games</span>
  //   </div>
  //   <span class="addon-price">$1/mo</span>

  // </label>

  const checkboxContainer = document.querySelector(".checkbox-container");

  addOns.forEach(addon => {
    const label = document.createElement("label");
    label.classList.add("checkbox-item");

    const container = document.createElement("div");
    container.classList.add("container");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", addon.value);
    input.setAttribute("name", "addon");
    input.setAttribute("value", addon.value);
    input.setAttribute("data-is-required", "");

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    container.appendChild(input);
    container.appendChild(checkmark);

    const addonInfo = document.createElement("div");
    addonInfo.classList.add("addon-info");

    const addonType = document.createElement("span");
    addonType.classList.add("addon-type");
    addonType.textContent = addon.title;

    const description = document.createElement("span");
    description.classList.add("text-muted");
    description.textContent = addon.description;

    addonInfo.appendChild(addonType);
    addonInfo.appendChild(description);

    const price = document.createElement("span");
    price.classList.add("addon-price");
    price.textContent = `$${addon.priceMonth}/mo`;

    label.appendChild(container);
    label.appendChild(addonInfo);
    label.appendChild(price);

    checkboxContainer.appendChild(label);
  })

}


const plans = [
  {
    title: "Arcade",
    value: "arcade",
    priceMonth: 9,
    pricadeYear: 90,
    iconUrl: './assets/images/icon-arcade.svg'
  },
  {
    title: "Advanced",
    value: "advanced",
    priceMonth: 12,
    pricadeYear: 120,
    iconUrl: './assets/images/icon-advanced.svg'
  },
  {
    title: "Pro",
    value: "pro",
    priceMonth: 15,
    pricadeYear: 150,
    iconUrl: './assets/images/icon-pro.svg'
  },
];

const addOns = [
  {
    title: "Online service",
    description: "Access to multiplayer games",
    value: "online-service",
    priceMonth: 1,
    pricadeYear: 10,
  },
  {
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    value: "larger-storage",
    priceMonth: 2,
    pricadeYear: 20,
  },
  {
    title: "Customizable profile",
    description: "Custom theme on your profile",
    value: "customizable-profile",
    priceMonth: 2,
    pricadeYear: 20,
  },
];



let formStep = 0;
const lengthFormStep = 5;

$form = $("form.registration");
$nextButton = $("#next-btn");
$backButton = $("#back-btn");

populatePlans();

updateButtonActions();

populateAddons();

$nextButton.click(() => {
  const valid = validateForm();

  if (valid) {
    nextFormStep();
    updateForm();
  }
});

$backButton.click(() => {
  backFormStep();
  updateForm();
});
