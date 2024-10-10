import type { ServiceApiResponse } from '@src/core/models/api-response'
import type { TypeServices } from '@src/core/models/type-services'
import { GlobalInterceptor } from '@src/core/interceptors'

export type ServicesStructure = Record<TypeServices, string[]>

interface GetPermitionsResponse extends ServiceApiResponse {
  services: ServicesStructure
}

const mockData: ServicesStructure = {
  SMS: [],
  API: [],
  Bots: [],
  CallBlasting: [],
  C2M: [],
  Mail: [],
  HlrLookup: []
}

//* Service hace referencia a todos los servicios
export const getPermitions = async (service: TypeServices | 'Service'): Promise<ServicesStructure> => {
  try {
    const { data } = await GlobalInterceptor.get<GetPermitionsResponse>(`/user-info/permission-service/${service}`)
    return data.services
  } catch (error) {
    return mockData
  }
}
