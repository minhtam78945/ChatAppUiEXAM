// Function Valitor contructor function
function Valilator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) return element.parentElement;
      element = element.parentElement;
    }
  }
  var selectorRules = {};
  function validate(inputElemnt, rule) {
    var errorElemnet = getParent(
      inputElemnt,
      options.fromGroupSelector
    ).querySelector(options.errorSelector);
    var errorMessage;
    var rules = selectorRules[rule.selector];
    console.log(rules);
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElemnt.value);
      if (errorMessage) break;
    }
    if (errorMessage) {
      errorElemnet.innerText = errorMessage;
      getParent(inputElemnt, options.fromGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElemnet.innerText = "";
      getParent(inputElemnt, options.fromGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !errorMessage;
  }
  const formElement = document.querySelector(options.from);
  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();
      var isFromValid = true;
      options.rules.forEach((rule) => {
        var inputElemnt = formElement.querySelector(rule.selector);
        var isValid = validate(inputElemnt, rule);
        if (!isValid) {
          isFromValid = false;
        }
      });

      if (isFromValid) {
        console.log("Success");
        if (typeof options.onsubmit === "function") {
          var fromEnableInputs = formElement.querySelectorAll("[name]");

          var fromValue = Array.from(fromEnableInputs).reduce(function (
            values,
            input
          ) {
            values[input.name] = input.value;
            return values;
          },
          {});
          options.onsubmit(fromValue);
        }
      } else {
        console.log("Error");
      }
    };
    options.rules.forEach((rule) => {
      //save all rules for less  input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElemnt = formElement.querySelector(rule.selector);
      var errorElemnet = getParent(
        inputElemnt,
        options.fromGroupSelector
      ).querySelector(options.errorSelector);
      var errorMessage = rule.test(inputElemnt.value);
      if (inputElemnt) {
        inputElemnt.onblur = () => {
          validate(inputElemnt, rule);
        };
        inputElemnt.oninput = () => {
          errorElemnet.innerText = "";
          getParent(inputElemnt, options.fromGroupSelector).classList.remove(
            "invalid"
          );
        };
      }
    });
    console.log(selectorRules);
  }
}

//InitState all rules
Valilator.isRequired = (selector, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value.trim()
        ? undefined
        : message || "Username không được bỏ trống";
    },
  };
};
Valilator.isMinght = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
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
Valilator.isConfirmed = (selector, getConfirmValue, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập không chính xác";
    },
  };
};
