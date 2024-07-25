import React, { useEffect } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { Button } from '../components'

export default function Home() {
    const router = useNavigate()
    useEffect(() => {
        router('/otp-form')
    }, [])
    return (
        <>
            {/* <div className="w-full grid place-content-center">
            <nav className='grid gap-4 max-w-80 w-full font-semibold mt-20 text-xl'>
                <Link to="/otp-form">
                    <Button className='bg-[#3F72AF] text-white w-full'>OTP</Button>
                </Link>
                <Link to="/course-list">
                    <Button className='bg-[#D2E3C8] text-[#4F6F52] w-full'>Drag and Drop</Button>
                </Link>
                <Link to="/batches">
                    <Button className='bg-[#E2BBE9] text-[#444B79] w-full'>Data Table</Button>
                </Link>
            </nav>
        </div> */}
        </>
    )
}
