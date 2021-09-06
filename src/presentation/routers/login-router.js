const HttpResponse = require('../helpers/http-response.js')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    /**
     * Para evitar de ter que adicionar uma nova validação para cada cenário encontrado em erros no lado do servidor (500)
     * foi adicionado um try catch envolta de todo o código da rota, assim todo o erro que gerar no lado do servidor irá
     * retornar um erro 500
     *
     * obs. a validação acima foi deixada apenas para efeito de exemplo e pode ser apagada.
     */
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
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
