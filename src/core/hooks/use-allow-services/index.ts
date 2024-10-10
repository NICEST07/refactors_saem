import { TypeServices } from '@src/core/models/type-services'
import { getPermitions } from '@src/core/services/get-permitted-services'
import useSWR from 'swr'

export function useAllowServices ({ typeService }: { typeService: TypeServices }) {
  const { data: allowServices } = useSWR('/user/allow-services', async () => await getPermitions('Service'), {
    revalidateOnFocus: false
  })

  return []
}
