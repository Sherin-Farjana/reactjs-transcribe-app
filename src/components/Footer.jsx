import React from 'react'

function Footer() {
  return (
    // Footer container with responsive spacing and alignment
    <footer className='flex items-center justify-between gap-4 p-3'>

      {/* Copyright and developer attribution */}
      <a
        href="https://github.com/Sherin-Farjana"
        target='_blank'
        rel="noopener noreferrer"
      >
        <h1 className='text-[10px] font-medium sm:text-sm text-slate-400'>
          Copyright &copy; Developed By |
          <span className='text-white bold hover:text-slate-300 duration-200'>
            {' '}Sherin Farjana
          </span>
        </h1>
      </a>

      {/* Social media icons section */}
      <div className='gap-4 flex items-center'>

        {/* LinkedIn profile link */}
        <a
          href="https://www.linkedin.com/in/sherin-farjana"
          target='_blank'
          rel="noopener noreferrer"
          className='flex items-center specialBtn px-2 py-1 text-slate-900 rounded-full duration-200 hover:text-blue-600'
        >
          <i className="fa-brands fa-linkedin text-xl"></i>
        </a>

        {/* GitHub profile link */}
        <a
          href="https://github.com/Sherin-Farjana"
          target='_blank'
          rel="noopener noreferrer"
          className='flex items-center specialBtng px-2 py-1 text-slate-900 rounded-full duration-200 hover:text-slate-900'
        >
          <i className="fa-brands fa-github text-xl"></i>
        </a>

      </div>
    </footer>
  )
}

export default Footer
