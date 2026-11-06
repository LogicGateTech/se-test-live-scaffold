import { test, expect } from '@playwright/test';

// This is scaffolding, not the interview exercise. It just proves Playwright itself can drive
// the running app on your machine before the live session. This file will be replaced live.
test('environment check button reports success', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('run-check-button').click();
  await expect(page.getByTestId('check-status')).toHaveText(/All wired up/);
});
