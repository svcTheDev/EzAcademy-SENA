import { describe, expect, it } from 'vitest'

describe('validación de login', () => {
  it('acepta datos completos', () => {
    const email = 'usuario@correo.com'
    const password = '12345678'

    expect(email.length > 0 && password.length >= 8).toBe(true)
  })

  it('rechaza un correo vacío', () => {
    const email = ''
    const password = '12345678'

    expect(email.length > 0 && password.length >= 8).toBe(false)
  })

  it('rechaza una contraseña demasiado corta', () => {
    const email = 'usuario@correo.com'
    const password = '123'

    expect(email.length > 0 && password.length >= 8).toBe(false)
  })
})