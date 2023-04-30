export const GENERAL_TIME_MS = 2.4e+6;
export const ONE_MINUTE_MS = 6e+4;
export const ONE_SEC_MS = 1e+3;
export const SIXTY = 60;
export const MINUTE_UNIT_COUNTER = 1;
export const MINUTE_DECADE_COUNTER = 2;
export const SECOND_UNIT_COUNTER = 4;
export const SECOND_DECADE_COUNTER = 5;
export const SECOND_HUNDRED_COUNTER = 6;
export const LINE_LENGTH = 16;
export const BOMBS_NUMBER = 2;
export const BOMB = -1;
export const LEFT_CLICK_BUTTON = 0;
export const RIGHT_CLICK_BUTTON = 2;
export const FLAGS_DIGITS_NUMBER = 3;
export const LOCALIZATION = 'ru-Ru';

export const ZERO = 'Zero';

export enum BasicNumbers {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
};

export enum TimerKind {
  Minutes = 'minutes',
  Seconds = 'Seconds',
};

export enum GameStatus {
  Idle = 'idl',
  Unsure = 'unsure',
  Reset = 'reset',
  Win = 'win',
  Fail = 'fail',
}

export enum HiddenFieldInteraction {
  Empty = 'empty',
  Flag = 'flag',
  Question = 'question',
  QuestionEmpty = 'questionEmpty',
  BombReveal = 'bombReveal',
  BombDeactivation = 'bombDeactivation',
}

