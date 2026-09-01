// The JS mirror of globals.css motion tokens (motion-language contract).
// These two files are the ONLY places raw motion numbers exist.
export const dur = { micro: 0.2, small: 0.32, section: 0.56 } as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.83, 0, 0.17, 1],
  in: [0.64, 0, 0.78, 0],
} as const;
