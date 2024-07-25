import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../components'
import { set } from 'react-hook-form';

export default function OTP() {
    const otpLength = 4
    const correctOTP = '1234'
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const [buttonContext, setButtonContext] = useState({ label: 'Verify Account', bg: '#112D4E', status: '' });
    const otpBoxReference = useRef([]);


    function handleChange(e, index) {
        let value = e.target.value
        if ((value < '0' || value > '9')) value = null

        let newArr = [...otp];
        newArr[index] = value;
        if (value && index < otpLength) {
            setOtp(newArr);
            otpBoxReference.current[Math.min(index + 1, otpLength - 1)].focus()
        }
    }

    function handleBackspaceAndEnter(e, index) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus()
        }
        if (e.key === "Backspace" && e.target.value) {
            let newArr = [...otp];
            newArr[index] = '';
            setOtp(newArr);
        }
        if ([' ', 'Enter'].some(k => e.key == k) && e.target.value && index < otpLength - 1) {
            otpBoxReference.current[index + 1].focus()
        }
    }

    useEffect(() => {
        // console.log(otp.join("").length)
        if (otp.join("").length < 4) setButtonContext({ label: 'Verify Account', bg: '#112D4E', status: '' })
        else if (otp.join("").length == 4 && otp.join("") !== correctOTP) setButtonContext({ label: 'Verification failed', bg: '#EB2D5B', status: 'error' })
        else setButtonContext({ label: 'Verified', bg: '#23CF9B', status: 'success' })
    }, [otp]);


    return (
        <div className='rounded-lg bg-white p-4 space-y-4 flex flex-col justify-center items-center max-w-lg mx-auto text-center'>
            <h4 className='text-3xl font-semibold'>Mobile Phone Verification</h4>
            <p className='text-gray-400 font-light max-w-sm'>Enter the 4-digit verification code that was sent to your phone number.</p>
            {/* OTP Form */}
            <div className='grid gap-4 max-w-[250px]'>
                <div className='grid grid-cols-4 gap-2'>
                    {
                        new Array(otpLength).fill("").map((_, i) => (
                            <input
                                ref={el => otpBoxReference.current[i] = el}
                                onKeyDown={(e) => handleBackspaceAndEnter(e, i)}
                                onChange={(e) => handleChange(e, i)}
                                onFocus={(e) => {

                                }}
                                value={otp[i]}
                                maxLength={1}
                                key={i} type='text' className={`
                                    rounded-md bg-[#DBE2EF] p-2 py-4 font-semibold text-2xl text-center 
                                    ${buttonContext.status == 'success' ? 'border-2 !border-green-600' : buttonContext.status == 'error' ? 'border-2 !border-red-600' : ''}
                                `}
                            />
                        ))
                    }
                </div>
                <Button
                    className={`text-white w-full ${buttonContext.status === 'success' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    bg={buttonContext.bg}
                >
                    {buttonContext.label}
                </Button>
            </div>
            <p className='text-gray-400 font-light max-w-sm'>Didn’t receive code? <span className='text-[#112D4E]'>Resend</span></p>
        </div>
    )
}
