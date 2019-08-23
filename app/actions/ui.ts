const TOGGLE_DRAWER = "TOGGLE_DRAWER";

const openDrawer = () => {
  return {
    type: TOGGLE_DRAWER,
    data: true
  };
};

export default {
  openDrawer,
  TOGGLE_DRAWER
};
