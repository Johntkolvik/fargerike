"use client";

/**
 * Legacy VolumePicker — now delegates to shared VolumeSelector.
 *
 * Kept for backwards compatibility. New code should use:
 *   import { VolumeSelector } from "@/components/shared/VolumeSelector";
 */

export { VolumeSelector as VolumePicker } from "@/components/shared/VolumeSelector";
export type { VolumeSelectorProps as VolumePickerProps } from "@/components/shared/VolumeSelector";
export type { VolumeSelectionItem as VariantQuantity } from "@/hooks/useVolumeSelection";
