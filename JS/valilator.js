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
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
                break;
              case "checkbox":
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          },
          {});
          options.onsubmit(fromValue);
        }
      } else {
        toast({
          title: "Waring",
          message: "Thất bại",
          type: "waring",
          duration: 3000,
        });
      }
    };
    options.rules.forEach((rule) => {
      //save all rules for less  input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElemnts = formElement.querySelectorAll(rule.selector);
      Array.from(inputElemnts).forEach((inputElemnt) => {
        inputElemnt.onblur = () => {
          validate(inputElemnt, rule);
        };
        inputElemnt.oninput = () => {
          var errorElemnet = getParent(
            inputElemnt,
            options.fromGroupSelector
          ).querySelector(options.errorSelector);
          errorElemnet.innerText = "";
          getParent(inputElemnt, options.fromGroupSelector).classList.remove(
            "invalid"
          );
        };
      });
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
Valilator.isMinght = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message ||
            `Mật khẩu ít nhất có ${min} kí tự và có chữ cái in hoa và số : Myadmin123 `;
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

function register(formData) {
  // Lấy thông tin người dùng từ formData
  const username = formData.inputName;
  const password = formData.inputPassword;
  const email = formDataEmail;
  console.log({ username, password, email });

  // Xác thực dữ liệu, ví dụ kiểm tra tính hợp lệ của email và passwor

  // Gửi thông tin đăng ký đến server
  const requestBody = { username, password, email };
  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      // Xử lý phản hồi từ server
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
