const validator = require('validator')
class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('email validator', () => {
  /**
   * Right now, I'm going to add a new lib with the following command:
   *
   * npm i validator
   */
  test('Should return true if validator return true', () => {
    const sut = makeSut()
    const emailIsValid = sut.isValid('valid_email@email.com')
    expect(emailIsValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const emailIsValid = sut.isValid('invalid_email#email.com')
    expect(emailIsValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@email.com')
    expect(validator.email).toBe('any_email@email.com')
  })
})
