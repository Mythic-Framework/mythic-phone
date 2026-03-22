interface UsbState { open: boolean; usb: any }

export const initialState: UsbState = { open: false, usb: null };

export default (state: UsbState = initialState, action: any): UsbState => {
  switch (action.type) {
    case 'USE_USB':    return { ...state, open: action.payload };
    case 'INSTALL_USB': return { ...state, usb: action.payload };
    case 'REMOVE_USB':  return { ...state, usb: null, open: false };
    default: return state;
  }
};
