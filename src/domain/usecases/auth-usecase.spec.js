const { MissingParamError } = require('../../utils/errors')
class AuthUsecase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    return this.accessToken
  }
}

describe('auth usecase', () => {
  test('should throw error if no email is provided.', async () => {
    const sut = new AuthUsecase()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow()
    expect(promisse).rejects.toThrow(Error)
    expect(promisse).rejects.toThrow(MissingParamError)
    expect(promisse).rejects.toThrow('Missing param: email')
  })

  test('should throw error if no password is provided.', async () => {
    const sut = new AuthUsecase()
    const promisse = sut.auth('any_email@email.com')
    expect(promisse).rejects.toThrow()
    expect(promisse).rejects.toThrow(Error)
    expect(promisse).rejects.toThrow(MissingParamError)
    expect(promisse).rejects.toThrow('Missing param: password')
  })
})
