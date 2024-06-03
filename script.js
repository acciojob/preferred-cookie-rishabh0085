//your JS code here. If required.
document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('preferenceForm');
  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  function loadPreferences() {
    const savedFontSize = getCookie('fontsize');
    const savedFontColor = getCookie('fontcolor');

    if (savedFontSize) {
      document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
      fontSizeInput.value = savedFontSize;
    }

    if (savedFontColor) {
      document.documentElement.style.setProperty('--fontcolor', savedFontColor);
      fontColorInput.value = savedFontColor;
    }
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const fontSize = fontSizeInput.value;
      const fontColor = fontColorInput.value;

      document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
      document.documentElement.style.setProperty('--fontcolor', fontColor);

      setCookie('fontsize', fontSize, 365);
      setCookie('fontcolor', fontColor, 365);

      alert('Preferences saved!');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  });
  try {
    loadPreferences();
  } catch (error) {
    console.error('Error loading preferences:', error);
  }
});