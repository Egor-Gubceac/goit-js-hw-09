const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    emailInput.value = formData.email;
    messageInput.value = formData.message;
  } catch {}
}

loadFormData();

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (!(name in formData)) return;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
