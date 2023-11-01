<template>
  <!-- House listing form -->
  <form class="house-form" @submit="handleSubmit">
    <!-- Street Name input -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="street">Street Name*</label>
        <input v-model="formData.location.street" type="text" id="street"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- House Number and Addition inputs -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="houseNumber">House Number*</label>
        <input v-model="formData.location.houseNumber" type="text" id="houseNumber"/>
        <p class="form-group__error"></p>
      </div>
      <div class="form-group__field">
        <label class="form-group__title" for="houseNumber">Addition (optional)</label>
        <input v-model="formData.location.houseNumberAddition" type="text" id="houseNumberAddition"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Postal Code input -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="street">Postal Code*</label>
        <input v-model="formData.location.zip" type="text" id="zip"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- City input -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="street">City*</label>
        <input v-model="formData.location.city" type="text" id="city"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Image Upload input -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="image">Upload picture (PNG or JPG)*</label>
        <div
          class="image-preview"
          @click="triggerFileInput"
          :class="{ 'image-preview--empty': !isImageSelected }"
        >
          <img
            v-if="isImageSelected"
            :src="previewSrc"
            alt="Image Preview"
            class="image-preview__img"
          />
          <img
            v-else
            src="@/assets/images/ic_upload@3x.png"
            alt="Image Preview"
            class="image-preview__img"
          />
          <img
            v-if="isImageSelected"
            src="@/assets/images/ic_clear_white@3x.png"
            alt="Clear Image"
            class="image-preview__icon"
            @click="clearImage"
          />
        </div>
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImageChange"
          style="display: none"
          ref="fileInput"
        />
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Price input -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="price">Price (&euro;)*</label>
        <input v-model.number="formData.price" type="number" id="price"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Size Field -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="size">Size (m<sup>2</sup>)*</label>
        <input v-model.number="formData.size" type="number" id="size" />
        <p class="form-group__error"></p>
      </div>
      <!-- Has Garage Toggle -->
      <div class="form-group__field">
        <label class="form-group__title">Has Garage*</label>
        <div class="switch">
          <input type="checkbox" id="hasGarage" class="switch__input" v-model="formData.hasGarage" />
          <div class="switch__wrapper">
            <label for="hasGarage" class="switch__label switch__label--yes"><span>Yes</span></label>
            <label for="hasGarage" class="switch__label switch__label--no"><span>No</span></label>
          </div>
        </div>
      </div>
    </div>

    <!-- Bedrooms and Bathrooms inputs -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="bedrooms">Bedrooms*</label>
        <input v-model.number="formData.rooms.bedrooms" type="number" id="bedrooms"/>
        <p class="form-group__error"></p>
      </div>
      <div class="form-group__field">
        <label class="form-group__title" for="bathrooms">Bathrooms*</label>
        <input v-model.number="formData.rooms.bathrooms" type="number" id="bathrooms"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Construction Date input -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="constructionDate">Construction Date*</label>
        <input v-model="formData.constructionYear" type="text" id="constructionYear"/>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Description textarea -->
    <div class="form-group__row">
      <div class="form-group__field">
        <label class="form-group__title" for="description">Description*</label>
        <textarea v-model="formData.description" id="description"></textarea>
        <p class="form-group__error"></p>
      </div>
    </div>

    <!-- Submit button -->
    <button class="button" type="submit">{{ submitButtonText }}</button>
  </form>
</template>

