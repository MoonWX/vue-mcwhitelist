import { createVNode, render } from "vue";
import NotificationComponent from "@/components/Notification.vue";

const instances: any[] = [];
let seed = 1;
const GAP_SIZE = 16;
const NOTIFICATION_HEIGHT = 88;

const Notification = (options: {
  title: string;
  message: string;
  type?: "success" | "warning" | "info" | "error";
  duration?: number;
}) => {
  const id = `notification_${seed++}`;
  const container = document.createElement("div");
  container.id = id;

  // 计算偏移量
  const offset = instances.length * (NOTIFICATION_HEIGHT + GAP_SIZE) + GAP_SIZE;

  const props = {
    ...options,
    type: options.type || "info",
    duration: options.duration ?? 4500,
    offset,
    onDestroy: () => {
      close(id);
    },
  };

  const vnode = createVNode(NotificationComponent, props);
  render(vnode, container);
  document.body.appendChild(container);

  const instance = {
    id,
    container,
    verticalOffset: offset,
  };

  instances.push(instance);

  return {
    close: () => close(id),
  };
};

const close = (id: string) => {
  const index = instances.findIndex((instance) => instance.id === id);
  if (index === -1) return;

  const instance = instances[index];

  // 移除实例
  instances.splice(index, 1);
  render(null, instance.container);
  document.body.removeChild(instance.container);

  // 更新其他通知的位置
  updatePositions(index);
};

const updatePositions = (removedIndex: number) => {
  for (let i = removedIndex; i < instances.length; i++) {
    const instance = instances[i];
    const dom = instance.container.firstElementChild;
    if (dom) {
      dom.style.top = `${i * (NOTIFICATION_HEIGHT + GAP_SIZE) + GAP_SIZE}px`;
    }
  }
};

// 创建便捷方法
Notification.success = (title: string, message: string, duration?: number) => {
  return Notification({ type: "success", title, message, duration });
};

Notification.error = (title: string, message: string, duration?: number) => {
  return Notification({ type: "error", title, message, duration });
};

Notification.warning = (title: string, message: string, duration?: number) => {
  return Notification({ type: "warning", title, message, duration });
};

Notification.info = (title: string, message: string, duration?: number) => {
  return Notification({ type: "info", title, message, duration });
};

export default Notification;
