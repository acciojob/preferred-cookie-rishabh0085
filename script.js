//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  var form = document.getElementById("preferencesForm");
  var fontSizeInput = document.getElementById("fontsize");
  var fontColorInput = document.getElementById("fontcolor");

  // Load preferences from cookies, if available
  var savedFontSize = getCookie("fontSize");
  var savedFontColor = getCookie("fontColor");

  if (savedFontSize && savedFontColor) {
    fontSizeInput.value = savedFontSize;
    fontColorInput.value = savedFontColor;
    applyPreferences(savedFontSize, savedFontColor);
  }

  // Apply preferences when form is submitted
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    var fontSize = fontSizeInput.value;
    var fontColor = fontColorInput.value;

    // Save preferences as cookies
    setCookie("fontSize", fontSize, 30); // Expires in 30 days
    setCookie("fontColor", fontColor, 30);

    applyPreferences(fontSize, fontColor);
  });

  // Function to apply user preferences
  function applyPreferences(fontSize, fontColor) {
    document.body.style.fontSize = fontSize + "px";
    document.body.style.color = fontColor;
  }

  // Function to set cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get cookie
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
});
