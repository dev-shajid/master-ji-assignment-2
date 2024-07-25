import React from 'react'

function Container({ children, bg = '#12131f', color = 'white' }) {
  return (
    <section className={`min-h-dvh w-full`} style={{ background: bg }}>
      <div className='container mx-auto h-full !px-12 space-y-10 py-6 flex flex-col'>
        <h1 style={{ color }} className={`text-6xl font-bold text-center`}>Chai or Code</h1>

        <main className='flex-1'>
          {children}
        </main>

        <a href='https://chaicode.com/' target='_blank'>
          <img src="../bottom-logo.png" alt="Random" className='h-[70px] w-auto fixed bottom-5 right-5' />
        </a>
      </div>
    </section>
  )

}

export default Container