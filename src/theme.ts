import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin";

export const myCustomTheme: CustomThemeConfig = {
  name: "my-custom-theme",
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
    "--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
    "--theme-font-color-base": "0 0 0",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "4px",
    "--theme-rounded-container": "12px",
    "--theme-border-base": "2px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "var(--color-secondary-50)",
    "--on-secondary": "var(--color-primary-900)",
    "--on-tertiary": "var(--color-primary-900)",
    "--on-success": "0 0 0",
    "--on-warning": "0 0 0",
    "--on-error": "255 255 255",
    "--on-surface": "255 255 255",
    // =~= Theme Colors  =~=
    // primary | #4f4f4f
    "--color-primary-50": "229 229 229", // #e5e5e5
    "--color-primary-100": "220 220 220", // #dcdcdc
    "--color-primary-200": "211 211 211", // #d3d3d3
    "--color-primary-300": "185 185 185", // #b9b9b9
    "--color-primary-400": "132 132 132", // #848484
    "--color-primary-500": "79 79 79", // #4f4f4f
    "--color-primary-600": "71 71 71", // #474747
    "--color-primary-700": "59 59 59", // #3b3b3b
    "--color-primary-800": "47 47 47", // #2f2f2f
    "--color-primary-900": "39 39 39", // #272727
    // secondary | #dbdbdb
    "--color-secondary-50": "250 250 250", // #fafafa
    "--color-secondary-100": "248 248 248", // #f8f8f8
    "--color-secondary-200": "246 246 246", // #f6f6f6
    "--color-secondary-300": "241 241 241", // #f1f1f1
    "--color-secondary-400": "230 230 230", // #e6e6e6
    "--color-secondary-500": "219 219 219", // #dbdbdb
    "--color-secondary-600": "197 197 197", // #c5c5c5
    "--color-secondary-700": "164 164 164", // #a4a4a4
    "--color-secondary-800": "131 131 131", // #838383
    "--color-secondary-900": "107 107 107", // #6b6b6b
    // tertiary | #7097a9
    "--color-tertiary-50": "234 239 242", // #eaeff2
    "--color-tertiary-100": "226 234 238", // #e2eaee
    "--color-tertiary-200": "219 229 234", // #dbe5ea
    "--color-tertiary-300": "198 213 221", // #c6d5dd
    "--color-tertiary-400": "155 182 195", // #9bb6c3
    "--color-tertiary-500": "112 151 169", // #7097a9
    "--color-tertiary-600": "101 136 152", // #658898
    "--color-tertiary-700": "84 113 127", // #54717f
    "--color-tertiary-800": "67 91 101", // #435b65
    "--color-tertiary-900": "55 74 83", // #374a53
    // success | #6b9e71
    "--color-success-50": "233 240 234", // #e9f0ea
    "--color-success-100": "225 236 227", // #e1ece3
    "--color-success-200": "218 231 220", // #dae7dc
    "--color-success-300": "196 216 198", // #c4d8c6
    "--color-success-400": "151 187 156", // #97bb9c
    "--color-success-500": "107 158 113", // #6b9e71
    "--color-success-600": "96 142 102", // #608e66
    "--color-success-700": "80 119 85", // #507755
    "--color-success-800": "64 95 68", // #405f44
    "--color-success-900": "52 77 55", // #344d37
    // warning | #d6b44c
    "--color-warning-50": "249 244 228", // #f9f4e4
    "--color-warning-100": "247 240 219", // #f7f0db
    "--color-warning-200": "245 236 210", // #f5ecd2
    "--color-warning-300": "239 225 183", // #efe1b7
    "--color-warning-400": "226 203 130", // #e2cb82
    "--color-warning-500": "214 180 76", // #d6b44c
    "--color-warning-600": "193 162 68", // #c1a244
    "--color-warning-700": "161 135 57", // #a18739
    "--color-warning-800": "128 108 46", // #806c2e
    "--color-warning-900": "105 88 37", // #695825
    // error | #c1382f
    "--color-error-50": "246 225 224", // #f6e1e0
    "--color-error-100": "243 215 213", // #f3d7d5
    "--color-error-200": "240 205 203", // #f0cdcb
    "--color-error-300": "230 175 172", // #e6afac
    "--color-error-400": "212 116 109", // #d4746d
    "--color-error-500": "193 56 47", // #c1382f
    "--color-error-600": "174 50 42", // #ae322a
    "--color-error-700": "145 42 35", // #912a23
    "--color-error-800": "116 34 28", // #74221c
    "--color-error-900": "95 27 23", // #5f1b17
    // surface | #495a8f
    "--color-surface-50": "228 230 238", // #e4e6ee
    "--color-surface-100": "219 222 233", // #dbdee9
    "--color-surface-200": "210 214 227", // #d2d6e3
    "--color-surface-300": "182 189 210", // #b6bdd2
    "--color-surface-400": "128 140 177", // #808cb1
    "--color-surface-500": "73 90 143", // #495a8f
    "--color-surface-600": "66 81 129", // #425181
    "--color-surface-700": "55 68 107", // #37446b
    "--color-surface-800": "44 54 86", // #2c3656
    "--color-surface-900": "36 44 70", // #242c46
  },
};
