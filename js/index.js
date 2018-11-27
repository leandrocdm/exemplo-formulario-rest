const URL = 'http://doae-api.herokuapp.com/endereco';

$('.alert').hide();

$('#btnEnvia').click(evt => {
  evt.preventDefault();
  const array = document.getElementById('registerForm').elements;
  const body = getArrayObj(array);

  fetch(URL, {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: body
  })
    .then(json)
    .then(function (data) {
      $('.alert').show();
      $('.alert').html('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
});

const getArrayObj = form => {
  const obj = {};

  for (let i = 0; i < form.length; i++) {
    const element = form[i];
    if (element.type !== 'submit') {
      let attr = element.name;
      let value = element.value;
      if(value !== '') {
        if(attr === 'numero') {
          value = parseInt(value);
          obj[attr] = value;
          break;
        }
        if (attr === 'latitude' || attr === 'longitude') {
          obj[attr] = parseFloat(value);
        } else {
          obj[attr] = element.value;
        }
      }
    }
  }
  console.log(obj);
};