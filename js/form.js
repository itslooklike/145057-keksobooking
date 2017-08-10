const formInit = () => {
  const initInputs = () => {
    const setInputRequired = input => {
      input.setAttribute('required', '');
    };

    const titleInput = document.querySelector('#title');

    setInputRequired(titleInput);
    titleInput.setAttribute('minlength', '30');
    titleInput.setAttribute('maxlength', '100');

    const priceInput = document.querySelector('#price');

    setInputRequired(priceInput);
    priceInput.setAttribute('type', 'number');
    priceInput.setAttribute('min', '1000');
    priceInput.setAttribute('max', '1000000');

    const addressInput = document.querySelector('#address');

    setInputRequired(addressInput);
  };

  const initInputsSync = () => {
    const timeInput = document.querySelector('#time');
    const timeoutInput = document.querySelector('#timeout');

    const timeOptionsSyncHandler = (prime, sec) => {
      if (prime.selectedIndex > sec.selectedIndex) {
        sec.selectedIndex = prime.selectedIndex;
      }
    };

    const timeoutOptionsSyncHandler = (prime, sec) => {
      if (prime.selectedIndex < sec.selectedIndex) {
        sec.selectedIndex = prime.selectedIndex;
      }
    };

    const timeInputSyncHandler = timeOptionsSyncHandler.bind(null, timeInput, timeoutInput);
    const timeoutInputSyncHandler = timeoutOptionsSyncHandler.bind(null, timeoutInput, timeInput);

    timeInput.addEventListener('change', timeInputSyncHandler);
    timeoutInput.addEventListener('change', timeoutInputSyncHandler);
  };

  const initFlatInputSync = () => {
    const FLAT_MAP = [
      { name: 'Квартира', price: '1 000' },
      { name: 'Лачуга', price: '0' },
      { name: 'Дворец', price: '10 000' },
    ];

    const typeInput = document.querySelector('#type');
    const priceInput = document.querySelector('#price');

    const setPriceInputValue = ({ price }) => {
      if (price) {
        priceInput.placeholder = `от ${price}`;
        priceInput.min = parseInt(price.replace(' ', ''), 10);
      }
    };

    const flatInputSyncHandler = evt => {
      const selectedOption = evt.target.selectedOptions[0].label;
      const res = FLAT_MAP.find(item => item.name === selectedOption);

      setPriceInputValue(res);
    };

    typeInput.addEventListener('change', flatInputSyncHandler);
  };

  const initRoomInputSync = () => {
    const GUEST_MAP = [
      { name: '1 комната', value: 'for3guest' },
      { name: '2 комнаты', value: 'for3guest' },
      { name: '100 комнат', value: 'noGuest' },
    ];

    const roomInput = document.querySelector('#room_number');
    const capacityInput = document.querySelector('#capacity');

    const setCapacityInputValue = ({ value }) => {
      const valueToTrigger = 'noGuest';

      if (value === valueToTrigger) {
        capacityInput.selectedIndex = Array.from(capacityInput.options).findIndex(
          item => item.value === value
        );
      }
    };

    const roomInputSyncHandler = evt => {
      const selectedOption = evt.target.selectedOptions[0].label;
      const res = GUEST_MAP.find(item => item.name === selectedOption);

      setCapacityInputValue(res);
    };

    roomInput.addEventListener('change', roomInputSyncHandler);
  };

  initInputs();
  initInputsSync();
  initFlatInputSync();
  initRoomInputSync();
};

module.exports = formInit;
