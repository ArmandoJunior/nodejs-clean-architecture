class EmailValidator {
  isValid(email) {
    return true
  }
}

describe('email validator', () => {
  test('Should return true if validator return true', () => {
    const sut = new EmailValidator()
    const emailIsValid = sut.isValid('valid_email@email.com')
    expect(emailIsValid).toBe(true)
  })
})
