// Function Valitor contructor function
function Valilator(options) {
  function validate(inputElemnt, rule) {
    var errorElemnet = inputElemnt.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage = rule.test(inputElemnt.value);
    if (errorMessage) {
      errorElemnet.innerText = errorMessage;
      inputElemnt.parentElement.classList.add("invalid");
    } else {
      errorElemnet.innerText = "";
      inputElemnt.parentElement.classList.remove("invalid");
    }
  }
  const formElement = document.querySelector(options.from);
  if (formElement) {
    options.rules.forEach((rule) => {
      var inputElemnt = formElement.querySelector(rule.selector);
      var errorElemnet = inputElemnt.parentElement.querySelector(
        options.errorSelector
      );
      var errorMessage = rule.test(inputElemnt.value);
      if (inputElemnt) {
        inputElemnt.onblur = () => {
          validate(inputElemnt, rule);
        };
        inputElemnt.oninput = () => {
          errorElemnet.innerText = "";
          inputElemnt.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

//InitState all rules
Valilator.isRequired = function (selector, min = 8) {
  return {
    selector: selector,
    test: function (value) {
      const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;
      return value.length >= min && regex.test(value)
        ? undefined
        : `Mật khẩu ít nhất có ${min} kí tự và có chữ cái in hoa và số : Myadmin123 `;
    },
  };
};
Valilator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(value) ? undefined : "Bạn Nhập không vài là email";
    },
  };
};
