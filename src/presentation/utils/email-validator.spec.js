const validator = require('validator')
class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('email validator', () => {
  /**
   * Right now, I'm going to add a new lib with the following command:
   *
   * npm i validator
   */
  test('Should return true if validator return true', () => {
    const sut = new EmailValidator()
    const emailIsValid = sut.isValid('valid_email@email.com')
    expect(emailIsValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const emailIsValid = sut.isValid('invalid_email#email.com')
    expect(emailIsValid).toBe(false)
  })
})
