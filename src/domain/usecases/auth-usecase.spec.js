const { MissingParamError, InvalidParamError } = require('../../utils/errors')
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
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository')
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository')
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

describe('Auth Usecase', () => {
  test('Should throw error if no email is provided.', async () => {
    const { sut } = makeSut()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow()
    expect(promisse).rejects.toThrow(Error)
    expect(promisse).rejects.toThrow(MissingParamError)
    expect(promisse).rejects.toThrow('Missing param: email')
  })

  test('Should throw error if no password is provided.', async () => {
    const { sut } = makeSut()
    const promisse = sut.auth('any_email@email.com')
    expect(promisse).rejects.toThrow(MissingParamError)
    expect(promisse).rejects.toThrow('Missing param: password')
  })

  test('Should call LoadUserByEmailRepository with correct email.', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throws LoadUserByEmailRepository with correct email.', async () => {
    const sut = new AuthUsecase()
    const promisse = sut.auth('any_email@email.com', 'any_password')
    expect(promisse).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
    expect(promisse).rejects.toThrow('Missing param: loadUserByEmailRepository')
  })

  test('Should throws LoadUserByEmailRepository has no load method.', async () => {
    const sut = new AuthUsecase({})
    const promisse = sut.auth('any_email@email.com', 'any_password')
    expect(promisse).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
    expect(promisse).rejects.toThrow('Invalid param: loadUserByEmailRepository')
  })
})
