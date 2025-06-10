import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export async function getRandomAvatar(seed) {
  try {
    const avatar = createAvatar(lorelei, {
      seed,
      size: 128,
    });
    return await avatar.toDataUri();
  } catch (error) {
    console.error("Error generating random avatar:", error);
    return "/placeholder.svg";
  }
}