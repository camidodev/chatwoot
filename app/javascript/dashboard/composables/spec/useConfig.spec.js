import { useConfig } from '../useConfig';

describe('useConfig', () => {
  const originalLumeConfig = window.LumeConfig;
  const originalChatwootConfig = window.chatwootConfig;

  beforeEach(() => {
    window.chatwootConfig = undefined;
    window.LumeConfig = {
      hostURL: 'https://example.com',
      vapidPublicKey: 'vapid-key',
      enabledLanguages: ['en', 'fr'],
      isEnterprise: 'true',
      enterprisePlanName: 'enterprise',
    };
  });

  afterEach(() => {
    window.LumeConfig = originalLumeConfig;
    window.chatwootConfig = originalChatwootConfig;
  });

  it('returns the correct configuration values', () => {
    const config = useConfig();

    expect(config.hostURL).toBe('https://example.com');
    expect(config.vapidPublicKey).toBe('vapid-key');
    expect(config.enabledLanguages).toEqual(['en', 'fr']);
    expect(config.isEnterprise).toBe(true);
    expect(config.enterprisePlanName).toBe('enterprise');
  });

  it('handles missing configuration values', () => {
    window.LumeConfig = {};
    const config = useConfig();

    expect(config.hostURL).toBeUndefined();
    expect(config.vapidPublicKey).toBeUndefined();
    // enabledLanguages is normalized to an array so consumers can spread/iterate safely.
    expect(config.enabledLanguages).toEqual([]);
    expect(config.isEnterprise).toBe(false);
    expect(config.enterprisePlanName).toBeUndefined();
  });

  it('handles undefined window.LumeConfig', () => {
    window.LumeConfig = undefined;
    const config = useConfig();

    expect(config.hostURL).toBeUndefined();
    expect(config.vapidPublicKey).toBeUndefined();
    expect(config.enabledLanguages).toEqual([]);
    expect(config.isEnterprise).toBe(false);
    expect(config.enterprisePlanName).toBeUndefined();
  });

  it('falls back to window.chatwootConfig when LumeConfig is missing', () => {
    window.LumeConfig = undefined;
    window.chatwootConfig = {
      hostURL: 'https://legacy.example.com',
      enabledLanguages: ['en'],
    };
    const config = useConfig();

    expect(config.hostURL).toBe('https://legacy.example.com');
    expect(config.enabledLanguages).toEqual(['en']);
  });
});
