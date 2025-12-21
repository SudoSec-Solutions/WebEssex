<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { apiUrl } from '../../utils/api'

interface PlanCard {
  name: string
  price: string
  summary: string
  features: string[]
  accent: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'neutral' | 'custom'
  ctaLabel: string
}

const plans: PlanCard[] = [
  {
    name: 'Starter',
    price: '£199',
    summary: 'Single-page launch for founders who need speed and clarity.',
    features: [
      'Single-page launch site',
      'Basic layout + contact form',
      'Mobile responsive build',
      'GDPR compliance included',
      '1 revision round',
      '5-7 day delivery'
    ],
    accent: 'primary',
    ctaLabel: 'Start small'
  },
  {
    name: 'Essentials',
    price: '£699',
    summary: 'A polished multi-page site with brand polish and analytics.',
    features: [
      'Up to 3 pages',
      'Logo + brand design',
      'Light SEO setup + analytics',
      'GDPR compliance included',
      '2 revision rounds',
      '~2 week delivery'
    ],
    accent: 'secondary',
    ctaLabel: 'Book essentials'
  },
  {
    name: 'Growth',
    price: '£1,500',
    summary: 'Full marketing site with UX, content structure, and launch support.',
    features: [
      '5-7 pages',
      'Logo + brand design',
      'UX + UI design pass',
      'Blog setup + SEO foundations',
      'GDPR compliance + 24/7 SOC',
      '3 revision rounds',
      '~3-4 week delivery'
    ],
    accent: 'tertiary',
    ctaLabel: 'Choose growth'
  },
  {
    name: 'Scale',
    price: '£2,500',
    summary: 'More pages, performance focus, and a stronger design system base.',
    features: [
      '8-12 pages',
      'Logo + brand design',
      'Design system starter',
      'Performance optimisation',
      'Launch QA + handover',
      'GDPR compliance + 24/7 SOC',
      '4 revision rounds',
      '~5-6 week delivery'
    ],
    accent: 'custom',
    ctaLabel: 'Scale up'
  },
  {
    name: 'Custom',
    price: 'From £2,500+',
    summary: 'Discovery and roadmap for complex builds or multi-phase launches.',
    features: [
      'Discovery workshop + stakeholder alignment',
      'Research-backed roadmap and scope',
      'Pricing tailored to complexity',
      'Ideal for multi-site or product builds'
    ],
    accent: 'quaternary',
    ctaLabel: 'Request workshop'
  }
]

interface LeadFormState {
  name: string
  email: string
  phone: string
  company: string
  plan: string
  message: string
  privacy: boolean
}

const dialogOpen = ref(false)
const selectedPlan = ref<PlanCard | null>(null)

const form = reactive<LeadFormState>({
  name: '',
  email: '',
  phone: '',
  company: '',
  plan: '',
  message: '',
  privacy: false
})