<script setup lang="ts">
import type { HouseFormData, House } from '@/types/House';
import { ref, computed, onMounted, onBeforeMount, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// Vue Router route
const route = useRoute();

// Vuex store
const store = useStore();

// Fetch house data if in edit mode
if (route.params.id) store.dispatch('fetchHouse', route.params.id);

// Computed property for house data
let house = route.params.id ? computed(() => store.getters.getHouseById(route.params.id)) : ref(null);

// Emit method for event handling
const emit = defineEmits(["submit"]);

// Reference to file input element
const fileInput = ref<HTMLInputElement | null>(null);

// Form data object
let formData = reactive({
  location: {
    street: '',
    houseNumber: '',
    houseNumberAddition: '',
    zip: '',
    city: ''
  },
  image: '' as string | File,
  description: '',
  price: 0,
  size: 0,
  rooms: {
    bedrooms: 0,
    bathrooms: 0,
  },
  constructionYear: '',
  hasGarage: false,
});

// Reference to the image element
let imageRef: any = ref(null);

// Remove error class from form fields on mount
onMounted(() => {
  removeErrorClass()
});

// Prefill the form data if editing
if (house.value) {
  formData = { ...house.value };
}

// Watch for changes in house data and update the form data
watch(house, (newValue) => {
  formData = { ...newValue };
});

// Computed properties for form elements
const isImageSelected = computed(() => imageRef.value instanceof File || (formData.image && formData.image.trim() !== ''));
const submitButtonText = computed(() => house.value ? 'Save Changes' : 'Create Listing');
const previewSrc = computed(() => {

  // If an image is selected via input, use it as the source
  if (imageRef.value instanceof File) {
    return URL.createObjectURL(imageRef.value);
  }

  if (formData.image.trim() !== "") {
    return formData.image.trim();
  }

  return null;
});

// Remove error class from form fields and clear error messages
const removeErrorClass = () => {
  const form = document.querySelector('.house-form');
  const fields = form.querySelectorAll('input, textarea, select');

  fields.forEach((field) => {
    // Skip checkboxes
    if (field.type === 'checkbox') return
    field.addEventListener('input', () => {
      field.closest('.form-group__field')?.classList.remove('form-group--error');
      field.nextSibling.innerHTML = '';
    });
  });
};

// Trigger the file input when clicking on the image preview
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click(); // Trigger the hidden file input
  }
};

// Clear the selected image
const clearImage = () => {
  imageRef.value = null; // Clear the image
};

// Handle the change event of the file input and update the selected image
const handleImageChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imageRef.value = file;
    };
    reader.readAsDataURL(file);
  }
};

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Validate the form
  const errors = validateForm(formData);
  if (!errors.length) {

    // Prepare form data for submission
    const payload: HouseFormData = {
      streetName: formData.location.street,
      houseNumber: formData.location.houseNumber,
      numberAddition: formData.location.houseNumberAddition,
      zip: formData.location.zip,
      city: formData.location.city,
      bedrooms: formData.rooms.bedrooms.toString(),
      bathrooms: formData.rooms.bathrooms.toString(),
      size: formData.size.toString(),
      price: formData.price.toString(),
      constructionYear: formData.constructionYear,
      hasGarage: formData.hasGarage.toString(),
      description: formData.description,
    };

    const image = imageRef.value;

    // Emit 'submit' event with formData to the parent component
    emit('submit', { formData: payload, image });
  } else {
    // Handle form validation errors and display appropriate error messages
    const form: Element | null = document.querySelector('.house-form');
    form?.querySelectorAll('.form-group--error').forEach(node => node.classList.remove('form-group--error'));
    form?.querySelectorAll('.form-group__error').forEach(node => node.innerHTML = '');

    errors.forEach(error => {
      console.log(error)
      const field = form?.querySelector(`#${error.field}`);
      field.closest('.form-group__field')?.classList.add('form-group--error');
      field.nextSibling.innerHTML = error.msg;
    });
  }
};

// Define a custom error interface
interface CustomError {
  field: string;
  msg: string;
}

