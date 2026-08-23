/* -------------------------------------------------------------------

                    🗲 Storm Software - Razorwind

 This code was released as part of the Razorwind project. Razorwind
 is maintained by Storm Software under the Apache-2.0 license, and is
 free for commercial and private use. For more information, please visit
 our licensing page at https://stormsoftware.com/licenses/projects/razorwind.

 Website:                  https://stormsoftware.com
 Repository:               https://github.com/storm-software/razorwind
 Documentation:            https://docs.stormsoftware.com/projects/razorwind
 Contact:                  https://stormsoftware.com/contact

 SPDX-License-Identifier:  Apache-2.0

 ------------------------------------------------------------------- */

import type { Plugin } from "@razorwind/core/plugin";
import type { Tokens } from "@razorwind/core/schema";

export type ThemeColor = string | { foreground?: string; background?: string };

/** Shared color and typography roles consumed by the preset theme adapters. */
export interface PresetTheme {
  /** Stable id used by theme-file generators. */
  name: string;
  /** Human-readable theme label. Defaults to {@link name} in target plugins. */
  displayName?: string;
  /** UI appearance required by editor and documentation theme formats. */
  appearance: "light" | "dark";
  /** Primary accent color for interactive and syntax-highlighted elements. */
  primary: ThemeColor;
  /** Secondary accent color. */
  secondary?: ThemeColor;
  /** Success state color. */
  success?: ThemeColor;
  /** Error state color. */
  error?: ThemeColor;
  /** Warning state color. */
  warning?: ThemeColor;

  /** Muted text, comments, and inactive UI color. */
  muted?: string;
  /** UI border and separator color. */
  border?: string;
  /** Selection foreground/background pair. */
  selection?: ThemeColor;
  /** Text cursor color. */
  cursor?: string;
  /** Base UI font family. */
  fontBase?: string;
  /** Monospace font family. */
  fontCode?: string;
  /** Base font size. */
  fontSize?: string;
  /** Base line height. */
  lineHeight?: string;
}

/** A Razorwind plugin factory that accepts a `mapTheme` option. */
export type PresetPluginFactory = (options?: never) => Plugin;

/**
 * A selected plugin plus any of its options other than `mapTheme`.
 *
 * Use {@link presetPlugin} when the target plugin has required options in
 * addition to `mapTheme`, such as a VS Code extension name and publisher.
 */
export interface PresetPlugin {
  factory: PresetPluginFactory;
  options?: Record<string, unknown>;
}

export type PresetPluginInput = PresetPluginFactory | PresetPlugin;

/**
 * Options accepted by the Razorwind preset plugin.
 */
export interface PresetPluginOptions {
  /**
   * Theme generators to configure from this preset.
   *
   * A direct plugin factory is enough when it only needs `mapTheme`: `plugins: [shiki]`. Wrap factories with {@link presetPlugin} to provide additional target-specific options.
   */
  plugins: readonly PresetPluginInput[];

  /**
   * Maps extracted DTCG tokens once per generation input. The preset adapts
   * this shared theme to each selected plugin's native theme shape.
   */
  mapTheme: GeneratePresetTheme;
}

/** Map extracted DTCG tokens into the shared preset theme vocabulary. */
export type GeneratePresetTheme = (
  tokens: Tokens | Record<string, Tokens>
) => PresetTheme;
