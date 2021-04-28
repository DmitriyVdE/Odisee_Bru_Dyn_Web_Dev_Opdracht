(function () {
  "use strict";

  window.addEventListener("load", function () {
    console.log("Ready");

    const el = {
      title: document.getElementById("title"),
      input: document.getElementById("textinput"),
      saveA: document.getElementById("save__a"),
      loadA: document.getElementById("load__a"),
      saveB: document.getElementById("save__b"),
      loadB: document.getElementById("load__b"),
      saveC: document.getElementById("save__c"),
      loadC: document.getElementById("load__c"),
      clearAll: document.getElementById("clear__all"),
    };

    function saveToLocalStorage(key, value) {
      localStorage.setItem(key, value);
    }

    function loadFromLocalStorage(key) {
      const loaded = localStorage.getItem(key);
      if (loaded != null) {
        return loaded;
      }
      return `Nothing found in ${key}`;
    }

    function checkInput() {
      const inputText = el.input.value;
      if (inputText != "") {
        return true;
      }
      return false;
    }

    el.saveA.addEventListener("click", function () {
      const inputText = el.input.value;
      if (checkInput()) {
        saveToLocalStorage("savedA", inputText);
      }
    });

    el.loadA.addEventListener("click", function () {
      el.title.innerHTML = loadFromLocalStorage("savedA");
    });

    el.saveB.addEventListener("click", function () {
      const inputText = el.input.value;
      if (checkInput()) {
        saveToLocalStorage("savedB", inputText);
      }
    });

    el.loadB.addEventListener("click", function () {
      el.title.innerHTML = loadFromLocalStorage("savedB");
    });

    el.saveC.addEventListener("click", function () {
      const inputText = el.input.value;
      if (checkInput()) {
        saveToLocalStorage("savedC", inputText);
      }
    });

    el.loadC.addEventListener("click", function () {
      el.title.innerHTML = loadFromLocalStorage("savedC");
    });

    el.clearAll.addEventListener("click", function () {
      localStorage.removeItem("savedA");
      localStorage.removeItem("savedB");
      localStorage.removeItem("savedC");
    });
  });
})();
