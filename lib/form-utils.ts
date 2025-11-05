// Form validation and submission utilities

export interface FormValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export interface FormErrors {
  [key: string]: string | undefined
}

export function validateFormField(value: any, rules: FormValidationRules): string | undefined {
  if (rules.required && !value) {
    return "This field is required"
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return `Minimum ${rules.minLength} characters required`
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `Maximum ${rules.maxLength} characters allowed`
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return "Invalid format"
  }

  if (value && rules.custom) {
    const result = rules.custom(value)
    if (typeof result === "string") {
      return result
    }
    if (!result) {
      return "Validation failed"
    }
  }

  return undefined
}

export function validateForm(
  formData: Record<string, any>,
  validationRules: Record<string, FormValidationRules>,
): FormErrors {
  const errors: FormErrors = {}

  for (const [field, rules] of Object.entries(validationRules)) {
    const error = validateFormField(formData[field], rules)
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function isFormValid(errors: FormErrors): boolean {
  return Object.values(errors).every((error) => !error)
}
