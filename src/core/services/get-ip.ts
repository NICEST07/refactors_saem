import axios from 'axios'

export async function getIPUser () {
  try {
    const { data: ip } = await axios.get('https://api.ipify.org/', { timeout: 1000 })
    if (ip == null) throw new Error('No generate ip')
    return ip
  } catch (error: any) {
    return await getIPUserSecundary()
  }
}

export async function getIPUserSecundary () {
  const apiKey = '43729569e32115d2409a41f6070c8a35e98af57f9d0da60b914774d5'
  try {
    const { data } = await axios.get(`https://api.ipdata.co/?api-key=${apiKey}`)
    if (data.ip == null) throw new Error('IP is undefined')
    return data?.ip
  } catch (error: any) {
    return null
  }
}
