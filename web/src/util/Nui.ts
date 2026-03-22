const IS_DEV = import.meta.env.DEV;

const Nui = {
  send<T = any>(event: string, data: any = {}): Promise<T> {
    if (IS_DEV) {
      return new Promise<any>((resolve) => setTimeout(resolve, 100));
    }

    return fetch(`https://mythic-phone/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    }).catch(() => null) as unknown as Promise<T>;
  },

  emulate(type: string, data: unknown = null): void {
    window.dispatchEvent(
      new MessageEvent('message', {
        data: { type, data },
      }),
    );
  },
};

export default Nui;
