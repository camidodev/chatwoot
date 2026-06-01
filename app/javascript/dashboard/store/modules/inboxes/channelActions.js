import * as types from '../../mutation-types';
import InboxesAPI from '../../../api/inboxes';
import AnalyticsHelper from '../../../helper/AnalyticsHelper';
import { ACCOUNT_EVENTS } from '../../../helper/AnalyticsHelper/events';

export const buildInboxData = inboxParams => {
  const formData = new FormData();
  const {
    channel = {},
    conversation_display_id_start: conversationDisplayIdStart,
    conversation_display_id_prefix: conversationDisplayIdPrefix,
    ...inboxProperties
  } = inboxParams;
  Object.keys(inboxProperties).forEach(key => {
    const value = inboxProperties[key];
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  if (
    conversationDisplayIdStart !== undefined &&
    conversationDisplayIdStart !== null &&
    conversationDisplayIdStart !== ''
  ) {
    formData.append(
      'conversation_display_id_start',
      String(conversationDisplayIdStart)
    );
  }
  if (
    conversationDisplayIdPrefix !== undefined &&
    conversationDisplayIdPrefix !== null
  ) {
    formData.append(
      'conversation_display_id_prefix',
      String(conversationDisplayIdPrefix)
    );
  }
  const { selectedFeatureFlags, ...channelParams } = channel;
  // selectedFeatureFlags needs to be empty when creating a website channel
  if (selectedFeatureFlags) {
    if (selectedFeatureFlags.length) {
      selectedFeatureFlags.forEach(featureFlag => {
        formData.append(`channel[selected_feature_flags][]`, featureFlag);
      });
    } else {
      formData.append('channel[selected_feature_flags][]', '');
    }
  }
  Object.keys(channelParams).forEach(key => {
    formData.append(`channel[${key}]`, channel[key]);
  });
  return formData;
};

const sendAnalyticsEvent = channelType => {
  AnalyticsHelper.track(ACCOUNT_EVENTS.ADDED_AN_INBOX, {
    channelType,
  });
};

export const channelActions = {
  createVoiceChannel: async ({ commit }, params) => {
    try {
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: true });
      const response = await InboxesAPI.create({
        name: params.name,
        channel: { ...params.voice, type: 'voice' },
      });
      commit(types.default.ADD_INBOXES, response.data);
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: false });
      sendAnalyticsEvent('voice');
      return response.data;
    } catch (error) {
      commit(types.default.SET_INBOXES_UI_FLAG, { isCreating: false });
      throw error;
    }
  },
};
