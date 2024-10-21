import tim from "@/utils/IM/im-sdk/tim";
// import { getMessageCaching } from '@/utils/chat/index';
/**
 * 获取未读消息总数
 * @returns {Promise<number>} 未读消息总数
 */
export const getUnreadMsg = async () => {
  return await tim.getTotalUnreadMessageCount();
};

/**
 * 获取消息列表
 * @param {Object} params - 参数对象
 * @param {string} params.convId - 会话ID
 * @param {string} [params.nextReqMessageID] - 下一次请求的消息ID
 * @returns {Promise<Object>} 消息列表数据对象，若出错则返回空对象
 * https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#getMessageList
 */
export const getMessageList = async (params) => {
  try {
    const { convId, nextReqMessageID } = params;
    const { code, data } = await tim.getMessageList({
      conversationID: convId,
      nextReqMessageID: nextReqMessageID || "",
    });
    if (code === 0) {
      // getMessageCaching(convId, nextReqMessageID, data)
      return data;
    } else {
      throw new Error("Failed to get message list");
    }
  } catch (error) {
    console.error("Error in getMessageList:", error);
    return {};
  }
};
// 变更消息的接口
export const modifyMessage = async (params) => {
  try {
    const { data: message } = await tim.modifyMessage(params);
    // 修改消息成功，message 是最新的消息
    return message;
  } catch (imError) {
    const { code, data } = imError;
    if (code === 2480) {
      // 修改消息发生冲突，data.message 是最新的消息
    } else if (code === 2481) {
      // 不支持修改直播群消息
    } else if (code === 20026) {
      // 消息不存在
    }
    // 修改消息失败
  }
};
