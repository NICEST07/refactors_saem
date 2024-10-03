'use server'

const getLogo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reseller/image`)
    const data = await res.text()
    return data
  } catch (error) {
    return '/images/logos/saem.png'
  }
}

export async function BrandLogo () {
  const url = await getLogo()
  console.log(url)

  return (
    <img
      src={url}
      draggable={false}
      className='w-full h-full'
      alt='Brand Logo'
    />
  )
}
