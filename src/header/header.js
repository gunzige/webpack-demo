import './header.scss';

function render() {
  let headerHtml = require('./header.html');
  let imgHtml = `<img src="${require('./images/gunzige.jpeg')}" />`;

  document.write(headerHtml + imgHtml);
}

export default {
  render,
};
