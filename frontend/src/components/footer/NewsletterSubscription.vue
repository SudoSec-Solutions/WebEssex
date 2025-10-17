<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiUrl } from '../../utils/api'

const form = reactive({
  email: ''
})

const submitting = ref(false)
const success = ref(false)
const successMessage = ref('')
const error = ref('')
const fieldErrors = reactive({
  email: [] as string[]
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resetState = () => {
  success.value = false
  successMessage.value = ''
  error.value = ''
  fieldErrors.email = []
}

const submit = async () => {
  resetState()

  const email = form.email.trim()

  if (!email) {
    fieldErrors.email.push('Email is required')
    error.value = 'Please enter your email to subscribe.'
    return
  }

  if (!emailPattern.test(email)) {
    fieldErrors.email.push('Enter a valid email address')
    error.value = 'Please double-check your email address.'
    return
  }

  submitting.value = true

  try {
    const payload = {
      email,
      source: 'footer'
    }

    const response = await fetch(apiUrl('/api/subscriptions/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok && response.status !== 409) {
      const contentType = response.headers.get('Content-Type') ?? ''
      if (contentType.includes('application/json')) {
        const body = await response.json().catch(() => null)
        if (body && typeof body === 'object') {
          const data = body as Record<string, unknown>
          const emailErrors = data.email
          if (Array.isArray(emailErrors)) {
            fieldErrors.email = emailErrors.map(String)
          }

          const nonField =
            data.non_field_errors
            ?? data.detail
            ?? data.message

          if (Array.isArray(nonField)) {
            error.value = nonField.map(String).join(' ')
          } else if (typeof nonField === 'string') {
            error.value = nonField
          }
        }
      }

      if (!error.value) {
        error.value = 'We couldn’t save your subscription. Please try again shortly.'
      }

      throw new Error(error.value)
    }

    fieldErrors.email = []
    error.value = ''

    if (response.status === 409) {
      successMessage.value = 'You’re already subscribed — thanks for staying with us.'
    } else {
      successMessage.value = 'Thanks! You’re on the list.'
    }

    success.value = true
    form.email = ''
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
  <section class="newsletter" aria-label="Newsletter subscription">
    <p class="newsletter__title">Subscribe to Newsletter</p>
    <form class="newsletter__form" @submit.prevent="submit">
      <VTextField
        v-model="form.email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        autocomplete="email"
        density="comfortable"
        variant="outlined"
        :disabled="submitting"
        :error-messages="fieldErrors.email"
        hide-details="auto"
        class="newsletter__input"
      />
      <VBtn
        color="secondary"
        type="submit"
        size="large"
        :loading="submitting"
        class="newsletter__button"
      >
        Subscribe
      </VBtn>
    </form>
    <p
      v-if="success"
      class="newsletter__feedback newsletter__feedback--success"
      role="status"
      aria-live="polite"
    >
      {{ successMessage }}
    </p>
    <p
      v-else-if="error"
      class="newsletter__feedback newsletter__feedback--error"
      role="alert"
      aria-live="assertive"
    >
      {{ error }}
    </p>
  </section>
</template>

<style scoped>
.newsletter {
  display: grid;
  gap: 0.4rem;
  width: 100%;
  color: rgb(var(--v-theme-on-primary));
}

.newsletter__title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: inherit;
}

.newsletter__form {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.newsletter__input {
  flex: 1 1 auto;
}

.newsletter__form :deep(.v-field) {
  background: rgba(15, 23, 42, 0.25);
}

.newsletter__button {
  flex: 0 0 auto;
}

.newsletter__feedback {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
}

.newsletter__feedback--success {
  color: rgba(99, 255, 186, 0.92);
}

.newsletter__feedback--error {
  color: rgba(255, 129, 122, 0.92);
}

@media (max-width: 640px) {
  .newsletter__form {
    flex-direction: column;
    align-items: stretch;
  }

  .newsletter__button {
    width: 100%;
  }
}
</style>
