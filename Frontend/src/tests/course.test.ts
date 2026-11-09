import { describe, expect, it } from 'vitest'

describe('validación de curso', () => {
  it('acepta un curso con datos básicos', () => {
    const course = {
      title: 'React básico',
      description: 'Curso introductorio'
    }

    expect(Boolean(course.title && course.description)).toBe(true)
  })

  it('rechaza un curso sin título', () => {
    const course = {
      title: '',
      description: 'Curso introductorio'
    }

    expect(Boolean(course.title && course.description)).toBe(false)
  })
})