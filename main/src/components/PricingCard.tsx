import { AppContext } from '@/lib/AppState'
import { Switch } from '@nextui-org/react'
import { TicketStar } from '@odyssoft/iconly-clone'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Countdown from 'react-countdown'
import Marquee from 'react-fast-marquee'

interface PricingCardProps {
    title: string
    price: string
    duration: string,
    expiring?: number
    descriptions: string[]
    credits: number | string
    label?: React.ReactNode
    discount?: number
}

function PricingCard({ label, credits, title, price, duration, expiring, descriptions, discount }: PricingCardProps) {
    const parsedPrice = parseFloat(price.replace('$', ''))
    const discountedPrice = discount ? parsedPrice - (parsedPrice * (discount / 100)) : parsedPrice
    const roundedActualPrice = `$${discountedPrice.toFixed(2)}`

    return <div className='bg-zinc-900 rounded-xl p-6 flex justify-between flex-col gap-6 relative duration-200 animate-in transition-all hover:animate-pulse h-full w-full'>
        <div className='flex gap-2 flex-col'>
            <div className='flex justify-between '>
                <h2 className='font-bold text-lg text-white opacity-60'>{title}</h2>
                <div>
                    {label}
                </div>
            </div>

            <h1 className='text-white text-4xl font-bold '>

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
                        return <div className='text-slate-900 mt-2  px-4 py-1 text-base rounded-full bg-neutral-100 flex justify-between items-center'>
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



const prices = [

    {
        product_id: 'price_1NQE1CAdKK78JiPHkayd4a90',
        title: 'OneTime',
        // style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$39.99',
        label: <></>,
        duration: 'none',
        // coupon_id: 'odeTQs3i',
        descriptions: ["OneTime Payment", "Standard Resolution (200 Photos)", "High Resolution (100 Photos)", "Single Person Use", "Buy Extra Credits Anytime",],
        credits: 200,
        // discount: 19,
        // label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Best Value</div>
    },
    // {
    //     product_id: 'price_1NA4TPAdKK78JiPH34x5V8Ce',
    //     title: 'Light',
    //     // style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
    //     price: '$54.99',
    //     actualPrice: '$60',
    //     duration: 'yearly',
    //     label: <></>,
    //     // coupon_id: '3YXvnNL9',
    //     descriptions: ["Standard Resolution (110 Photos)", "High Resolution (55 Photos)", "Buy Extra Credits Anytime",],
    //     credits: 120,
    //     // discount: 9,
    //     // label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Amazing Value</div>
    // },
    // {
    //     product_id: 'price_1ND7pmAdKK78JiPHOLY9rAUt',
    //     title: 'Essential',
    //     style: 'bg-gradient-to-r from-green-200 to-orange-500',
    //     price: '$14.99',
    //     duration: 'monthly',
    //     descriptions: ['Standard Resolution (50 Photos)', 'High Resolution (25 Photos)', 'Buy Extra Credits Anytime'],
    //     credits: 60,
    // },
    // {
    //     product_id: 'price_1NA4XHAdKK78JiPHtYofTnD1',
    //     title: 'Regular',
    //     style: 'bg-gradient-to-r from-green-200 to-green-500',
    //     price: '$24.99',
    //     duration: 'monthly',
    //     // coupon_id: 'odeTQs3i',
    //     descriptions: ["Standard Resolution (Unlimited Photos)", "High Resolution (50 Photos)", "Best Styles Sent To Your DM Monthly", "Buy Extra Credits Anytime",],
    //     credits: 100,
    //     // discount: 19,
    //     label: <div className={'text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-blue-500 '}>Popular</div>
    // },

    // {
    //     product_id: 'price_1ND8NzAdKK78JiPHrpJJv8af',
    //     title: 'Essential',
    //     style: 'bg-gradient-to-r from-green-200 to-orange-500',
    //     price: '$149.99',
    //     actualPrice: '$180',
    //     duration: 'yearly',
    //     credits: 720,
    //     descriptions: ['Standard Resolution (600 Photos)', 'High Resolution (300 Photos)', 'Buy Extra Credits Anytime'],
    // },
    // {
    //     product_id: 'price_1NA4XHAdKK78JiPHYtphUUfQ',
    //     title: 'Regular',
    //     style: 'bg-gradient-to-r from-green-200 to-green-500',
    //     price: '$289.99',
    //     actualPrice: '$300',
    //     duration: 'yearly',
    //     // coupon_id: '3YXvnNL9',
    //     descriptions: ["Standard Resolution (Unlimited Photos)", "High Resolution (600 Photos)", "Best Styles Sent To Your DM Monthly", "Buy Extra Credits Anytime",],
    //     credits: 1200,
    //     label: <div className={'text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-blue-500 '}>Popular</div>
    // },
    {
        product_id: 'price_1NA4agAdKK78JiPHoeGlNxTU',
        title: 'Pro',
        duration: 'monthly',
        style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$49.99',
        credits: 'Unlimited',
        descriptions: ["Standard Resolution (Unlimited Photos)", "High Resolution (Unlimited Photos)", "Best Styles Sent To Your DM & Email Monthly", "Single Person Use", "Priority Support"],
        label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Amazing Value</div>

    },
    {
        product_id: 'price_1NQEOqAdKK78JiPHuAm7ovwf',
        title: 'Pro',
        duration: 'yearly',
        style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$42',
        actualPrice: '$600',
        credits: 'Unlimited',
        descriptions: ["Standard Resolution (Unlimited Photos)", "High Resolution (Unlimited Photos)", "Best Styles Sent To Your DM & Email Monthly", "Priority Support"],
        label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Amazing Value</div>
    },
    {
        product_id: 'price_1NQE6uAdKK78JiPHTVQmoalN',
        title: 'Business',
        duration: 'monthly',
        style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$249.99',
        actualPrice: '$600',
        credits: 'Unlimited',
        descriptions: ["Standard Resolution (Unlimited Photos)", "High Resolution (Unlimited Photos)", "Unlimited Photos for Your Team & Employees", "Priority Support"],
        label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Amazing Value</div>
    },
    {
        product_id: 'price_1NQE6uAdKK78JiPHx2IP3wsC',
        title: 'Business',
        duration: 'yearly',
        style: 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
        price: '$210',
        actualPrice: '$600',
        credits: 'Unlimited',
        descriptions: ["Standard Resolution (Unlimited Photos)", "High Resolution (Unlimited Photos)", "Unlimited Photos for Your Team & Employees", "Priority Support"],
        label: <div className='text-slate-900 font-bold px-2 py-1 text-xs rounded-full bg-orange-500'>Amazing Value</div>
    }

]

export default function Pricing({ nextArgs }: { nextArgs: object }) {

    const [duration, setDuration] = useState('monthly')
    const [loading, setLoading] = useState(false)
    const { operations } = useContext(AppContext)

    const objectToQueryString = (obj: object) => {
        // @ts-ignore
        return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    }

    const planClicked = (product_id: string, discountId?: string, subscription?: boolean) => {
        const success_args = `action=create&value=${encodeURIComponent(JSON.stringify(nextArgs))}`
        operations.getCheckoutSession(product_id, success_args, discountId, subscription)
            .then((res) => {
                setLoading(true)
                window.location.href = res.data as string;
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return <div className='h-full p-5 bg-red bg-neutral-700 bg-opacity-20 rounded-xl flex flex-col gap-2 w-full max-w-7xl m-auto justify-center'>
        <div>
            <h1 className='text-white text-2xl font-extrabold text-center capitalize'>Select a package</h1>
            {/* <p className='text-white text-lg font-medium mt-2 text-center'>1 Credit = 1 Standard Photo, 2 Credits = 1 High Resolution (4k Photo)</p> */}
        </div>
        {/* <div>
            <Marquee
            speed={50}
            className=' m-auto h-full'
            pauseOnHover
            pauseOnClick
            gradient={false}
            >
            <div className='text-sm font-bold text-center m-1  p-2 bg-neutral-800 rounded-full'>Unlimited Images</div>
            <div className='text-sm font-bold text-center m-1  p-2  bg-neutral-800 rounded-full'>1000+ Styles</div>
            <div className='text-sm font-bold text-center m-1  p-2  bg-neutral-800 rounded-full'>50+ Poses</div>
            <div className='text-sm font-bold text-center m-1  p-2  bg-neutral-800 rounded-full'>Best Styles Sent To Your Inbox Monthly</div>
            <div className='text-sm font-bold text-center m-1  p-2  bg-neutral-800 rounded-full'>100+ Backgrounds</div>
            </Marquee>
        </div> */}
        <div className='flex  justify-center items-center align-middle  gap-4'>
            <h3 className='text-white font-bold'>Monthly</h3>
            <div>
                <Switch onChange={() => {
                    setDuration(duration === 'monthly' ? 'yearly' : 'monthly')
                }} shadow color="secondary" checked={duration !== 'monthly'} className='bg-d-500 h-full' />
            </div>
            <h3 className='text-white font-bold bg-bluef-500 align-middle'>Yearly <span className='text-base py-2 px-4 ml-2 bg-purple-700 font-bold rounded-full'>2 Months Free</span></h3>
        </div>
        <p className='text-white text-sm font-medium mt-2 text-center'>1 Credit = 1 Standard Photo, 2 Credits = 1 High Resolution (4k Photo)</p>
        < div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6 ' >
            {
                prices.filter(price => price.duration === duration || price.duration === 'none')

                    .map((price, index) => {
                        return <Link
                            onClick={() => planClicked(price.product_id, undefined, price.duration !== 'none')}
                            href={`#`}
                        >
                            <div className={`${price.style}} p-1 rounded-2xl shadow-lg h-full max-w `}>
                                <PricingCard {...price} />
                            </div>
                        </Link>
                    })
            }
        </div >
    </div >
}
