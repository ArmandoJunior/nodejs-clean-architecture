class AuthUsecase {
  async auth (email) {
    if (!email) {
      throw new Error('My error')
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
    expect(promisse).rejects.toThrow('My error')
  })
})
