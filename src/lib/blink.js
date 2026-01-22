import { createClient } from '@blinkdotnew/sdk'

function getProjectId() {
  const envId = import.meta.env.VITE_BLINK_PROJECT_ID
  if (envId) return envId
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const match = hostname.match(/^([^.]+)\.sites\.blink\.new$/)
  if (match) return match[1]
  return 'nura-landing-page-efuxxclh'
}

export const blink = createClient({
  projectId: getProjectId(),
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
  auth: { 
    mode: 'managed',
    authRequired: false 
  },
})

// Helper for Tracking Events (GA + Blink)
export const trackEvent = (eventName, params = {}) => {
  // GA Tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  // Blink Analytics
  blink.analytics.log(eventName, params);
};
