import { createVNode, render } from 'vue';
import MessageComponent from '@/components/Message.vue';

const instances: any[] = [];
let seed = 1;

const Message = (options: {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}) => {
  const id = `message_${seed++}`;
  const container = document.createElement('div');
  container.id = id;
  
  const props = {
    ...options,
    type: options.type || 'info',
    duration: options.duration ?? 3000,
  };

  const vnode = createVNode(MessageComponent, props);
  render(vnode, container);
  document.body.appendChild(container);

  instances.push({ id, container });

  // 清理函数
  const remove = () => {
    const index = instances.findIndex(instance => instance.id === id);
    if (index === -1) return;
    
    instances.splice(index, 1);
    render(null, container);
    document.body.removeChild(container);
  };

  // 监听动画结束后移除DOM
  if (props.duration > 0) {
    setTimeout(remove, props.duration + 300); // 300ms是动画持续时间
  }

  return {
    close: remove
  };
};

// 创建便捷方法
Message.success = (message: string, duration?: number) => {
  return Message({ type: 'success', message, duration });
};

Message.error = (message: string, duration?: number) => {
  return Message({ type: 'error', message, duration });
};

Message.info = (message: string, duration?: number) => {
  return Message({ type: 'info', message, duration });
};

Message.warning = (message: string, duration?: number) => {
    return Message({ type: 'warning', message, duration });
}


export default Message;