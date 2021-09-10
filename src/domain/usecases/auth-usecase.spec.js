const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const AuthUsecase = require('./auth-usecase')

const makeSut = () => {
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
  loadUserByEmailRepositorySpy.user = {}
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

  test('Should return null if an invalid email is provided.', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided.', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('any_email@email.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })
})
