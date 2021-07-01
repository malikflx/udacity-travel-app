import { handleSubmit } from './js/formHandler';
// import { countdown } from './js/countdown';
import { checkUrl } from './js/urlChecker';

// Sass
import './styles/resets.scss'
import './styles/header.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/results.scss'
import './styles/form.scss'

document.addEventListener('DOMContentLoaded', () => {
  let btn = document.getElementById('generate');
  btn.addEventListener('click', handleSubmit)
});

export { handleSubmit, checkUrl }