enum XDirection {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

enum YDirection {
  TOP = 'top',
  BOTTOM = 'bottom'
}

enum InfoType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNNING = 'warnning'
}

interface SnackbarOptions {
  x: XDirection;
  y: YDirection;
  type: InfoType;
  text: string;
  timeout: number;
  userClose: Function | {};
}

export {
  XDirection,
  YDirection,
  InfoType,
  SnackbarOptions
}
