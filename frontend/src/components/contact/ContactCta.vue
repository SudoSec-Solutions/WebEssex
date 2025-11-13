<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiUrl } from '../../utils/api'

interface WorkshopFormState {
  date: string
  time: string
  location: string
  email: string
  phone: string
  description: string
}

const dialogOpen = ref(false)
const submitting = ref(false)
const success = ref(false)
const error = ref('')

const form = reactive<WorkshopFormState>({
  date: '',
  time: '',
  location: '',
  email: '',
  phone: '',
  description: ''
})

const fieldErrors = reactive<Record<keyof WorkshopFormState, string[]>>({
  date: [],
  time: [],
  location: [],
  email: [],
  phone: [],
  description: []
})

const resetForm = () => {
  form.date = ''
  form.time = ''
  form.location = ''
  form.email = ''
  form.phone = ''
  form.description = ''
  Object.keys(fieldErrors).forEach((key) => {
    fieldErrors[key as keyof WorkshopFormState] = []
  })
  error.value = ''
  success.value = false
}

const resetErrors = () => {
  (Object.keys(fieldErrors) as Array<keyof WorkshopFormState>).forEach((key) => {
    fieldErrors[key] = []
  })
  error.value = ''
}

const validate = () => {
  let isValid = true
  resetErrors()

  if (!form.date) {
    fieldErrors.date.push('Date is required')
    isValid = false
  }

  if (!form.time) {
    fieldErrors.time.push('Time is required')
    isValid = false
  }

  if (!form.location.trim()) {
    fieldErrors.location.push('Location is required')
    isValid = false
  }

  if (!form.email.trim()) {
    fieldErrors.email.push('Email is required')
    isValid = false
  }

  if (!form.phone.trim()) {
    fieldErrors.phone.push('Telephone is required')
    isValid = false
  }

  if (!form.description.trim()) {
    fieldErrors.description.push('Tell us about your workshop goals')
    isValid = false
  }

  return isValid
}

const openDialog = () => {
  dialogOpen.value = true
  success.value = false
  error.value = ''
}

const closeDialog = () => {
  dialogOpen.value = false
  resetForm()
}

const submitWorkshopRequest = async () => {
  if (!validate()) {
    error.value = 'Please fill in the required fields.'
    return
  }

  submitting.value = true
  error.value = ''

  const normalizedTime = form.time.length === 5 ? `${form.time}:00` : form.time
  const payload = {
    preferred_date: form.date,
    preferred_time: normalizedTime,
    location: form.location,
    email: form.email,
    phone: form.phone,
    description: form.description
  }

  try {
    const response = await fetch(apiUrl('/api/workshop-requests/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      if (data && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          if (key in fieldErrors && Array.isArray(value)) {
            fieldErrors[key as keyof WorkshopFormState] = value.map(String)
          }
        })
      }
      throw new Error('Unable to book the workshop. Please try again later.')
    }

    success.value = true
    error.value = ''
    Object.keys(fieldErrors).forEach((key) => {
      fieldErrors[key as keyof WorkshopFormState] = []
    })
    resetForm()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="contact-cta" aria-labelledby="contact-cta-heading">
    <div class="contact-cta__content">
      <h2 id="contact-cta-heading">Prefer a workshop first?</h2>
      <p>
        We run half-day discovery sessions to help teams align on goals, audiences, and success metrics before we dive
        into delivery.
      </p>
    </div>
    <div class="contact-cta__actions">
      <VBtn color="secondary" variant="flat" size="large" @click="openDialog">
        Book a workshop
      </VBtn>
      <VBtn color="tertiary" variant="outlined" size="large" to="/services">
        View services
      </VBtn>
    </div>
  </section>

  <VDialog v-model="dialogOpen" max-width="520">
    <VCard>
      <VCardTitle class="text-h6">
        Workshop details
      </VCardTitle>
      <VCardText>
        <div class="workshop-form">
          <VTextField
            v-model="form.date"
            type="date"
            label="Preferred date"
            :error-messages="fieldErrors.date"
            required
          />
          <VTextField
            v-model="form.time"
            type="time"
            label="Preferred time"
            :error-messages="fieldErrors.time"
            required
          />
          <VTextField
            v-model="form.location"
            label="Location"
            :error-messages="fieldErrors.location"
            required
          />
          <VTextField
            v-model="form.email"
            label="Email"
            type="email"
            :error-messages="fieldErrors.email"
            required
          />
          <VTextField
            v-model="form.phone"
            label="Telephone"
            type="tel"
            :error-messages="fieldErrors.phone"
            required
          />
          <VTextarea
            v-model="form.description"
            label="Workshop goals"
            rows="3"
            :error-messages="fieldErrors.description"
            required
          />
          <VAlert
            v-if="success"
            type="success"
            variant="tonal"
            class="workshop-form__alert"
          >
            Thanks! We’ll review your workshop request and get in touch shortly.
          </VAlert>
          <VAlert
            v-else-if="error"
            type="error"
            variant="tonal"
            class="workshop-form__alert"
          >
            {{ error }}
          </VAlert>
        </div>
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn variant="text" @click="closeDialog">
          Close
        </VBtn>
        <VBtn color="secondary" @click="submitWorkshopRequest" :loading="submitting">
          Submit request
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
.contact-cta {
  display: grid;
  gap: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.1),
    rgba(var(--v-theme-tertiary), 0.1)
  );
  border-radius: 1.75rem;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  box-shadow: 0 16px 32px rgba(var(--v-theme-on-background), 0.08);
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.contact-cta__content h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  color: rgba(var(--v-theme-on-surface), 0.9);
}

.contact-cta__content p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
}

.contact-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

.workshop-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.workshop-form__alert {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .contact-cta {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .contact-cta__actions {
    justify-content: center;
  }
}
</style>
