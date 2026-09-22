import { test, expect } from '@playwright/test';

test.describe('Landing Food Content', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/'); });

  test('la promesa y el botón principal están arriba del pliegue', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('30% la facturación');
    await expect(page.getByRole('link', { name: 'Agendar diagnóstico gratis' }).first()).toBeVisible();
  });

  test('el reloj de cupos corre y nunca pasa de 4 días', async ({ page }) => {
    const reloj = page.locator('.barra-movil b, [data-testid="reloj"]').first();
    const a = await reloj.textContent();
    await page.waitForTimeout(1500);
    const b = await reloj.textContent();
    expect(a).not.toEqual(b);
    expect(Number(a!.slice(0, 2))).toBeLessThanOrEqual(3);
  });

  test('el VSL carga YouTube solo al dar clic', async ({ page }) => {
    const vsl = page.getByRole('button', { name: 'Reproducir video: cómo lo hacemos' });
    await expect(vsl.locator('iframe')).toHaveCount(0);
    await vsl.click();
    await expect(vsl.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/51NfZ-LGxc8/);
  });

  test('las flechas de reels avanzan y el contador lo refleja', async ({ page }) => {
    await page.getByRole('button', { name: 'Video siguiente' }).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Video siguiente' }).click();
    await page.getByRole('button', { name: 'Video siguiente' }).click();
    await expect(page.getByTestId('reels-pos')).toHaveText(/[23]/);
  });

  test('un reel abre en ventana vertical y Escape la cierra', async ({ page }) => {
    const reel = page.getByRole('button', { name: "Ver reel de Barrio Chick'en" }).first();
    await reel.scrollIntoViewIfNeeded();
    await reel.click();
    const dialogo = page.getByRole('dialog', { name: 'Reel' });
    await expect(dialogo.locator('iframe')).toHaveAttribute('src', /INEibVTxRLY/);
    await page.keyboard.press('Escape');
    await expect(dialogo).toHaveCount(0);
  });

  test('las fotos de la comanda pasan de página', async ({ page }) => {
    await page.getByRole('button', { name: 'Fotos siguientes' }).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Fotos siguientes' }).click();
    await expect(page.getByTestId('fotos-pos')).not.toHaveText('1');
  });

  test('la agenda muestra el valor del diagnóstico y el widget de Calendly', async ({ page }) => {
    await expect(page.locator('.agenda .intro')).toContainText('$3,300 MXN');
    await expect(page.getByTestId('calendly')).toHaveAttribute('data-url', /calendly\.com\/gaspardealba-carlos\/food-content-meet/);
  });

  test('WhatsApp lleva al número correcto con el mensaje precargado', async ({ page }) => {
    const wa = page.getByRole('link', { name: 'Escribir a Carlos por WhatsApp' });
    await expect(wa).toHaveAttribute('href', /wa\.me\/525580386824\?text=/);
  });

  test('los títulos animados terminan visibles', async ({ page }) => {
    const titulo = page.getByRole('heading', { name: 'Así se ve el feed de nuestros clientes' });
    await titulo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const y = await titulo.locator('.mascara > span').evaluate((el) => {
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return m.m42;
    });
    expect(Math.abs(y)).toBeLessThan(1);
  });

  test('no hay scroll horizontal', async ({ page }) => {
    await page.evaluate(() => document.fonts.ready);
    const ancho = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(ancho).toBeLessThanOrEqual(1);
  });
});

test.describe('Página de gracias', () => {
  test('muestra el video y el botón de confirmar por WhatsApp', async ({ page }) => {
    await page.goto('/gracias');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Felicidades, estás a un paso de confirmar tu llamada.');
    await expect(page.getByRole('button', { name: /qué necesitas para tu llamada/ })).toBeVisible();
    const btn = page.getByTestId('confirmar');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /wa\.me\/525580386824\?text=Hola%2C%20me%20gustar%C3%ADa%20confirmar%20mi%20llamada/);
    await expect(page.getByRole('heading', { name: 'Quién va a estar en la llamada' })).toBeAttached();
    await expect(page.getByRole('heading', { name: 'Lo que dicen nuestros clientes' })).toBeAttached();
  });
});

test.describe('Variantes del VSL', () => {
  test('?v=b se recuerda y /gracias la conserva', async ({ page }) => {
    await page.goto('/?v=b');
    await expect(page.getByRole('button', { name: /cómo lo hacemos/ })).toBeVisible();
    const guardada = await page.evaluate(() => sessionStorage.getItem('fc_vsl'));
    expect(guardada).toBe('b');
    await page.goto('/gracias');
    const sigue = await page.evaluate(() => sessionStorage.getItem('fc_vsl'));
    expect(sigue).toBe('b');
  });

  test('?v=c reproduce el video C', async ({ page }) => {
    await page.goto('/?v=c');
    await page.getByRole('button', { name: /cómo lo hacemos/ }).click();
    await expect(page.locator('.hero iframe')).toHaveAttribute('src', /WAowJO8c-fQ/);
  });
});
