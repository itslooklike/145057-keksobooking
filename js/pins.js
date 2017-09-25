const pinsInit = () => {
  const CLS = {
    pin: 'pin',
    pinActive: 'pin--active',
    pinsWrapper: 'tokyo__pin-map',
    dialog: 'dialog',
    dialogClose: 'dialog__close',
  };

  let currentActivePin = null;

  const pinsWrapper = document.querySelector(`.${CLS.pinsWrapper}`);
  const pins = document.querySelectorAll(`.${CLS.pin}`);
  const dialog = document.querySelector(`.${CLS.dialog}`);
  const dialogCloseBtn = document.querySelector(`.${CLS.dialogClose}`);

  const checkForActivePins = () => {
    pins.forEach(item => {
      if (item.classList.contains(CLS.pinActive)) {
        currentActivePin = item;
        dialogCloseBtn.addEventListener('click', dialogCloseBtnHandler);
      }
    });
  };

  const removeActivePinClass = () => {
    if (currentActivePin) {
      currentActivePin.classList.remove(CLS.pinActive);
    }
  };

  const diactivatePin = () => {
    removeActivePinClass();

    currentActivePin = null;
    dialog.style.display = 'none';

    dialogCloseBtn.removeEventListener('click', dialogCloseBtnHandler);
  };

  const activatePin = pin => {
    removeActivePinClass();

    pin.classList.add(CLS.pinActive);

    currentActivePin = pin;
    dialog.style.display = 'block';

    dialogCloseBtn.addEventListener('click', dialogCloseBtnHandler);
  };

  const pinClickHandler = (self, evt) => {
    let target = evt.target;

    while (target != self) {
      if (target.classList.contains(CLS.pin)) {
        if (target.classList.contains(CLS.pinActive)) {
          diactivatePin();
        } else {
          activatePin(target);
        }

        return;
      }

      target = target.parentNode;
    }
  };

  const dialogCloseBtnHandler = evt => {
    evt.preventDefault();
    diactivatePin();
  };

  const bindedPinClickHandler = pinClickHandler.bind(null, pinClickHandler);
  pinsWrapper.addEventListener('click', bindedPinClickHandler);

  checkForActivePins();
};

module.exports = pinsInit;
