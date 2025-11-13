<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiUrl } from '../../utils/api'

interface ContactFormState {
  name: string
  email: string
  phone: string
  company: string
  message: string
  subscribe: boolean
}

const form = reactive<ContactFormState>({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  subscribe: true
})

const submitting = ref(false)
const success = ref(false)
const error = ref('')
const fieldErrors = reactive<Record<keyof ContactFormState, string[]>>({
  name: [],
  email: [],
  phone: [],
  company: [],
  message: [],
  subscribe: []
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = () => {
  let isValid = true
  fieldErrors.name = []
  fieldErrors.email = []
  fieldErrors.phone = []
  fieldErrors.company = []
  fieldErrors.message = []
  fieldErrors.subscribe = []

  if (!form.name.trim()) {
    fieldErrors.name.push('Name is required')
    isValid = false
  }

  if (!form.email.trim()) {
    fieldErrors.email.push('Email is required')
    isValid = false
  } else if (!emailPattern.test(form.email.trim())) {
    fieldErrors.email.push('Enter a valid email address')
    isValid = false
  }

  if (form.phone.trim()) {
    const stripped = form.phone.replace(/[^\d+]/g, '')
    if (stripped.length < 7) {
      fieldErrors.phone.push('Enter a valid phone number')
      isValid = false
    }
  }

  if (!form.message.trim()) {
    fieldErrors.message.push('Please tell us about your project')
    isValid = false
  }

  return isValid
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.company = ''
  form.message = ''
  form.subscribe = true
}

const submit = async () => {
  error.value = ''
  success.value = false
  if (!validate()) {
    error.value = 'Please fix the highlighted fields and try again.'
    return
  }
  submitting.value = true

  try {
    const submissionPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: form.message,
      subscribe_to_updates: form.subscribe
    }
    const shouldSubscribe = form.subscribe

    const response = await fetch(apiUrl('/api/contact-submissions/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionPayload)
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => null)

      if (payload && typeof payload === 'object') {
        Object.entries(payload).forEach(([key, value]) => {
          if (key in fieldErrors && Array.isArray(value)) {
            fieldErrors[key as keyof ContactFormState] = value.map(String)
          }
        })
        const nonFieldErrors = payload.non_field_errors ?? payload.detail
        if (Array.isArray(nonFieldErrors)) {
          error.value = nonFieldErrors.join(' ')
        } else if (typeof nonFieldErrors === 'string') {
          error.value = nonFieldErrors
        }
      }

      if (!error.value) {
        error.value = 'Unable to send message. Please try again shortly.'
      }
      throw new Error(error.value)
    }

    success.value = true
    error.value = ''
    Object.keys(fieldErrors).forEach((key) => {
      fieldErrors[key as keyof ContactFormState] = []
    })

    if (shouldSubscribe) {
      await fetch(apiUrl('/api/subscriptions/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: submissionPayload.email,
          name: submissionPayload.name,
          source: 'contact_form'
        })
      }).catch(() => {
        /* best effort */
      })
    }

    resetForm()
  } catch (err) {
    if (!error.value) {
      error.value = err instanceof Error ? err.message : 'Something went wrong.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="contact-form" aria-labelledby="contact-form-heading">
    <div class="contact-form__header">
      <h2 id="contact-form-heading" class="contact-form__title">
        Send us a message
      </h2>
      <p class="contact-form__subtitle">
        Tell us about your project, timeline, and anything else we should know.
      </p>
    </div>

    <form class="contact-form__form" @submit.prevent="submit">
      <div class="contact-form__grid">
        <VTextField
          v-model="form.name"
          label="Name"
          required
          variant="outlined"
          :error-messages="fieldErrors.name"
        />
        <VTextField
          v-model="form.email"
          label="Email"
          type="email"
          required
          variant="outlined"
          :error-messages="fieldErrors.email"
        />
        <VTextField
          v-model="form.phone"
          label="Phone"
          type="tel"
          placeholder="+44 20 7946 0018"
          variant="outlined"
          :error-messages="fieldErrors.phone"
        />
        <VTextField
          v-model="form.company"
          label="Company"
          variant="outlined"
          :error-messages="fieldErrors.company"
        />
      </div>
      <VTextarea
        v-model="form.message"
        label="Project details"
        required
        variant="outlined"
        rows="4"
        :error-messages="fieldErrors.message"
      />
      <div class="contact-form__footer">
        <VCheckbox
          v-model="form.subscribe"
          label="Keep me posted on WebEssex launches and resources"
          density="compact"
        />
        <VBtn
          color="primary"
          type="submit"
          size="large"
          :loading="submitting"
        >
          Send message
        </VBtn>
      </div>
      <div v-if="success" class="contact-form__alert contact-form__alert--success" role="status" aria-live="polite">
        <VIcon icon="mdi-check-circle" size="20" />
        <span>Thanks! We’ll be in touch shortly.</span>
      </div>
      <div v-if="error" class="contact-form__alert contact-form__alert--error" role="alert" aria-live="assertive">
        <VIcon icon="mdi-alert-circle" size="20" />
        <span>{{ error }}</span>
      </div>
    </form>
  </section>
</template>

<style scoped>

.contact-form {
  position: relative;
  display: grid;
  gap: 1.9rem;
  background: rgba(var(--v-theme-surface), 0.97);
  border-radius: 1.85rem;
  padding: clamp(1.9rem, 4.5vw, 3rem);
  border: 1px solid rgba(var(--contact-form-accent, var(--v-theme-primary)), 0.18);
  box-shadow: 0 20px 40px rgba(var(--v-theme-on-background), 0.12);
  overflow: hidden;
  --contact-form-accent: var(--v-theme-primary);
}

.contact-form::after {
  content: '';
  position: absolute;
  inset: -55% -45% auto;
  background: radial-gradient(circle at top, rgba(var(--contact-form-accent), 0.2), transparent 65%);
  opacity: 0.75;
  pointer-events: none;
}

.contact-form__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-form__title {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.contact-form__subtitle {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.contact-form__form {
  display: grid;
  gap: 1.25rem;
}

.contact-form__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.contact-form__grid :deep(.v-field) {
  background-color: rgba(var(--v-theme-surface), 0.9);
}

.contact-form__form :deep(.v-field--variant-outlined) {
  border-radius: 1rem;
}

.contact-form__form :deep(.v-field--error-not-focused .v-field__outline),
.contact-form__form :deep(.v-field--error .v-field__outline) {
  border-color: rgba(194, 57, 52, 0.6);
}

.contact-form__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.contact-form__alert {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  padding: 0.65rem 1rem;
  border-radius: 0.9rem;
  width: fit-content;
}

.contact-form__alert--success {
  background: rgba(var(--v-theme-secondary), 0.16);
  color: rgb(var(--v-theme-secondary));
}

.contact-form__alert--error {
  background: rgba(var(--v-theme-error), 0.16);
  color: rgb(var(--v-theme-error));
}

@media (max-width: 640px) {
  .contact-form__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .contact-form__footer :deep(.v-input--selection-controls) {
    align-items: flex-start;
  }
}
</style>