const submitting = ref(false)
const success = ref(false)
const error = ref('')
const fieldErrors = reactive<Record<keyof LeadFormState, string[]>>({
  name: [],
  email: [],
  phone: [],
  company: [],
  plan: [],
  message: [],
  privacy: []
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const planOptions = computed(() => plans.map((plan) => plan.name))

const resolveButtonColor = (accent: PlanCard['accent']) => {
  if (accent === 'neutral') {
    return 'secondary'
  }
  if (accent === 'quaternary') {
    return 'accent'
  }
  if (accent === 'custom') {
    return undefined
  }
  return accent
}

const openDialog = (plan: PlanCard) => {
  selectedPlan.value = plan
  form.plan = plan.name
  success.value = false
  error.value = ''
  Object.keys(fieldErrors).forEach((key) => {
    fieldErrors[key as keyof LeadFormState] = []
  })
  dialogOpen.value = true
}

const validate = () => {
  let isValid = true
  fieldErrors.name = []
  fieldErrors.email = []
  fieldErrors.phone = []
  fieldErrors.company = []
  fieldErrors.plan = []
  fieldErrors.message = []
  fieldErrors.privacy = []

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

  if (!form.plan.trim()) {
    fieldErrors.plan.push('Please select a plan')
    isValid = false
  }

  if (!form.privacy) {
    fieldErrors.privacy.push('Please confirm you agree to the privacy policy')
    isValid = false
  }

  return isValid
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.company = ''
  form.plan = selectedPlan.value?.name ?? ''
  form.message = ''
  form.privacy = false
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
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      plan: form.plan,
      message: form.message,
      consent_privacy: form.privacy
    }

    const response = await fetch(apiUrl('/api/leads/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => null)

      if (payload && typeof payload === 'object') {
        Object.entries(payload).forEach(([key, value]) => {
          if (key === 'consent_privacy' && Array.isArray(value)) {
            fieldErrors.privacy = value.map(String)
          } else if (key in fieldErrors && Array.isArray(value)) {
            fieldErrors[key as keyof LeadFormState] = value.map(String)
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
        error.value = 'Unable to submit your request. Please try again shortly.'
      }
      throw new Error(error.value)
    }

    success.value = true
    error.value = ''
    Object.keys(fieldErrors).forEach((key) => {
      fieldErrors[key as keyof LeadFormState] = []
    })
    resetForm()
  } catch (err) {
    if (!error.value) {
      error.value = err instanceof Error ? err.message : 'Something went wrong.'
    }
  } finally {
    submitting.value = false
  }
}

watch(dialogOpen, (isOpen) => {
  if (!isOpen) {
    success.value = false
    error.value = ''
  }
})

watch(
  () => form.plan,
  (value) => {
    const matched = plans.find((plan) => plan.name === value)
    if (matched) {
      selectedPlan.value = matched
    }
  }
)
</script>

<template>
  <section class="services-plans" aria-labelledby="services-plans-heading">
    <header class="services-plans__header">
      <VChip color="secondary" variant="tonal" size="large" class="services-plans__badge">
        Clear, fixed pricing
      </VChip>
      <h2 id="services-plans-heading" class="services-plans__title">
        Plans that make scope predictable
      </h2>
      <p class="services-plans__subtitle">
        Choose a plan that fits your launch stage. Every plan includes GDPR compliance, and Essentials or above includes
        logo and brand design.
      </p>
    </header>

    <div class="services-plans__grid">
      <article v-for="plan in plans" :key="plan.name" :class="['plan-card', `plan-card--${plan.accent}`]">
        <div class="plan-card__glow" aria-hidden="true" />
        <div class="plan-card__header">
          <p class="plan-card__name">{{ plan.name }}</p>
          <p class="plan-card__price">{{ plan.price }}</p>
        </div>
        <p class="plan-card__summary">{{ plan.summary }}</p>
        <ul class="plan-card__features">
          <li v-for="feature in plan.features" :key="feature">
            <VIcon icon="$mdi-check-circle" size="18" class="plan-card__icon" />
            <span>{{ feature }}</span>
          </li>
        </ul>
        <div class="plan-card__actions">
          <VBtn
            :color="resolveButtonColor(plan.accent)"
            variant="flat"
            size="large"
            :class="['plan-card__button', { 'plan-card__button--custom': plan.accent === 'custom' }]"
            @click="openDialog(plan)"
          >
            {{ plan.ctaLabel }}
          </VBtn>
        </div>
      </article>
    </div>

    <p class="services-plans__note">
      Growth and Scale include 24/7 SOC monitoring. Custom workshops start at £2,500+.
    </p>

    <VDialog v-model="dialogOpen" max-width="720">
      <VCard class="plan-dialog">
        <VCardTitle class="plan-dialog__title">
          <span>Request the {{ selectedPlan?.name || 'Plan' }}</span>
        </VCardTitle>
        <VCardText class="plan-dialog__body">
          <p class="plan-dialog__subtitle">
            Share your details and we will confirm scope, timing, and next steps.
          </p>
          <form class="plan-dialog__form" @submit.prevent="submit">
            <div class="plan-dialog__grid">
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
              <VSelect
                v-model="form.plan"
                :items="planOptions"
                label="Selected plan"
                variant="outlined"
                :error-messages="fieldErrors.plan"
              />
            </div>
            <VTextarea
              v-model="form.message"
              label="Project details (optional)"
              variant="outlined"
              rows="4"
              :error-messages="fieldErrors.message"
            />
            <div class="plan-dialog__consent">
              <VCheckbox
                v-model="form.privacy"
                label="I agree to the Privacy Policy"
                density="compact"
                :error-messages="fieldErrors.privacy"
              />
              <RouterLink to="/privacy">Read the Privacy Policy</RouterLink>
            </div>
            <div class="plan-dialog__actions">
              <VBtn variant="text" @click="dialogOpen = false">
                Close
              </VBtn>
              <VBtn color="primary" type="submit" size="large" :loading="submitting">
                Send request
              </VBtn>
            </div>
            <div v-if="success" class="plan-dialog__alert plan-dialog__alert--success" role="status" aria-live="polite">
              <VIcon icon="$mdi-check-circle" size="20" />
              <span>Thanks! We will be in touch shortly.</span>
            </div>
            <div v-if="error" class="plan-dialog__alert plan-dialog__alert--error" role="alert" aria-live="assertive">
              <VIcon icon="$mdi-alert-circle" size="20" />
              <span>{{ error }}</span>
            </div>
          </form>
        </VCardText>
      </VCard>
    </VDialog>
  </section>
</template>

<style scoped>
.services-plans {
  display: flex;
  flex-direction: column;
  gap: clamp(1.75rem, 4vw, 2.75rem);
}

.services-plans__header {
  text-align: center;
  display: grid;
  gap: 0.85rem;
  justify-items: center;
}

.services-plans__badge {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
}

.services-plans__title {
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.services-plans__subtitle {
  margin: 0;
  max-width: 48rem;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.65;
}

.services-plans__grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  align-items: stretch;
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
  padding: 2.1rem 1.9rem;
  border-radius: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.96);
  border: 1px solid rgba(var(--plan-accent-rgb, var(--v-theme-primary)), 0.14);
  box-shadow: 0 20px 38px rgba(var(--v-theme-on-background), 0.08);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
  --plan-accent-rgb: var(--v-theme-primary);
  --plan-glow-opacity: 0.22;
}

.plan-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 46px rgba(var(--v-theme-on-background), 0.14);
}

.plan-card__glow {
  position: absolute;
  inset: -40% -40% auto;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle at top, rgba(var(--plan-accent-rgb), var(--plan-glow-opacity)), transparent 60%);
  opacity: 0.7;
  pointer-events: none;
}

.plan-card__tag {
  position: relative;
  z-index: 1;
  width: fit-content;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  background: rgba(var(--plan-accent-rgb), 0.16);
  color: rgb(var(--plan-accent-rgb));
  box-shadow: 0 12px 20px rgba(var(--v-theme-on-background), 0.08);
}

.plan-card__header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.plan-card__name {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--v-theme-on-surface), 0.92);
}

