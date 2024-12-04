type CaseType =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "capitalize"
  | "firstLetter"
  | "errorMessage"
  | "initialLetters";

type OptionsTypes = {
  value: string | number;
  label: string;
};

export type { CaseType, OptionsTypes };
