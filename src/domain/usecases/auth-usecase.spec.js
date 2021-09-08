const { MissingParamError } = require('../../utils/errors')
class AuthUsecase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    await this.loadUserByEmailRepository.load(email)
  }
}

const makeSut = () => {
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
  const sut = new AuthUsecase(loadUserByEmailRepositorySpy)

  return { sut, loadUserByEmailRepositorySpy }
}

describe('auth usecase', () => {
  test('should throw error if no email is provided.', async () => {
    const { sut } = makeSut()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow()
    expect(promisse).rejects.toThrow(Error)
    expect(promisse).rejects.toThrow(MissingParamError)
    expect(promisse).rejects.toThrow('Missing param: email')
  })

  test('should throw error if no password is provided.', async () => {
    const { sut } = makeSut()
    const promisse = sut.auth('any_email@email.com')
    expect(promisse).rejects.toThrow(MissingParamError)
    expect(promisse).rejects.toThrow('Missing param: password')
  })

  test('should call LoadUserByEmailRepository with correct email.', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })
})