// Form data validation function
const validateForm = (data: any) => {
  // Define an error array
  let errors: Array<CustomError> = [];

  // Implement form validation logic
  if (data.location.street.trim() === '') {
    errors.push({
      field: "street",
      msg: "This is a required field"
    });
  }
  if (data.location.zip.trim() === '') {
    errors.push({
      field: "zip",
      msg: "This is a required field"
    });
  }
  if (data.location.city.trim() === '') {
    errors.push({
      field: "city",
      msg: "This is a required field"
    });
  }
  if (data.rooms.bathrooms < 0) {
    errors.push({
      field: "bathrooms",
      msg: "This is a required field"
    });
  }
  if (data.rooms.bedrooms < 0) {
    errors.push({
      field: "bedrooms",
      msg: "This is a required field"
    });
  }
  if (data.location.houseNumber.toString().trim() === '') {
    errors.push({
      field: "houseNumber",
      msg: "This is a required field"
    });
  }
  if (data.constructionYear.toString().trim() === '') {
    errors.push({
      field: "constructionYear",
      msg: "This is a required field"
    });
  }
  else if (isNaN(parseInt(data.constructionYear, 10)) || parseInt(data.constructionYear, 10) < 1901) {
    errors.push({
      field: "constructionYear",
      msg: "Invalid year. It must be 1901 or later."
    });
  }
  if (data.size <= 0) {
    errors.push({
      field: "size",
      msg: "This is a required field"
    });
  }
  if (data.price <= 0) {
    errors.push({
      field: "price",
      msg: "This is a required field"
    });
  }
  if (!(imageRef.value instanceof File) && (data.image?.trim() === '' || data.image === null)) {
    errors.push({
      field: "image",
      msg: "This is a required field"
    });
  }
  if (data.description.trim() === '') {
    errors.push({
      field: "description",
      msg: "This is a required field"
    });
  }

  return errors;
};
</script>

<style scoped lang="scss">
$inputHeight: 50px;
/* HouseForm styles */
.form-group {
  &__row {
    display: flex;
    gap: var(--spacing-s);
    width: 100%;
  }
  &__field {
    margin-bottom: var(--spacing-m);
    flex: 1;

    input,
    textarea {
      width: 100%;
      padding: 9px;
      border: none;
      border-radius: 4px;
      box-sizing: border-box;
      background: var(--background-color-secondary);
      margin-top: var(--spacing-xs);
    }

    input {
      height: $inputHeight;
    }

    textarea {
      height: 100px;
    }

    input[type='checkbox'] {
      width: auto;
    }
    .image-preview {
      $size:  120px;
      height: $size;
      width: $size;
      border-radius: var(--border-radius);
      position: relative;
      box-sizing: border-box;
      margin-top: var(--spacing-xs);

      &--empty {
        border: 3px dashed var(--font-color-secondary);
        cursor: pointer;


        display: flex;
        align-items: center;
        justify-content: center;
        .image-preview__img {
          height: calc($size/4);
          width: calc($size/4);
        }
      }
      &__img {
        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border-radius: var(--border-radius);
        object-fit: cover;
      }
      &__icon {
        position: absolute;
        top: -0.7rem;
        right: -0.7rem;
        cursor: pointer;
        height: calc($size / 3);
        width: calc($size / 3);
      }
    }

    .switch {
      width: 100%;
      padding: 9px;
      border: none;
      border-radius: 4px;
      box-sizing: border-box;
      background: var(--background-color-secondary);
      margin-top: var(--spacing-xs);
      position: relative;
      display: flex;
      height: $inputHeight;
      &__input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      &__label {
        position: absolute;
        cursor: pointer;
        width: 50%;
        height: 100%;
        text-align: center;
        color: #fff;
        background: #ccc;
        height: $inputHeight;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s background ease;

        &--yes {
          border-radius: 4px 0 0 4px;
          left: 0;
        }

        &--no {
          border-radius: 0 4px 4px 0;
          right: 0;
        }
      }

      &__input[type="checkbox"]:checked + .switch__wrapper {
        .switch__label--yes { background: var(--color-cta); }
        .switch__label--no { background: #ccc; }
      }

      &__input[type="checkbox"]:not(:checked) + .switch__wrapper {
        .switch__label--yes { background: #CCC; }
        .switch__label--no { background: var(--color-cta); }
      }
    }
  }
  &__error {
    margin-top: var(--spacing-xs);
    color: var(--input-error-color);
  }
  &--error {
    input, textarea, select { border: 2px solid var(--input-error-color); }
  }
}
</style>
