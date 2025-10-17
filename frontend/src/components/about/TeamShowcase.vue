<script setup lang="ts">
interface TeamMember {
  name: string
  role: string
  location: string
  bio: string
  specialties: string[]
  initials: string
  accent: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  image?: string
}

const team: TeamMember[] = [
  {
    name: 'Michael White',
    role: 'CEO · Manager · Lead Developer',
    location: 'Braintree, UK',
    bio: 'Founder and hands-on lead who pairs long-term product vision with architecture decisions that keep WebEssex fast and flexible.',
    specialties: ['Technical Leadership', 'Product Vision', 'Full-Stack Delivery'],
    initials: 'AE',
    accent: 'primary',
    image: new URL('../../assets/Team/Manager_CEO.jpg', import.meta.url).href
  },
  {
    name: 'Jamie Baker',
    role: 'Lead Engineer',
    location: 'Chelmsford, UK',
    bio: 'Architects performant Vue applications and guides the engineering team on delivery patterns and automation.',
    specialties: ['Vue & Vite', 'DX Tooling', 'Performance'],
    initials: 'NP',
    accent: 'secondary',
    image: new URL('../../assets/Team/Lead_Engineer.jpg', import.meta.url).href
  },
  {
    name: 'Ellie Deacon',
    role: 'Product Strategist',
    location: 'Braintree, UK',
    bio: 'Connects business goals with UX outcomes, pairing workshops and rapid validation to keep launches focused.',
    specialties: ['Product Discovery', 'Journey Mapping', 'Stakeholder Alignment'],
    initials: 'IM',
    accent: 'tertiary',
    image: new URL('../../assets/Team/Product_Strategist.jpg', import.meta.url).href
  },
  {
    name: 'Chloe Smith',
    role: 'Delivery Partner',
    location: 'Remote, UK & EU',
    bio: 'Owns delivery rhythms, comms, and QA so that every sprint ships accountable, production-ready work.',
    specialties: ['Operations', 'QA & UAT', 'Client Enablement'],
    initials: 'EB',
    accent: 'quaternary',
    image: new URL('../../assets/Team/Delivery_Partner.jpg', import.meta.url).href
  }
]
</script>

<template>
  <section class="team" aria-labelledby="team-heading">
    <header class="team__header">
      <h2 id="team-heading" class="team__title">
        <span>Meet the team shaping WebEssex</span>
      </h2>
      <p class="team__intro">
        A multidisciplinary crew blending design, engineering, and product strategy so your launch lands fast—and
        stands out.
      </p>
    </header>

    <div class="team__grid">
      <article
        v-for="member in team"
        :key="member.name"
        :class="['team-card', `team-card--${member.accent}`]"
      >
        <div class="team-card__halo" aria-hidden="true" />
        <div class="team-card__header">
          <div class="team-card__avatar" aria-hidden="true">
            <img
              v-if="member.image"
              :src="member.image"
              :alt="`${member.name} portrait`"
              loading="lazy"
            />
            <span v-else>{{ member.initials }}</span>
          </div>
          <div>
            <h3 class="team-card__name">{{ member.name }}</h3>
            <p class="team-card__role">{{ member.role }}</p>
          </div>
        </div>
        <p class="team-card__bio">
          {{ member.bio }}
        </p>
        <ul class="team-card__meta">
          <li class="team-card__location">
            <VIcon icon="mdi-map-marker" size="18" />
            <span>{{ member.location }}</span>
          </li>
        </ul>
        <ul class="team-card__tags" aria-label="Specialties">
          <li v-for="specialty in member.specialties" :key="specialty">
            {{ specialty }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.team {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
}

.team__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.team__title {
  margin: 0;
  font-size: clamp(1.8rem, 3.2vw, 2.4rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  padding-bottom: 0.85rem;
}

.team__title span {
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.team__title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: clamp(6rem, 18vw, 12rem);
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #4c52ff, #2bb673, #0c77c2);
}

.team__intro {
  margin: 0;
  max-width: 40rem;
  font-size: clamp(1rem, 2.4vw, 1.125rem);
  color: rgba(var(--v-theme-on-background), 0.78);
}

.team__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: clamp(1.25rem, 3vw, 1.75rem);
}

.team-card {
  position: relative;
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.5rem;
  padding: 2.25rem 1.75rem 2rem;
  border: 1px solid rgba(var(--team-accent-rgb, var(--v-theme-primary)), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
  --team-accent-rgb: var(--v-theme-primary);
  --team-halo-opacity: 0.22;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 48px rgba(var(--v-theme-on-background), 0.14);
}

.team-card__halo {
  position: absolute;
  inset: -45% -30% auto;
  width: 140%;
  height: 140%;
  opacity: 0.75;
  background: radial-gradient(
    circle at top,
    rgba(var(--team-accent-rgb), var(--team-halo-opacity)),
    transparent 65%
  );
  transform: rotate(8deg);
  pointer-events: none;
}

.team-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.team-card__avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 1.2rem;
  font-weight: 700;
  font-size: 1.1rem;
  background: rgba(var(--team-accent-rgb), 0.16);
  color: rgb(var(--team-accent-rgb));
  overflow: hidden;
}

.team-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card__name {
  margin: 0;
  font-size: 1.15rem;
  color: rgba(var(--v-theme-on-surface), 0.9);
}

.team-card__role {
  margin: 0.15rem 0 0;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.64);
}

.team-card__bio {
  position: relative;
  margin: 1.25rem 0 1.5rem;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
  z-index: 1;
}

.team-card__meta {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 1.25rem;
  padding: 0;
  color: rgba(var(--v-theme-on-surface), 0.65);
  font-size: 0.95rem;
  z-index: 1;
}

.team-card__location {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.team-card__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  z-index: 1;
}

.team-card__tags li {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(var(--team-accent-rgb), 0.08);
  border: 1px solid rgba(var(--team-accent-rgb), 0.18);
  color: rgb(var(--team-accent-rgb));
}

.team-card--primary {
  --team-accent-rgb: var(--v-theme-primary);
}

.team-card--secondary {
  --team-accent-rgb: var(--v-theme-secondary);
}

.team-card--tertiary {
  --team-accent-rgb: var(--v-theme-tertiary);
}

.team-card--quaternary {
  --team-accent-rgb: var(--v-theme-accent);
}

@media (max-width: 640px) {
  .team__title {
    letter-spacing: 0.06em;
  }

  .team__intro {
    font-size: 1rem;
  }

  .team__grid {
    grid-template-columns: 1fr;
  }

  .team-card {
    padding: 2rem 1.5rem;
  }

  .team-card__header {
    gap: 0.8rem;
    align-items: flex-start;
  }

  .team-card__tags {
    justify-content: center;
  }

  .team-card__avatar {
    width: 3.25rem;
    height: 3.25rem;
  }

  .team-card__bio {
    margin: 1rem 0 1.25rem;
    font-size: 0.95rem;
  }

  .team-card__tags li {
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.65rem;
  }
}

@media (max-width: 420px) {
  .team__title {
    font-size: 1.6rem;
  }

  .team-card {
    padding: 1.8rem 1.25rem;
    border-radius: 1.25rem;
  }

  .team-card__header {
    flex-direction: row;
    gap: 0.65rem;
  }

  .team-card__name {
    font-size: 1.05rem;
  }

  .team-card__role {
    font-size: 0.85rem;
  }

  .team-card__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .team-card__meta li {
    width: 100%;
  }
}
</style>
