import { AppContext } from '@/lib/AppState'
import { ModalContext } from '@/lib/ModalState'
import { Switch } from '@nextui-org/react'
import { TicketStar } from '@odyssoft/iconly-clone'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Countdown from 'react-countdown'

interface PricingCardProps {
    title: string
    price: string
    duration: string,
    expiring?: number
    descriptions: string[]
    credits: number | string
    label: React.ReactNode
    discount?: number
    style?: string
}



function PricingCard({ label, credits, title, price, duration, expiring, descriptions, discount, style }: PricingCardProps) {
    const parsedPrice = parseFloat(price.replace('$', ''))
    const discountedPrice = discount ? parsedPrice - (parsedPrice * (discount / 100)) : parsedPrice
    const roundedActualPrice = `$${discountedPrice.toFixed(2)}`

    return <div className={`rounded-xl p-12 flex justify-between flex-col gap-6 relative duration-200 animate-in transition-all hover:animate-pulse h-full w-full  ${style}`}>
        <div className='flex gap-2 flex-col'>
            <div className='flex justify-between '>
                <h2 className='font-bold text-lg opacity-60'>{title}</h2>
                <div>
                    {label}
                </div>
            </div>

            <h1 className=' text-5xl font-bold '>

                <span className=''>
                    {roundedActualPrice}
                </span>
                {/* <span className=''>
                    {price}
                </span> */}
                &nbsp;
                {discount && <span className='text-xl '>
                    was {price}
                </span>}


                {discount && <Countdown
                    date={expiring}
                    renderer={({ hours, minutes, seconds, completed, days }) => {
                        return <div className=' mt-2  px-4 py-1 text-base rounded-full bg-neutral-100 flex justify-between items-center'>
                            <span className='text-red-600'>
                                Expiring  {completed ? ' Now' : `${days}d  ${hours}h ${minutes}m ${seconds}s`}
                            </span>
                            <span className='text-neutral-900 text-lg font-black'>
                                {discount}% off
                            </span>
                        </div>

                    }}
                />}

            </h1>

        </div>
        <div>
            {descriptions.map((description, i) => <div key={i} className='text-white text-sm font-bold'>
                {/* {description} */}
                <div className='align-middle opacity-80 text-sm font-light'>
                    <span className='align-middle'> <TicketStar set='bulk' primaryColor='#f555ef' size={20} /> </span><span className='align-top font-bold'>{description}</span>
                </div>
            </div>)}
        </div>
        <div className='w-full flex justify-end'>
            <div className='rounded-full text-center text-xs bg-white text-black px-4 py-2 font-bold w-full '>
                {credits} Credits
            </div>
        </div>
    </div>
}


export default () => {
    const { user, } = useContext(AppContext)
    const { operations } = useContext(AppContext)

    const { setLoginModalVisible } = useContext(ModalContext)

    useEffect(() => {
        if (!user) {
            setLoginModalVisible(true)
        } else {
            setLoginModalVisible(false)
        }
    }, [user])

    const planClicked = (product_id: string, discountId?: string, subscription?: boolean) => {
        operations.getCheckoutSession(product_id, "", discountId, false)
            .then((res) => {
                window.location.href = res.data as string;
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return <div className='min-h-screen flex justify-center flex-col items-center  p-12  '>

        <div className='bg-neutral-900 max-w-2xl p-12 w-full rounded-3xl flex flex-col justify-end border-solid border-neutral-800'>
            <h1 className='text-2xl font-extrabold text-white'>
                Extra Arible Credits
            </h1>
            <p className='text-white text-sm opacity-60 mb-6'>
                Buy credits to use for your Arible account. Credits are used to generate photos and upscale them. They last for the current billing period and don't roll over.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                {/* {prices.map((price, i) => <PricingCard key={i} {...price} />)} */}
                {
                    prices.map((price, index) => {
                        return <Link
                            onClick={() => planClicked(price.product_id, undefined, true)}
                            href={`#`}
                        >
                            <PricingCard key={index} {...price} />
                        </Link>
                    })

                }
            </div>
        </div>
    </div>
}




const prices = [

    {
        product_id: 'price_1N9MP7AdKK78JiPHplEaEAE8',
        title: 'S',
        // style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$14.99',
        label: <></>,
        duration: 'monthly',
        // coupon_id: 'odeTQs3i',
        descriptions: [],
        credits: 40,
        style: "bg-gradient-to-r from-gray-700 via-gray-900 to-black"
        // discount: 19,
        // label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Best Value</div>
    },
    {
        product_id: 'price_1N9MP8AdKK78JiPHBygXS4qg',
        title: 'M',
        // style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$19.99',
        actualPrice: '$60',
        duration: 'yearly',
        style: "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
        label: <></>,
        // coupon_id: '3YXvnNL9',
        descriptions: [],
        credits: 80,
        // discount: 9,
        // label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Amazing Value</div>
    },
    {
        product_id: 'price_1N9MP8AdKK78JiPH3lGw5Ocz',
        title: 'L',
        style: 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600',
        price: '$24.99',
        duration: 'monthly',
        // coupon_id: 'odeTQs3i',
        descriptions: [],
        credits: 200,
        // discount: 19,
        label: <div className={'text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-blue-500 '}>Popular</div>
    },
    {
        product_id: 'price_1N9MP8AdKK78JiPHzjYZWPCK',
        title: 'XL',
        style: 'bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 text-black',
        price: '$49.99',
        actualPrice: '$300',
        duration: 'yearly',
        // coupon_id: '3YXvnNL9',
        descriptions: [],
        credits: 1000,
        label: <div className={'text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-purple-500 '}>Best Value</div>
        // label: <div className={'text-slate-900 font-bold px-2 py-1 text-xs rounded-full  '}>Popular</div>
    },
]