.plan-card__summary {
  position: relative;
  z-index: 1;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.72);
  line-height: 1.5;
}

.plan-card__price {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  color: rgb(var(--plan-accent-rgb));
  white-space: nowrap;
}

.plan-card__features {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: rgba(var(--v-theme-on-surface), 0.76);
  flex: 1;
}

.plan-card__features li {
  display: inline-flex;
  gap: 0.6rem;
  align-items: flex-start;
}

.plan-card__icon {
  color: rgba(var(--plan-accent-rgb), 0.9);
  margin-top: 0.1rem;
}

.plan-card__actions {
  position: relative;
  z-index: 1;
  margin-top: auto;
  display: flex;
}

.plan-card__button {
  align-self: flex-start;
  box-shadow: 0 12px 24px rgba(var(--v-theme-on-background), 0.1);
}

.plan-card__button--custom {
  background-color: rgb(var(--plan-accent-rgb));
  color: #fff;
}

.plan-card__button--custom:hover {
  filter: brightness(1.05);
}

.plan-card--primary {
  --plan-accent-rgb: var(--v-theme-primary);
}

.plan-card--secondary {
  --plan-accent-rgb: var(--v-theme-secondary);
}

.plan-card--tertiary {
  --plan-accent-rgb: var(--v-theme-tertiary);
}

.plan-card--quaternary {
  --plan-accent-rgb: var(--v-theme-accent);
}

.plan-card--neutral {
  --plan-accent-rgb: var(--v-theme-on-surface);
  --plan-glow-opacity: 0.12;
}

.plan-card--custom {
  --plan-accent-rgb: 12, 119, 194;
  --plan-glow-opacity: 0.2;
}

.services-plans__note {
  margin: 0;
  text-align: center;
  color: rgba(var(--v-theme-on-background), 0.7);
  font-size: 0.95rem;
}

.plan-dialog {
  background: rgba(var(--v-theme-surface), 0.98);
  border-radius: 1.5rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  box-shadow: 0 24px 48px rgba(var(--v-theme-on-background), 0.16);
}

.plan-dialog__title {
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.plan-dialog__body {
  display: grid;
  gap: 1.25rem;
}

.plan-dialog__subtitle {
  margin: 0;
  color: rgba(var(--v-theme-on-background), 0.78);
}

.plan-dialog__form {
  display: grid;
  gap: 1.1rem;
}

.plan-dialog__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.plan-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.plan-dialog__consent {
  display: grid;
  gap: 0.35rem;
}

.plan-dialog__consent a {
  color: rgba(var(--v-theme-primary), 0.9);
  font-weight: 600;
  text-decoration: none;
}

.plan-dialog__consent a:hover {
  opacity: 0.8;
}

.plan-dialog__alert {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.85rem;
  font-weight: 600;
}

.plan-dialog__alert--success {
  background: rgba(46, 125, 50, 0.14);
  color: rgba(46, 125, 50, 0.9);
}

.plan-dialog__alert--error {
  background: rgba(211, 47, 47, 0.16);
  color: rgba(211, 47, 47, 0.95);
}

@media (max-width: 700px) {
  .plan-card__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
