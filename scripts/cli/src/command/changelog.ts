import { generateChangelog, generateTotalChangelog } from '@novaui/changelog';
import type { ChangelogOption } from '@novaui/changelog';

export async function genChangelog(options?: Partial<ChangelogOption>, total = false) {
  if (total) {
    await generateTotalChangelog(options);
  } else {
    await generateChangelog(options);
  }
}
