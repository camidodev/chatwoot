/**
 * A function that provides access to various configuration values.
 * @returns {Object} An object containing configuration values.
 */
export function useConfig() {
  // Read from either global; the ERB layout sets both names during the
  // Chatwoot -> Lume rename so we stay compatible with code that hasn't migrated yet.
  const config = window.LumeConfig || window.chatwootConfig || {};

  /**
   * The host URL of the Lume instance.
   * @type {string|undefined}
   */
  const hostURL = config.hostURL;

  /**
   * The VAPID public key for web push notifications.
   * @type {string|undefined}
   */
  const vapidPublicKey = config.vapidPublicKey;

  /**
   * An array of enabled languages in the Lume instance.
   * Always an array so consumers can safely spread/iterate without null checks.
   * @type {Array<{ name: string, iso_639_1_code: string }>}
   */
  const enabledLanguages = Array.isArray(config.enabledLanguages)
    ? config.enabledLanguages
    : [];

  /**
   * Indicates whether the current instance is an enterprise version.
   * @type {boolean}
   */
  const isEnterprise = config.isEnterprise === 'true';

  /**
   * The name of the enterprise plan, if applicable.
   * Returns "community" or "enterprise"
   * @type {string|undefined}
   */
  const enterprisePlanName = config.enterprisePlanName;

  return {
    hostURL,
    vapidPublicKey,
    enabledLanguages,
    isEnterprise,
    enterprisePlanName,
  };
}
