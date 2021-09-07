const HttpResponse = require('../helpers/http-response.js')
const MissingParamError = require('../helpers/missing-param-error.js')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorezedError()
      }
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      // console.log(error)
      return HttpResponse.serverError()
    }
  }
}
