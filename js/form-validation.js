const ACTIVE = "active";
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isNotEmpty = {
  validate: (input) => input.trim().length > 0,
  errorMessage: (inputName) => `${inputName} cannot be empty`,
};

const isAValidEmail = {
  validate: (input) => emailRegExp.test(input),
  errorMessage: (inputName) => `Looks like this is not a ${inputName}`,
};

function addValidation({ formId, validations }) {
  const form = document.getElementById(formId);
  const inputFields = form.querySelectorAll("input");

  function validateInput(input, validations) {
    const errorSpan = input.nextElementSibling;
    const violations = validations.reduce((acc, validation) => {
      if (!validation.validate(input.value)) {
        acc.push(validation);
      }
      return acc;
    }, []);

    if (violations.length > 0) {
      input.className = "invalid";
      errorSpan.textContent = violations[0].errorMessage(input.placeholder);
      errorSpan.classList.add(ACTIVE);
    }
  }

  inputFields.forEach((input) => {
    const errorSpan = input.nextElementSibling;
    input.addEventListener("blur", () =>
      validateInput(input, validations[input.id])
    );
    input.addEventListener("focus", () => {
      input.className = "";
      errorSpan.classList.remove(ACTIVE);
      errorSpan.textContent = "";
    });
  });
}

addValidation({
  formId: "form",
  validations: {
    "first-name": [isNotEmpty],
    "last-name": [isNotEmpty],
    email: [isNotEmpty, isAValidEmail],
    password: [isNotEmpty],
  },
});
